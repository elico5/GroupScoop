import * as d3 from 'd3';

export default (state, visualizationContainer) => {
    const groupId = state.ui.phaseTwo.selected;
    const data = [];
    const months = state.groups[groupId].months;
    Object.keys(months).forEach(month => {
        const object = Object.create({});
        object[month] = months[month];
        data.push(object);
    })

    // 
    // d3.select('#visualization-container').append('svg')
    // 

    const totalHeight = visualizationContainer.offsetHeight;
    const totalWidth = visualizationContainer.offsetWidth;
    const canvas = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    canvas.setAttribute('height', totalHeight);
    canvas.setAttribute('width', totalWidth);
    visualizationContainer.appendChild(canvas);

    const margin = 50;
    const graphHeight = totalHeight - margin * 2;
    const graphWidth = totalWidth - margin * 2;

    const svg = d3.select('svg');
    const graph = svg.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);

    const max = d3.max(data, function(d) {
        return Object.values(d)[0];
    });
    const scaleY = d3.scaleLinear()
        .domain([0, max])
        .range([graphHeight, 0]);
    graph.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(scaleY));
    const scaleX = d3.scaleBand()
        .domain(Object.keys(months))
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
        .attr('x', d => scaleX(Object.keys(d)[0]))
        .attr('y', d => scaleY(Object.values(d)[0]))
        .attr('height', d => graphHeight - scaleY(Object.values(d)[0]))
        .attr('width', scaleX.bandwidth());
}