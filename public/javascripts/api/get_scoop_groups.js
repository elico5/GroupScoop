import newGroupSlice from '../util/collection/new_group_slice';

export default (state, pageNumber) => {
    const apiKey = state.scoopUser.apiKey;
    return fetch(`/user/${apiKey}/groups/page/${pageNumber}`).then(
        response => response.json()
    ).then(
        function(data) {
            const results = data.response;
            if (results.length === 0) {
                document.getElementById('next-page-button').style.display = 'none';
                state.ui.groups.loadedAll = true;
            } else {
                results.forEach((groupObject, i) => {
                    const groupIndex = i + (pageNumber - 1) * 5;
                    state.groups[groupIndex] = newGroupSlice(groupObject);
                });
                if (results.length < 5) {
                    document.getElementById('next-page-button').style.display = 'none';
                    state.ui.groups.loadedAll = true;
                }
                state.ui.groups.selected = (pageNumber - 1) * 5;
                state.ui.groups.currentPage = pageNumber;
                state.ui.groups.loadedPageCount = pageNumber;
            }
        }
    );
};