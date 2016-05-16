var rules = require('./rules');

module.exports = function(parent, inputs) {
  var refs = parent.refs;

  for(var key in inputs) {
    var name = inputs[key]['name'];
    var value = refs[name].value;

    if(inputs[key]['rules']) {
      for(var r in inputs[key]['rules']) {
        var rule = inputs[key]['rules'][r];
        if(!rules[rule](value)) {
          parent.setState({
            validateMsg: inputs[key]['msg']
          });
        }
      }
    }
  }
};
