import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUsers as getUsersAction } from '../../actions/getUsers';
import {Link, BrowserRouter as Router, Route } from 'react-router-dom'

export class index extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }
    handleClick(e, index){return   }
    componentDidMount() {
        console.log("THIS PROPS:"+this.props.getUsers);
        const {  getUsers } = this.props;
        getUsers();
    }
    render() {
        const { status, users } = this.props;
        console.log(status, users);
        let data;
        if(status === 'loading'){
            data = <h1>Loading</h1>
        }
        else if (status === 'success') {
            return data = users.map((el, idx) => {
                return (
                    <Link>
                        <div key={idx} style={{border: '1px solid'}}>
                            <h4>{el.id}</h4>
                            <h4>{el.title}</h4>
                        </div>
                    </Link>
                    )
            })
        }
        else {
            return(
                <div>
                    {'Error'}
                </div>
            )
        }
        return (
            <div>
                {data}
            </div>
        )
    }
}

index.defaultProps = {
    users: []
};

const mapStateToProps = (state) => ({
    status: state.appReducer.status,
    users: state.appReducer.users
});

const mapDispatchToProps = dispatch => {
    return {getUsers: ()=>{ dispatch(getUsersAction()) } }
};

export default connect(mapStateToProps, mapDispatchToProps)(index)
