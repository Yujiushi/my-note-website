# my-note-website

个人分类静态笔记网站，托管于 [GitHub Pages](https://pages.github.com/)。

**在线地址**（开启 Pages 后）：`https://yujiushi.github.io/my-note-website/`

## 结构

```
index.html              首页（进入各分类文件夹）
browse.html             文件夹浏览页（新建/上传）
notes.json              目录树数据
notes/{分类}/...        笔记 HTML 文件
private/                加密私密区
```

## 首次使用必读

**浏览**走本地/线上的 `notes.json`；**新建、上传**会写入 **GitHub 远程仓库**。

若远程还没有 `notes.json`（只 push 过 README、还没 push 完整项目），第一次创建内容时会**自动用本地目录初始化**到 GitHub。

建议尽快把完整项目 push 上去，避免本地与远程不一致：

```powershell
git add .
git commit -m "添加笔记站完整文件"
git push origin main
```

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

## 使用方式

1. 首页点击 **生活 / 学术 / 职业** 进入对应文件夹
2. 在文件夹内可以：
   - **新建文件夹** — 创建子目录
   - **新建页面** — 写笔记（Markdown）
   - **上传文件** — 导入 `.md` / `.txt` / `.html`
3. 首次操作前点击 **⚙️** 配置 GitHub Token（仅保存在本机）

操作会同步到 GitHub 仓库，约 1～3 分钟后在网站上可见。

### 获取 GitHub Token

GitHub → Settings → Developer settings → Personal access tokens → Fine-grained token，仓库选本仓库，权限 **Contents: Read and write**。

## 让 AI 更新笔记

| 你说的话 | AI 会做 |
|---------|--------|
| 「这篇公开，放进学术 / 某子文件夹」 | 生成 HTML，更新 `notes.json` 树形目录 |
| 「这篇加密，别上首页」 | 写入 `_private-src/`，加密到 `private/` |
| 「调整暗色模式 / 字号」 | 修改 `assets/style.css` |

## 本地预览

在项目目录执行：

```powershell
npm run preview
```

或直接：

```powershell
python -m http.server 3456
```

浏览器打开 **http://localhost:3456** 即可查看效果。

## License

个人笔记，版权归作者所有。
