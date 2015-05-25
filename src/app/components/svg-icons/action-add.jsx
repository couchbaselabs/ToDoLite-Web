var React = require('react');
var mui = require('material-ui');
var SvgIcon = mui.SvgIcon;

var ActionAdd = React.createClass({

    render: function() {
        return (
          <SvgIcon {...this.props}>
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
          </SvgIcon>
        );
    }

});

module.exports = ActionAdd;