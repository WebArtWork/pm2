const pm2 = require('pm2');
module.exports = function(sd, argv, root){
	if(argv.shift().toLowerCase() != 'pm2') sd.exit('Command is not correct, please check docs LINK.');
	if(!argv.length) argv.push('list');
	switch(argv.shift().toLowerCase()){
		case 'start':
			return start(sd, root);
		case 'stop':
			return stop(sd, root);
		case 'restart':
		case 'rr':
			return restart(sd, root);
		default:
		case 'list':
			return list(sd, root);
		default:
			sd.exit('Command is not correct, please check docs LINK.');
	}
}
const start = function(sd, root){
	pm2.connect(function(err) {
		if (err) {
			console.error(err);
			process.exit(2);
		}
		pm2.start({
			name: sd.config.name||process.cwd(),
			script: root+'/parts/index.js',
			exec_mode: 'cluster',
			instances: 1,
			max_memory_restart: '200M'
		}, function(err, apps) {
			pm2.disconnect();
			process.exit(2);
		});
	});
}
const stop = function(sd, root){
	pm2.connect(function(err) {
		if (err) {
			console.error(err);
			process.exit(2);
		}
		pm2.delete(sd.config.name||process.cwd(), function(err, apps) {
			pm2.disconnect();
			process.exit(2);
		});
	});

}
const restart = function(sd, root){
	pm2.connect(function(err) {
		if (err) {
			console.error(err);
			process.exit(2);
		}
		pm2.delete(sd.config..name||process.cwd(), function(err, apps) {
			pm2.start({
				name: sd.config..name||process.cwd(),
				script: root+'/parts/index.js',
				exec_mode: 'cluster',
				instances: 1,
				max_memory_restart: '200M'
			}, function(err, apps) {
				pm2.disconnect();
				process.exit(2);
			});
		});
	});
}
const list = function(sd, root){

}