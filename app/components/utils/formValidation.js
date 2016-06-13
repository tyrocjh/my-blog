var rules = require('./rules');

module.exports = function(parent, inputs) {
  var refs = parent.refs;
  var data = {};

  for(var key in inputs) {

    if(data) {
      var name = inputs[key]['name'];
      var names = inputs[key]['names'];

      if(names) {
        var i = 0, ref;
        while(ref = refs[names + i]) {
          i++;
          if(ref.checked) {
            if(!data[names]) data[names] = [];
            data[names].push(ref.value);
          }
        }
      }

      if(name) {
        var value = refs[name].value;
        data[name] = value;

        if(inputs[key]['rules']) {

          for(var r in inputs[key]['rules']) {
            var rule = inputs[key]['rules'][r];

            if(!rules[rule](value)) {
              parent.setState({
                validateMsg: inputs[key]['msg']
              });

              data = null;
              break;
            } else {
              parent.setState({
                validateMsg: null
              });
            }
          }
        }
      }

    }
  }

  return data;
};
