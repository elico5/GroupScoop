import anime from 'animejs/lib/anime.es.js';
import FetchQueue from '../util/fetch_queue';
import initializePhaseThreeDOM from '../phase_three/initialize_dom';
import { getInitialMessages } from '../api/get_scoop_messages';
import finishLoad from './finish_load';
import reloadPhaseTwo from './reload_phase_two';

export default state => {
    anime({
        targets: '[class|=load-rectangle]',
        width: '100%',
        easing: 'easeInOutQuad',
        delay: anime.stagger(200),
        complete: () => {
            const fetchQueue = new FetchQueue();
            fetchQueue.start();
            document.getElementById('group-select-outer-container').style.display = 'none';
            document.getElementById('group-list-outer-container').style.display = 'none';
            initializePhaseThreeDOM(state); 
            getInitialMessages(state, fetchQueue).then(
                () => {
                    document.getElementById('data-visualization-outer-container').style.display = 'unset';
                    document.getElementById('data-filters-container').style.display = 'block';
                    document.getElementById('pause-button').addEventListener('click', e => {
                        fetchQueue.pause();
                        e.currentTarget.style.display = 'none';
                        document.getElementById('resume-button').style.display = 'unset';
                    });
                    document.getElementById('resume-button').addEventListener('click', e => {
                        fetchQueue.resume();
                        e.currentTarget.style.display = 'none';
                        document.getElementById('pause-button').style.display = 'unset';
                    });
                    document.getElementById('back-to-groups').addEventListener('click', e => {
                        e.currentTarget.style.display = 'none';
                        document.getElementById('pause-button').style.display = 'unset';
                        reloadPhaseTwo(state, fetchQueue);
                    });
                    finishLoad();
                }
            )
        }
    })
};