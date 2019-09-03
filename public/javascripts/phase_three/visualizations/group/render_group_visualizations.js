import renderOverview from './overview';
import renderTopMessages from '../top_messages';
import renderAvatars from '../avatars';
import renderGroupNames from '../names';
import renderDescriptions from './descriptions';

export default (state, visualizationContainer) => {
    switch (state.ui.phaseThree.vizFilter) {
        case '0':
            renderOverview(state, visualizationContainer);
            break;
        case '1':
            renderTopMessages(state, visualizationContainer);
            break;
        case '2':
            // 2 = Total Messages (by user)
            break;
        case '3':
            // 3 = Monthly
            break;
        case '4':
            // 4 = Most Loved
            break;
        case '5':
            // 5 = Most Loving
            break;
        case '6':
            // 6 = Love Ratio
            break;
        case '7':
            renderAvatars(state, visualizationContainer);
            break;
        case '8':
            renderGroupNames(state, visualizationContainer);
            break;
        case '9':
            renderDescriptions(state, visualizationContainer);
    }
}