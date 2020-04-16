import React, { Component } from 'react';
import Achild from './achild';

interface IProps extends React.Props<any> {
    name: string;
}

export default class extends Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
        this.state = {

        }
        console.log('child 1 constructor');
    }

    componentDidMount() {
        console.log('child 1 did mount')
    }

    shouldComponentUpdate() {
        console.log('child shoud update');
        return true;
    }

    componentWillUnmount() {
        console.log('child un mount')
    }

    render() {
        return <div>
            {this.props.name}
            <Achild />
        </div>;
    }
}