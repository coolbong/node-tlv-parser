var TLV = require('node-tlv');



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


function get_tlv(data) {
  var obj = {};
  var tlv;
  try {
    tlv = TLV.parse(data);
  } catch (e) {
    obj.stat = 'fail';
    obj.message = e.toString();
    
    return obj;
  }

  obj.stat = 'ok';
  obj.tlv = simplify(tlv);
  return obj;
}

// '/parse/:data'
function parse(req, res) {
  
  var data = req.params['data'];
  var obj;
  if (data === undefined) {
    obj = {};
    obj.stat = 'fail';
    res.json(obj);
    return;
  }
  
  obj = get_tlv(data)
  
  res.json(obj);
}




exports.parse = parse;

module.exports = {
  parse: parse,
  get_tlv: get_tlv
};


