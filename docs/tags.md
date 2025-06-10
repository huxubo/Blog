---
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
---

<template v-if="tags.length">
  <div class="tags-list">
    <a
      v-for="tag in tags"
      :key="tag"
      :href="`/tags?tag=${encodeURIComponent(tag)}`"
      class="tag-item-link"
      style="text-decoration:none;display:inline-block;"
    >
      <t-tag
        :theme="selectedTag === tag ? 'primary' : 'default'"
        variant="outline"
        shape="round"
        style="cursor:pointer"
      >
        {{ tag }}
        <strong class="tag-count">{{ tagCounts[tag] || 0 }}</strong>
      </t-tag>
    </a>
  </div>
  <div v-if="selectedTag">
    <h2 class="tag-title">
      <a class="header-anchor" :href="`#${selectedTag}`" :aria-label="`锚点 ${selectedTag}`">​</a>
      <span class="tag-label source-han-serif hollow-text">{{ selectedTag }}</span>
    </h2>
    <div v-if="filteredPosts.length === 0" class="no-posts">暂无相关文章</div>
    <div class="tag-post-container" v-for="post in filteredPosts" :key="post.url">
      <a :href="post.url" class="post-link source-han-serif">{{ post.title }}</a>
      <span class="post-date">{{ post.date.string }}</span>
    </div>
  </div>
  <div v-else class="tip-text">点击上方标签可查看相关文章</div>
</template>

<script lang="ts" setup>
import { ref, computed, watchEffect } from "vue";
import { data as posts } from "./.vitepress/theme/posts.data.mts";
import { Tag as TTag } from "tdesign-vue-next";
import { useRouter, useRoute } from "vitepress";

const tags = computed(() => {
  const set = new Set<string>();
  posts.forEach(post => {
    (post.tags || []).forEach(tag => set.add(tag));
  });
  return Array.from(set).sort();
});

const tagCounts = computed(() => {
  const counts: Record<string, number> = {};
  posts.forEach(post => {
    (post.tags || []).forEach(tag => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });
  return counts;
});

const selectedTag = ref<string | null>(null);
const filteredPosts = computed(() => {
  if (!selectedTag.value) return [];
  return posts.filter(post => (post.tags || []).includes(selectedTag.value!)).sort((a, b) => b.date.time - a.date.time);
});

const router = useRouter();
const route = useRoute();

function getTagFromQuery() {
  // 兼容 vitepress 2.x query 为空的情况，手动解析
  let tag = route.query?.tag;
  if (!tag && typeof window !== 'undefined') {
    const m = window.location.search.match(/[?&]tag=([^&]+)/);
    if (m) tag = decodeURIComponent(m[1]);
  }
  return typeof tag === 'string' && tag ? tag : null;
}

// 页面加载和路由变化时自动同步 selectedTag
watchEffect(() => {
  selectedTag.value = getTagFromQuery();
});

function onTagClick(tag: string) {}
function clearTag() {
  router.replace("/tags");
}
</script>

<style scoped>
.tags-list {
  margin-bottom: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
}
.tag-item-link {
  margin-right: 2px;
}
.tag-item {
  cursor: pointer;
  font-size: 15px;
  transition: box-shadow 0.2s;
}
.tag-item[theme="primary"] {
  box-shadow: 0 2px 8px rgba(0, 98, 255, 0.08);
}
.tag-title {
  margin-bottom: 6px;
  border-top: 0px;
  position: relative;
  top: 0;
  left: 0;
}
.tag-label {
  position: absolute;
  top: 1px;
  left: -6px;
  z-index: -1;
  opacity: .16;
  font-size: 40px;
  font-weight: 900;
  color: var(--vp-c-text-1);
  font-family: 'SourceHanSerifCN', serif;
  letter-spacing: 2px;
}
.tag-post-container {
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
}
.post-link {
  font-weight: 400;
  font-family: 'SourceHanSerifCN', serif;
  font-size: 1.08em;
}
.hollow-text {
  color: var(--vp-c-bg);
  -webkit-text-stroke: 1px var(--vp-c-text-1);
  text-stroke: 1px var(--vp-c-text-1);
}
.post-date {
  opacity: .6;
}
.no-posts {
  color: #888;
  margin-bottom: 20px;
  font-size: 16px;
  text-align: center;
}
.tip-text {
  color: #aaa;
  font-size: 15px;
  margin-top: 16px;
  text-align: center;
}
.back-all-tags {
  margin-top: 24px;
  text-align: right;
}
.back-btn {
  cursor: pointer;
  font-size: 14px;
  color: #666;
}
.tag-count {
  opacity: .6;
  margin-left: 4px;
  color: #1976d2;
}
@media (max-width: 600px) {
  .tag-label {
    font-size: 36px;
    left: 0;
  }
}
</style>
