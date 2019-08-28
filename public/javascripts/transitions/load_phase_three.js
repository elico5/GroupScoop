import anime from 'animejs/lib/anime.es.js';
import FetchQueue from '../util/fetch_queue';
import initializePhaseThreeDOM from '../phase_three/initialize_dom';
import { getInitialMessages } from '../api/get_scoop_messages';
import finishLoad from './finish_load';

export default state => {
    anime({
        targets: '[class|=load-rectangle]',
        width: '100%',
        easing: 'easeInOutQuad',
        delay: anime.stagger(300),
        complete: () => {
            const fetchQueue = new FetchQueue();
            fetchQueue.start();
            // what are these Ids?
            document.getElementById('group-select-outer-container').style.display = 'none';
            document.getElementById('group-list-outer-container').style.display = 'none';
            // put the above 2 lines in initializeDOM?
                // generally move these logic portions into helper files?
            initializePhaseThreeDOM(state); 
            // visualize(state); //?
                // * renderVisualization(state);
                    // put in process messages (or process message?)
                        // resolution with pause seemingly has it make more sense after bursts?
                    // clear out what is in visualization container
                    // replace with new data
                // put this in process messages?
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
                    finishLoad();
                }
            )
        }
    })
};