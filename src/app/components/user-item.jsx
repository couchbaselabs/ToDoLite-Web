var React = require('react')
  , mui = require('material-ui')
  , api = require('./../utils/api');

var {
  Checkbox
  } = mui;

class UserItem extends React.Component {
  _onShareList(e, checked) {
    console.log(checked);
    if (checked) {
      this.props.list.members = this.props.list.members.concat(['p:' + this.props.username]);
      api.updateDoc(this.props.list)
        .then((res) => {});
    } else {
      this.props.list.members = this.props.list.members
        .filter((item) => {
          if (item == `p:${this.props.username}`) {
            return false;
          }
          return true;
        });
      api.updateDoc(this.props.list)
        .then((res) => {});
    }
  }

  render() {
    return (
      <Checkbox
        name="checked"
        value="checked"
        onCheck={this._onShareList.bind(this)}
        defaultChecked={this.props.list.members.indexOf('p:' + this.props.username) > -1} />
    );
  }
}

module.exports = UserItem;