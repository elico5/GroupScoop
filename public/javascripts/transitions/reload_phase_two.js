import anime from 'animejs/lib/anime.es.js';
import finishLoad from './finish_load';

export default (state) => {
    anime({
        targets: '[class|=load-rectangle]',
        width: '100%',
        easing: 'easeInOutQuad',
        delay: anime.stagger(200),
        complete: () => {
            const userDataFiltersContainer = document.getElementById('user-data-filters-container');
            while (userDataFiltersContainer.firstChild) {
                userDataFiltersContainer.removeChild(userDataFiltersContainer.firstChild);
            }
            let vizFiltersContainer = document.getElementById('user-visualization-filters');
            while (vizFiltersContainer.firstChild) {
                vizFiltersContainer.removeChild(vizFiltersContainer.firstChild);
            }
            vizFiltersContainer.style.display = 'none';
            vizFiltersContainer = document.getElementById('group-visualization-filters');
            while (vizFiltersContainer.firstChild) {
                vizFiltersContainer.removeChild(vizFiltersContainer.firstChild);
            }
            vizFiltersContainer.style.display = 'unset';

            document.getElementById('data-filters-container').style.display = 'none';
            document.getElementById('data-visualization-outer-container').style.display = 'none';
            document.getElementById('group-select-outer-container').style.display = 'block';
            document.getElementById('group-list-outer-container'). style.display = 'block';
            state.ui.phaseThree.dataFilter = 'group';
            state.ui.phaseThree.vizFilter = '0';
            finishLoad()
        }
    })
}