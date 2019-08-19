export const groupmeUrl = 'https://dev.groupme.com/';
export const linkedinUrl = 'https://www.linkedin.com/in/eli-cohen-19066/';
export const portfolioUrl = '';
export const githubUrl = 'https://github.com/elico5';

export const openNewTab = url => {
    return e => {
        e.stopPropagation();
        window.open(url, '_blank');
    };
};