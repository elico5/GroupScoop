import { processMessages } from "../util/collection/process_message";

export const getInitialMessages = (state, fetchQueue) => {
    const apiKey = state.user.apiKey;
    const groupId = state.groups[state.ui.phaseTwo.selected].groupId;
    return fetch(`/user/${apiKey}/groups/${groupId}/messages`).then(
        function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }
    ).then(
        function(data) {
            const messages = data.response.messages;
            processMessages(messages, state);
            fetchQueue.enqueue(() => {
                getMessages(state, messages[messages.length - 1].id, fetchQueue);
            })
        }
    );
}

export const getMessages = (state, beforeId, fetchQueue) => {
    const apiKey = state.user.apiKey;
    const groupId = state.groups[state.ui.phaseTwo.selected].groupId;
    return fetch(`/user/${apiKey}/groups/${groupId}/messages/${beforeId}`).then(
        function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }
    ).then(
        function (data) {
            const messages = data.response.messages;
            processMessages(messages, state);
            fetchQueue.enqueue(() => {
                getMessages(state, messages[messages.length - 1].id, fetchQueue);
            })
        }
    ).catch(
        () => {
            document.getElementById('pause-button').style.display = 'none';
            document.getElementById('back-to-groups').style.display = 'unset';
        }
    )
}