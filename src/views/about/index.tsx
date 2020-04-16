// import React, { useContext, useState } from 'react';
// import { AppContext, IAppContext } from '@/router';
// import produce from 'immer';

// const About: React.FC = () => {
//     const ct = useContext(AppContext);
//     const { history, state } = ct as IAppContext;
//     console.log("history:", history);
//     console.log("state:", state);


//     const [user, setUser] = useState({ name: 'hi', age: 22 });
//     const newState = produce(user, draft => {
//         console.log('draft:', draft);
//         draft.name = 'work';
//     });
//     console.log('new state:', newState);
//     return (
//         <React.Fragment>
//             about
//         </React.Fragment>
//     );
// };
// export default About;


import React, { Component, PureComponent } from 'react';
import Child from './components/child'
export default class extends Component<React.Props<any>, any> {
    constructor(props: React.Props<any>) {
        super(props);
        this.state = {
            name: '',
            value: '',
            children: {
                name: 'hh'
            },
            visable: false
        }
        console.log('main constructor');
    }

    componentDidMount() {
        console.log('main did mount')
    }
    componentWillUpdate() {
        console.log('mian will update');
    }

    btnClick = () => {
        this.setState((prev: any) => {
            return {
                visable: !prev.visable
            }
        })
    }

    render() {
        console.log('render');
        // const { children, visable } = this.state;
        // console.log('visable:', visable);
        return <div>
            {/* {!visable ? <Child name={children.name} /> : ''} */}
            <button onClick={this.btnClick}>点击</button>
        </div>;
    }
}
