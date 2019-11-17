import React, {Component} from "react";
import {Avatar, Row, Col} from "antd";
import {connect} from "react-redux";
import UserList from "./userList";
import axios from "axios";
class User extends Component {
    constructor(arg) {
        super(arg);
        let id = this.props.match.params.id;
        this.getData(id);

    }
    getData(id) {
        // let id = this.props.match.params.id;
        this.props.dispatch((dispatch) => {
            dispatch({
                type: "USER_UPDATA"
            });
            axios.get(`https://cnodejs.org/api/v1/user/${id}`)
                .then((res) => {
                    dispatch({
                        type: "USER_UPDATA_SUCC",
                        data: res.data
                    })
                })
                .catch((error) => {
                    dispatch({
                        type: "USER_UPDATA_ERROR",
                      
                    })
                })
        })
    }
    shouldComponentUpdate(nextProps, nextState){
        let id  = this.props.match.params.id;
        let nextId = nextProps.match.params.id;
        if(id !== nextId) {
            this.getData(nextId);
            return false;
        }
        return true;
    }
    render() {
        //注意引入的数据结构的格式
        let {loading, data} = this.props
        let {avatar_url, loginname, create_at, score, recent_topics,recent_replies} = data;
        console.log(this.props);
        // console.log("进来了呀");
        // console.log(create_at);
        // console.log(avatar_url);
        // console.log(loginname);
        // console.log(score);
        // console.log(recent_replies);
        // console.log(recent_topics);
        return (<div className="wrap">
            <Avatar src={avatar_url} className= "userAvatar"/>
            <Row className="userInfo">
                <Col md={8}>
                    用户名 : <a>{loginname}</a>;
                </Col>
                <Col md={8}>
                    积分 : <a>{score}</a>;
                </Col>
                <Col md={8}>
                   
                    注册时间 : <a>{create_at.split("T")[0]}</a>;
                </Col>
            </Row>
            <UserList 
                loading = {loading}
                title = "最近创建的话题"
                data = {recent_topics}
            />
            <UserList 
                loading = {loading}
                title = "最近回复的话题"
                data = {recent_replies}
            />
        </div>);
    }
}

export default connect(state => (state.user))(User);