import React from 'react';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Sidebar extends React.Component {
    render = () => (
        <Sider width={200} style={{ background: '#fff' }}>
            <div className="logo" />
            <Menu theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}>
                <Menu.Item key="1">
                    <Icon type="home" />
                    <span>Home</span>
                </Menu.Item>
                <SubMenu
                    key="sub1"
                    title={<span><Icon type="hdd" /><span>Import/Export</span></span>}
                    >
                    <Menu.Item key="2"><span><Icon type="file-add" /></span>Import</Menu.Item>
                    <Menu.Item key="3"><span><Icon type="export" /></span>Export</Menu.Item>
                </SubMenu>
                <Menu.Item key="4">
                    <Icon type="trophy" />
                    <span>Achievements</span>
                </Menu.Item>
                <Menu.Item key="5">
                    <Icon type="setting" />
                    <span>Customize</span>
                </Menu.Item>
                <Menu.Item key="6">
                    <Icon type="rollback" />
                    <span>Reset</span>
                </Menu.Item>
                <Menu.Item key="7">
                    <Icon type="notification" />
                    <span>Credits</span>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default Sidebar;
