import React from 'react';
import { Layout, Button } from 'antd';
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

    /* After the component is mounted, loaded. */
    componentDidMount() {
        this.formattedTime = setInterval(() => this.tick(), 1000);
    }

    /* When the Timer component isn't initialized, it's not use keeping the time. 
        this.formattedTime seems to be used in order to create a handle on the tick interval.
    */
    componentWillUnmount() {
        clearInterval(this.formattedTime);
    }

    tick = () => {
        this.setState({
            currentLocalTime: new Date().toLocaleTimeString(),
        });
    }

    render = () => (
        <Content style={{ padding: '30px', textAlign: 'center' }}>
             <Button type="dashed" icon="plus" size="large">
                {this.state.currentLocalTime}
            </Button>
        </Content>
    );
}

export default Timer;