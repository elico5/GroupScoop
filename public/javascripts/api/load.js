import anime from 'animejs/lib/anime.es.js';
import greetScoopUser from '../components/greet_scoop_user';
import getScoopGroups from './get_scoop_groups';
import { goLeft, goRight, renderGroupPrompt, renderGroupList } from '../components/group_list';
import FetchQueue from '../util/fetch_queue';
import { getInitialMessages } from './get_scoop_messages';

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
            document.getElementById('get-the-scoop-button').addEventListener('click', () => messageLoad(state));
            document.getElementById('prev-page-button').addEventListener('click', () => goLeft(state));
            document.getElementById('next-page-button').addEventListener('click', () => goRight(state));
            getScoopGroups(state, 1).then(
                () => {
                    renderGroupPrompt(state);
                    renderGroupList(state);
                    finishLoad();
                }
            );
        }
    })
};

export const messageLoad = state => {
    anime({
        targets: '[class|=load-rectangle]',
        width: '100%',
        easing: 'easeInOutQuad',
        delay: anime.stagger(300),
        complete: () => {
            const fetchQueue = new FetchQueue();
            fetchQueue.start();
            document.getElementById('group-select-outer-container').style.display = 'none';
            document.getElementById('group-list-outer-container').style.display = 'none';
            getInitialMessages(state, fetchQueue).then(
                () => finishLoad()
            )
        }
    })
}

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