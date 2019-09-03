import moment from 'moment';

const createTopMessage = message => {
    const container = document.createElement('div');
    container.classList.add('top-message');

    const upper = document.createElement('div');
    upper.classList.add('top-message-upper');

    const upperLeft = document.createElement('div');
    upperLeft.classList.add('top-message-upper-left');
    const avatarContainer = document.createElement('div');
    avatarContainer.classList.add('message-circular');
    const avatar = document.createElement('img');
    avatar.classList.add('image-circular');
    avatar.src = message.avatar_url;
    avatarContainer.appendChild(avatar);

    const name = document.createElement('div');
    name.classList.add('top-message-name');
    name.innerHTML = message.name;
    upperLeft.append(avatarContainer, name);


    const time = document.createElement('div');
    time.classList.add('top-message-time');
    time.innerHTML = moment.unix(message.created_at).format("LLLL");

    upper.append(upperLeft, time);

    const lower = document.createElement('div');
    lower.classList.add('top-message-lower');
    const lowerLeft = document.createElement('div');
    lowerLeft.classList.add('top-message-lower-left');
    if (message.text) {
        const text = document.createElement('div');
        text.innerHTML = message.text;
        lowerLeft.appendChild(text);
    }
    const imageAttachment = message.attachments.find(attachment => attachment.type === 'image');
    if (imageAttachment) {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('attachment-image-container');
        const image = document.createElement('img');
        image.classList.add('attachment-image');
        image.src = imageAttachment.url;
        imageContainer.append(image);
        lowerLeft.appendChild(imageContainer);
    }

    const lowerRight = document.createElement('div');
    lowerRight.classList.add('top-message-lower-right');

    const heart = document.createElement('div');
    heart.innerHTML = '<i class="fas fa-heart"></i>';
    const count = document.createElement('div');
    count.classList.add('top-message-favorite-count');
    count.innerHTML = String(message.favorited_by.length);
    lowerRight.append(heart, count);

    lower.append(lowerLeft, lowerRight);

    container.append(upper, lower);
    return container;
};

export default (state, visualizationContainer) => {
    const groupId = state.ui.groups.selected;
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