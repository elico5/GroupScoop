export const groupmeUrl = 'https://dev.groupme.com/';
export const linkedinUrl = 'https://linkedin.com/in/eli-cohen-19066/';
export const portfolioUrl = 'https://elico5.github.io';
export const githubUrl = 'https://github.com/elico5';

export const openNewTab = url => {
    return e => {
        e.stopPropagation();
        window.open(url, '_blank');
    };
};