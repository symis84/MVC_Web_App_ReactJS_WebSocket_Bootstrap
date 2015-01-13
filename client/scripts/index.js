var React = require('react'),
	Router = require('react-router'),
	ViewPageNav = require('../routes/PageNav');

var Header = React.createClass({
	render: function() {
		return (
			<div >
				<h2>Smartfocus</h2>
				<h5>Looking what your friends is buying!</h5>
			</div>
		);
	}
});

var App = React.createClass({
	render: function() {
		return (
			<div className="container">
				<Header />
				<ViewPageNav />
				<Router.RouteHandler/>
			</div>
		);
	}
});

var o = $({});

var Model = {

  	getName:function(){

		var url = '/getName';

		$.getJSON(url, function(result){}).success(function(res){
	    	this.setState({name:res.user});
	    	Model.publish("Login_module", [{event_name : 'name' , value : res.user}] );
	    }.bind(this));
    },

    getListFriends:function(name){

    	var url = '/getListFriends';
    	
		$.getJSON(url, { name: name} ).success(function(res){
	    	this.setState({listFriends:res.data});
	    }.bind(this));

    },

    getListDress:function(){

		var url = '/getListDress';

		$.getJSON(url, function(result){}).success(function(res){
	    	this.setState({listDress:res.data});
	    }.bind(this));
    },

    setName:function(name){

		var url = '/setName';

		$.get( url, { name: name} ).success(function(res){
			if (res.msg == 300) {
				this.setState({name:name});
			};
	    }.bind(this));
    },

    subscribe: function(){
	    //console.log("subscribe: "+ arguments[0]);
	    o.on.apply(o, arguments);
  	},

  	unsubscribe: function() {
    	o.off.apply(o, arguments);
  	},

  	publish: function() {
    	//console.log("publish: "+ arguments[0]);
    	o.trigger.apply(o, arguments);
  	}  

};
module.exports = Model;




var routes = {
	ViewHome: require('../routes/Home'),
	ViewLogin: require('../routes/Login'),
	ViewShop: require('../routes/Shop'),
	ViewFriends: require('../routes/Friends')
};

var routes = (
	<Router.Route name="app" path="/" handler={App}>
		<Router.Route name="home" path="/" handler={routes.ViewHome}/>
		<Router.Route name="login" path="/login" handler={routes.ViewLogin}/>
		<Router.Route name="shop" path="/shop" handler={routes.ViewShop}/>
		<Router.Route name="friends" path="/friends" handler={routes.ViewFriends}/>
		<Router.DefaultRoute handler={routes.ViewHome}/>
	</Router.Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.body);
});
