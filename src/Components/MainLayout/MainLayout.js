/*eslint-disable no-unused-vars*/
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ListContainer from '../ListContainer/ListContainer';
import Timer from '../Timer';
import NewTask from '../NewTask';
import { Layout, Icon, Divider, Button, Form, Tooltip, message } from 'antd';
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
        this.setState(state => ({
            ...state, newTaskFormVisible: false
        }));
    }
    showNewTaskForm = (timeData) => {
        this.setState(state => ({
            ...state, newTaskFormVisible: true
        }));


    }
    timeChanged = time => {
        this.loggedTime = time;
    };

    generateNewTimeStamp = () => {
        return (+ new Date().getTime());
    }

    /** Created a new task (trail) so lets add it to our Tasks[]. */
    newTaskCreated = (newTask) => {
        /** <task> is an object with { id, timestamp, title, description, status } */
        const newTaskList = this.state.Tasks.concat(newTask);
        newTaskList.sort();
        this.setState(state => ({
            ...state,
            Tasks: newTaskList,
            newTaskFormVisible: false,
        }));

        // Set localStorage <Tasks>
        localStorage.setItem("Tasks", JSON.stringify(newTaskList));
    };

    /** Clear all tasks using reset button on sidebar. */
    resetAllTasks = () => {
        // Going an easy way on this one. haha
        this.setState(state => ({
            ...state, Tasks: [],
        }));

        // Empty localStorage <Tasks> values as well.
        localStorage.removeItem("Tasks");
        message.info("Successfully reset your tasks..");
    };

    /** Deleting a task from our Tasks list. */
    taskDelete = (taskID) => {
        const newTaskListAfterDeleting = this.state.Tasks.filter(task => task.id !== taskID);
        newTaskListAfterDeleting.sort();
        this.setState(state => ({ ...state, Tasks: newTaskListAfterDeleting }));

        localStorage.setItem("Tasks", JSON.stringify(newTaskListAfterDeleting));
        message.warning("Deleted a task!");
    };

    taskComplete = (taskID, taskCompletionState) => {
        const newTaskList = this.state.Tasks.map(task => task.id === taskID ? { ...task, completed: !task.completed } : task);
        newTaskList.sort();
        this.setState(state => ({ ...state, Tasks: newTaskList }));
        /** Set localStorage right away! */
        localStorage.setItem("Tasks", JSON.stringify(newTaskList));
        
        (taskCompletionState !== false) ? 
            message.error("Marked the task as incomplete.")
            :
            message.success("Marked the task as complete!");
    };

    componentWillMount() {
        // Load our tasks from storage.
        /** Let's compare which version of Tasks is ahead. */
        if (localStorage.getItem("Tasks")) {
            const lsTasks = JSON.parse(localStorage.getItem("Tasks"));

            if (lsTasks.length > this.state.Tasks.length) {
                // Seems like localStorage has more tasks on it, load that.
                this.setState(state => ({ ...state, Tasks: lsTasks }));
            } else {
                /** Set our tasks to localStorage. */
                localStorage.setItem("Tasks", this.state.Tasks);
            }
        } else {
            /** Start off normally with empty Tasks list. */
        }
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
                                <a href="https://github.com/intern0t/Trail" style={{ color: 'rgba(0, 0, 0, 0.55)', fontSize: '40px', opacity: '.8' }}>
                                    <Icon type="environment-o" />
                                </a>
                            </Tooltip>
                        </span>
                    </Content>
                    <Content style={{ padding: '0 50px', marginTop: '50px' }}>
                        <Layout style={{ padding: '24px 0', background: '#fff' }}>
                            <Sidebar
                                onReset={this.resetAllTasks} />
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
                                    newTaskID={this.generateNewTimeStamp()}
                                    onNewTaskCreated={this.newTaskCreated}
                                    currentTime={this.loggedTime}
                                />
                                <Divider orientation="left"><Icon type="profile" /> Your Recorded Tasks</Divider>
                                <ListContainer
                                    tasks={Tasks.filter(task => task.completed === false)}
                                    isComplete={false}
                                    onDelete={this.taskDelete}
                                    onComplete={this.taskComplete}
                                    emptytext='No recorded tasks yet! Record one by pressing Add New Task above.' />

                                <Divider orientation="left"><Icon type="book" /> Completed Tasks</Divider>
                                <ListContainer
                                    tasks={Tasks.filter(task => task.completed === true)}
                                    isComplete={true}
                                    onDelete={this.taskDelete}
                                    onComplete={this.taskComplete}
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