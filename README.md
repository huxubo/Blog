## 开发

```bash
git clone git@github.com:Justin3go/justin3go.com.git
cd FAV0

npm i -g pnpm # 如果需要
pnpm i
pnpm docs:dev
```
1. 修改 giscus 评论配置，`.vitepress/theme/components/Comments.vue`中的`giscus`配置项;
2. 修改`utils`文件夹下的中的侧边栏配置、RSS 配置、元信息配置等;
3. 修改`config`文件夹下的相关配置，主要是 title、description、head 的 GA 配置等;
4. 修改`posts/**`目录中的文章内容为自己的内容;

## 协议

本仓库采用双协议授权，即 MIT 协议和 CC-BY-4.0 协议：

- 所有`.md`文件采用 CC-BY-4.0 协议协议，你需要保留署名权
- 其他代码文件采用 MIT 协议，你可以自由使用
