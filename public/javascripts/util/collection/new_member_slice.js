import TinyQueue from "tinyqueue";
import { defaultUserAvatar } from '../defaults';

export default (id, memberObject, messageObject) => {
    const memberDetails = {};
    if (memberObject) {
        ({
            user_id: memberDetails.userId,
            image_url: memberDetails.imageUrl,
            name: memberDetails.name
        } = memberObject);
        memberDetails.imageUrl = memberDetails.imageUrl || defaultUserAvatar;
        memberDetails.nicknames = [memberObject.nickname];
        memberDetails.avatars = [memberObject.image_url];
    } else if (messageObject) {
        ({
            sender_id: memberDetails.userId,
            avatar_url: memberDetails.imageUrl,
            name: memberDetails.name
        } = messageObject);
        memberDetails.imageUrl = memberDetails.imageUrl || defaultUserAvatar;
        memberDetails.nicknames = [messageObject.name];
        memberDetails.avatars = [memberDetails.imageUrl];
    } else {
        memberDetails.userId = id;
        memberDetails.imageUrl = defaultUserAvatar;
        memberDetails.name = 'Unknown';
        memberDetails.avatars = [];
        memberDetails.nicknames = [];
    }
    memberDetails.boots = 0;
    memberDetails.likesGiven = 0;
    memberDetails.likesReceived = 0;
    memberDetails.months = {};
    memberDetails.topMessages = new TinyQueue([], function(a, b) {
        return a.favorited_by.length - b.favorited_by.length;
    });
    return memberDetails;
}