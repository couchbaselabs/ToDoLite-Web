var React = require('react')
  , Router = require('react-router')
  , mui = require('material-ui');

var {
  TextField,
  RaisedButton
  } = mui;

var SignUpPage = React.createClass({
    render() {
        return (
          <div className="mui-app-content-canvas">
              <TextField
                hintText="username" />
              <TextField
                hintText="password" />
              <TextField
                hintText="confirm password" />
              <br/>
              <RaisedButton
                label="sign up"
                primary={true} />
          </div>
        );
    }
});

module.exports = SignUpPage;