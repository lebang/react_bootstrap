import React, { Component } from 'react';

interface IProps extends React.Props<any> {
}

export default class extends Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
        this.state = {

        }
        console.log('child a constructor');
    }

    componentDidMount() {
        console.log('child a did mount')
    }

    shouldComponentUpdate() {
        console.log('child a shoud update');
        return true;
    }

    componentWillUnmount() {
        console.log('a child un mount')
    }

    render() {
        return <div>
            a child
        </div>;
    }
}