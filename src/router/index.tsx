import React, { Suspense } from "react";
import { HashRouter as Router, Switch } from "react-router-dom";
import LinkList from "./linkList";
import { History } from "history";

export const AppContext = React.createContext({});

export interface IAppContext {
    history: History;
    dispatch: React.Dispatch<any>;
    state: any;
}

const loading = (
    <div className="main-loading">
        <div> loading...... </div>
    </div>
);

const Root: React.FC = () => {
    return (
        <Router>
            <Suspense fallback={loading}>
                <Switch>
                    <LinkList />
                </Switch>
            </Suspense>
        </Router >
    );
};

export default Root;
