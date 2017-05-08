let fn_index = async(ctx, next) => {
	ctx.response.body = `
		<h1>INDEX PAGE</h1>
		<form action="/login" mothod="post">
			<p>Name: <input type="text" name="name" /></p>
			<p>password: <input type="password" name="password" /></p>
			<p><input type="submit" value="提交" /></p>
		</form>
	`;
}

let fn_login = async(ctx, next) => {
	let name = ctx.request.query.name || '';
	let password = ctx.request.query.password || '';
	console.log(`sign in with \n name: ${name}, \n password: ${password}`);

	if (name === 'zhangxiaoyu' && password === '123456') {
		ctx.response.body = `<h1>Welcome, zhangxiaoyu</h1>`;
	} else {
		ctx.response.body = `
			<h2><a href="/">try again</a>!</h2>
		`;
	}
}

module.exports = {
	'GET /': fn_index,
	'GET /login': fn_login
};