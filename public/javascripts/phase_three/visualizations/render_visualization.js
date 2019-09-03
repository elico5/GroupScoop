import renderUserVisualization from './user/render_user_visualizations';
import renderGroupVisualization from './group/render_group_visualizations';

export default state => {
    const previousVisualizationContainer = document.getElementById('visualization-container');
    const nextVisualizationContainer = previousVisualizationContainer.cloneNode(false);
    previousVisualizationContainer.parentNode.replaceChild(nextVisualizationContainer, previousVisualizationContainer);
    if (state.ui.phaseThree.dataFilter === 'group') {
        renderGroupVisualization(state, nextVisualizationContainer);
    } else {
        renderUserVisualization(state, nextVisualizationContainer);
    }
}