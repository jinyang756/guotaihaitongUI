const fs = require('fs');
const path = require('path');

// 项目根目录
const projectRoot = __dirname;

// 需要删除的文件夹模式
const foldersToDelete = [
    // 所有的_files文件夹
    '业务简介_files',
    '人力资源_files',
    '企业基本信息_files',
    '企业文化_files',
    '公司动态_files',
    '公司简介_files',
    '制度建设_files',
    '国泰君安证裕投资-首页_files',
    '投资案例_files',
    '投资理念_files',
    '投资者关系_files',
    '投资领域_files',
    '社会责任_files',
    '组织架构_files',
    '经营理念_files',
    '经营范围_files',
    '联系我们_files',
    '股东背景_files',
    '董监高_files',
    // 临时脚本文件
    '整理HTML文件.ps1',
    '整理HTML文件_simple.ps1',
    'update-all-html-files.ps1',
    'fix-links.ps1'
];

// 清理函数
function cleanupProject() {
    console.log('开始清理项目...');
    
    // 删除不需要的文件夹和文件
    foldersToDelete.forEach(item => {
        const fullPath = path.join(projectRoot, item);
        if (fs.existsSync(fullPath)) {
            try {
                if (fs.statSync(fullPath).isDirectory()) {
                    // 删除文件夹及其内容
                    fs.rmSync(fullPath, { recursive: true, force: true });
                    console.log('已删除文件夹: ' + item);
                } else {
                    // 删除文件
                    fs.unlinkSync(fullPath);
                    console.log('已删除文件: ' + item);
                }
            } catch (error) {
                console.error('删除 ' + item + ' 失败: ' + error.message);
            }
        } else {
            console.log('跳过不存在的项: ' + item);
        }
    });
    
    console.log('项目清理完成！');
    console.log('');
    console.log('下一步：');
    console.log('1. 确保所有文件都已正确整理到html_pages文件夹中');
    console.log('2. 检查index.html、success.html和test-navigation.html中的链接是否正确');
    console.log('3. 准备推送到GitHub仓库');
}

// 执行清理
cleanupProject();