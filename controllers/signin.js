let fn_index = async(ctx, next) => {
	ctx.response.body = `
		<h1>INDEX PAGE</h1>
		<form action="/signin" mothod="post">
			<p>Name: <input type="text" name="name" /></p>
			<p>password: <input type="password" name="password" /></p>
			<p><input type="submit" value="提交" /></p>
		</form>
	`;
}

let fn_signin = async(ctx, next) => {
	let name = ctx.request.body.name || '';
	let password = ctx.request.body.password || '';
	console.log(`sign in with \n name: ${name}, \n password: ${password}`);

	if (name === 'zhangxiaoyu' && password === '123456') {
		ctx.response.body = `<h1>Welcome, zhangxiaoyu</h1>`;
	} else {
		ctx.response.body = `
			<h1>Fuck off!</h1>
			<h2>How dare you to <a href="/">try again</a>!</h2>
		`;
	}
}

module.exports = {
	'GET /': fn_index,
	'POST /signin': fn_signin
};