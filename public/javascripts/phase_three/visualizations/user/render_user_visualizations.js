import renderOverview from './overview';
import renderTopMessages from '../top_messages';
import renderGraph from '../graphs/render_graph';
import renderAvatars from '../avatars';
import renderNicknames from '../names';

export default (state, visualizationContainer) => {
    switch (state.ui.phaseThree.vizFilter) {
        case '0':
            renderOverview(state, visualizationContainer);
            break;
        case '1':
            renderTopMessages(state, visualizationContainer);
            break;
        case '2':
            renderGraph(state,visualizationContainer);
            break;
        case '3':
            renderAvatars(state, visualizationContainer);
            break;
        case '4':
            renderNicknames(state, visualizationContainer);
    }
}