const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('你好！\n');
});

server.listen(port, hostname, () => {
    console.log(`服务器 @ http://${hostname}:${port} 已启动 ...\n按下 Ctrl + C 停止`);
});
