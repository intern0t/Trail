/*eslint-disable no-unused-vars*/
import React from 'react';
import { Modal, Upload, Icon, message } from 'antd';
const Dragger = Upload.Dragger;

class ImportTasks extends React.Component {
    onTaskImport = (importedTasks) => {
        // onImport()
        console.log(JSON.parse(importedTasks));
    };

    render() {
        const { visible, onCancel, onCreate, onImport } = this.props;

        const poops = {
            name: 'file',
            multiple: false,
            accept: '.json',
            action: '//jsonplaceholder.typicode.com/posts/',    // Random action URL, a placeholder.

            onChange(info) {
                // Not really required but for debugging purposes.
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    let fileReader = new FileReader();
                    fileReader.onload = function (fileLoadedEvent) {
                        let textFromFileLoaded = fileLoadedEvent.target.result;
                        onImport(textFromFileLoaded);
                    };
                    // `originFileObj`, most important.
                    fileReader.readAsText(info.fileList[0].originFileObj);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
                return false;
            },
        };

        return (
            <Modal
                visible={visible}
                title="Import Tasks"
                okText="Import"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Dragger {...poops}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="file-add" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Please upload only one, although this feature allows multiple file(s) selection.</p>
                </Dragger>
            </Modal>
        );
    }
}

export default ImportTasks;