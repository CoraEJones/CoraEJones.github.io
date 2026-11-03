import type { ExpressiveCodeConfig, LicenseConfig, NavBarConfig, ProfileConfig, SiteConfig } from './types/config';
import { LinkPreset } from './types/config';
export const siteConfig: SiteConfig = {
 title: '陈逸妤的博客', subtitle: '记录学习和成长的过程', lang: 'zh_CN',
 themeColor: { hue: 220, fixed: false },
 banner: { enable: true, src: 'assets/images/diudiu-banner.webp', position: 'center', credit: { enable: false, text: '', url: '' } },
 toc: { enable: true, depth: 3 },
 favicon: [{src: '/favicon.svg'}],
};
export const navBarConfig: NavBarConfig = { links: [ LinkPreset.Home, {name: '光学', url: '/optics/'}, {name: '具身智能', url: '/embodied-ai/'}, LinkPreset.Archive, LinkPreset.About ] };
export const profileConfig: ProfileConfig = {
 avatar: 'assets/images/diudiu-avatar.webp', name: '陈逸妤',
 bio: 'THU本2022-2026\nTHU博 2026-\n专业：计算成像',
 links: [{name: 'GitHub', icon: 'fa6-brands:github', url: 'https://github.com/CoraEJones'}],
};
export const licenseConfig: LicenseConfig = { enable: false, name: '', url: '' };
export const expressiveCodeConfig: ExpressiveCodeConfig = { theme: 'github-dark' };
