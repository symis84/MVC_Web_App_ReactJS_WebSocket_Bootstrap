React = require('react');
var Model = require('../scripts/index');

var SettingControllerHome = {
	init : 0,
	name : ""
}

// On the following the ControllerHome

var ControllerHome = {
  
  	mixins: [Model],

  	getInitialState: function() {
    	return {name: 0};
  	},

  	runView: function(){
    	this.getInitialState();
    	if (SettingControllerHome.init == 0) {
    		this.getName();
    		SettingControllerHome.init = 1;
    	}else{
    		this.setState({ name: SettingControllerHome.name });
    	}
    	this.subscribe("Login_module", function(e, msg) {
    		SettingControllerHome.name = msg.value; 
		});
  	},

};