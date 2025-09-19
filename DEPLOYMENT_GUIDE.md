# Vercel平台部署和域名绑定指南

## 项目准备状态

您的项目已经完成以下准备工作，为Vercel部署做好了准备：

1. ✅ 已创建`vercel.json`配置文件，包含了必要的重定向和路由规则
2. ✅ 已优化`vite.config.ts`配置，确保正确构建
3. ✅ 已配置`.gitignore`文件，排除不必要的文件
4. ✅ 项目已转换为静态网站结构，适合Vercel部署

## Vercel平台域名解析和绑定步骤

### 1. 完成DNS记录配置（您已完成）

根据`DNS_CONFIG.md`文件，您需要在judns.com的DNS管理界面添加以下记录：

- **主域名A记录**
  - 主机记录: `@`
  - 记录类型: `A`
  - 记录值: `76.76.21.21` 或 `104.244.43.228`
  - TTL: 默认为10分钟或选择最小值

- **www子域名A记录**
  - 主机记录: `www`
  - 记录类型: `A`
  - 记录值: `76.76.21.21` 或 `104.244.43.228`
  - TTL: 默认为10分钟或选择最小值

### 2. 在Vercel平台添加域名

1. 登录您的Vercel账户并打开项目
2. 点击顶部导航栏中的`Settings`（设置）选项
3. 在左侧菜单中选择`Domains`（域名）
4. 在`Add Domain`输入框中输入`zhengyutouzi.com`，然后点击`Add`
5. 系统会自动检测您是否已添加DNS记录
6. 等待验证完成后，再添加`www.zhengyutouzi.com`子域名

### 3. 配置域名重定向规则

`vercel.json`文件已经包含了必要的重定向规则，将`www.zhengyutouzi.com`重定向到`zhengyutouzi.com`：

```json
{
  "redirects": [
    {
      "source": "/:path*",
      "destination": "https://zhengyutouzi.com/:path*",
      "permanent": false,
      "has": [
        {
          "type": "host",
          "value": "www.zhengyutouzi.com"
        }
      ]
    }
  ]
}
```

### 4. 验证域名解析状态

DNS记录添加完成后，通常需要等待5-30分钟让DNS记录生效。您可以使用以下方法验证：

1. **命令行验证**：在命令提示符中运行
   ```
   nslookup zhengyutouzi.com
   nslookup www.zhengyutouzi.com
   ```
   如果看到返回的IP地址是您配置的Vercel IP地址，则说明配置成功。

2. **Vercel平台验证**：在Vercel的域名设置页面，您会看到域名状态从"Pending"变为"Verified"

3. **浏览器验证**：直接在浏览器中访问`www.zhengyutouzi.com`，检查是否能正确加载您的网站

### 5. 配置HTTPS证书

Vercel会自动为您的域名提供和配置免费的HTTPS证书，通常在域名验证成功后几分钟内完成。

## 常见问题解决

### DNS记录未生效
- 请耐心等待，DNS传播可能需要24-48小时才能在全球范围内完全生效
- 清除本地DNS缓存：在命令提示符中运行`ipconfig /flushdns`（Windows）或`sudo dscacheutil -flushcache`（Mac）
- 尝试使用不同的网络或设备测试

### 域名已验证但网站无法访问
- 检查Vercel项目的构建状态是否正常
- 确保您的网站有正确的`index.html`文件作为入口点
- 检查`vercel.json`配置是否正确

### 其他问题
- 如遇到特定错误，请查看Vercel的构建日志和错误信息
- 确保您的DNS解析设置没有冲突（例如同时配置了A记录和CNAME记录）

## 部署检查清单

- [ ] 已在DNS管理平台添加正确的A记录
- [ ] 已在Vercel平台添加主域名`zhengyutouzi.com`
- [ ] 已在Vercel平台添加子域名`www.zhengyutouzi.com`
- [ ] 域名状态已在Vercel平台显示为"Verified"
- [ ] HTTPS证书已自动配置完成
- [ ] 可以通过`www.zhengyutouzi.com`访问网站
- [ ] 重定向规则工作正常（从www重定向到主域名）

如有任何其他问题，请参考Vercel官方文档或联系Vercel支持团队获取帮助。