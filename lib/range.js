function range(start,stop) {
  var result=[];
  for (var idx=start.charCodeAt(0),end=stop.charCodeAt(0); idx <=end; ++idx){
    result.push(String.fromCharCode(idx));
  }
  return result;
};

module.exports = range;
