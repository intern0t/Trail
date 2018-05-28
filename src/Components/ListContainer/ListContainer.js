/*eslint-disable no-unused-vars*/
import React from 'react';
import { Layout, List, Avatar, Button, Spin, Icon, Tooltip, Row, Col, Tag, Popconfirm, message } from 'antd';
const { Content } = Layout;

class ListContainer extends React.Component {
    state = {
        Tasks: [],
        visible: false,
        condition: true, // Whether meet the condition, if not show popconfirm.
    };

    componentDidMount() {
        const { tasks } = this.props;

        this.setState({
            Tasks: tasks,
        });
    }

    confirm() {
        message.info('Click on Yes.');
    }

    render() {
        const { tasks, emptytext, isComplete } = this.props;

        const tagColorFor = {
            critical: 'red',
            important: 'orange',
            priority: 'cyan',
            waiting: 'purple',
        };

        const confirmTexts = {
            deleteTask: 'Are you sure delete this task?',
            completeTask: 'Are you sure to mark this task as completed?'
        };

        return (
            <List
                itemLayout="horizontal"
                locale={{ emptyText: emptytext }}
                dataSource={tasks}
                renderItem={task => (
                    <List.Item actions={[
                        <a>
                            <Tooltip title="Edit Task">
                                <Icon type="edit" />
                            </Tooltip>
                        </a>,
                        <Popconfirm
                            placement="bottomRight"
                            title={confirmTexts.deleteTask}
                            onConfirm={this.confirm}
                            okText="Yes"
                            cancelText="No">
                            <a>
                                <Tooltip title="Delete Task"><Icon style={{ color: '#f44242' }} type="close" /></Tooltip>
                            </a>
                        </Popconfirm>,
                        <Popconfirm
                            placement="bottomRight"
                            title={confirmTexts.completeTask}
                            onConfirm={this.confirm}
                            okText="Yes"
                            cancelText="No">
                            <a>
                                <Tooltip title="Complete Task"><Icon style={{ color: '#3e9b29' }} type="check" /></Tooltip>
                            </a>
                        </Popconfirm>
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