import React, {Component} from 'react';
import {Container} from "@material-ui/core";
import LoginCard from "../components/LoginCard";
import {authParams} from "../redux";
import {fetchData, setAuthData} from "../utils/AuxFns";

interface Props {
    history: any
    location: any
}

interface State {
    loading: boolean
}

class Login extends Component<Props, State> {
    state: State = {
        loading: false
    }

    authorize = async (params: authParams) => {
        try {
            let response = await fetchData('post', 'authorize', params)
            if (response.token) {
                setAuthData(response.token, params.login, response.superuser)
                this.props.history.push("/")
            } else {
                throw new Error("No token")
            }
        } catch (error) {
            console.log(error)
        }
    }

    render = () => {
        return <Container><LoginCard authorize={this.authorize}/></Container>;
    }
}

export default Login