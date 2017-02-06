var express = require('express');
var app = express();

var TLV = require('node-tlv');


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//app.get('/', function(request, response) {
//  response.render('pages/index');
//});

app.get('/', function(request, response) {
  response.render('pages/parse');
});

function simplify(tlv) {

  var simple = {};
  simple.tag = tlv.getTag();
  simple.length = tlv.getLength();
  simple.value = tlv.getValue();
  simple.size = tlv.getSize();

  simple.name = tlv.getName();
  //simple.desc = tlv.getDesc();
  simple.child = [];

  var child;
  for (var i=0; i<tlv.child.length; i++) {
    child = tlv.child[i];
    //if (child.info.encoding === 'constructed') {
    simple.child.push(simplify(child));
    //}
  }
  //console.log(simple);

  return simple;
}


app.get('/parse/:data', function(req, res) {

  var data = req.params['data'];

  //6F15840E315041592E5359532E4444463031A503880101
  if (data === undefined) {
    res.json({});
    return;
  }


  var tlv;// = TLV.parse(data);

  var obj = {};
  try {
    tlv = TLV.parse(data);
  } catch (e) {
    obj.stat = 'fail';
    obj.message = e.toString();
    res.json(obj);
    return;
  }

  obj.stat = 'ok';
  obj.tlv = simplify(tlv);

  res.json(obj);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


