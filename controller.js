const fs = require('fs');

function addControllers(router, dir) {
	// 读取文件名
	const files = fs.readdirSync(__dirname + '/' + dir);

	// 过滤出.js文件:
	let js_files = files.filter((f) => {
		return f.endsWith('.js');
	});

	for (var f of js_files) {
		console.log(`process controller: ${f}...`);
		// 导入js文件:
		let mapping = require(__dirname + '/' + dir + '/' + f);
		addMapping(router, mapping);
	}
}

function addMapping(router, mapping) {
	for (let url in mapping) {
		if (url.startsWith('GET ')) {
			// 如果url类似"GET xxx":
			let path = url.substring(4);
			router.get(path, mapping[url]);
			console.log(`register URL mapping: GET ${path}`);
		} else if (url.startsWith('POST ')) {
			// 如果url类似"POST xxx":
			var path = url.substring(5);
			router.post(path, mapping[url]);
			console.log(`register URL mapping: POST ${path}`);
		} else {
			// 无效的URL:
			console.log(`invalid URL: ${url}`);
		}
	}
}

module.exports = function(dir) {
	let controllers_dir = dir || 'controllers'; // 如果不传参数，扫描目录默认为'controllers'
	let router = require('koa-router')();

	// 处理每个js文件:
	addControllers(router, controllers_dir);
	return router.routes();
};