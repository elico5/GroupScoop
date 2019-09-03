import newGroupSlice from '../util/collection/new_group_slice';

export default (state, pageNumber) => {
    const apiKey = state.user.apiKey;
    return fetch(`/user/${apiKey}/groups/page/${pageNumber}`).then(
        response => response.json()
    ).then(
        function(data) {
            const results = data.response;
            if (results.length === 0) {
                document.getElementById('next-page-button').style.display = 'none';
                state.ui.phaseTwo.loadedAll = true;
            } else {
                results.forEach((groupObject, i) => {
                    const groupIndex = i + (pageNumber - 1) * 5;
                    state.groups[groupIndex] = newGroupSlice(groupObject);
                });
                if (results.length < 5) {
                    document.getElementById('next-page-button').style.display = 'none';
                    state.ui.phaseTwo.loadedAll = true;
                }
                state.ui.phaseTwo.selected = (pageNumber - 1) * 5;
                state.ui.phaseTwo.currentPage = pageNumber;
                state.ui.phaseTwo.loadedPageCount = pageNumber;
            }
        }
    );
};