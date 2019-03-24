const http = require("http");
const https = require("https");

http
	.createServer(function(req, res) {
		const URL = req.url;
		res.writeHead(200, {
			"Content-Type": "text/html",
			"Access-Control-Allow-Origin": "*"
		});
		if (!URL) return res.write("error");
		getData(URL)
			.then(data => {
				res.end(JSON.stringify(data));
			})
			.catch(error => {
				res.end(JSON.stringify(error));
			});
	})
	.listen(8080);

console.log("服务已经启动");

// 获取数据
function getData(url) {
	const request = url.startsWith("https") ? https : http;
	var pm = new Promise(function(resolve, reject) {
		request
			.get(url, function(res) {
				if (res.statusCode != 200) {
					reject({ status: false });
				}
				var data = "";
				res.on("data", function(d) {
					data += d.toString();
				});
				res.on("end", function() {
					const json = JSON.parse(data);
					resolve(json);
				});
			})
			.on("error", function(e) {
				reject(e);
			});
	});
	return pm;
}
