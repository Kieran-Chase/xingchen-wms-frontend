# 星辰 WMS 前端管理系统

星辰 WMS 前端管理系统是基于 JeecgBoot Vue3 前端框架二次开发的仓储管理系统前端项目。项目采用 Vue 3、Vite、TypeScript、Pinia 和 Ant Design Vue 等技术栈，主要用于对接星辰 WMS 后端服务，实现仓储业务管理、AI 助手、系统管理、组件示例和可视化页面等功能。

## 项目简介

本项目为星辰 WMS 的前端工程，负责页面展示、用户交互、权限菜单、接口请求和本地开发调试。前端通过 Vite 开发服务器运行，并通过代理转发请求到后端服务。

当前项目已完成本地前后端联调配置，支持登录、WMS 基础功能、AI 聊天、表单示例、表格示例和本地 mock 示例接口调试。

## 技术栈

- Vue 3
- Vite
- TypeScript
- Pinia
- Vue Router
- Ant Design Vue
- Axios
- JeecgBoot Vue3

## 目录说明

```text
xingchen-wms-vue-course_428/
├── build/                 # Vite 构建与插件配置
├── mock/                  # 本地 mock 接口
├── public/                # 静态资源
├── src/                   # 项目源码
│   ├── api/               # 接口定义
│   ├── components/        # 公共组件
│   ├── layouts/           # 页面布局
│   ├── router/            # 路由配置
│   ├── store/             # Pinia 状态管理
│   ├── utils/             # 工具函数
│   └── views/             # 页面模块
├── .env                   # 通用环境配置
├── .env.development       # 本地开发环境配置
├── .env.production        # 生产环境配置
├── package.json           # 项目依赖和脚本
└── README.md              # 项目说明文档
```

## 环境要求

建议使用以下环境运行项目：

| 环境     | 版本要求                           |
| -------- | ---------------------------------- |
| Node.js  | 20 或以上                          |
| pnpm     | 8 或以上                           |
| 浏览器   | Chrome / Edge 最新版本             |
| 后端服务 | `http://localhost:8080/jeecg-boot` |

检查本地环境：

```bash
node -v
pnpm -v
```

## 安装依赖

进入前端项目目录：

```bash
cd xingchen-wms-vue-course_428
```

安装依赖：

```bash
pnpm install
```

## 本地开发

启动开发服务：

```bash
pnpm dev
```

启动成功后访问：

```text
http://localhost:3100
```

## 开发环境配置

本地开发配置文件：

```text
.env.development
```

核心配置如下：

```env
VITE_USE_MOCK = true
VITE_PROXY = [["/jeecgboot","http://localhost:8080/jeecg-boot"],["/upload","http://localhost:3300/upload"]]
VITE_GLOB_DOMAIN_URL=http://localhost:8080/jeecg-boot
VITE_GLOB_API_URL=/jeecgboot
```

配置说明：

- `VITE_USE_MOCK`：是否启用本地 mock 接口。
- `VITE_PROXY`：Vite 开发代理配置。
- `VITE_GLOB_DOMAIN_URL`：后端服务地址。
- `VITE_GLOB_API_URL`：前端请求接口统一前缀。

## 后端服务要求

本项目需要配合星辰 WMS 后端服务使用。

默认后端地址：

```text
http://localhost:8080/jeecg-boot
```

本地联调时，请先启动后端服务，再启动前端项目。

## 已验证功能

当前本地已验证的功能包括：

- 用户登录
- WMS 基础页面访问
- AI 聊天接口调用
- 表单示例页面
- 表格示例页面
- Tree / Select / Table 本地 mock 示例接口

## 当前已知问题

### IoT 模块接口未加载

如果访问 IoT 工作台、产品列表或设备管理时出现以下错误：

```text
No static resource iot/manage/workbench/dashboard
No static resource iot/manage/product/list
```

说明当前运行的后端服务没有加载 IoT 模块对应的 Controller。该问题不是前端路由问题，需要在后端工程中接入并编译启动 `jeecg-module-iot` 模块。

### AI 接口认证失败

如果 AI 聊天出现以下错误：

```text
Authentication Fails, Your api key is invalid
```

说明后端大模型 API Key 配置无效，需要在后端配置中填写真实可用的 API Key，并重启后端服务。

### mock 示例接口 404

如果表单、表格或树形选择示例出现以下错误：

```text
No static resource mock/tree/getDemoOptions
```

请确认 `.env.development` 中已开启：

```env
VITE_USE_MOCK = true
```

修改配置后需要重启前端开发服务。

## 打包构建

执行生产构建：

```bash
pnpm build
```

构建完成后，产物会生成在：

```text
dist/
```

## 部署说明

生产环境不要使用 `pnpm dev` 作为正式部署方式。

推荐部署方式：

1. 执行 `pnpm build` 生成 `dist` 目录。
2. 将 `dist` 目录中的文件上传到 Nginx 或其他静态资源服务器。
3. 配置后端接口代理，例如将 `/jeecgboot` 转发到后端服务 `/jeecg-boot`。
4. 如仅更新前端静态资源，通常不需要重启后端服务。

## 许可证

本项目基于 JeecgBoot 前端进行二次开发。原始项目遵循 Apache License 2.0。
