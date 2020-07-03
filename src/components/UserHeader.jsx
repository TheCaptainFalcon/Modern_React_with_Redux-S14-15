import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    // componentDidMount(){
    //     this.props.fetchUser(this.props.userId);
    // }

    render() { 
        // Can use ownProps in mapStateToProps to reference this
        // const user = this.props.users.find((user) => user.id === this.props.userId);

        const { user } = this.props

        if(!user) {
            return null;
        }

        return (  
            <div className='header'>
                {user.name}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { user: state.users.find(user => user.id === ownProps.userId) };
}
 
export default connect(mapStateToProps,)(UserHeader);