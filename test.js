var informix = require('informixdb');
var args = process.argv.slice(2)
server=args[0]
db=args[1] 
host=args[2]
port=args[3] 
uid=args[4] 
upwd=args[5] 
console.log(args)
connectionString = `SERVER=${server};DATABASE=${db};HOST=${host};SERVICE=${port};UID=${uid};PWD=${upwd};`
console.log(connectionString)
informix.open(connectionString, function (err,conn) {
  if (err) return console.log(err);
  console.log(conn)
  conn.ClientLocale="en-US.UTF8"
  conn.DatabaseLocale="en-US.UTF8"
  conn.query('select first 10 * from haglog', function (err, data) {
    if (err) console.log(err);
    else console.log(data);
 
    conn.close(function () {
      console.log('done');
    });
  });
});


