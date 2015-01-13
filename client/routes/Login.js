React = require('react');
var Model = require('../scripts/index');

// On the following the ControllerLogin

var ControllerLogin = {
  
    mixins: [Model], 

    runView: function(){},

    handleSubmit: function(e) {
        e.preventDefault();
        var name = this.refs.user.getDOMNode().value.trim();
        this.refs.user.getDOMNode().value = '';
        this.setName(name);
        this.publish("Login_module", [{event_name : 'name' , value : name}] );
    },

    componentDidMount: function() {
        this.runView();
    },

};

// On the following the ViewLogin

var ViewLogin = React.createClass({

    mixins: [ControllerLogin], 

	  render: function() {

  		  return (
  			    <form className="commentForm" onSubmit={this.handleSubmit}>
                <label for="userName">UserName:</label>
                <input id="userName" className="form-control" type="text" placeholder="..." ref="user" /><p/>
                <label for="password">Password:</label>
                <input id="password" className="form-control" type="password" placeholder="..." ref="password" /><p/>
                <input className="btn btn-default" type="submit" value="Submit" />
            </form>
  		  );
	  }
});
module.exports = ViewLogin;