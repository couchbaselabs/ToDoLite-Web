var React = require('react')
  , Router = require('react-router')
  , RouteHandler = Router.RouteHandler
  , mui = require('material-ui')
  , AppLeftNav = require('./page-with-nav.jsx')
  , ThemeManager = new mui.Styles.ThemeManager();

var {
  AppBar,
  AppCanvas,
  Menu,
  IconButton
  } = mui;

var Master = React.createClass({

  mixins: [Router.State],

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  render() {

    var logoutButton = (
      <IconButton
        className="github-icon-button"
        iconClassName="muidocs-icon-custom-arrow-drop-right"
        linkButton={true} />
    );

    return (
      <AppCanvas predefinedLayout={1}>

        <AppBar
          className="mui-dark-theme"
          title="ToDoLite Web"
          showMenuIconButton={false}>
          {logoutButton}
        </AppBar>

        <RouteHandler />

      </AppCanvas>
    )
  }
});

Master.contextTypes = {
  router: React.PropTypes.func
};

Master.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Master;