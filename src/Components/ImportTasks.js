import React from 'react';
import { Modal, Upload, Icon, message } from 'antd';
const Dragger = Upload.Dragger;

class ImportTasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: null,
        }
    }
    render() {
        const { visible, onCancel, onCreate } = this.props;

        const props = {
            name: 'file',
            multiple: false,
            accept: '.json',
            action: '//jsonplaceholder.typicode.com/posts/',

            onChange(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                    /** This is where the fuck up's occuring, in localhost! */
                    let reader = new FileReader();
                    const fileAsBlob = new Blob([info.fileList[0]], { type: 'text/json' });
                    reader.onload = function (e) {
                        console.log(e.target.result);
                    }
                    reader.readAsText(fileAsBlob);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
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
                <div className='fileContents'>
                    {this.state.src}
                </div>
                <Dragger {...props}>
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