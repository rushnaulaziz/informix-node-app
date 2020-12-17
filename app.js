const http = require('http');
var httpFunctions = require('./shared/http_functions')

const server = http.createServer(httpFunctions.callBack)
server.listen(3000)