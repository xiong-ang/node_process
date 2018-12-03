var http = require('http');

var server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Handler by child, pid is ' + process.pid);
});

var worker;
process.on('message', (m, tcp) => {
    if(m === 'server') {
        worker = tcp;
        worker.on('connection', (socket) => {
            server.emit('connection', socket);
        });
    }
});

process.on('uncauthtException', () => {
    process.send({act: 'suicide'});
    worker.close(() => {
        process.exit(1);
    });

    setTimeout(() => {
        process.exit(1);
    }, 5000);
});