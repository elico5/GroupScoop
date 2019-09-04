import anime from 'animejs/lib/anime.es.js';
import getScoopGroups from '../api/get_scoop_groups';
import loadPhaseThree from '../transitions/load_phase_three';
import { goLeft, goRight, renderGroupPrompt, renderGroupList } from '../phase_two/groups';
import finishLoad from './finish_load';

export default state => {
    anime({
        targets: '[class|=load-rectangle]',
        width: '100%',
        easing: 'easeInOutQuad',
        delay: anime.stagger(200),
        complete: () => {
            document.getElementById('user-greeting-container').style.display = 'none';
            document.getElementById('group-select-prompt-container').style.display = 'flex';
            setTimeout(function() {
                document.getElementById('modal-background').addEventListener('click', () => document.getElementById('modal-background').style.display = 'none');
            }, 1000);
            document.getElementById('footer-logo').style.display = 'unset';
            document.getElementById('main').style.display = 'flex';
            document.getElementById('footer').style.display = 'flex';
            document.getElementById('footer-logo').addEventListener('click', () => window.location.reload());
            document.getElementById('get-the-scoop-button').addEventListener('click', () => loadPhaseThree(state));
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
    });
};