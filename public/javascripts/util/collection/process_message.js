import moment from 'moment';
import newMemberSlice from './new_member_slice';
import { createDescription } from '../../phase_three/visualizations/group/descriptions';
import { createName } from '../../phase_three/visualizations/names';
import { createAvatar } from '../../phase_three/visualizations/avatars';
import { renderSingleUserFilter } from '../../phase_three/data_filters';
import { createTopMessage } from '../../phase_three/visualizations/top_messages';
import { updateVisualization } from '../../phase_three/visualizations/visualization';

export const processMessage = (message, state) => {
    const groupDetails = state.groups[state.ui.phaseTwo.selected];
    const dataFilter = state.ui.phaseThree.dataFilter;
    const vizFilter = state.ui.phaseThree.vizFilter;
    const senderId = message.sender_id;
    const monthYear = moment.unix(message.created_at).format("MMM-YYYY");

    if (senderId === 'system' || senderId === 'calendar') {
        if (senderId === 'system' && message.event) {
            switch (message.event.type) {
                case 'membership.notifications.removed':
                    groupDetails.members[message.event.data.remover_user.id].boots++;
                    break;
                case 'group.topic_change':
                    const topic = message.event.data.topic;
                    if (!groupDetails.topics.includes(topic)) {
                        groupDetails.topics.push(topic);
                        if (dataFilter === 'group' & vizFilter === '9') {
                            document.getElementsByClassName('descriptions-container').item(0).appendChild(createDescription(topic));
                        }
                    }
                    break;
                case 'group.name_change':
                    const name = message.event.data.name;
                    if (!groupDetails.nicknames.includes(name)) {
                        groupDetails.nicknames.push(name);
                        if (dataFilter === 'group' & vizFilter === '8') {
                            document.getElementsByClassName('names-container').item(0).appendChild(createName(name));
                        }
                    }
                    break;
                case 'group.avatar_change':
                    const avatarUrl = message.event.data.avatar_url;
                    if (!groupDetails.avatars.includes(avatarUrl)) {
                        groupDetails.avatars.push(avatarUrl);
                        if (dataFilter === 'group' && vizFilter === '7') {
                            document.getElementsByClassName('avatars-container').item(0).appendChild(createAvatar(avatarUrl));
                        }
                    }
            }
        }
    } else {
        if (!groupDetails.members[senderId]) {
            groupDetails.members[senderId] = newMemberSlice(null, null, message);
            renderSingleUserFilter(state, groupDetails.members[senderId]);
        }
        const userDetails = groupDetails.members[senderId];
        if (!userDetails.months[monthYear]) userDetails.months[monthYear] = 0;
        userDetails.months[monthYear]++;
        message.favorited_by.forEach(likerId => {
            userDetails.likesReceived++;
            if (!groupDetails.members[likerId]) groupDetails.members[likerId] = newMemberSlice(likerId);
            groupDetails.members[likerId].likesGiven++;
        });
        if (!userDetails.nicknames.includes(message.name)) {
            userDetails.nicknames.push(message.name);
            if (senderId === dataFilter && vizFilter === '4') {
                document.getElementsByClassName('names-container').item(0).appendChild(createName(message.name));
            }
        }
        if (!userDetails.avatars.includes(message.avatar_url)) {
            userDetails.avatars.push(message.avatar_url);
            if (senderId === dataFilter && vizFilter === '3') {
                document.getElementsByClassName('avatars-container').item(0).appendChild(createAvatar(message.avatar_url));
            }
        }
        if (userDetails.topMessages.length < 10) {
            userDetails.topMessages.push(message);
        } else {
            if (userDetails.topMessages.peek().favorited_by.length < message.favorited_by.length) {
                if (senderId === dataFilter && vizFilter === '1') {
                    const initialMessageNode = document.getElementById(`message-${userDetails.topMessages.peek().id}`);
                    initialMessageNode.parentNode.replaceChild(createTopMessage(message), initialMessageNode);
                }
                userDetails.topMessages.pop();
                userDetails.topMessages.push(message);
            }
        }
    }

    groupDetails.processedMessageCount++;
    groupDetails.lastProcessedMessage = message.created_at;
    if (!groupDetails.months[monthYear]) groupDetails.months[monthYear] = 0;
    groupDetails.months[monthYear]++;
    if (groupDetails.topMessages.length < 10) {
        groupDetails.topMessages.push(message);
    } else {
        if (groupDetails.topMessages.peek().favorited_by.length < message.favorited_by.length) {
            if (dataFilter === 'group' && vizFilter === '1') {
                const initialMessageNode = document.getElementById(`message-${groupDetails.topMessages.peek().id}`);
                initialMessageNode.parentNode.replaceChild(createTopMessage(message), initialMessageNode);
            }
            groupDetails.topMessages.pop();
            groupDetails.topMessages.push(message);
        }
    }

    document.getElementById('processed-message-count').innerHTML = groupDetails.processedMessageCount;
    document.getElementById('last-processed-message').innerHTML = moment.unix(groupDetails.lastProcessedMessage).format("LLLL");
}

export const processMessages = (messages, state) => {
    messages.forEach(message => processMessage(message, state));
    updateVisualization(state);
    console.log(state);
}