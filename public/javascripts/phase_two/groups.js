import getScoopGroups from '../api/get_scoop_groups';
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
    const listMessages = document.createElement('div');
    listMessages.classList.add('group-item-messages');
    listMessages.innerHTML = "<i class='fas fa-comments'></i>" + `${groupDetails.messageCount} messages`;
    listDetailsContainer.append(listMembers, listMessages);

    const listItemContainer = document.createElement('div');
    listItemContainer.classList.add('group-item-container');
    listItemContainer.append(listImageContainer, listHeadingContainer, listDetailsContainer);
    listItemContainer.setAttribute('data-group-index', groupIndex);

    return listItemContainer;
};

export const goRight = state => {
    if (!state.ui.groups.loadedAll && state.ui.groups.currentPage === state.ui.groups.loadedPageCount) {
        if (state.ui.groups.currentPage === 1) {
            document.getElementById('prev-page-button').style.display = 'unset';
        }
        getScoopGroups(state, state.ui.groups.currentPage + 1).then(
            () => {
                renderGroupList(state);
            }
        );
    } else {
        if (state.ui.groups.loadedAll && state.ui.groups.currentPage === state.ui.groups.loadedPageCount - 1) {
            document.getElementById('next-page-button').style.display = 'none';
        }
        if (state.ui.groups.currentPage === 1) {
            document.getElementById('prev-page-button').style.display = 'unset';
        }
        state.ui.groups.selected = state.ui.groups.currentPage * 5;
        state.ui.groups.currentPage++;
        renderGroupList(state);
    }
};

export const goLeft = state => {
    if (state.ui.groups.currentPage === 2) {
        document.getElementById('prev-page-button').style.display = 'none';
    }
    if (state.ui.groups.currentPage === state.ui.groups.loadedPageCount) {
        document.getElementById('next-page-button').style.display = 'unset';
    }
    state.ui.groups.currentPage--;
    state.ui.groups.selected = state.ui.groups.currentPage * 5 - 1;
    renderGroupList(state);
};

export const renderGroupPrompt = state => {
    document.getElementById('group-select-user-image').src = state.scoopUser.imageUrl;
    const firstName = state.scoopUser.name.split(" ")[0];
    document.getElementById('group-select-prompt-text').innerHTML = `Hey ${firstName} - select a group from the pages on the right and then click the button below to keep moving!`;
}

export const renderGroupSelect = (state) => {
    const groupDetails = state.groups[state.ui.groups.selected];
    document.getElementById('group-select-left-title').innerHTML = groupDetails.name;
    document.getElementById('group-select-group-image').src = groupDetails.imageUrl;
    document.getElementById('group-select-left-description').innerHTML = groupDetails.description;
    document.getElementById('group-select-left-members').innerHTML = "<i class='fas fa-users'></i>" + `${groupDetails.memberCount} members`;
    document.getElementById('group-select-left-messages').innerHTML = "<i class='fas fa-comments'></i>" + `${groupDetails.messageCount} messages`;
    document.getElementById('group-select-left-created-at').innerHTML = "<i class='fas fa-calendar-alt'></i> Creation: " + `${moment.unix(groupDetails.createdAt).format("LLLL")}`;
}

export const select = state => {
    return e => {
        document.getElementsByClassName('group-item-container selected').item(0).classList.remove('selected');
        e.currentTarget.classList.add('selected');
        state.ui.groups.selected = parseInt(e.currentTarget.dataset.groupIndex);
        renderGroupSelect(state);
    }
}

export const renderGroupList = state => {
    document.querySelectorAll('.group-item-container').forEach(ele => ele.remove());
    const listContainerElement = document.getElementById('group-list-inner-container');
    const nextPageStart = state.ui.groups.currentPage * 5;
    for (let i = 5; i >= 1; i--) {
        const groupIndex = nextPageStart - i;
        const group = state.groups[groupIndex];
        if (group) {
            const listItem = createGroupItem(groupIndex, group);
            listItem.addEventListener('click', select(state));
            if (groupIndex === state.ui.groups.selected) {
                listItem.classList.add('selected');
            }
            listContainerElement.appendChild(listItem);
        }
    }
    renderGroupSelect(state);
};