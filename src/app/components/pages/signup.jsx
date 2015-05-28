var React = require('react')
  , Router = require('react-router')
  , mui = require('material-ui');

var {
  TextField,
  RaisedButton
  } = mui;

var SignUpPage = React.createClass({
    handleSignup() {
        var username = this.refs.username.getValue();
        var password = this.refs.password.getValue();
        var confirmPassword = this.refs.confirmPassword.getValue();
        if (password == confirmPassword) {
            fetch('/signup', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: username,
                    password: password
                })
            })
              .then(function(res) {
                  console.log(res);
              })
              .catch(function(err) {
                  console.log(err);
              })
        }
    },
    render() {
        return (
          <div className="mui-app-content-canvas">
              <TextField
                ref="username"
                hintText="username" />
              <TextField
                ref="password"
                hintText="password" />
              <TextField
                ref="confirmPassword"
                hintText="confirm password" />
              <br/>
              <RaisedButton
                label="sign up"
                primary={true}
                onClick={this.handleSignup} />
          </div>
        );
    }
});

module.exports = SignUpPage;