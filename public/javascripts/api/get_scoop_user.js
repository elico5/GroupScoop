import loadPhaseOne from '../transitions/load_phase_one';
import creds from '../../../creds';
import { defaultUserAvatar } from '../util/defaults';

export default (state, demo) => {
    const apiKey = demo ? creds.key : document.getElementById('api-key-input').value;
    state.user.apiKey = apiKey;
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
                image_url: state.user.imageUrl,
                name: state.user.name,
                created_at: state.user.createdAt
            } = data.response);
            state.user.imageUrl = state.user.imageUrl || defaultUserAvatar;
            loadPhaseOne(state);
        }
    ).catch(
        () => document.getElementById('api-key-error').style.display = 'block'
    );
};