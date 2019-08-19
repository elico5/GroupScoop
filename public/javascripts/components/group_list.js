import moment from 'moment';

export const createGroupItem = (groupIndex, groupDetails) => {
    const listImageContainer = document.createElement('div');
    listImageContainer.classList.add('group-item-image-container');
    const listImage = document.createElement('img');
    listImage.src = groupDetails.imageUrl;
    listImage.classList.add('group-item-image');
    listImageContainer.appendChild(listImage);

    const listHeadingContainer = document.createElement('div');
    listHeadingContainer.classList.add('group-item-heading-container');
    const listName = document.createElement('div');
    listName.classList.add('group-item-name');
    listName.innerHTML = groupDetails.name;
    listHeadingContainer.appendChild(listName);
    if (groupDetails.description) {
        const listDescription = document.createElement('div');
        listDescription.classList.add('group-item-description');
        listDescription.innerHTML = groupDetails.description;
        listHeadingContainer.appendChild(listDescription);
    }

    const listDetailsContainer = document.createElement('div');
    listDetailsContainer.classList.add('group-item-details-container');
    const listMembers = document.createElement('div');
    listMembers.classList.add('group-item-members');
    listMembers.innerHTML = "<i class='fas fa-users'></i>" + `${groupDetails.memberCount} members`;
    listDetailsContainer.appendChild(listMembers);
    const listMessages = document.createElement('div');
    listMessages.classList.add('group-item-messages');
    listMessages.innerHTML = "<i class='fas fa-comments'></i>" + `${groupDetails.messageCount} messages`;
    listDetailsContainer.appendChild(listMessages);

    const listItemContainer = document.createElement('div');
    listItemContainer.classList.add('group-item-container');
    listItemContainer.append(listImageContainer, listHeadingContainer, listDetailsContainer);

    const listContainerElement = document.getElementById('group-list-inner-container');
    listContainerElement.appendChild(listItemContainer);
};

