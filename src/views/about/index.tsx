import React, { useContext } from "react";
import { AppContext } from "@/router";

const About: React.FC = () => {
    const ct = useContext(AppContext);
    const { history, state } = ct as any;
    console.log("history:", history);
    console.log("state:", state);
    return (
        <React.Fragment>
            about
        </React.Fragment>
    );
};
export default About;
