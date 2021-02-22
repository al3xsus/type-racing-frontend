import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import UserContainer from "./User";
import AppPanel from "../components/AppPanel";
import AdminContainer from "./Admin";
import Login from "./Login";
import Main from './Main'
import {isAdmin, isAuthorized} from "../utils/AuxFns";
import ProtectedRoute from "../components/ProtectedRoute";
import Page404 from "../components/Page404";
import Scores from "./Scores";

function App() {
    return (
        <BrowserRouter>
            <AppPanel/>
            <Switch>
                <Route exact={true} path={"/"}>
                    <Main/>
                </Route>
                <ProtectedRoute
                    exact={true}
                    path='/user'
                    component={UserContainer}
                    isAuthenticated={isAuthorized()}
                />
                <Route
                    path="/login"
                    exact={true}
                    render={({history, location}) => (
                        <Login
                            history={history}
                            location={location}
                        />
                    )}
                />
                <ProtectedRoute
                    exact={true}
                    path='/admin'
                    component={AdminContainer}
                    isAuthenticated={isAuthorized()}
                    isAdmin={isAdmin()}
                />
                <Route exact={true} path={"/scores"}>
                    <Scores/>
                </Route>
                <Route>
                    <Page404/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
