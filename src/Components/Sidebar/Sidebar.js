import React from 'react';
import CreditsContainer from '../CreditsContainer';
import { Layout, Menu, Icon, Popconfirm } from 'antd';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: false,
            creditsContainerVisible: false,
        };
    }

    taskReset = () => {
        const { onReset } = this.props;
        onReset(true);
    }

    siderToggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    showCreditContainer = () => {
        this.setState(state => ({
            ...state, creditsContainerVisible: true
        }));
    };

    creditsContainerClose = () => {
        this.setState(state => ({
            ...state, creditsContainerVisible: false
        }));
    }

    exportEvent = () => {
        const { onExport } = this.props;
        onExport();
    }

    render() {
        const { onExport, } = this.props;

        return (
            <div>
                <Sider
                    width={200}
                    style={{ background: '#fff' }}
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    <Menu theme="light"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        // defaultOpenKeys={['sub1']}
                        style={{ height: '100%' }}>
                        <Menu.Item key="1">
                            <Icon type="home" />
                            <span>Home</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="hdd" /><span>Import/Export</span></span>}
                        >
                            <Menu.Item key="2">
                                <Popconfirm title="Would you like to import pre-exported Tasks file?" onConfirm={onExport} okText="Yes" cancelText="No">
                                    <span><Icon type="file-add" />Import</span>
                                </Popconfirm>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Popconfirm title="Would you like to export all your Tasks?" onConfirm={onExport} okText="Yes" cancelText="No">
                                    <span><Icon type="export" />Export</span>
                                </Popconfirm>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="4">
                            <Popconfirm placement="right" title="Are you sure you wish to reset all tasks?" onConfirm={this.taskReset} okText="Yes" cancelText="No">
                                <Icon type="rollback" />
                                <span>Reset</span>
                            </Popconfirm>
                        </Menu.Item>
                        <Menu.Item key="5" onClick={this.showCreditContainer}>
                            <Icon type="notification" />
                            <span>Credits</span>
                        </Menu.Item>
                        <Menu.Item key="6"
                            onClick={this.siderToggle}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            />
                            <span>{this.state.collapsed ? 'Unfold' : 'Fold'}</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <CreditsContainer
                    visible={this.state.creditsContainerVisible}
                    onOk={this.creditsContainerClose}
                    onCancel={this.creditsContainerClose} />
            </div>
        );
    }
}

export default Sidebar;
