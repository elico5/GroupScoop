import * as d3 from 'd3';
import getMonthlyData from './get_monthly_data';

export default state => {
    const groupId = state.ui.phaseTwo.selected;
    const data = [];
    let title;
    if (state.ui.phaseThree.dataFilter === 'group') {
        switch (state.ui.phaseThree.vizFilter) {
            case '2':
                Object.values(state.groups[groupId].members).forEach(member => {
                    const object = Object.create({});
                    object[member.name] = Object.values(member.months).reduce((x, y) => x + y, 0);
                    data.push(object);
                })
                title = 'Total Messages Per User'
                break;
            case '3':
                return getMonthlyData(state, groupId);
            case '4':
                Object.values(state.groups[groupId].members).forEach(member => {
                    const object = Object.create({});
                    object[member.name] = member.likesReceived;
                    data.push(object);
                })
                title = 'Most Likes Received';
                break;
            case '5':
                Object.values(state.groups[groupId].members).forEach(member => {
                    const object = Object.create({});
                    object[member.name] = member.likesGiven;
                    data.push(object);
                })
                title = 'Most Likes Given';
                break;
            case '6':
                Object.values(state.groups[groupId].members).forEach(member => {
                    const object = Object.create({});
                    const ratio = member.likesGiven === 0 ? 0 : member.likesReceived / member.likesGiven;
                    object[member.name] = ratio;
                    data.push(object);
                })
                title = 'Love Ratio (Likes Received / Likes Given)';
        }
    } else {
        return getMonthlyData(state, groupId);
    }
    const max = d3.max(data, function (d) {
        return Object.values(d)[0];
    });
    return { data, max, title };
}