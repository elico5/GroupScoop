const selectDataFilter = state => {
    // call visualization render function 
        // clears viz container
        // repopulated based on combination of data and viz filter
    return e => {
        const selectedDataFilterId = 'data-filter-' + state.ui.phaseThree.dataFilter;
        const previousDataFilterElement = document.getElementById(selectedDataFilterId);
        const previousDataFilter = previousDataFilter.dataset.dataFilter;
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
        // renderVisualization(state);
    }
}

// give appopriate dataset
export const createGroupDataFilter = state => {
    // Refactor with refactoring of the ui slice of state
    const groupDetails = state.groups[state.ui.groups.selected];
    document.getElementById('group-data-select-image').src = groupDetails.imageUrl;
    document.getElementById('group-data-select-name').innerHTML = groupDetails.name;
    // Add event listener to div? Give it data attribute
}

// give appropriate dataset
export const createUserDataFilter = memberObject => {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('user-data-select-image-container');
    const image = document.createElement('img');
    image.classList.add('user-data-select-image');
    image.src = memberObject.imageUrl;
    imageContainer.appendChild(image);

    const userName = document.createElement('div');
    userName.classList.add('user-data-select-name');
    userName.innerHTML = memberObject.name;


    const itemContainer = document.createElement('div');
    itemContainer.classList.add('user-data-select-item');
    itemContainer.append(imageContainer, userName);

    document.getElementById('data-select-inner-container').append(itemContainer);
    // add event listener to div? Give it data attribute
}

export const createDataSelectItems = state => {
    // refactor with ui slice of state refactoring?
    createGroupSelectItem(state);
    Object.values(state.groups[state.ui.groups.selected].members).forEach(memberObject => {
        createUserSelectItem(memberObject);
    })
}
