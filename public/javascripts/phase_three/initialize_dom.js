import { createDataFilters } from './data_filters';
import { renderVisualization } from './visualizations/visualization';

const selectGroupVizFilter = state => {
    return e => {
        const previousVizFilterId = 'group-viz-filter-' + state.ui.phaseThree.vizFilter;
        if (previousVizFilterId === e.currentTarget.id) {
            return;
        }
        document.getElementById(previousVizFilterId).classList.remove('selected');
        e.currentTarget.classList.add('selected');
        state.ui.phaseThree.vizFilter = e.currentTarget.dataset.vizFilter;
        renderVisualization(state);
    }
}

const createGroupVizFilters = state => {
    const headers = ['Overview', 'Top Messages', 'Total Messages', 'Monthly', 'Most Loved', 'Most Loving',
        'Love Ratio', 'Avatars', 'Names', 'Descriptions'];
    const filterContainer = document.getElementById('group-visualization-filters');
    headers.forEach((header, i) => {
        const filter = document.createElement('div');
        filter.classList.add('group-visualization-filter');
        filter.id = 'group-viz-filter-' + parseInt(i);
        filter.innerHTML = header;
        filter.setAttribute('data-viz-filter', i);
        filter.addEventListener('click', selectGroupVizFilter(state));
        if (i === 0) {
            filter.classList.add('selected');
        }
        filterContainer.appendChild(filter);
    });
};

const selectUserVizFilter = state => {
    return e => {
        const previousVizFilterId = 'user-viz-filter-' + state.ui.phaseThree.vizFilter;
        if (previousVizFilterId === e.currentTarget.id) {
            return;
        }
        document.getElementById(previousVizFilterId).classList.remove('selected');
        e.currentTarget.classList.add('selected');
        state.ui.phaseThree.vizFilter = e.currentTarget.dataset.vizFilter;
        renderVisualization(state);
    }
}

const createUserVizFilters = state => {
    const headers = ['Overview', 'Top Messages', 'Monthly', 'Avatars', 'Nicknames'];
    const filterContainer = document.getElementById('user-visualization-filters');
    headers.forEach((header, i) => {
        const filter = document.createElement('div');
        filter.classList.add('user-visualization-filter');
        filter.id = 'user-viz-filter-' + parseInt(i);
        filter.innerHTML = header;
        filter.setAttribute('data-viz-filter', i);
        filter.addEventListener('click', selectUserVizFilter(state));
        filterContainer.appendChild(filter);
    });
};

export default state => {
    createDataFilters(state);
    createGroupVizFilters(state);
    createUserVizFilters(state);
    renderVisualization(state);
}