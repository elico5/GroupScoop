// Avatar image (largest yet)
// Processed message count
// Likes Given
// Likes Received
// Love Ratio
// Boot count

export default (state, visualizationContainer) => {
    const filterId = state.ui.phaseThree.dataFilter;
    const groupId = state.ui.groups.selected;
    const memberObject = state.groups[groupId].members[filterId];
    const likesGiven = memberObject.likesGiven;
    const likesReceived = memberObject.likesReceived;
    const messageCount = Object.values(memberObject.months).reduce((x, y) => x + y, 0);
    const bootCount = memberObject.boots;
}