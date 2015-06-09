var React = require('react')
  , Router = require('react-router')
  , RouteHandler = Router.RouteHandler
  , mui = require('material-ui')
  , AppLeftNav = require('./page-left-nav.jsx')
  , AppRightNav = require('./page-right-nav.jsx')
  , ThemeManager = new mui.Styles.ThemeManager()
  , ActionAdd = require('./svg-icons/action-add.jsx');

var {
  AppBar,
  AppCanvas,
  Menu,
  IconButton,
  RaisedButton
  } = mui;

var {Spacing} = mui.Styles;

class Master extends React.Component {

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  }

  componentDidMount() {
    ThemeManager.setComponentThemes({
      palette: {
        primary1Color: 'green100'
      }
    })
  }

  getStyles() {
    return {
      root: {
        padding: '48px 24px'
      }
    };
  }

  render() {

    var style = {
      paddingTop: Spacing.desktopKeylineIncrement
    };

    var styles = this.getStyles();

    var logoutButton = (
      <IconButton
        className="github-icon-button"
        iconClassName="muidocs-icon-custom-arrow-drop-right"
        linkButton={true} />
    );

    return (
      <AppCanvas predefinedLayout={1}>

        <AppBar
          zDepth={0}
          title="ToDoLite Web"
          onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap.bind(this)} />

        <AppLeftNav ref="leftNav" />

        <div style={style}>
          <div style={styles.root}>
            <RouteHandler />
          </div>
        </div>

      </AppCanvas>
    )
  }

  _onLeftIconButtonTouchTap() {
    this.refs.leftNav.toggle();
  }
}

Master.contextTypes = {
  router: React.PropTypes.func
};

Master.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Master;