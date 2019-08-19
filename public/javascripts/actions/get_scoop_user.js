import { loadGreeting } from './load';

export const getScoopUserInfo = state => {
    const apiKey = document.getElementById('api-key-input').value;
    state.scoopUser.apiKey = apiKey;
    fetch(`/user/${apiKey}`).then(
        function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }
    ).then(
        function(data) {
            ({
                image_url: state.scoopUser.imageUrl,
                name: state.scoopUser.name,
                created_at: state.scoopUser.createdAt
            } = data.response);
            loadGreeting(state);
        }
    ).catch(
        () => document.getElementById('api-key-error').style.display = 'block'
    );
};