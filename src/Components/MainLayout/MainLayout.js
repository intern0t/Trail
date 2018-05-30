/*eslint-disable no-unused-vars*/
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ListContainer from '../ListContainer/ListContainer';
import Timer from '../Timer';
import NewTask from '../NewTask';
import { Layout, Icon, Divider, Button, Form, Tooltip, message } from 'antd';
import EditTask from '../EditTask';
const { Content, Footer } = Layout;

class MainLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Tasks: [],
            toEditTask: null,
            newTaskFormVisible: false,
            editTaskFormVisible: false,
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

    /** Edit a task */
    editTaskVisibleHandle = (toHandleTask) => {
        this.setState(state => ({
            ...state, editTaskFormVisible: true
        }));
    };

    editTaskFormHandleCancel = () => {
        this.setState(state => ({
            ...state, editTaskFormVisible: false
        }));
    }

    showNewEditForm = (_toEditTask) => {
        const newUpdates = { editTaskFormVisible: true, toEditTask: _toEditTask };
        this.setState(state => ({
            ...state, newUpdates
        }));
    }

    onTaskEdited = (_task) => {
        // Get the edited task and find the ID that the task resides in our Task array.
        const editedTask = { ...this.state.Tasks.filter(task => task.id === _task.id), ..._task };
        // Get task's position.
        const taskPositionInTasks = this.state.Tasks.findIndex(task => task.id === _task.id);

        // Duplicate our Tasks.
        const newTasks = this.state.Tasks;
        // Replace our old task with a newly edited one.
        newTasks.splice(taskPositionInTasks, 1, editedTask);

        // Set the state.
        this.setState(state => ({
            Tasks: newTasks,
            editTaskFormVisible: false,
        }));

        /** Set localStorage right away! */
        localStorage.setItem("Tasks", JSON.stringify(this.state.Tasks));

        message.info("Successfully edited the task.");
    }

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

    /** Editing a task using callback. */
    taskEditHandle = (taskID) => {
        const toEditTask = this.state.Tasks.filter(task => task.id === taskID)[0];
        const updatedEditState = { editTaskFormVisible: true, toEditTask, }
        this.setState(state => ({
            ...state, ...updatedEditState
        }))
    }

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
        const WrappedNewTaskForm = Form.create()(NewTask);
        const WrappedEdiTaskForm = Form.create()(EditTask);
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
                                <WrappedNewTaskForm
                                    visible={this.state.newTaskFormVisible}
                                    onCancel={this.newTaskFormHandleCancel}
                                    newTaskID={this.generateNewTimeStamp()}
                                    onNewTaskCreated={this.newTaskCreated}
                                    currentTime={this.loggedTime}
                                />
                                <WrappedEdiTaskForm
                                    visible={this.state.editTaskFormVisible}
                                    onCancel={this.editTaskFormHandleCancel}
                                    taskToEdit={this.state.toEditTask}
                                    editTaskHandle={this.onTaskEdited}
                                />
                                <Divider orientation="left"><Icon type="profile" /> Your Recorded Tasks</Divider>
                                <ListContainer
                                    tasks={Tasks.filter(task => task.completed === false)}
                                    isComplete={false}
                                    onDelete={this.taskDelete}
                                    onComplete={this.taskComplete}
                                    onEdit={this.taskEditHandle}
                                    emptytext='No recorded tasks yet! Record one by pressing Add New Task above.' />
                                <Divider orientation="left"><Icon type="book" /> Completed Tasks</Divider>
                                <ListContainer
                                    tasks={Tasks.filter(task => task.completed === true)}
                                    isComplete={true}
                                    onDelete={this.taskDelete}
                                    onComplete={this.taskComplete}
                                    onEdit={this.taskEditHandle}
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