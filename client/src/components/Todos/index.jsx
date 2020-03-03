import React, { Component, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import  getUsersAction  from '../../actions/getUsers';
import {Link, BrowserRouter as Router, Route } from 'react-router-dom'


export class index extends Component {
    constructor(props){
        super(props);
    }
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
                    <Link to={'/'}>
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


// export default function (props) {
//     const dispatch = useDispatch();
//     const state = useSelector(state=>{
//         console.log(state);
//            return  {
//                 status: state.appReducer.status,
//                 users: state.appReducer.users
//             }});
//     useEffect(() => {
//         dispatch(getUsersAction())
//     },[]);
//     const{status,users}=state;
//     return {
//         if (state.status==='loading'){
//            return <h2>Loadig</h2>}}
//
// }
