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
                                {/* <img alt="Icons8 Logo" width="40px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAm3SURBVHhe7Vx7cFRXGY/vxzhqZ3zrjK9x2nGsjo/xD8cRH9nNEqhSBNFOHfuw+EAnaqttrRpKSe7dBBIobR3SqlAoUJ6tESiFIUCz92w2CRAIJKRJeL8SCCEBmpTH8fud+53NbjjZLMnyx96b38w3e/ees9/J98t3znfeOWMYwxgygVCJ+HLQEi8GLaeTPvuCtlMVCjvjONnfyC+NfJqIuStoR77Fr5IQsJ1f5FnOm3m2kIlCRF5BGmfzJ/Is8TcQESfGEpUTC+vey8lEnhiv02e91Cbrj70hmzsvy/mbj7gk2s7FQGn0s25unyFoRaeDhFA4Kh9a3iR/PK9Ok1iOdBBJnnkU78o2HZYHu68lyWOrW7QnhpVCL2OC9dotOVK+hb/mjCusel+e7ZwBAS/UnFaE7GjtJTIVIZdy7boPBG3xANLvq2iQrV1XryNwS/N5JtBpYLXew3jLuZ0IaYah1I61U5X7Jt6HLGcq3k3/154kUmYsalSkhIpFPv3uFTwvipxMyqMFVVnptUWvKsxrUF5EURNG5pdGdXXrCZRGPkLeNwffn9xyNImUJ15uY1KcX2kPrad2LzGPlpazV7TOPrdEj4GM+xMMLFi6X7aevSr/sqKZyRGPUzv3Ap5X1HYkkTJzbaubJ+z8Gp/jqX1MTE+UHW29rM9p4yK9BaquSxJJernhrDKY3r9ERi/E8+Dqee/C3SpPwIp8hzxLRd/XydMS82hZsMWNxPTPWMpFZj/Q5uWGxRfwTIYtgoHLY26QWLf7jPaY1VS1f4/nR1ceiBPyalM3Eyy6QvM3vIvyNOL7ZgoWOo+WfafflNOerHfzhyMTVeHZDjL8MUWQ5Vwj8mbmWdEZ+P4bCgx7T/bLP1BVZoIeyQ1Xf4I8sR9Rd83OM3Jz03n506dcQkgeZ30l+P7wigGSIYjIj65yuzD0z6grLJRvVX9ANmNqYeM7ibgLICS/hAIGkRgsqv4eEXmYSdEGn0JwwW/Iw/6RnIaA4Ajq4rwb6RNmO58kks/jPYJLpP2CfGV/t/zd4n1ufiovUBT5EvJmPeBRMApeVL6JRwmWMx+jBHreTu3ZJfqs1tVbgwguICJaiNgjlH8u+oecpBCwnDvgqYqwBKG8nZ4aCyd64DNbj7KR4kVOHhVCRdEvoj0lIg9QtY7R5xMT59R9iJOzF2RMAB3iry+sewe+E4EVIA5dD/YU1ZaNwQDyrgeZJHQjIvDAceVVH6SqtcN957R4wktuFqgaHQRRU+fHJwAKOCnnB1bsc9SWvZ2/XodQYfT9aqhGVZG8eBmJQ8SfpM8uIv4a/XN6VHW1xDZ6PwtVmH/qHcBIELci1qHbuy2cZESwKHIbyKB89SQD01fpCEilzjeGgKwu+wEiYJy9/iAbKXZxUhLo/Xcpwm5KJOSHc2NqeIdx8Or6Trn1QI/cdaJP7u+4rPp5LWeuyN3H++WGxnOydMMhOak8pn5HJJ4gfZ9h1dmNoBW5L5EUIvQ5TlKAoVQl1+r0O8tqFdnoMLedu35qKpU0nOhP6PuJXamah6wCEVRERvXS58682bUf59c5NLSaFLJFtyauYvtxNfVkIiddOUBeedfTOxWJFPnv5KKyH4OHUWr4hqEcGYpxbiONWU2EjEQWR05qL1zHxXkLIdu5H+SR9ymvM5EwGokdvqQJPM5FegchK/JVagf7YOB/qs0zyKMVBBfop2DSz8V6A6jGmBWBcbNo0G8yPhOCdlB5oC3e4KK9gbxw9Ocw7CcL6kYdLFIJujbKAy2nk4v2BigKx2DYEnHKaHim5LW2C9oD93LR2Q+MMGDUj8pispmqmMnwTMnAqMdZw8VnPygiFsAoLAaZjM6kxEc9tvg7F5/9IAKXwqjnnZsTeRNFd6SH2kOTlaCuyx4Yte31XqPRmZL4LgQaD09dufJtXHz2A51aGLbreJ/R8EzJXwcWkWwu2hsgj7gIw9BHMxmeCcECOjYgoaOOhSYu2htwvUIYDc+EYObmt7xfhv5Z87hY74C8Qk2s3qwO9D+rjsXbPr0c6ilQm6SmrfRkaCZl475utcZM/6QreZaTy0V6C2RYOwiMHTHvoBqpYOZlMs9EUxmzuTjvgTwwCiPRzTARMRKBN99T4W4ywnKAp7otg6Gn7dfUdxrJuFFp67oqC5a40/foY3qy3UsEEag2AD29NXmj5EilZP0hDhqiI2RHP8XFeBfUkb4HBmPDt4mQG5HKPV0Ss9mYMKXPb3MR3kbQin4FBN79zE4jKekKdrDq7W1BO/oQq/c+1Gy0Jc7B8Poh9jKnI8tqTnPQEE16r41vgPk5GD/Ubvp0JL7uWxz5Gav1D4LFYhqMx05UEznpyKQyt8+XX1LzMVbrH7gnikQPAgA6wCaChpPx2NVKv/dd9dWgdlAdWxh87iNdmTyv1q3CCTscfAVstwUB2O6GAzAmklKJbgOx7Y1V+g8UTARIGEkweSp+5sOpYHX+gz7/hj4hhmQmooaS6KGLikDqRJ+fMtd5D6v0F9w+IXbcC7ly0BGudGT6v/dqL/wlq/Qf9L7B+59tkO0GklIJDtwoL7TEIZxUYpX+gnvcwT1cU9nQZSRqKAHh91Y0sBcO7Ln2HQKW80eQ8OCyJiNRqeS/RDoTeC5UtOPDrNJfwPEGNaMSjqoNQSaiUgmIV1XZFs+ySv+BjF8GEhZuO2YkKZWIgxdlPpYxbedqXtj5Gqv0F4jAAAhEMDGRNJzM2ehOrJJsZ5X+AqIoGd+L8TF22ZtISiVNHZfjh3gCdnQKq/UXqAquBwHonphIGk4wosHvsTaSeOOHb0CRdCYImPfqESNBwwlmqactcGepceyV1foHqHowfvCJ8xuRBC/cxmr9g9xwzTdg/APPJd8NcyOCNeIJJTUqIvtusvX7ReKjIHAKBQMTOenKn5e716XgqihW7Q9gURyGY7reREy6ohecqGu0llX7A+75EVwuNrrtb7hsAnow08Oq/QNqu0a9ARPtoPJAS/SwWv8AU1MwvvboyNeMsclSeaAtLrNa/2C0nWkIRjIugc4pVusfUMP/CIzH7ZMmctIRXP3EBNaxWv8AF1CgD3fHnBp135WJoOFEX+RDUsZq/QUa0lWCgOLKdiNBqQQBZHK5u2aMG91Ypb/g3tgh+vRFYyaiTILgEe9E204Vq/MniEB1UQ82jT/vDH+qEzPZemZabWQPV9/KqvwLIrHYJUTIGYsb1cWM2EuDWRfM/9XQ86q6TjlzXaucWFrjep7XLhkbLbD4DlI0kUMJAg+NPFZ57mRSJqCuQHa3Bm8kr2wlsvpRTdWz5fwvWCweDpVUf56zj2EMvkVOzv8Bx5skSNcprgUAAAAASUVORK5CYII=" /></a> */}
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
