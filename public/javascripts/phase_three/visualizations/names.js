const createName = name => {
    const nameElement = document.createElement('div');
    nameElement.classList.add('show-name');
    nameElement.innerHTML = name;
    return nameElement;
}

export default (state, visualizationContainer) => {
    const groupId = state.ui.groups.selected;
    let names;
    if (state.ui.phaseThree.dataFilter === 'group') {
        names = state.groups[groupId].nicknames;
    } else {
        const filterId = state.ui.phaseThree.dataFilter;
        names = state.groups[groupId].members[filterId].nicknames;
    }
    const namesContainer = document.createElement('div');
    namesContainer.classList.add('names-container');

    names.forEach(name => {
        namesContainer.appendChild(createName(name));
    })
    visualizationContainer.appendChild(namesContainer);
}