import renderOverview from './overview';

export default (state, visualizationContainer) => {
    switch (state.ui.phaseThree.vizFilter) {
        case '0':
            // 0 = Overview
            // renderOverview(state, visualizationContainer);
            break;
        case '1':
            // 1 = Top Messages
            break;
        case '2':
            // 2 = Monthly
            break;
        case '3':
            // 3 = Avatars
            break;
        case '4':
            // 4 = Nicknames
    }
}