var rules = require('./rules');

module.exports = function(parent, inputs) {
	var refs = parent.refs;

	for(var key in inputs) {
		var name = inputs[key]['name'];
		var rule = inputs[key]['rules'];
		var msg = inputs[key]['msg'];
		var value = refs[name].value;

		rules.rule(value);

		debugger
	}
};



      // if (name) {
      //   data[name] = refs[name].value;
      //   if (input.rules) { // 需要校验
      //     for (let rule of input.rules.entries()) {
      //       if (!rules[rule[1]](data[name])) {
      //         parent.setState({
      //           validateMsg: input.msgs[rule[0]],
      //           showAlert: true,
      //         });
      //         data = null;
      //         break;
      //       } else {
      //         parent.setState({validateMsg: null});
      //       }
      //     }
      //   }
      // }