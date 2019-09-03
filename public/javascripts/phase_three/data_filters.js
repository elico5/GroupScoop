import renderVisualization from './visualizations/render_visualization';

const selectDataFilter = state => {
    return e => {
        const selectedDataFilterId = state.ui.phaseThree.dataFilter + '-data-filter';
        const previousDataFilterElement = document.getElementById(selectedDataFilterId);
        const previousDataFilter = previousDataFilterElement.dataset.dataFilter;
        const nextDataFilter = e.currentTarget.dataset.dataFilter;
        if (previousDataFilter === nextDataFilter) {
            return;
        }
        previousDataFilterElement.classList.remove('selected');
        e.currentTarget.classList.add('selected');
        if (previousDataFilter === 'group' || nextDataFilter === 'group') {
            const groupNext = nextDataFilter === 'group';
            const previousVizFilterIdPrefix = groupNext ? 'user-viz-filter-' : 'group-viz-filter-';
            document.getElementById(previousVizFilterIdPrefix + state.ui.phaseThree.vizFilter).classList.remove('selected');
            const nextVizFilterId = groupNext ? 'group-viz-filter-0' : 'user-viz-filter-0';
            document.getElementById(nextVizFilterId).classList.add('selected');
            const previousVizFilterSetId = groupNext ? 'user-visualization-filters' : 'group-visualization-filters';
            const nextVizFilterSetId = groupNext ? 'group-visualization-filters' : 'user-visualization-filters';
            document.getElementById(previousVizFilterSetId).style.display = 'none';
            document.getElementById(nextVizFilterSetId).style.display = 'unset';
            state.ui.phaseThree.vizFilter = '0';
        }
        state.ui.phaseThree.dataFilter = e.currentTarget.dataset.dataFilter;
        renderVisualization(state);
    }
}

export const createGroupDataFilter = state => {
    // Refactor with refactoring of the ui slice of state
    const groupDetails = state.groups[state.ui.groups.selected];
    document.getElementById('group-data-filter-image').src = groupDetails.imageUrl;
    document.getElementById('group-data-filter-name').innerHTML = groupDetails.name;
    const filter = document.getElementById('group-data-filter');
    filter.classList.add('selected');
    filter.setAttribute('data-data-filter', 'group');
    filter.addEventListener('click', selectDataFilter(state));
}

export const createUserDataFilter = memberObject => {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('user-data-filter-image-container');
    const image = document.createElement('img');
    image.classList.add('user-data-filter-image');
    image.src = memberObject.imageUrl;
    imageContainer.appendChild(image);

    const userName = document.createElement('div');
    userName.classList.add('user-data-filter-name');
    userName.innerHTML = memberObject.name;


    const filter = document.createElement('div');
    filter.classList.add('user-data-filter');
    filter.append(imageContainer, userName);
    filter.id = `${memberObject.userId}-data-filter`;
    filter.setAttribute('data-data-filter', memberObject.userId);

    return filter;
}

export const createDataFilters = state => {
    // refactor with ui slice of state refactoring?
    createGroupDataFilter(state);
    const userDataFilterContainer = document.getElementById('user-data-filters-container');
    Object.values(state.groups[state.ui.groups.selected].members).forEach(memberObject => {
        const filter = createUserDataFilter(memberObject);
        filter.addEventListener('click', selectDataFilter(state));
        userDataFilterContainer.appendChild(filter);
    })
}
