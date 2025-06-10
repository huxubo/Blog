import path from "node:path";
import { writeFileSync } from "node:fs";
import { Feed } from "feed";
import { createContentLoader, type SiteConfig } from "vitepress";

const hostname = (typeof window !== "undefined" && window.location.origin) || "https://justin3go.com";

export async function createRssFileZH(config: SiteConfig) {
  const feed = new Feed({
    title: 'Justin3go',
    description: '坚持深耕技术领域的 T 型前端程序员, 关注独立开发，喜欢 Vuejs、Nestjs, 还会点 Python、搜索引擎、NLP、Web3、后端',
    id: hostname,
    link: hostname,
    language: "zh-Hans",
    image: "https://cdn.37o.cc/logo.jpg",
    favicon: `https://cdn.37o.cc/logo.jpg`,
    copyright: `Copyright © 2021-present ${config.site?.title || "Jiandan's Blog"}`,
  });

  const posts = await createContentLoader("posts/**/*.md", {
    excerpt: true,
    render: true,
  }).load();

  posts.sort((a, b) => Number(+new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)));

  for (const { url, excerpt, html, frontmatter } of posts) {
    // 仅保留最近 5 篇文章
    if (feed.items.length >= 5) {
      break;
    }

    feed.addItem({
      title: frontmatter.title,
      id: `${hostname}${url}`,
      link: `${hostname}${url}`,
      description: excerpt,
      content: html,
      author: [
        {
          name: "Jiandan",
          email: "xubo@37ol.com",
          link: "https://37ol.com",
        },
      ],
      date: frontmatter.date,
    });
  }

  writeFileSync(path.join(config.outDir, "feed.xml"), feed.rss2(), "utf-8");
}
