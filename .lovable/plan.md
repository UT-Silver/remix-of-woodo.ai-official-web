# Resources 页面（方案 B：后台上传 + 公开下载）

新增一个与 Vision / Team / Build / Think 平行的 **Resources** section，视觉与交互保持与现有页面一致（Playfair Display 标题、暖色底、卡片列表、绿色高亮）。你可以在浏览器登录后台上传/管理文件，访问者无需登录即可浏览分类并下载。

## 用户体验

**访问者视角（无需登录）**
- 导航栏出现 "Resources" 链接（与其他 section 并列）
- 页面顶部为编辑风格标题 + 简介（沿用 Vision 页排版）
- 分类筛选条（All / Reports / Decks / Data / Other，可选中切换）
- 卡片网格：每张卡片显示文件类型图标（Excel / PDF / PPT / ZIP）、标题、描述、分类标签、上传日期、文件大小、下载按钮
- 点击下载 → 直接触发浏览器下载

**管理员视角（你，登录后）**
- 页面右上角出现 "Manage" 按钮（仅登录后可见）
- 进入管理面板：上传新文件（标题、描述、分类下拉）、编辑元数据、删除文件
- 上传时显示进度，成功后即时出现在公共列表

## 技术方案

**后端（启用 Lovable Cloud）**
- Storage bucket `resources`（公开读，写入受 RLS 保护）
- 数据库表 `resources`：`id, title, description, category, file_path, file_name, file_type, file_size, created_at, created_by`
- 表 `user_roles` + enum `app_role`（遵循项目安全规范，避免在 profile 表存角色）
- Security definer 函数 `has_role()` 用于 RLS
- RLS 策略：
  - 任何人（含 anon）可 SELECT `resources` 表
  - 只有 admin 可 INSERT / UPDATE / DELETE
  - Storage 同理：公开读，admin 写
- 你的账号首次通过 Cloud 注册后，我会给你一个 SQL/说明把你升级为 admin

**前端**
- 新增路由 `/resources` → `src/pages/Resources.tsx`
- 新增 `src/pages/ResourcesAdmin.tsx`（受保护，未登录跳转登录页；非 admin 显示无权限）
- 新增 `src/pages/AuthResources.tsx`（仅用于 Resources 管理登录，邮箱密码 + Google）
- 在 `src/components/Navbar.tsx` 加入 Resources 链接
- 在 `src/App.tsx` 注册三条新路由
- 复用现有 `ScrollReveal`、`MagneticButton`、颜色变量、字体，保证视觉与其他页面一致
- 分类图标使用 lucide-react（FileSpreadsheet / FileText / Presentation / FileArchive）

## 交付顺序

1. 启用 Lovable Cloud
2. 建表 + storage bucket + RLS + 角色系统
3. 建 `/resources` 公共页
4. 建 `/resources/admin` 管理页 + 登录页
5. Navbar 加链接、App 路由注册
6. 你注册账号后，我通过 SQL 把你的 user_id 加到 `user_roles` 表并设为 admin

## 不改动的部分

Vision / Team / Build / Think / Apply / AI Hedge Fund / Index 首页 / Navbar 其他链接 / Footer / 全局样式 —— 全部保持原样。只新增文件与在 Navbar/App.tsx 里插入 Resources 相关代码。
