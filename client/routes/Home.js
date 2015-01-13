React = require('react');
var Model = require('../scripts/index');
ListGroupItem = require('../../node_modules/react-bootstrap/ListGroupItem');

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
        this.subscribe("Login_module", function(e, msg) {
          SettingControllerHome.name = msg.value; 
        });
    	}else{
    		this.setState({ name: SettingControllerHome.name });
    	}
    	
  	},

};

// On the following the ViewHome

var ViewHome = React.createClass({

	mixins: [ControllerHome], 

	componentDidMount: function() {
    	this.runView();
  	},
	
	render: function() {
		var socket = io();
		//console.log("user connected");
		return (
			<div>
          <p/><p/><ListGroupItem bsStyle="info">Welcome &nbsp; {this.state.name}</ListGroupItem>
      </div>
		);
	}
});

module.exports = ViewHome;