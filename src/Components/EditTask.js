/*eslint-disable no-unused-vars*/
import React from 'react';
import { Modal, Form, Icon, Input, Button, Switch, message, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class EditTask extends React.Component {
    constructor(props) {
        super(props);

        const { taskToEdit, form } = this.props;

        this.state = {
            visible: false,
            taskToEdit,
        };
    }

    tagChanged = (value) => {
        this.taggedAs = value;
    };

    editTaskSubmit = (e) => {
        e.preventDefault();

        const { id, currentTime, editTaskHandle } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { id, timestamp } = this.state.taskToEdit;
                const toEditValues = {
                    id,
                    timestamp,
                    completed: values.switch,
                    tagged: this.taggedAs || this.state.taskToEdit.tagged,
                    title: values.title,
                    description: values.description,

                };

                editTaskHandle(toEditValues);
            }
        });
    };

    componentDidMount() {
        const { taskToEdit, form } = this.props;

        if (taskToEdit) {
            form.setFieldsValue({
                'title': taskToEdit.title,
                'description': taskToEdit.description,
                'select': taskToEdit.tagged,
                'switch': taskToEdit.completed,
            });
        }
    }

    render() {
        /**
         *  Pass task to edit, edit the task, return the task to set the changes.
         */
        const { visible, onCancel, form, taskToEdit } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Modal
                visible={visible}
                title="Edit task"
                okText="Edit Task"
                onCancel={onCancel}
                onOk={this.editTaskSubmit}
            >
                {this.state.taskToEdit !== null ?
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
                                <Input
                                    type="textarea" />
                            )}
                        </FormItem>
                        <FormItem
                            label="Tag your task"
                            hasFeedback
                        >
                            {getFieldDecorator('select', {
                                rules: [
                                    { required: true, message: 'Please tag your task!' },
                                ],
                            })(
                                <Select
                                    placeholder="Please tag this task .."
                                    onChange={this.tagChanged}>
                                    <Option value="critical">Critical</Option>
                                    <Option value="important">Important</Option>
                                    <Option value="priority">Priority</Option>
                                    <Option value="waiting">Waiting</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="Task completion status">
                            {getFieldDecorator('switch', { valuePropName: 'checked' })(
                                <Switch />
                            )}
                        </FormItem>
                    </Form>
                    : "Couldn't quite pass the proper task to edit!"}
            </Modal>
        );
    }
}

export default EditTask;