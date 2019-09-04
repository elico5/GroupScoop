import * as d3 from 'd3';
import getGraphData from './get_graph_data';

export default (state, visualizationContainer) => {
    const totalHeight = visualizationContainer.offsetHeight;
    const totalWidth = visualizationContainer.offsetWidth;
    const canvas = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    canvas.setAttribute('height', totalHeight);
    canvas.setAttribute('width', totalWidth);
    visualizationContainer.appendChild(canvas);

    const topMargin = 40;
    const bottomMargin = 80;
    const sideMargins = 40;
    const graphHeight = totalHeight - topMargin - bottomMargin;
    const graphWidth = totalWidth - sideMargins * 2;

    const svg = d3.select('svg');
    const graph = svg.append('g')
        .attr('transform', `translate(${sideMargins}, ${topMargin})`);
    graph.append('rect')
        .attr('class', 'bar-graph-background')
        .attr('width', graphWidth)
        .attr('height', graphHeight);

    const { data, max, title } = getGraphData(state);

    svg.append('text')
        .attr('y', 25)
        .attr('x', totalWidth / 2)
        .attr('text-anchor', 'middle')
        .attr('class', 'bar-graph-title')
        .text(title);

    const scaleY = d3.scaleLinear()
        .domain([0, max])
        .range([graphHeight, 0]);
    graph.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft()
            .scale(scaleY)
            .tickSize(-graphWidth, 0, 0)
            .tickFormat(''));
    graph.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(scaleY));
    const scaleX = d3.scaleBand()
        .domain(data.map(el => Object.keys(el)[0]))
        .range([0, graphWidth])
        .padding(0.05);
    graph.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${graphHeight})`)
        .call(d3.axisBottom(scaleX))
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dy', '-.8em')
        .attr('dx', '-1em')
        .attr('transform', 'rotate(-90)');
    graph.selectAll()
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar-graph-bar')
        .attr('x', d => scaleX(Object.keys(d)[0]))
        .attr('y', d => scaleY(Object.values(d)[0]))
        .attr('height', d => graphHeight - scaleY(Object.values(d)[0]))
        .attr('width', scaleX.bandwidth());
}