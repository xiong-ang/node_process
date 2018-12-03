require('http')
    .createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Handler by child, pid is ' + process.pid);
    })
    .listen(8585);