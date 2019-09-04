import moment from 'moment';
import { defaultUserAvatar } from '../../util/defaults';

export const createTopMessage = message => {
    const container = document.createElement('div');
    container.classList.add('top-message');
    container.id = `message-${message.id}`;

    const upper = document.createElement('div');
    upper.classList.add('top-message-upper');

    const upperLeft = document.createElement('div');
    upperLeft.classList.add('top-message-upper-left');
    const avatarContainer = document.createElement('div');
    avatarContainer.classList.add('message-circular');
    const avatar = document.createElement('img');
    avatar.classList.add('image-circular');
    avatar.src = message.avatar_url || defaultUserAvatar;
    avatarContainer.appendChild(avatar);
    const nameTime = document.createElement('div');
    nameTime.classList.add('message-name-time');
    const name = document.createElement('div');
    name.classList.add('top-message-name');
    name.innerHTML = message.name;
    const time = document.createElement('div');
    time.classList.add('top-message-time');
    time.innerHTML = moment.unix(message.created_at).format("LLLL");
    nameTime.append(name, time);
    upperLeft.append(avatarContainer, nameTime);

    const upperRight = document.createElement('div');
    upperRight.classList.add('top-message-upper-right');
    const heart = document.createElement('div');
    heart.innerHTML = '<i class="fas fa-heart"></i>';
    const count = document.createElement('div');
    count.classList.add('top-message-favorite-count');
    count.innerHTML = String(message.favorited_by.length);
    upperRight.append(heart, count);

    upper.append(upperLeft, upperRight);

    const lower = document.createElement('div');
    lower.classList.add('top-message-lower');

    if (message.text) {
        const text = document.createElement('div');
        text.classList.add('top-message-text');
        text.innerHTML = message.text.replace(/@/g, '<i class="fas fa-at"></i>');
        lower.appendChild(text);
    }
    const imageAttachment = message.attachments.find(attachment => attachment.type === 'image');
    if (imageAttachment) {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('attachment-image-container');
        const image = document.createElement('img');
        image.classList.add('attachment-image');
        image.src = imageAttachment.url;
        imageContainer.append(image);
        lower.appendChild(imageContainer);
    }

    container.append(upper, lower);
    return container;
};

export const renderTopMessages = (state, visualizationContainer) => {
    const groupId = state.ui.phaseTwo.selected;
    let topMessages;
    if (state.ui.phaseThree.dataFilter === 'group') {
        topMessages = state.groups[groupId].topMessages.data;
    } else {
        const filterId = state.ui.phaseThree.dataFilter;
        topMessages = state.groups[groupId].members[filterId].topMessages.data;
    }
    const topMessagesContainer = document.createElement('div');
    topMessagesContainer.classList.add('top-messages-container');

    topMessages.forEach(message => {
        topMessagesContainer.append(createTopMessage(message));
    })
    visualizationContainer.append(topMessagesContainer);
};