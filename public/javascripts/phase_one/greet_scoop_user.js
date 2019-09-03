import moment from 'moment';
import loadPhaseTwo from '../transitions/load_phase_two';

export default state => {
    document.getElementById('user-greeting-image').src = state.user.imageUrl;
    const creationDate = moment.unix(state.user.createdAt).format("LLLL");
    const firstName = state.user.name.split(" ")[0];
    document.getElementById('user-greeting-heading').innerHTML = `Hi, ${firstName}!`
    document.getElementById('user-greeting-text').innerHTML = `You've been a GroupMe user since ${creationDate}`;
    document.getElementById('api-key-input-container').style.display = 'none';
    document.getElementById('user-greeting-container').style.display = 'flex';
    document.getElementById('keep-moving-button').addEventListener('click', () => {
        loadPhaseTwo(state);
    });
};