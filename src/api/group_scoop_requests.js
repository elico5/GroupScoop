export const getScoopUserInfo = (state, api_key) => {
    state.scoopUser.api_key = api_key;
    fetch(`https://api.groupme.com/v3/users/me?token=${api_key}`).then(
        response => response.json()
    ).then(
        function(data) {
            ({
                image_url: state.scoopUser.image_url,
                name: state.scoopUser.name,
                created_at: state.scoopUser.created_at
            }) = data.response;
        }
    ).then(
        console.log('transition to group selection?')
    );
    console.log(state);
};