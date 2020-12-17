var fs = require('fs');
var path = require('path');

var dbFunc = require('./db_functions') 

function serverCallBack(req,res) {
    let url = req.url
    let method = req.method

    switch(url) {
        case "/":
            sendFile(res, 'index.html', "text/html", 'utf8', 200);
            break;
        case "/show":
            method === "POST" ? sendTransactionResult(req,res) : send404response(res)
            break;
        case "/style.css":
            sendFile(res, 'style.css', "text/css", 'utf8', 200)
            break;
        case "/favicon.ico":
            res.writeHead(200, {'Content-Type': 'image/x-icon'} );
            res.end()
            break;
        default:
            send404(res);
            break;
    }
}

function sendTransactionResult(req, res) {
  let body = []

  req.on('data', (x) => {
    // split each line of received chunk data 
    let rawData = Buffer.concat([x]).toString().split('\r\n')
    for(var i = 0; i < rawData.length-4; i=i+4){body.push(rawData[i+3])}
  })

  req.on('end', () => {
  fetchData(res, body)
  })
}
function fetchData(res, args){
  let query ='select first 10 * from haglog'
  let result = dbFunc.fetchResult(query,args)
  
  if(result.error) {
       res.status(403)
       return res.end()

  }
  writeDataInTable(data)
  sendFile(res, 'table.html', "text/html", 'utf8',200) 
}
function writeDataInTable( data ) {   
  let html = "<h3> Results: </h3><table><tr>";  
  let keys = Object.keys(data[0])

  //Column name as headings
  keys.forEach(col => {
    html = html.concat(`<th>${col}</th>`)
  })
  html = html.concat(`</tr>`)

  //Populate table data
  data.forEach(row => {
    html = html.concat(`<tr>`)
    keys.forEach(col => {
      html = html.concat(`<td>${row[col]}</td>`)
    })
    html = html.concat(`</tr>`)
  })

  html = html.concat(`</table>`)
  fs.writeFileSync('table.html', html)
}
function send404response(response){
  response.writeHead(404, {"Content-Type":"text/html"});
  response.write("<h1>Error 404: PAGE NOT FOUND </h1>");
  response.end();
}
function sendFile(res, name, contenttype, encoding, code) {
var filePath = path.join(path.extname(__dirname), name);
  res.writeHead(code, {"Content-Type":contenttype});
  res.write(fs.readFileSync(filePath, {encoding: encoding}))
  return res.end()
}


module.exports = {callBack: serverCallBack};