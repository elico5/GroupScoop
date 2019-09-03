const createAvatar = avatar => {
    const avatarElement = document.createElement('div');
    avatarElement.classList.add('avatar-show-container');

    const avatarImage = document.createElement('img');
    avatarImage.classList.add('avatar-show-image');
    avatarImage.src = avatar;

    avatarElement.append(avatarImage);
    return avatarElement;
}

export default (state, visualizationContainer) => {
    const groupId = state.ui.groups.selected;
    let avatars;
    if (state.ui.phaseThree.dataFilter === 'group') {
        avatars = state.groups[groupId].avatars;
    } else {
        const filterId = state.ui.phaseThree.dataFilter;
        avatars = state.groups[groupId].members[filterId].avatars;
    }
    const avatarsContainer = document.createElement('div');
    avatarsContainer.classList.add('avatars-container');
    
    avatars.forEach(avatar => {
        avatarsContainer.append(createAvatar(avatar));
    })
    visualizationContainer.append(avatarsContainer);
}