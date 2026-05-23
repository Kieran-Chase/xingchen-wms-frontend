# 星辰 WMS 前端

基于 JeecgBoot Vue3 前端二次开发的星辰 WMS 管理系统前端项目，使用 Vue 3、Vite、TypeScript、Pinia、Ant Design Vue。

## 项目说明

- 前端目录：`xingchen-wms-vue-course_428`
- 本地开发端口：`3100`
- 后端接口代理：`/jeecgboot -> http://localhost:8080/jeecg-boot`
- 当前重点功能：WMS 管理、AI 聊天、组件示例、本地 mock 联调
- IoT 模块当前依赖后端接入 `jeecg-module-iot`，如果后端未加载该模块，`/iot/manage/...` 接口会报 `No static resource`

## 环境要求

- Node.js 20+
- pnpm
- 后端服务：`http://localhost:8080/jeecg-boot`

检查版本：

```bash
node -v
pnpm -v
```

## 安装依赖

```bash
pnpm install
```

## 本地开发

```bash
pnpm dev
```

启动后访问：

```text
http://localhost:3100
```

开发环境配置在 `.env.development`：

```env
VITE_USE_MOCK = true
VITE_PROXY = [["/jeecgboot","http://localhost:8080/jeecg-boot"],["/upload","http://localhost:3300/upload"]]
VITE_GLOB_DOMAIN_URL=http://localhost:8080/jeecg-boot
VITE_GLOB_API_URL=/jeecgboot
```

说明：

- `VITE_USE_MOCK = true` 用于本地测试 form/table/tree 等示例页面。
- AI 聊天需要后端配置真实大模型 API Key。
- IoT 页面需要后端工程真正加载 IoT 模块。

## 打包构建

```bash
pnpm build
```

构建产物在：

```text
dist/
```

正式部署时不要使用 `pnpm dev`，应将 `dist` 目录内容部署到 Nginx 或其他静态资源服务器。

## 常见问题

### AI 调用失败

如果出现：

```text
Authentication Fails, Your api key is invalid
```

说明后端大模型 API Key 配置无效，需要在后端配置中填写真实 key，并重启后端。

### mock 示例接口 404

如果 form/table/tree 示例报：

```text
No static resource mock/tree/getDemoOptions
```

请确认 `.env.development` 中：

```env
VITE_USE_MOCK = true
```

修改后重启前端开发服务。

### IoT 接口 404

如果 IoT 工作台、产品列表、设备管理报：

```text
No static resource iot/manage/workbench/dashboard
No static resource iot/manage/product/list
```

说明当前后端没有加载 IoT Controller。需要后端接入并编译启动 `jeecg-module-iot`。

## 上传到 GitHub

首次上传代码：

```bash
git init
git add .
git commit -m "init xingchen wms frontend"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

后续更新代码：

```bash
git status
git add .
git commit -m "update frontend"
git push
```

## 上传前检查

上传 GitHub 前建议确认：

- 不提交 `node_modules/`
- 不提交 `dist/`
- 不提交真实 API Key、数据库密码、服务器密码
- 不提交本地 IDE 配置，如 `.idea/`
- 确认 `.gitignore` 已生效

## 许可证

本项目基于 JeecgBoot 前端进行二次开发，原始项目遵循 Apache License 2.0。
