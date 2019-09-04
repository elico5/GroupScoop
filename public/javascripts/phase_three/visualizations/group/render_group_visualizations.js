import renderOverview from './overview';
import { renderTopMessages } from '../top_messages';
import renderAvatars from '../avatars';
import renderGroupNames from '../names';
import renderDescriptions from './descriptions';
import renderGraph from '../graphs/render_graph';

export default (state, visualizationContainer) => {
    switch (state.ui.phaseThree.vizFilter) {
        case '0':
            renderOverview(state, visualizationContainer);
            break;
        case '1':
            renderTopMessages(state, visualizationContainer);
            break;
        case '7':
            renderAvatars(state, visualizationContainer);
            break;
        case '8':
            renderGroupNames(state, visualizationContainer);
            break;
        case '9':
            renderDescriptions(state, visualizationContainer);
            break;
        default:
            renderGraph(state, visualizationContainer);
    }
}