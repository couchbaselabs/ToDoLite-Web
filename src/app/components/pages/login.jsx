var React = require('react')
  , Router = require('react-router')
  , mui = require('material-ui')
  , Auth = require('./../../utils/auth');

var {TextField, RaisedButton} = mui;

var {Spacing} = mui.Styles;

var LoginPage = React.createClass({

    mixins: [Router.Navigation],

    handleLogin() {
        // get email and password
        var name = this.refs.name.getValue();
        var password = this.refs.password.getValue();
        Auth.login(name, password)
          .then((res) => {
              if (res.error == 'Unauthorized') {
                  // show popup
              } else {
                  // redirect user
                  var keys = Object.keys(res.userCtx.channels);
                  var listId = keys[1].substring(keys[1].indexOf('-') + 1);
                  this.context.router.transitionTo('home', {list_id: listId});
              }
          });

    },
    getStyles() {
        return {
            loginForm: {
                margin: '20px auto',
                display: 'block',
                width: '256px'
            }
        };
    },
    render() {
        var style = {
            paddingTop: Spacing.desktopKeylineIncrement
        };

        var styles = this.getStyles();

        return (
          <div style={styles.loginForm} className="mui-app-content-canvas">
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