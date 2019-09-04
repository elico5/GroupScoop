import renderUserVisualization from './user/render_user_visualizations';
import renderGroupVisualization from './group/render_group_visualizations';

export const renderVisualization = state => {
    const previousVisualizationContainer = document.getElementById('visualization-container');
    const nextVisualizationContainer = previousVisualizationContainer.cloneNode(false);
    previousVisualizationContainer.parentNode.replaceChild(nextVisualizationContainer, previousVisualizationContainer);
    if (state.ui.phaseThree.dataFilter === 'group') {
        renderGroupVisualization(state, nextVisualizationContainer);
    } else {
        renderUserVisualization(state, nextVisualizationContainer);
    }
}

export const updateVisualization = state => {
    const dataFilter = state.ui.phaseThree.dataFilter;
    const vizFilter = state.ui.phaseThree.vizFilter;
    if ( (dataFilter === 'group' && !['1', '7', '8', '9'].includes(vizFilter)) ||
         (dataFilter !== 'group' && ['0', '2'].includes(vizFilter)) ) {
        renderVisualization(state);
    }
}