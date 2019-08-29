// import renderGroupVisualization
// import renderUserVisualization

export default state => {
    const previousVisualizationContainer = document.getElementById('visualization-container');
    const nextVisualizationContainer = previousVisualizationContainer.cloneNode(false);
    // if group
    if (state.ui.phaseTwo.dataFilter === 'group') {
        // render group visualization(state, nextVisContainer)?
    } else {
        // render user visualization(state, nextVisContainer)?
    }
    previousVisualizationContainer.parentNode.replaceChild(nextVisualizationContainer, previousVisualizationContainer);
}