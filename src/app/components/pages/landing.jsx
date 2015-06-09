var React = require('react')
  , mui = require('material-ui');

var {TextField, RaisedButton} = mui;
var {Spacing} = mui.Styles;

class LandingPage extends React.Component {
  render() {
    var style = {
      paddingTop: Spacing.desktopKeylineIncrement
    };

    return (
      <div style={style}>
        Hey
      </div>
    );
  }
}

module.exports = LandingPage;