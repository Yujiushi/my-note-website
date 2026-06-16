# my-note-website

个人分类静态笔记网站，托管于 [GitHub Pages](https://pages.github.com/)。

**在线地址**（开启 Pages 后）：`https://yujiushi.github.io/my-note-website/`

## 结构

```
index.html              首页目录（仅公开笔记）
assets/                 样式与脚本（含暗色模式）
notes/
  life/                 生活
  academic/             学术
  career/               职业
private/                加密私密区（密文，可提交）
_private-src/           私密区明文源文件（已 gitignore，勿提交）
```

## 开启 GitHub Pages

1. 仓库 **Settings** → **Pages**
2. Source：**Deploy from a branch**
3. Branch：`main`，目录：`/ (root)`
4. 等待 1～3 分钟，访问上方在线地址

## 私密区

- **入口**（请自行加入浏览器书签）：`https://yujiushi.github.io/my-note-website/private/`
- 首页**不会**列出私密笔记
- 输入统一密码进入私密目录，勾选「记住我」后 30 天内浏览各篇无需重复输入
- 使用 [StatiCrypt](https://github.com/robinmoisson/staticrypt) 浏览器端 AES-256 加密

### 修改私密区密码

```powershell
# 1. 编辑 _private-src/ 下的 HTML（本地，不会上传明文）
# 2. 设置密码并重新加密
$env:NOTE_PRIVATE_PASSWORD="你的新密码"
npm install
npm run encrypt:private
# 3. 提交 private/ 目录的变更并 push
```

> **安全提示**：首次部署后请立即修改默认密码。密码建议 16 位以上，存入密码管理器。极敏感内容（证件、账号密码）请勿放入本站。

## 让 AI 更新笔记

| 你说的话 | AI 会做 |
|---------|--------|
| 「这篇公开，放进学术」 | 生成 `notes/academic/xxx.html`，更新首页链接 |
| 「这篇加密，别上首页」 | 写入 `_private-src/`，加密到 `private/`，不更新首页 |
| 「调整暗色模式 / 字号」 | 修改 `assets/style.css` |

## 本地预览

任意静态服务器即可，例如：

```powershell
npx serve .
```

## License

个人笔记，版权归作者所有。
