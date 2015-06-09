var React = require('react')
  , Router = require('react-router')
  , RouteHandler = Router.RouteHandler
  , mui = require('material-ui')
  , api = require('./../utils/api');

var {
  LeftNav,
  RaisedButton,
  Checkbox
  } = mui;

var menuItems = [
  { route: 'get-started', text: 'Get Started' },
  { route: 'customization', text: 'Customization' },
  { route: 'components', text: 'Components' }
  ];

var AppRightNav = React.createClass({

  getInitialState() {
    return {
      profiles: []
    }
  },

  componentWillReceiveProps(nextProps) {
  },

  componentDidMount() {
    api.getProfiles()
      .then((res) => {
        this.setState({
          profiles: res
        })
      });
  },

  getStyles() {
    return {
      rowItem: {
        margin: '30px 0'
      },
      profilesList: {
        margin: '0 16px'
      }
    }
  },

  render() {

    var styles = this.getStyles();
    var owner = this.props.currentList.owner;
    if (owner) {
      var ownerName = owner.substring(owner.indexOf(':') + 1);
    }
    var profiles = this.state.profiles.map(function(profile) {
      var userName = profile._id.substring(profile._id.indexOf(':') + 1);
      return (
        <div style={styles.rowItem}>
          {profile.name}
          <div
            style={{
            'vertical-align': 'middle',
            display: 'inline-block',
            float: 'right'
            }}>
            <Checkbox
              name="checked"
              value="checked"
              defaultChecked={userName == ownerName} />
          </div>
        </div>
      )
    });

    var header = (
      <div>
        <div className="logo">Users</div>
        <div style={styles.profilesList}>
          {profiles}
        </div>
      </div>
    );

    return (
      <LeftNav
        ref="rightNav"
        docked={false}
        isInitiallyOpen={false}
        header={header}
        openRight={true}
        menuItems={[]}
        selectedIndex={this._getSelectedIndex()}
        onChange={this._onRightNavChange}>
        <RaisedButton label="Yay"/>
      </LeftNav>
    );
  },

  toggle() {
    this.refs.rightNav.toggle();
  },

  _getSelectedIndex() {

  },

  _onRightNavChange(e, key, payload) {

  }

});

module.exports = AppRightNav;