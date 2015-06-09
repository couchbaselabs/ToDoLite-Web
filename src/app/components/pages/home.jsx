var React = require('react')
  , Router = require('react-router')
  , RouteHandler = Router.RouteHandler
  , mui = require('material-ui')
  , StyleResizable = mui.Mixins.StyleResizable
  , Typography = mui.Styles.Typography
  , ActionAdd = require('./../svg-icons/action-add.jsx')
  , ActionDelete = require('./../svg-icons/action-delete.jsx')
  , ShareNav = require('./../share-nav.jsx')
  , api = require('./../../utils/api')
  , auth = require('./../../utils/auth');



var {
  TextField,
  RaisedButton,
  FlatButton,
  FontIcon,
  Checkbox,
  FloatingActionButton,
  Paper,
  ClearFix
  } = mui;

var requireAuth = (Component) => {
    return class Authenticated extends React.Component {
        static willTransitionTo(transition) {
            if (!auth.loggedIn()) {
                transition.redirect('/login', {}, {'nextPath' : transition.path});
            }
        }
        render () {
            return <Component {...this.props}/>
        }
    }
};

var HomePage = requireAuth(React.createClass({

    mixins: [StyleResizable, Router.Navigation],

    contextTypes: {
        muiTheme: React.PropTypes.object
    },

    getInitialState() {
        return {
            currentList: {},
            tasks: [],
            newTask: {}
        }
    },
    componentWillReceiveProps(nextProps) {
        var params = this.context.router.getCurrentParams();
        api.getTasksForList(params.list_id)
          .then((res) => {
              this.setState({
                  tasks: res
              })
          });
    },

    componentDidMount() {
        var params = this.context.router.getCurrentParams();
        api.getTasksForList(params.list_id)
          .then((res) => {
            this.setState({
                tasks: res
            })
        });
        api.getDocumentsWithIds([params.list_id])
          .then((res) => {
              this.setState({
                  currentList: res.rows[0].doc
              });
          });
    },

    handleInputChange() {
        this.setState({
            newTask: {
                created_at: new Date(),
                list_id: this.context.router.getCurrentParams().list_id,
                owner: 'p:emilie',
                title: this.refs.textField.getValue(),
                type: 'task'
            }
        })
    },

    addTask() {
        var tasks = this.state.tasks.concat([this.state.newTask]);
        this.setState({
            tasks: tasks,
            newTask: {}
        });
        this.refs.textField.setValue('');
        api.updateDocument(this.state.newTask)
          .then((res) => {
              console.log(res);
          });
    },

    getStyles: function() {
        var borderColor = this.context.muiTheme.palette.borderColor;
        return {
            desc: {
                borderBottom: 'solid 1px ' + borderColor,
                paddingTop: '8px',
                paddingBottom: '40px',
                marginBottom: '24px',
                //mui-font-style-subhead-1
                fontSize: '15px',
                letterSpacing: '0',
                lineHeight: '24px',
                color: Typography.textDarkBlack
            },
            ol: {
                fontSize: '13px',
                paddingLeft: '48px'
            },
            componentInfo: {
                borderTop: 'solid 1px ' + borderColor,
                paddingTop: '24px',
                marginTop: '24px'
            },
            componentInfoWhenFirstChild: {
                borderTop: 'none',
                marginTop: '0',
                paddingTop: '0'
            },
            headline: {
                //headline
                fontSize: '24px',
                lineHeight: '32px',
                padding: '16px',
                marginBottom: '12px',
                letterSpacing: '0',
                fontWeight: Typography.fontWeightNormal,
                color: Typography.textDarkBlack,
                display: 'inline-block'
            },
            clearfix: {
                padding: '24px 24px 24px 24px'
            },
            shareButton: {
                float: 'right',
                margin: '16px'
            },
            mainContent: {
                margin: '0 16px'
            },
            addButton: {
                display: 'inline-block',
                float: 'right'
            },
            addForm: {
                marginTop: '40px'
            },
            rowItem: {
                margin: '30px 0'
            }
        };
    },


    _handleDelete(index){
        console.log(index);
    },

    _completeTodo(e, checked) {
        console.log(e, checked);
    },

    render() {
        var styles = this.getStyles();

        var taskItems = this.state.tasks.map(function(task, i) {
            return (
              <div
                style={styles.rowItem}
                data-id={i}
                key={i}>
                  {task.title}
                  <FlatButton
                    style={{
                        float: 'right',
                        minWidth: 'none'
                    }}>
                      <ActionDelete
                        onClick={this._handleDelete}
                        style={{
                            'vertical-align': 'middle'
                        }} />
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
                        defaultChecked={task.checked}
                        onCheck={this._completeTodo}/>
                  </div>
              </div>
            );
        });

        var header = <h2 style={styles.headline}>Tasks</h2>

        return (
          <ClearFix>
              <div style={styles.clearfix}>

                  <Paper>
                      {header}

                      <RaisedButton
                        style={styles.shareButton}
                        label="Share List"
                        onClick={this._onRightIconButtonTouchTap}/>

                      <div style={styles.mainContent}>
                          {taskItems}
                          <div style={styles.addForm}>
                              <TextField
                                className="myclass"
                                ref="textField"
                                hintText="Add task"
                                onChange={this.handleInputChange}/>
                              <FloatingActionButton
                                style={styles.addButton}
                                primary={true}
                                onClick={this.addTask}
                                mini={true}>
                                  <ActionAdd />
                              </FloatingActionButton>
                          </div>
                      </div>
                  </Paper>
              </div>

              <ShareNav currentList={this.state.currentList} ref="rightNav" />
          </ClearFix>
        )
    },

    _onRightIconButtonTouchTap() {
        this.refs.rightNav.toggle();
    }
}));

module.exports = HomePage;