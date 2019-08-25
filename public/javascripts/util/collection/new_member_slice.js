import TinyQueue from "tinyqueue";

export default (id, memberObject, messageObject) => {
    const memberDetails = {};
    if (memberObject) {
        ({
            user_id: memberDetails.userId,
            image_url: memberDetails.imageUrl,
            name: memberDetails.name
        } = memberObject);
        memberDetails.nicknames = [memberObject.nickname];
        memberDetails.avatars = [memberObject.image_url];
    } else if (messageObject) {
        ({
            sender_id: memberDetails.userId,
            avatar_url: memberDetails.imageUrl,
            name: memberDetails.name
        } = messageObject);
        memberDetails.nicknames = [messageObject.name];
        memberDetails.avatars = [messageObject.avatar_url];
    } else {
        memberDetails.userId = id;
        memberDetails.imageUrl = 'https://i.groupme.com/300x300.png.6485c42fdeaa45b5a4b986b9cb1c91a2';
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