<template>
	<div class="comments" v-if="!frontmatter.isNoComment">
		<!-- params generate in https://giscus.app/zh-CN -->
		<Giscus
			v-if="showComment"
			repo="huxubo/blog"
			repo-id="R_kgDOO5R0ow"
			category="Announcements"
			category-id="DIC_kwDOO5R0o84CrTFY"
			mapping="specific"
			:term="term"
			strict="1"
			reactions-enabled="1"
			emit-metadata="0"
			input-position="top"
			:theme="theme"
			:lang="lang"
			loading="lazy"
			crossorigin="anonymous"
		/>
	</div>
</template>
<script lang="ts" setup>
import { ref, watch, nextTick, computed } from "vue";
import { useData, useRoute } from "vitepress";
import Giscus from "@giscus/vue";

const route = useRoute();
const { isDark, frontmatter } = useData();

// 只保留中文路径和配置
const term = computed(() => route.path);
const theme = computed(() => (isDark.value ? "noborder_dark" : "noborder_light"));
const lang = computed(() => 'zh-Hans');

// language 变化不会触发重新加载，这里 v-if 强制刷新
const showComment = ref(true);
watch(
	() => route.path,
	() => {
		showComment.value = false;
		nextTick(() => {
			showComment.value = true;
		});
	},
	{
		immediate: true,
	}
);
</script>
<style lang="scss" scoped>
.comments {
	margin-top: 80px;
}
</style>
