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

        //this.loadD3();
    }

    async loadData() {
        const response = await fetch('https://api.github.com/repos/facebook/react/commits');
        const json = await response.json();

        const commitsObject = (json || []).reduce((accumulator, currentValue) => {
            const {author} = currentValue;
            const {login} = author;

            if (!accumulator.hasOwnProperty(login)) {
                accumulator[login] = 0;
            }
            accumulator[login] += 1;

            return accumulator;
        }, {});

        this.setState(() => ({
            commits: Object.keys(commitsObject).map(author => {
                return {
                    author,
                    amount: commitsObject[author]
                };
            })
        }));
    }

    componentDidUpdate(prevProps, prevState) {
        const {commits} = this.state;

        d3.select('.chart')
            .selectAll('div')
            .data(commits)
            .enter().append('div')
            .style('width', function (commiter) {
                return commiter.amount * 100 + 'px';
            })
            .text(commiter => `${commiter.author} - ${commiter.amount}`);
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

    renderLinearScale() {
        const svg = d3.select('.main').append('svg');

        svg
            .attr('width', 600)
            .attr('height', 300);

        const y = d3.scaleLinear()
            .domain([15, 90])
            .range([0, 250]);

        const x = d3.scaleLog()
            .domain([250, 100000])
            .range([0, 600]);
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
                <div className="main"></div>
                <div className="chart"/>
            </div>
        );
    }
}

export default App;
