var React = require('react')
  , Router = require('react-router')
  , mui = require('material-ui')
  , _ = require('lodash')
  , api = require('./../utils/api');

var {
  LeftNav,
  Menu,
  TextField,
  RaisedButton
  } = mui;

var AppLeftNav = React.createClass({

    mixins: [Router.Navigation, Router.State],

    getInitialState() {
        return {
            lists: [],
            newList: {}
        }
    },
    componentDidMount() {
        api.getLists()
          .then((documentIds) => {
              api.getDocumentsWithIds(documentIds)
                .then(function(jsonRes) {
                    return jsonRes.rows.map((row) => {
                        return {
                            text: row.doc.title,
                            route: row.doc._id
                        };
                    });
                })
                .then((documents) => {
                    this.setState({
                        lists: documents
                    });
                });
          });
    },
    handleInputChange() {
        this.setState({
            newList: {
                title: this.refs.textField.getValue(),
                owner: 'p:' + localStorage.userId,
                members: [],
                type: 'list'
            }
        })
    },
    addList() {
        fetch('/newlist', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.newList),
            credentials: 'include'
        });
    },
    render() {
        var header = <div className="logo">Lists</div>;

        var menuItems = [
            { type: mui.MenuItem.Types.SUBHEADER, text: 'Lists' }
        ].concat(this.state.lists);

        return (
            <LeftNav
              ref="leftNav"
              docked={false}
              isInitiallyOpen={false}
              header={header}
              menuItems={menuItems}
              selectedIndex={this._getSelectedIndex()}
              onChange={this._onLeftNavChange} />

        )
    },
    toggle() {
        this.refs.leftNav.toggle();
    },
    _getSelectedIndex() {
        var menuItems = this.state.lists;
        var currentItem;

        for (var i = menuItems.length - 1; i >= 0; i--) {
            currentItem = menuItems[i];
            if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
        }
    },
    _onLeftNavChange(e, selectedIndex, menuItem) {
        if (selectedIndex === 0) {

        } else {
            this.context.router.transitionTo('home', {list_id: menuItem.route});
        }
    }
});

module.exports = AppLeftNav;