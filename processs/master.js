var fork = require('child_process').fork;
var cpus = require('os').cpus();

var server = require('net').createServer();
server.listen(8585);

var workers = {};
var createrWorker = () => {
    var worker = fork(__dirname + '/worker.js');

    worker.on('message', () => {
        if(message.act === 'suicide') {
            createrWorker();
        }
    });

    worker.on('exit', () => {
        console.log('Worker ' + worker.pid + ' exited.');
        delete workers[worker.pid];
    });

    worker.send('server', server);
    workers[worker.pid] = worker;
    console.log('Create worker. Pid: ' + worker.pid);
};

for (let index = 0; index < cpus.length; index++) {
    createrWorker();
}

process.on('exit', () => {
    for(var pid in workers) {
        workers[pid].kill();
    }
});