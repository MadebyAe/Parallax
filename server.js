var express= require('express');
var app = express();
app.set("view engine", "html");
app.use('/dist', express.static(__dirname + '/dist', { maxAge:86400000 }));
app.get('*', function(req, res, next) {
  res.sendFile(__dirname+'/src/views/default/index.html');
});
app.listen(process.env.PORT || 3001);