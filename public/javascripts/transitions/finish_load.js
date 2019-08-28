import anime from 'animejs/lib/anime.es.js';

export default () => {
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