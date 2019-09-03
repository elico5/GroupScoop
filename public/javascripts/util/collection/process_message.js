import moment from 'moment';
import newMemberSlice from './new_member_slice';
import renderVisualization from '../../phase_three/visualizations/render_visualization';

export const processMessage = (message, state) => {
    const groupDetails = state.groups[state.ui.phaseTwo.selected];
    const senderId = message.sender_id;
    const monthYear = moment.unix(message.created_at).format("MMM-YYYY");

    if (senderId === 'system' || senderId === 'calendar') {
        // System Messages
        if (senderId === 'system' && message.event) {
            switch (message.event.type) {
                case 'membership.notifications.removed':
                    groupDetails.members[message.event.data.remover_user.id].boots++;
                    break;
                case 'group.topic_change':
                    groupDetails.topics.push(message.event.data.topic);
                    break;
                case 'group.name_change':
                    groupDetails.nicknames.push(message.event.data.name);
                    break;
                case 'group.avatar_change':
                    groupDetails.avatars.push(message.event.data.avatar_url);
            }
        }
    } else {
        // User Stats
        if (!groupDetails.members[senderId]) groupDetails.members[senderId] = newMemberSlice(null, null, message);
        const userDetails = groupDetails.members[senderId];
        if (!userDetails.months[monthYear]) userDetails.months[monthYear] = 0;
        userDetails.months[monthYear]++;
        message.favorited_by.forEach(likerId => {
            userDetails.likesReceived++;
            if (!groupDetails.members[likerId]) groupDetails.members[likerId] = newMemberSlice(likerId);
            groupDetails.members[likerId].likesGiven++;
        });
        if (!userDetails.nicknames.includes(message.name)) userDetails.nicknames.push(message.name);
        if (!userDetails.avatars.includes(message.avatar_url)) userDetails.avatars.push(message.avatar_url);
        if (userDetails.topMessages.length < 10) {
            userDetails.topMessages.push(message);
        } else {
            if (userDetails.topMessages.peek().favorited_by.length < message.favorited_by.length) {
                userDetails.topMessages.pop();
                userDetails.topMessages.push(message);
            }
        }
    }

    // Group Stats
    groupDetails.processedMessageCount++;
    groupDetails.lastProcessedMessage = message.created_at;
    if (!groupDetails.months[monthYear]) groupDetails.months[monthYear] = 0;
    groupDetails.months[monthYear]++;
    if (groupDetails.topMessages.length < 10) {
        groupDetails.topMessages.push(message);
    } else {
        if (groupDetails.topMessages.peek().favorited_by.length < message.favorited_by.length) {
            groupDetails.topMessages.pop();
            groupDetails.topMessages.push(message);
        }
    }

    // Frontend render logic 
        // separate into another file?
    document.getElementById('processed-message-count').innerHTML = groupDetails.processedMessageCount;
    document.getElementById('last-processed-message').innerHTML = moment.unix(groupDetails.lastProcessedMessage).format("LLLL");
}

export const processMessages = (messages, state) => {
    messages.forEach(message => processMessage(message, state));
    renderVisualization(state);
    console.log(state);
}