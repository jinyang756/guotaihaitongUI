const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const VALID_COMPANY_CODES = ['8265'];

const server = http.createServer((req, res) => {
    // 处理API请求
    if (req.url === '/api/verify-company-code' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const companyCode = data.companyCode;
                
                res.setHeader('Content-Type', 'application/json');
                if (VALID_COMPANY_CODES.includes(companyCode)) {
                    res.writeHead(200);
                    res.end(JSON.stringify({ valid: true }));
                } else {
                    res.writeHead(401);
                    res.end(JSON.stringify({ valid: false, message: '企业码错误' }));
                }
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ valid: false, message: '请求格式错误' }));
            }
        });
    } 
    // 处理静态文件请求
    else {
        // 确定文件路径
        let filePath = '.' + req.url;
        if (filePath === './') {
            filePath = './index.html';
        }

        const extname = String(path.extname(filePath)).toLowerCase();
        const mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.wav': 'audio/wav',
            '.mp4': 'video/mp4',
            '.woff': 'application/font-woff',
            '.ttf': 'application/font-ttf',
            '.eot': 'application/vnd.ms-fontobject',
            '.otf': 'application/font-otf',
            '.wasm': 'application/wasm'
        };

        const contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, (error, content) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    fs.readFile('./index.html', (err, notFoundContent) => {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(notFoundContent, 'utf-8');
                    });
                } else {
                    res.writeHead(500);
                    res.end(`服务器错误: ${error.code}`);
                }
            } else {
                // 设置缓存控制头
                const headers = { 'Content-Type': contentType };
                
                // 对静态资源（特别是assets目录下的文件）设置长缓存
                if (req.url.startsWith('/assets/') || extname === '.js' || extname === '.css' || extname === '.svg') {
                    headers['Cache-Control'] = 'public, max-age=31536000'; // 1年
                    headers['Expires'] = new Date(Date.now() + 31536000000).toUTCString();
                }
                
                res.writeHead(200, headers);
                res.end(content, 'utf-8');
            }
        });
    }
});

server.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}/`);
});