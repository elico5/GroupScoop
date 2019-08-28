// import renderGroupVisualization
// import renderUserVisualization

export default state => {
    const previousVisualizationContainer = document.getElementById('visualization-container');
    const nextVisualizationContainer = previousVisualizationContainer.cloneNode(false);
    // if group
    if (state.ui.phaseTwo.dataFilter === 'group') {
        // render group visualization
    } else {
        // render user visualization
    }
    previousVisualizationContainer.parentNode.replaceChild(nextVisualizationContainer, previousVisualizationContainer);
}