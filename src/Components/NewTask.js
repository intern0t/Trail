/*eslint-disable no-unused-vars*/
import React from 'react';
import { Modal, Form, Icon, Input, Button, Checkbox, Radio } from 'antd';
const FormItem = Form.Item;

class NewTask extends React.Component {
    state = {
        Tasks: [],
    };

    componentDidMount() {
        const { currentLocalTime } = this.props;
        console.log(currentLocalTime);
    }

    newTaskFormHandleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    
    newTaskFormSaveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    render() {
        const { visible, onCancel, form, currentLocalTime } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Modal
                visible={visible}
                title="Add a new task"
                okText="Add Task"
                onCancel={onCancel}
                onOk={this.newTaskFormHandleSubmit}
            >
                <Form
                    layout="vertical"
                >
                    <FormItem label="Title">
                        {getFieldDecorator('title', {
                            rules: [
                                { required: true, message: 'Please enter the title for your task!' }
                            ],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Description">
                        {getFieldDecorator('description', {
                            rules: [{ required: true, message: 'Please describe your task.' }],
                        })(
                            <Input type="textarea" />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default NewTask;