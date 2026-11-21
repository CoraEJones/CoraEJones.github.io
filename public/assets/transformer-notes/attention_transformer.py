"""A small, runnable encoder-decoder Transformer for the study note."""

import itertools
import math

import torch
from torch import nn
from torch.nn import functional as F


PAD, BOS, EOS = 0, 1, 2
SOURCE_WORDS = ("<pad>", "I", "you", "love", "see", "cats", "dogs")
TARGET_WORDS = ("<pad>", "<bos>", "<eos>", "我", "你", "喜欢", "看见", "猫", "狗")


def scaled_dot_product_attention(q, k, v, keep=None):
    """Use a Boolean mask where True means the query may see that key."""
    scores = q @ k.transpose(-2, -1) / math.sqrt(q.size(-1))
    if keep is not None:
        scores = scores.masked_fill(~keep, -torch.inf)
        # Feed fully masked rows a finite placeholder before softmax.
        scores = scores.masked_fill(~keep.any(dim=-1, keepdim=True), 0.0)
    weights = torch.softmax(scores, dim=-1)
    if keep is not None:
        weights = weights.masked_fill(~keep, 0.0)
    return weights @ v, weights


class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, heads):
        super().__init__()
        if d_model % heads:
            raise ValueError("d_model must be divisible by heads")
        self.heads = heads
        self.head_dim = d_model // heads
        self.q_proj = nn.Linear(d_model, d_model)
        self.k_proj = nn.Linear(d_model, d_model)
        self.v_proj = nn.Linear(d_model, d_model)
        self.out_proj = nn.Linear(d_model, d_model)

    def split_heads(self, x):
        batch, length, _ = x.shape
        return x.reshape(batch, length, self.heads, self.head_dim).transpose(1, 2)

    def forward(self, query, key, value, keep=None):
        q = self.split_heads(self.q_proj(query))
        k = self.split_heads(self.k_proj(key))
        v = self.split_heads(self.v_proj(value))
        context, _ = scaled_dot_product_attention(q, k, v, keep)
        batch, _, queries, _ = context.shape
        merged = context.transpose(1, 2).reshape(batch, queries, -1)
        return self.out_proj(merged)


class PositionalEncoding(nn.Module):
    def __init__(self, d_model, max_length=256):
        super().__init__()
        positions = torch.arange(max_length, dtype=torch.float32)[:, None]
        channels = torch.arange(0, d_model, 2, dtype=torch.float32)
        angles = positions / (10000 ** (channels / d_model))
        encoding = torch.zeros(max_length, d_model)
        encoding[:, 0::2] = angles.sin()
        encoding[:, 1::2] = angles[:, : d_model // 2].cos()
        self.register_buffer("encoding", encoding, persistent=False)

    def forward(self, x):
        length = x.size(1)
        if length > self.encoding.size(0):
            raise ValueError("Sequence exceeds the positional encoding buffer")
        return x + self.encoding[:length].to(dtype=x.dtype)


def feed_forward(d_model, d_ff):
    return nn.Sequential(nn.Linear(d_model, d_ff), nn.ReLU(), nn.Linear(d_ff, d_model))


class EncoderLayer(nn.Module):
    def __init__(self, d_model, heads, d_ff, dropout):
        super().__init__()
        self.self_attn = MultiHeadAttention(d_model, heads)
        self.ffn = feed_forward(d_model, d_ff)
        self.norm_attn = nn.LayerNorm(d_model)
        self.norm_ffn = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x, source_keep):
        x = self.norm_attn(x + self.dropout(self.self_attn(x, x, x, source_keep)))
        return self.norm_ffn(x + self.dropout(self.ffn(x)))


class DecoderLayer(nn.Module):
    def __init__(self, d_model, heads, d_ff, dropout):
        super().__init__()
        self.self_attn = MultiHeadAttention(d_model, heads)
        self.cross_attn = MultiHeadAttention(d_model, heads)
        self.ffn = feed_forward(d_model, d_ff)
        self.norm_self = nn.LayerNorm(d_model)
        self.norm_cross = nn.LayerNorm(d_model)
        self.norm_ffn = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x, memory, target_keep, source_keep):
        x = self.norm_self(x + self.dropout(self.self_attn(x, x, x, target_keep)))
        x = self.norm_cross(
            x + self.dropout(self.cross_attn(x, memory, memory, source_keep))
        )
        return self.norm_ffn(x + self.dropout(self.ffn(x)))


class Transformer(nn.Module):
    def __init__(self, src_vocab, tgt_vocab, d_model=32, heads=4, d_ff=64, layers=1,
                 dropout=0.0):
        super().__init__()
        self.src_embedding = nn.Embedding(src_vocab, d_model, padding_idx=PAD)
        self.tgt_embedding = nn.Embedding(tgt_vocab, d_model, padding_idx=PAD)
        self.positions = PositionalEncoding(d_model)
        self.embedding_scale = math.sqrt(d_model)
        self.dropout = nn.Dropout(dropout)
        self.encoder = nn.ModuleList(
            EncoderLayer(d_model, heads, d_ff, dropout) for _ in range(layers)
        )
        self.decoder = nn.ModuleList(
            DecoderLayer(d_model, heads, d_ff, dropout) for _ in range(layers)
        )
        self.to_vocab = nn.Linear(d_model, tgt_vocab)

    def encode(self, src):
        source_keep = src[:, None, None, :].ne(PAD)
        memory = self.dropout(self.positions(self.src_embedding(src) * self.embedding_scale))
        for layer in self.encoder:
            memory = layer(memory, source_keep)
        return memory, source_keep

    def decode(self, tgt, memory, source_keep):
        length = tgt.size(1)
        causal = torch.ones(length, length, dtype=torch.bool, device=tgt.device).tril()
        target_keep = causal & tgt[:, None, None, :].ne(PAD)
        x = self.dropout(self.positions(self.tgt_embedding(tgt) * self.embedding_scale))
        for layer in self.decoder:
            x = layer(x, memory, target_keep, source_keep)
        return self.to_vocab(x)

    def forward(self, src, tgt):
        memory, source_keep = self.encode(src)
        return self.decode(tgt, memory, source_keep)


@torch.no_grad()
def greedy_decode(model, src, max_new_tokens=6):
    """Generate a target prefix for one source sentence."""
    memory, source_keep = model.encode(src)
    prefix = src.new_full((1, 1), BOS)
    for _ in range(max_new_tokens):
        logits = model.decode(prefix, memory, source_keep)
        token = logits[:, -1].argmax(dim=-1, keepdim=True)
        prefix = torch.cat((prefix, token), dim=1)
        if token.item() == EOS:
            break
    return prefix[0, 1:].tolist()


def check_attention():
    q = torch.tensor([[1.0, 0.0]])
    k = torch.eye(2)
    v = torch.tensor([[2.0, 0.0], [0.0, 4.0]])
    out, weights = scaled_dot_product_attention(q, k, v)
    assert out.shape == (1, 2) and weights.shape == (1, 2)
    torch.testing.assert_close(weights.sum(dim=-1), torch.ones(1))
    torch.testing.assert_close(out, torch.tensor([[1.339523, 1.320954]]))

    q = torch.randn(2, 4, 3, 8)
    k = torch.randn(2, 4, 5, 8)
    v = torch.randn(2, 4, 5, 6)
    out, weights = scaled_dot_product_attention(q, k, v)
    assert out.shape == (2, 4, 3, 6) and weights.shape == (2, 4, 3, 5)
    torch.testing.assert_close(weights.sum(dim=-1), torch.ones(2, 4, 3))
    mask = torch.zeros(1, 1, 3, 5, dtype=torch.bool)
    out, weights = scaled_dot_product_attention(q, k, v, mask)
    assert torch.count_nonzero(out) == torch.count_nonzero(weights) == 0

    q, k, v = (torch.randn(1, 2, 4, 3) for _ in range(3))
    past = torch.ones(4, 4, dtype=torch.bool).tril()
    before, _ = scaled_dot_product_attention(q, k, v, past)
    v[:, :, 3] += 100
    after, _ = scaled_dot_product_attention(q, k, v, past)
    torch.testing.assert_close(before[:, :, :3], after[:, :, :3])


def toy_batch():
    choices = list(itertools.product((1, 2), (3, 4), (5, 6)))
    src = torch.tensor(choices)
    # Target IDs follow the source word order after two extra reserved IDs.
    tgt = torch.tensor([[BOS, subject + 2, verb + 2, noun + 2, EOS]
                        for subject, verb, noun in choices])
    return src, tgt[:, :-1], tgt[:, 1:]


def main():
    torch.manual_seed(7)
    torch.set_num_threads(1)
    check_attention()
    src, tgt_in, labels = toy_batch()
    model = Transformer(len(SOURCE_WORDS), len(TARGET_WORDS))
    optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

    for step in range(120):
        optimizer.zero_grad()
        logits = model(src, tgt_in)
        assert logits.shape == (*labels.shape, len(TARGET_WORDS))
        loss = F.cross_entropy(logits.transpose(1, 2), labels, ignore_index=PAD)
        loss.backward()
        if step == 0:
            first_loss = loss.item()
            assert all(p.grad is not None and p.grad.isfinite().all() for p in model.parameters())
            assert model.encoder[0].self_attn.q_proj.weight.grad.abs().sum() > 0
        optimizer.step()

    model.eval()
    with torch.no_grad():
        logits = model(src, tgt_in)
        last_loss = F.cross_entropy(logits.transpose(1, 2), labels, ignore_index=PAD).item()
        changed = tgt_in.clone()
        changed[:, -1] = EOS
        torch.testing.assert_close(model(src, changed)[:, :-1], logits[:, :-1])
    assert last_loss < first_loss * 0.2
    generated = greedy_decode(model, src[:1])
    assert generated == labels[0].tolist()
    print("shape / probability / mask / gradient checks passed")
    print(f"toy loss: {first_loss:.4f} -> {last_loss:.4f}")
    print("I love cats ->", " ".join(TARGET_WORDS[i] for i in generated))


if __name__ == "__main__":
    main()
