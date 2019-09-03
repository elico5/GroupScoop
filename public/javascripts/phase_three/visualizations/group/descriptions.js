const createDescription = description => {
    const descriptionElement = document.createElement('div');
    descriptionElement.classList.add('show-description');
    descriptionElement.innerHTML = description;
    return descriptionElement;
}

export default (state, visualizationContainer) => {
    const groupId = state.ui.phaseTwo.selected;
    const descriptions = state.groups[groupId].topics;
    const descriptionsContainer = document.createElement('div');
    descriptionsContainer.classList.add('descriptions-container');
    descriptions.forEach(description => {
        descriptionsContainer.appendChild(createDescription(description));
    })
    visualizationContainer.appendChild(descriptionsContainer);
}