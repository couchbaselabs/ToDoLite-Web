var React = require('react')
  , Router = require('react-router')
  , Route = Router.Route
  , DefaultRoute = Router.Route
  , mui = require('material-ui')

  , Login = require('./components/pages/login.jsx')
  , Signup = require('./components/pages/signup.jsx')
  , Master = require('./components/master.jsx')
  , Home = require('./components/pages/home.jsx');

var routes = (
  <Route name="root" path="/" handler={Master} >
      <Route name="signup" handler={Signup}></Route>
      <Route name="login" handler={Login}></Route>
      <Route name="home" path="home/:list_id" handler={Home}></Route>

      <DefaultRoute handler={Home} />
  </Route>
);

Router.run(routes, function(Handler) {
    React.render(<Handler/>, document.getElementById('example'))
});