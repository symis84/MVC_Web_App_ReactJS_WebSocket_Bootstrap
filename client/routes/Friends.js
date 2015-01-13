React = require('react');
var Model = require('../scripts/index');
var ViewHome = require('./Home');

var SettingControllerFriends = {
    init: 0,
    name : ""
}

// On the following the ControllerShop

var ControllerFriends = {
  
    mixins: [Model], // Use the mixin

    getInitialState: function() {
        return {listFriends: [],message: ""};
    },

    runView: function(){
        this.getInitialState();
        Model.subscribe("Login_module", function(e, msg) {
            SettingControllerFriends.name = msg.value; 
        });
        var el = this.getDOMNode();
        $el = jQuery(el);
        if (SettingControllerFriends.init == 0) {
            var socket = io();
            socket.on('chat message', function(msg){
                var url = msg.substring(0, msg.length-1);
                $el.append("<div class='col-xs-6 col-md-3'><a class='thumbnail'><img src=" +msg+ "></a></div>");
            });                                                         
            SettingControllerFriends.init = 1;
        };
        this.getListFriends(SettingControllerFriends.name);
    },

    handleClick: function(i) {
        console.log('You clicked: ' + this.state.listFriends[i]);
    },

    componentDidMount: function() {
        this.runView();
    }
};

// On the following the ViewShop

var ViewFriends = React.createClass({

    mixins: [ControllerFriends], // Use the mixin

    render: function() {

        var listItems = this.state.listFriends.map((function(item,i) {
          return (
              <li className="list-group-item" key={i}><a href='#' onClick={this.handleClick.bind(this, i)}>{item}</a></li>
          );
        }).bind(this));

        return <div>Follow your friends:<p/><ul className="list-group">{listItems}</ul>{this.state.message}<p/><p/>Your friend is looking for:</div>
    }
});
module.exports = ViewFriends;