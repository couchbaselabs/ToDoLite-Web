var React = require('react')
  , Router = require('react-router')
  , RouteHandler = Router.RouteHandler
  , mui = require('material-ui')
  , StyleResizable = mui.Mixins.StyleResizable
  , AppLeftNav = require('./../page-with-nav.jsx')
  , ActionAdd = require('./../svg-icons/action-add.jsx')
  , ActionDelete = require('./../svg-icons/action-delete.jsx');

var {
  TextField,
  RaisedButton,
  FlatButton,
  FontIcon,
  Checkbox,
  FloatingActionButton
  } = mui;

var requireAuth = (Component) => {
    return class Authenticated extends React.Component {
        static willTransitionTo(transition) {
            //if (!auth.loggedIn()) {
            //    transition.redirect('/login', {}, {'nextPath' : transition.path});
            //}
        }
        render () {
            return <Component {...this.props}/>
        }
    }
};

var HomePage = requireAuth(React.createClass({

    mixins: [StyleResizable, Router.Navigation],

    getInitialState() {
        return {
            tasks: [],
            newTask: {}
        }
    },

    componentDidMount() {
        var params = this.context.router.getCurrentParams();
        fetch('/list/' + params.list_id, {
            credentials: 'include'
        })
          .then(function(res) {
              return res.json();
          })
          .then(function(jsonRes) {
              this.setState({
                  tasks: jsonRes
              });
          }.bind(this))
    },

    handleInputChange() {
        this.setState({
            newTask: {
                created_at: new Date(),
                list_id: this.context.router.getCurrentParams().list_id,
                title: this.refs.textField.getValue(),
                type: 'task'
            }
        })
    },

    addTask() {
        console.log(this.state.newTask)
        fetch('/newtask', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.newTask),
            credentials: 'include'
        })
          .then(function(res) {
              console.log(res);
          })
          .catch(function(err) {
              console.log(err);
          })
    },

    render() {
        var taskItems = this.state.tasks.map(function(task) {
            return (
              <div
                style={{
                    margin: '20px 0'
                }}>
                  <div
                    style={{
                        display: 'inline-block'
                    }}>
                      {task.title}
                  </div>
                  <FlatButton
                    style={{
                        float: 'right'
                    }}>
                      <ActionDelete
                        style={{
                            'vertical-align': 'middle'
                        }} />
                      <span className="mui-flat-button-label">Delete</span>
                  </FlatButton>
                  <div
                    style={{
                        'vertical-align': 'middle',
                        display: 'inline-block',
                        float: 'right'
                    }}>
                      <Checkbox
                        name="checked"
                        value="checked"
                        defaultChecked={false} />
                  </div>
              </div>
            );
        });

        return (
          <div>
              <div className="mui-app-content-canvas page-with-nav">
                  <div className="page-with-nav-secondary-nav">
                      <AppLeftNav />
                  </div>
                  <div className="page-with-nav-content">
                      {taskItems}
                      <div>
                          <TextField
                            className="myclass"
                            ref="textField"
                            hintText="Add task"
                            onChange={this.handleInputChange}/>
                          <FloatingActionButton
                            primary={true}
                            onClick={this.addTask}
                            mini={true}>
                              <ActionAdd />
                          </FloatingActionButton>
                      </div>

                  </div>
              </div>
          </div>
        )
    }
}));

module.exports = HomePage;

function pretendRequest(email, pass, cb) {
    setTimeout(() => {
        if (email === 'joe@example.com' && pass === 'password1') {
            cb({
                authenticated: true,
                token: Math.random().toString(36).substring(7)
            });
        } else {
            cb({authenticated: false});
        }
    }, 0);
}