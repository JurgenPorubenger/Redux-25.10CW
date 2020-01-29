import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUsers as getUsersAction } from '../../actions/getUsers';

export class index extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }

    componentDidMount() {
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
            console.log(123)
            return data = users.map((el, idx) => {
                return (
                    <div style={{border: '1px solid'}}>
                        <h4>{el.id}</h4>
                        <h4>{el.title}</h4>
                    </div>
                )
            })
        }
        else {
            console.log('STATUS',status);

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
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
