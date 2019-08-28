import anime from 'animejs/lib/anime.es.js';
import greetScoopUser from '../phase_one/greet_scoop_user';
import finishLoad from './finish_load';

export default state => {
    anime({
        targets: '[class|=load-rectangle]',
        width: '100%',
        easing: 'easeInOutQuad',
        delay: anime.stagger(300),
        complete: () => {
            greetScoopUser(state);
            finishLoad();
        }
    })
};
