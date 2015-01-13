React = require('react');
var Model = require('../scripts/index');

// On the following the ControllerShop

var ControllerShop = {
  
    mixins: [Model], // Use the mixin

    getInitialState: function() {
        return {listDress: []};
    },

    runView: function(){
        this.getInitialState();
        this.getListDress();
        this.subscribe("Login_module", function(e, msg) {
            //console.log("msg: " + msg.event_name);
        });
    },

    handleClick: function(i) {
        var socket = io();
        socket.emit('chat message', this.state.listDress[i]);
    },

    componentDidMount: function() {
        this.runView();
    }
};

// On the following the ViewShop

var ViewShop = React.createClass({

    mixins: [ControllerShop], // Use the mixin

    render: function() {

        var listItems = this.state.listDress.map((function(item,i) {
          return (
               <div className="col-xs-6 col-md-3"><a key={i} className="thumbnail"  href='#' onClick={this.handleClick.bind(this, i)}><img src={item} /></a></div>
          );
        }).bind(this));

        return <div>Choose your dress:<p/><p/><div className="row">{listItems}</div></div>
    }
});
module.exports = ViewShop;


