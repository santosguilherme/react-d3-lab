import React, {Component} from 'react';

import * as d3 from 'd3';

import logo from './logo.svg';

import './App.css';


class App extends Component {
    state = {
        commits: []
    };

    componentDidMount() {
        this.loadData();
        console.log('d3', d3);

        this.loadD3();
    }

    async loadData() {
        const response = await fetch('https://api.github.com/repos/facebook/react/commits');
        const json = await response.json();

        this.setState(() => ({
            commits: json
        }));
    }

    loadD3() {
        const data = [4, 8, 15, 16, 23, 42];

        d3.select('.chart')
            .selectAll('div')
            .data(data)
            .enter().append('div')
            .style('width', function (d) {
                return d * 10 + 'px';
            })
            .text(d => d);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    {this.state.commits.length}
                </p>
                <div className="chart"/>
            </div>
        );
    }
}

export default App;
