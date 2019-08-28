// import { getScoopUserInfo } from './javascripts/api/get_scoop_user';
import getScoopUser from './javascripts/api/get_scoop_user';
import { groupmeUrl, linkedinUrl, portfolioUrl, githubUrl, openNewTab } from './javascripts/util/footer_links';

// Refactor state for third phase?
  // Could this be referred to globally as state (instead of passing around function to function?)
const groupScoopState = {
    scoopUser: {},
    groups: {},
    ui: {
      groups: {
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