import anime from 'animejs/lib/anime.es.js';
import greetScoopUser from '../components/greet_scoop_user';
import getScoopGroups from './get_scoop_groups';

export const loadGreeting = state => {
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

export const groupLoad = state => {
    anime({
        targets: '[class|=load-rectangle]',
        width: '100%',
        easing: 'easeInOutQuad',
        delay: anime.stagger(300),
        complete: () => {
            document.getElementById('modal-background').style.display = 'none';
            document.getElementById('footer-logo').style.display = 'unset';
            document.getElementById('main').style.display = 'flex';
            document.getElementById('footer').style.display = 'flex';
            getScoopGroups(state, 1);
            finishLoad();
        }
    })
};

export const finishLoad = () => {
    anime({
        targets: '[class|=load-rectangle]',
        left: '100%',
        easing: 'easeInOutQuad',
        delay: anime.stagger(300),
        complete: () => {
            const loadRectangles = document.querySelectorAll("div[class|='load-rectangle']");
            for (let i = 0; i < loadRectangles.length; i++) {
                loadRectangles[i].style.width = '0%';
                loadRectangles[i].style.left = 0;
            }
        }
    });
};