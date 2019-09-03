import getScoopUser from './javascripts/api/get_scoop_user';
import { groupmeUrl, linkedinUrl, portfolioUrl, githubUrl, openNewTab } from './javascripts/util/footer_links';

const groupScoopState = {
    user: {},
    groups: {},
    ui: {
      phaseTwo: {
        loadedAll: false,
        selected: 0
      },
      phaseThree: {
        dataFilter: 'group',
        vizFilter: '0'
      }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('groupme-link').addEventListener('click', openNewTab(groupmeUrl));
    document.getElementById('linkedin-link').addEventListener('click', openNewTab(linkedinUrl));
    document.getElementById('portfolio-link').addEventListener('click', openNewTab(portfolioUrl));
    document.getElementById('github-link').addEventListener('click', openNewTab(githubUrl));
    document.getElementById('api-key-button').addEventListener('click', function () {
      getScoopUser(groupScoopState);
    });
});