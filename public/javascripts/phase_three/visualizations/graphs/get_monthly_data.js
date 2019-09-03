import * as d3 from 'd3';

export default (state, groupId) => {
    const data = [];
    let months;
    if (state.ui.phaseThree.dataFilter === 'group') {
        months = state.groups[groupId].months;
    } else {
        const filterId = state.ui.phaseThree.dataFilter;
        months = state.groups[groupId].members[filterId].months;
    }
    Object.keys(months).forEach(month => {
        const object = Object.create({});
        object[month] = months[month];
        data.push(object);
    })
    const max = d3.max(data, function(d) {
        return Object.values(d)[0];
    });
    const title = 'Monthly Message Count';
    return { data, max, title };
}