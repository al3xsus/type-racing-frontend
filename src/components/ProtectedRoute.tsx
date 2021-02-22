import * as React from 'react';
import {Redirect, Route, RouteComponentProps, RouteProps} from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
    isAuthenticated: boolean;
    isAdmin?: boolean
}

export default class ProtectedRoute extends Route<PrivateRouteProps> {
    render() {
        return (
            <Route render={(props: RouteComponentProps) => {
                if (!this.props.isAuthenticated) {
                    return <Redirect to='/login'/>
                }

                if (this.props.isAdmin !== undefined) {
                    if (this.props.isAdmin) {
                        if (this.props.component) {
                            return React.createElement(this.props.component);
                        }
                    } else {
                        return (<p>not enough rights</p>)
                    }
                } else {
                    if (this.props.component) {
                        return React.createElement(this.props.component);
                    }
                }

                if (this.props.render) {
                    return this.props.render(props);
                }
            }}/>
        );
    }
}