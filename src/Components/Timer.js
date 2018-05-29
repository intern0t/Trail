/*eslint-disable no-unused-vars*/
import React from 'react';
import { Layout, Icon, Button } from 'antd';
const { Content } = Layout;

/** 
 * Time Class
 */
class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentLocalTime: new Date().toLocaleTimeString(),
        }
    }

    ticker() {
        const { onTimeChange } = this.props;
        this.setState(state => ({
            ...state, currentLocalTime: new Date().toLocaleTimeString(),
        }));
        onTimeChange(this.state.currentLocalTime);
    }

    /* After the component is mounted, loaded. */
    componentDidMount() {
        this.formattedTime = setInterval(() => this.ticker(), 1000);
    }

    /* When the Timer component isn't initialized, it's not use keeping the time. 
        this.formattedTime seems to be used in order to create a handle on the tick interval.
    */
    componentWillUnmount() {
        clearInterval(this.formattedTime);
    }

    timeChanged() {
        this.props.onTimeChange(this.state.currentLocalTime);
    }

    render() {
        return (
            <Content style={{ padding: '0 30px', textAlign: 'center' }}>
                <h1 style={{ color: 'rgba(0, 0, 0, 0.65)', letterSpacing: '.5px' }}>
                    {this.state.currentLocalTime}
                </h1>
            </Content >
        );
    }
}

export default Timer;