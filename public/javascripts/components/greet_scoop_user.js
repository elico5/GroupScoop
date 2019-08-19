import moment from 'moment';
import { groupLoad } from '../actions/load';

export default state => {
    document.getElementById('user-greeting-image').src = state.scoopUser.imageUrl;
    const creationDate = moment.unix(state.scoopUser.createdAt).format("LLLL");
    const firstName = state.scoopUser.name.split(" ")[0];
    document.getElementById('user-greeting-heading').innerHTML = `Hi, ${firstName}!`
    document.getElementById('user-greeting-text').innerHTML = `You've been a GroupMe user since ${creationDate}`;
    document.getElementById('api-key-input-container').style.display = 'none';
    document.getElementById('user-greeting-container').style.display = 'flex';
    document.getElementById('keep-moving-button').addEventListener('click', () => {
        groupLoad(state);
    });
};