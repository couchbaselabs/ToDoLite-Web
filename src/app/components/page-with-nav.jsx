var React = require('react')
  , Router = require('react-router')
  , mui = require('material-ui')
  , _ = require('lodash');

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
        fetch('/lists', {
            credentials: 'include'
        })
          .then(function(res) {
              return res.json();
          })
          .then(function(jsonRes) {
              var routes = jsonRes.map(function(list) {
                  return {
                      "route": list._id,
                      "text": list.title
                  }
              });
              this.setState({lists: routes})
          }.bind(this))
          .catch(function(err) {
              console.log(err);
          }.bind(this));
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
        var header = <div className="logo">ToDoLite Web</div>;

        var menuItems = [
            { type: mui.MenuItem.Types.SUBHEADER, text: 'Lists' }
        ].concat(this.state.lists);

        return (
          <div>
              <Menu
                zDepth={0}
                header={header}
                menuItems={menuItems}
                onItemClick={this._onItemClick} />
              <TextField
                ref="textField"
                hintText="Add list"
                onChange={this.handleInputChange}/>
              <RaisedButton
                label="save"
                primary={true}
                onClick={this.addList}/>
          </div>

        )
    },
    _onItemClick(e, selectedIndex, menuItem) {
        if (selectedIndex === 0) {

        } else {
            this.context.router.transitionTo('home', {list_id: menuItem.route});
        }
    }
});

module.exports = AppLeftNav;