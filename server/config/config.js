var path = require('path');
var rootPath = path.normalize(__dirname + '/../../')

module.exports = {
	development: {
		db: 'mongodb://localhost/polling',
		rootPath: rootPath,
		port: process.env.PORT || 3000
	},
	production: {
		db: 'mongodb://jhi5:1337SNKj@ds021182.mlab.com:21182/polling',
		rootPath: rootPath,
		prot: process.env.PORT || 80
	}
}