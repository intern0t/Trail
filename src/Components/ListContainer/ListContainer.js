/*eslint-disable no-unused-vars*/
import React from 'react';
import { Layout, List, Avatar, Button, Spin, Icon, Tooltip, Row, Col, Tag } from 'antd';
const { Content } = Layout;

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
        const { tasks, emptytext, isComplete } = this.props;

        const tagColorFor = {
            critical: 'red',
            important: 'orange',
            priority: 'cyan',
            waiting: 'purple',
        };

        return (
            <List
                itemLayout="horizontal"
                locale={{ emptyText: emptytext }}
                dataSource={tasks}
                renderItem={task => (
                    <List.Item actions={[
                        <a><Tooltip title="Edit Task"><Icon type="edit" /></Tooltip></a>,
                        <a><Tooltip title="Delete Task"><Icon style={{ color: '#f44242' }} type="close" /></Tooltip></a>,
                        <a><Tooltip title="Complete Task"><Icon style={{ color: '#3e9b29' }} type="check" /></Tooltip></a>
                    ]}>
                        {(isComplete === true) ?
                            <List.Item.Meta
                                avatar={<Avatar icon="trophy" style={{ backgroundColor: '#e6f7ff', color: '#1890ff' }} />}
                                title={<a href="https://ant.design">{task.title}</a>}
                                description={task.description}
                            />
                            :
                            <List.Item.Meta
                                avatar={<Avatar icon="hourglass" style={{ backgroundColor: 'transparent', color: 'rgba(0, 0, 0, 0.15)' }} />}
                                title={<a href="https://ant.design">{task.title}</a>}
                                description={task.description}
                            />
                        }

                        <Col span={12}>{task.timestamp}</Col>
                        <Col span={12}><Tag color={tagColorFor[task.tagged]} style={{ textTransform: 'uppercase', fontSize: '11px', letterSpacing: '.5px' }}>{task.tagged}</Tag></Col>
                    </List.Item>
                )}
            />
        );
    }
}

export default ListContainer;