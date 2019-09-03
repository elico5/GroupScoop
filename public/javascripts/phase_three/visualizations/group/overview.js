import moment from 'moment';

export default (state, visualizationContainer) => {
    const groupId = state.ui.phaseTwo.selected;
    const groupObject = state.groups[groupId];

    const avatarContainer = document.createElement('div');
    avatarContainer.classList.add('overview-avatar-container');
    const avatar = document.createElement('img');
    avatar.src = groupObject.imageUrl;
    avatar.classList.add('overview-avatar');
    avatarContainer.appendChild(avatar);

    const nameContainer = document.createElement('div');
    nameContainer.classList.add('overview-name');
    nameContainer.innerHTML = groupObject.name;

    const descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('overview-detail');
    descriptionContainer.innerHTML = `Description: ${groupObject.description}`;

    const creationContainer = document.createElement('div');
    creationContainer.classList.add('overview-detail');
    creationContainer.innerHTML = `Creation: ${moment.unix(groupObject.createdAt).format("LLLL")}`;

    const creatorContainer = document.createElement('div');
    creatorContainer.classList.add('overview-detail');
    creatorContainer.innerHTML = `Owner: ${groupObject.members[groupObject.creatorUserId].name}`;

    const overviewContainer = document.createElement('div');
    overviewContainer.id = 'overview-container';
    overviewContainer.append(avatarContainer, nameContainer, descriptionContainer, creationContainer, creatorContainer);
    visualizationContainer.appendChild(overviewContainer);
}