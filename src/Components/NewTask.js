/*eslint-disable no-unused-vars*/
import React from 'react';
import { Modal, Form, Icon, Input, Button, Switch } from 'antd';
const FormItem = Form.Item;

class NewTask extends React.Component {
    newTaskFormHandleSubmit = (e) => {
        e.preventDefault();

        const { id, currentTime, newTaskID, onNewTaskCreated } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let addToValues = {
                    id: newTaskID,
                    timestamp: currentTime,
                    completed: values.switch,
                };
                delete values.switch;
                const newTaskContent = { ...values, ...addToValues };
                console.log(newTaskContent);
                onNewTaskCreated(newTaskContent);
            }
        });
    }

    newTaskFormSaveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    render() {
        const { visible, onCancel, form, currentTime, handleNewTask } = this.props;
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
                    <FormItem label="Task completion status">
                        {getFieldDecorator('switch', { valuePropName: 'checked' })(
                            <Switch />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default NewTask;