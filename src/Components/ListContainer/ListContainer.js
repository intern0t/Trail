/*eslint-disable no-unused-vars*/
import React from 'react';
import { List, Avatar, Button, Spin, Icon, Tooltip } from 'antd';

const fakeData = {
    "tasks": [
        { "gender": "male", "name": { "title": "mr", "first": "ümit", "last": "abadan" }, "email": "ümit.abadan@example.com", "nat": "TR" },
        { "gender": "female", "name": { "title": "ms", "first": "alicia", "last": "campos" }, "email": "alicia.campos@example.com", "nat": "ES" },
        { "gender": "female", "name": { "title": "miss", "first": "ece", "last": "keçeci" }, "email": "ece.keçeci@example.com", "nat": "TR" },
        { "gender": "female", "name": { "title": "madame", "first": "margot", "last": "henry" }, "email": "margot.henry@example.com", "nat": "CH" },
        { "gender": "male", "name": { "title": "mr", "first": "corey", "last": "jennings" }, "email": "corey.jennings@example.com", "nat": "IE" }
    ]
};

class ListContainer extends React.Component {
    state = {
        Tasks: [],
    };

    componentDidMount() {
        const { tasks } = this.props;

        this.setState({
            Tasks: tasks,
        });
    }
    render() {
        const { tasks } = this.props;

        return (
            <List
                itemLayout="horizontal"
                locale={{ emptyText: 'No recorded tasks yet! Record one by pressing Add New Task above.' }}
                dataSource={tasks}
                renderItem={task => (
                    <List.Item actions={[
                        <a><Tooltip title="Edit Task"><Icon type="edit" /></Tooltip></a>,
                        <a><Tooltip title="Delete Task"><Icon style={{ color: '#f44242' }} type="close" /></Tooltip></a>,
                        <a><Tooltip title="Complete Task"><Icon style={{ color: '#3e9b29' }} type="check" /></Tooltip></a>
                    ]}>
                        <List.Item.Meta
                            avatar={<Avatar icon="check-square-o" />}
                            title={<a href="https://ant.design">{task.title}</a>}
                            description={task.description}
                        />
                        <div>{task.timestamp}</div>
                    </List.Item>
                )}
            />
        );
    }
}

export default ListContainer;