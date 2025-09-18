const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 目标文件夹
const targetFolder = 'html_pages';

console.log('开始整理HTML文件...');

// 创建目标文件夹
if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
    console.log(`已创建文件夹: ${targetFolder}`);
}

// 获取当前目录下的所有HTML文件
const files = fs.readdirSync('.').filter(file => {
    return file.endsWith('.html') && 
           file !== 'index.html' && 
           file !== 'success.html' &&
           fs.statSync(file).isFile();
});

// 移动文件
let count = 0;
files.forEach(file => {
    const sourcePath = path.join('.', file);
    const targetPath = path.join(targetFolder, file);
    
    fs.renameSync(sourcePath, targetPath);
    console.log(`已移动: ${file}`);
    count++;
});

console.log(`\n文件整理完成！总共移动了 ${count} 个HTML文件到 ${targetFolder} 文件夹。`);

// 生成导航页
const navHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>国泰君安证裕投资 - 导航</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f5f5f5;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .container {
            text-align: center;
            padding: 40px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        }
        h1 {
            color: #1f61ab;
            margin-bottom: 20px;
        }
        a {
            color: #1f61ab;
            text-decoration: none;
            font-size: 16px;
            display: block;
            margin: 10px 0;
            padding: 8px 16px;
            border-radius: 4px;
            transition: all 0.3s;
        }
        a:hover {
            text-decoration: underline;
            background-color: #f0f0f0;
        }
        p {
            color: #666;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>国泰君安证裕投资</h1>
        <a href="${targetFolder}/国泰君安证裕投资-首页.html">🔸 点击访问首页</a>
        <a href="${targetFolder}/测试链接跳转.html">🔸 点击测试链接跳转</a>
        <p>所有HTML文件已整理到 ${targetFolder} 文件夹中</p>
    </div>
</body>
</html>`;

fs.writeFileSync('导航页.html', navHtml);
console.log('已创建 导航页.html');

console.log('\n所有操作已完成！');