var informix = require('informixdb');

function fetchResult( query, args){
try {
  let server="cms_ol";
  let [host,port,uid,upwd,db]=args;
  let connectionString = `SERVER=${server};DATABASE=${db};HOST=${host};SERVICE=${port};UID=${uid};PWD=${upwd};`
  
  var option = { connectTimeout: 40, systemNaming: true };
  var conn = informix.openSync(connectionString, option);
  
  var result = conn.queryResultSync(query)
  var data= result.fetchAllSync()
  result.closeSync(); // Must call to free to avoid application error.
  
  conn.closeSync();
  return data;  
  } catch (e) {
  return {
    error: true,
    message: e.message}
  }
}


module.exports = { fetchResult };