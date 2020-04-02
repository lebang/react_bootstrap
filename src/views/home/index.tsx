import React, { useContext } from "react";
import { AppContext } from "@/router";
import { Flex, NavBar, Icon } from 'antd-mobile';
import './index.less';

function onChange(val: string) {
    console.log(typeof val);
    console.log(val);
}

const Home: React.FC = () => {
    const ct = useContext(AppContext);
    const { history, state } = ct as any;
    console.log("history:", history);
    console.log("state:", state);
    return (
        <React.Fragment>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}
                rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    <Icon key="1" type="ellipsis" />,
                ]}
            >NavBar</NavBar>
        </React.Fragment>
    );
};
export default Home;
