var React = require('react')
  , mui = require('material-ui')
  , Auth = require('./../auth');

var {
  TextField,
  RaisedButton
  } = mui;

var LoginPage = React.createClass({
    handleLogin() {
        // get email and password
        var name = this.refs.name.getValue();
        var password = this.refs.password.getValue();
        Auth.login(name, password, (loggedIn) => {
            console.log(loggedIn);
        })
    },
    render() {
        return (
          <div className="mui-app-content-canvas">
              <TextField
                ref="name"
                hintText="Username" />
              <TextField
                ref="password"
                hintText="Password" />
              <br/>
              <RaisedButton
                label="login"
                primary={true}
                onClick={this.handleLogin} />
          </div>
        );
    }
});

module.exports = LoginPage;