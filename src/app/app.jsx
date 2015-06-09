var React = require('react')
  , injectTapEventPlugin = require('react-tap-event-plugin')
  , Router = require('react-router')
  , Route = Router.Route
  , DefaultRoute = Router.Route
  , mui = require('material-ui')

  , Login = require('./components/pages/login.jsx')
  , Signup = require('./components/pages/signup.jsx')
  , Master = require('./components/master.jsx')
  , Home = require('./components/pages/home.jsx')
  , LandingPage = require('./components/pages/landing.jsx');


//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

var routes = (
  <Route name="root" path="/" handler={Master} >
      <Route name="signup" handler={Signup}></Route>
      <Route name="login" handler={Login}></Route>
      <Route name="home" path="home/:list_id" handler={Home}></Route>

      <DefaultRoute handler={LandingPage} />
  </Route>
);

Router.run(routes, function(Handler) {
    React.render(<Handler/>, document.getElementById('example'))
});