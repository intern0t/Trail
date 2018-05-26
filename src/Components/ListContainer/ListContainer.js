import React from 'react';
import { List, Avatar, Button, Spin, Icon, Tooltip } from 'antd';
// import reqwest from 'reqwest';

// const fakeDataUrl = 'http://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
const fakeData = { 
    "tasks": [
        { "gender": "male", "name": { "title": "mr", "first": "ümit", "last": "abadan" }, "email": "ümit.abadan@example.com", "nat": "TR" }, 
        { "gender": "female", "name": { "title": "ms", "first": "alicia", "last": "campos" }, "email": "alicia.campos@example.com", "nat": "ES" }, 
        { "gender": "female", "name": { "title": "miss", "first": "ece", "last": "keçeci" }, "email": "ece.keçeci@example.com", "nat": "TR" }, 
        { "gender": "female", "name": { "title": "madame", "first": "margot", "last": "henry" }, "email": "margot.henry@example.com", "nat": "CH" }, 
        { "gender": "male", "name": { "title": "mr", "first": "corey", "last": "jennings" }, "email": "corey.jennings@example.com", "nat": "IE" }
    ] 
};

class ListContainer extends React.Component {
    state = {
        loading: false,
        loadingMore: false,
        showLoadingMore: true,
        data: [],
    }
    state = {
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        data: [],
    }
    componentDidMount() {
        this.setState({
            loading: false,
            data: fakeData.tasks,
        });
        // fetch(fakeDataUrl)
        //     .then(result => {
        //         this.setState({
        //             loading: false,
        //             data: result.results,
        //         });

        //         console.log(result.results);
        //     })
        //     .catch(error => error);
    }
    // getData = () => {

    //     // .then(result => callback(result));

    //     // reqwest({
    //     //     url: fakeDataUrl,
    //     //     type: 'json',
    //     //     method: 'get',
    //     //     contentType: 'application/json',
    //     //     success: (res) => {
    //     //         callback(res);
    //     //     },
    //     // });
    // }
    onLoadMore = () => {
        this.setState({
            loadingMore: true,
        });
        this.getData((res) => {
            const data = this.state.data.concat(res.results);
            this.setState({
                data,
                loadingMore: false,
            }, () => {
                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
            });
        });
    }
    render() {
        const { loading, loadingMore, showLoadingMore, data } = this.state;
        const loadMore = showLoadingMore ? (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
                {loadingMore && <Spin />}
                {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
            </div>
        ) : null;
        return (
            <List
                className="demo-loadmore-list"
                loading={loading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={data}
                renderItem={item => (
                    <List.Item actions={[
                        <a><Tooltip title="Edit Task"><Icon type="edit" /></Tooltip></a>, 
                        <a><Tooltip title="Delete Task"><Icon style={{ color: '#f44242' }} type="close" /></Tooltip></a>, 
                        <a><Tooltip title="Complete Task"><Icon style={{ color: '#3e9b29' }} type="check" /></Tooltip></a>
                    ]}>
                        {/* <Icon type="clock-circle-o" /> */}
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<a href="https://ant.design">{item.name.first} {item.name.last}</a>}
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        />
                        {/* <div>Test Content, can remove it.</div> */}
                    </List.Item>
                )}
            />
        );
    }
}

export default ListContainer;