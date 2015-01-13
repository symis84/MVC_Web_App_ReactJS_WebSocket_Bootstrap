React = require('react'),
Router = require('react-router');

var PageNav = React.createClass({

	handleClick: function(i) {
        console.log(i);
        console.log(this);
        er = $("body").html();
        console.log("er "+er);
    },

	render: function() {
		return (
	
			<nav id="navBar" className="nav">
				<ul>
					<li id="home" ref="home" onClick={this.handleClick("1")} className="current"><Router.Link to="home">Home</Router.Link></li>
					<li id="login" ref="login" onClick={this.handleClick("2")}><Router.Link to="login">Login</Router.Link></li>
					<li id="shop" ref="shop" onClick={this.handleClick("3")}><Router.Link to="shop">Shop</Router.Link></li>
					<li id="friends" ref="friends" onClick={this.handleClick("4")}><Router.Link to="friends">Friends</Router.Link></li>
				</ul>
			</nav>
		);
	}
});

module.exports = PageNav;