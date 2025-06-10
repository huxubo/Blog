import { defineConfig, type SiteConfig } from 'vitepress'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import { createRssFileZH } from "../theme/utils/rss";
import { handleHeadMeta } from "../theme/utils/handleHeadMeta";

export default defineConfig({
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
  sitemap: {
    hostname: process.env.VITEPRESS_SITE_HOSTNAME || '',
  },
  head: [
    ["script", { async: '', src: "https://www.googletagmanager.com/gtag/js?id=G-MB7XVBG1TQ" }],
    ["script", {}, `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-MB7XVBG1TQ');`],
    ["link", { rel: "icon", href: "https://cdn.37o.cc/logo.jpg" }],
  ],
  async transformHead(context) {
    return handleHeadMeta(context)
  },
  buildEnd: (config: SiteConfig) => {
    createRssFileZH(config);
  },
  themeConfig: {
    outline: [2, 4],
    externalLinkIcon: true,
    search: {
      provider: 'local'
    },
  },
  markdown: {
    math: true
  },
  vite: {
    plugins: [
      AutoImport({
        resolvers: [TDesignResolver({ library: 'vue-next' })],
      }),
      Components({
        resolvers: [TDesignResolver({ library: 'vue-next' })],
      }),
    ],
  },
})
