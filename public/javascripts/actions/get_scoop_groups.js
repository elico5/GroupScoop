import { createGroupItem } from '../components/group_list';

export default (state, pageNumber) => {
    const apiKey = state.scoopUser.apiKey;
    fetch(`/user/${apiKey}/groups/page/${pageNumber}`).then(
        response => response.json()
    ).then(
        function(data) {
            const results = data.response;
            if (results.length === 0) {
                state.ui.groups.loadedAll = true;
            } else {
                results.forEach((groupObject, i) => {
                    const groupDetails = {};
                    const groupIndex = i + (pageNumber - 1) * 10;
                    ({
                        created_at: groupDetails.createdAt,
                        creator_user_id: groupDetails.creatorUserId,
                        description: groupDetails.description,
                        group_id: groupDetails.groupId,
                        image_url: groupDetails.imageUrl,
                        name: groupDetails.name
                    } = groupObject);
                    groupDetails.messageCount = groupObject.messages.count;
                    groupDetails.memberCount = groupObject.members.length;
                    state.groups[groupIndex] = groupDetails;
                    createGroupItem(groupIndex, groupDetails);
                });
                state.ui.groups.currentPage = pageNumber;
                state.ui.groups.loadedPageCount = pageNumber;
            }
            console.log(state);
        }
    );
};