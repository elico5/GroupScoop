import newMemberSlice from './new_member_slice';
import TinyQueue from 'tinyqueue';

export default groupObject => {
    const groupDetails = {};
    groupDetails.months = {};
    groupDetails.members = {};
    ({
        created_at: groupDetails.createdAt,
        creator_user_id: groupDetails.creatorUserId,
        description: groupDetails.description,
        group_id: groupDetails.groupId,
        image_url: groupDetails.imageUrl,
        name: groupDetails.name
    } = groupObject);
    groupDetails.imageUrl = groupDetails.imageUrl || 'https://i.groupme.com/300x300.png.e8ec5793a332457096bc9707ffc9ac37';
    groupDetails.avatars = [groupDetails.imageUrl];
    groupDetails.topics = [];
    groupDetails.nicknames = [groupObject.name];
    groupDetails.processedMessageCount = 0;
    groupDetails.messageCount = groupObject.messages.count;
    groupDetails.memberCount = groupObject.members.length;
    groupObject.members.forEach(memberObject => {
        const memberDetails = newMemberSlice(null, memberObject);
        groupDetails.members[memberObject.user_id] = memberDetails;
    })
    groupDetails.topMessages = new TinyQueue([], function (a, b) {
        return a.favorited_by.length - b.favorited_by.length;
    });
    return groupDetails;
}