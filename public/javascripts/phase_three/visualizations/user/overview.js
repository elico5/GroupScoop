export default (state, visualizationContainer) => {
    const groupId = state.ui.groups.selected;
    const filterId = state.ui.phaseThree.dataFilter;
    const memberObject = state.groups[groupId].members[filterId];

    const avatarContainer = document.createElement('div');
    avatarContainer.classList.add('overview-avatar-container');
    const avatar = document.createElement('img');
    avatar.src = memberObject.imageUrl;
    avatar.classList.add('overview-avatar');
    avatarContainer.appendChild(avatar);

    const nameContainer = document.createElement('div');
    nameContainer.classList.add('overview-name');
    nameContainer.innerHTML = memberObject.name;

    const messageCount = Object.values(memberObject.months).reduce((x, y) => x + y, 0);
    const mC = document.createElement('div');
    mC.classList.add('overview-detail');
    mC.innerHTML = `Processed message count: ${messageCount}`;

    const likesReceived = memberObject.likesReceived;
    const lR = document.createElement('div');
    lR.classList.add('overview-detail');
    lR.innerHTML = `Likes Received: ${likesReceived}`;

    const likesGiven = memberObject.likesGiven;
    const lG = document.createElement('div');
    lG.classList.add('overview-detail');
    lG.innerHTML = `Likes Given: ${likesGiven}`;

    const loveRatio = (likesReceived / likesGiven).toFixed(2);
    const love = document.createElement('div');
    love.classList.add('overview-detail');
    love.innerHTML = `Love Ratio: ${loveRatio}`;

    const bootCount = memberObject.boots;
    const bC = document.createElement('div');
    bC.classList.add('overview-detail');
    bC.innerHTML = `Boot Count: ${bootCount}`;

    const overviewContainer = document.createElement('div');
    overviewContainer.id = 'overview-container';
    overviewContainer.append(avatarContainer, nameContainer, mC, lR, lG, love, bC);
    visualizationContainer.appendChild(overviewContainer);
}