import React, { useReducer, useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { AppContext } from "./index";
import { linkList, ILinkItem } from "./chunks";
import { defaultState, reducer, SSO_ACTION } from "@/store";

const defaultPath = "/";

export default () => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    return (
        <AppContext.Provider value={{ history: useHistory(), dispatch, state }}>
            <Route exact path="/" render={() => <Redirect to={defaultPath} />} />
            {linkList.map((item: ILinkItem) => {
                return (
                    <Route
                        key={item.key}
                        exact={true}
                        path={item.pathname}
                        component={item.component}
                    />
                );
            })}
        </AppContext.Provider>
    );
};
