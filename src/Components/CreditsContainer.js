/*eslint-disable no-unused-vars*/
import React from "react";
import { Modal, Icon, List } from "antd";

class CreditsContainer extends React.Component {
    componentWillMount() {
        this.data = [
            "ReactJS - Built on top of it.",
            "Ant Design - For an awesome design and components.",
            "Github - For hosting & deploying this project.",
            "Netlify - For handling DNS & serving this project.",
            "DevDocs - For being an amazing reference!",
            "Freenode #reactjs - For clarifying me lots of things.",
            "Logo & Favicon designed by https://github.com/dee-y."
        ];
    }

    render() {
        const { visible, onCancel } = this.props;

        return (
            <Modal
                visible={visible}
                title="Credits &amp; Special Thanks to .."
                okText="Ok"
                onCancel={onCancel}
                onOk={onCancel}
            >
                <List
                    size="small"
                    bordered
                    dataSource={this.data}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />
            </Modal>
        );
    }
}

export default CreditsContainer;
