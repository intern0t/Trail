/*eslint-disable no-unused-vars*/
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ListContainer from '../ListContainer/ListContainer';
import Timer from '../Timer';
import NewTask from '../NewTask';
import { Layout, Icon, Divider, Button, Form, Tooltip } from 'antd';
const { Content, Footer } = Layout;

class MainLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Tasks: [],
            // currentTime: "Initial Time",
            newTaskFormVisible: false,
        };
    }

    newTaskFormHandleCancel = () => {
        this.setState({
            newTaskFormVisible: false
        });
    }
    showNewTaskForm = (timeData) => {
        this.setState({
            newTaskFormVisible: true
        });
    }

    timeChanged = time => {
        this.loggedTime = time;
    };

    /** Created a new task (trail) so lets add it to our Tasks[]. */
    newTaskCreated = (newTask) => {
        /** <task> is an object with { id, timestamp, title, description, status } */
        const newTaskList = this.state.Tasks.concat(newTask);
        this.setState({
            Tasks: newTaskList,
            newTaskFormVisible: false,
        });

        // Set localStorage <Tasks>
        localStorage.setItem("Tasks", JSON.stringify(newTaskList));
    };

    componentDidMount() {
        // Load our tasks from storage.
        if (localStorage.getItem("Tasks")) {
            this.setState({
                Tasks: JSON.parse(localStorage.getItem("Tasks"))
            });
        } else { }
    }

    render() {
        const WrappedTaskForm = Form.create()(NewTask);
        const { Tasks } = this.state;
        return (
            <div>
                <Layout>
                    <Content style={{ textAlign: 'center', marginTop: '30px' }}>
                        <span mode="inline" style={{ width: '50px' }}>
                            <Tooltip placement="bottom" title="Trail">
                                <a href="https://github.com/intern0t/Trail" style={{ fontSize: '40px', opacity: '.8' }}><Icon type="environment-o" /></a>
                            </Tooltip>
                        </span>
                    </Content>
                    <Content style={{ padding: '0 50px', marginTop: '50px' }}>
                        <Layout style={{ padding: '24px 0', background: '#fff' }}>
                            <Sidebar />
                            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                                {/* Time */}
                                <Timer
                                    onTimeChange={this.timeChanged}
                                />
                                <center>
                                    <Button
                                        type="dashed"
                                        icon="plus"
                                        onClick={this.showNewTaskForm}>Add new task</Button>
                                </center>
                                <WrappedTaskForm
                                    visible={this.state.newTaskFormVisible}
                                    onCancel={this.newTaskFormHandleCancel}
                                    newTaskID={this.state.Tasks.length + 1}
                                    onNewTaskCreated={this.newTaskCreated}
                                    currentTime={this.loggedTime}
                                />
                                <Divider orientation="left"><Icon type="profile" /> Your Recorded Tasks</Divider>
                                <ListContainer
                                    tasks={Tasks.filter(task => task.completed !== true)}
                                    isComplete={false}
                                    emptytext='No recorded tasks yet! Record one by pressing Add New Task above.' />

                                <Divider orientation="left"><Icon type="book" /> Completed Tasks</Divider>
                                <ListContainer
                                    tasks={Tasks.filter(task => task.completed === true)}
                                    isComplete={true}
                                    emptytext='No completed tasks yet!' />
                            </Content>
                        </Layout>
                    </Content>
                    <Footer style={{ textAlign: 'center', fontSize: '11px' }}>
                        Made with <Icon type="heart" /> in Virginia, USA. <br /><br />
                        Copyright © 2018, <a target="_blank" rel="noopener noreferrer" href="https://prashant.me">Prashant Shrestha</a>.
    			</Footer>
                </Layout>
            </div>
        );
    }
}

export default MainLayout;
