// const select ...
// event listener for all the divs
// toggle off selected class
// turn on select class
// update ui slice of state
// call render with new combinations

const createGroupSelectItem = state => {
    // Refactor with refactoring of the ui slice of state
    const groupDetails = state.groups[state.ui.groups.selected];
    document.getElementById('group-data-select-image').src = groupDetails.imageUrl;
    document.getElementById('group-data-select-name').innerHTML = groupDetails.name;
    // Add event listener to div? Give it data attribute
}

export const createUserSelectItem = memberObject => {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('user-data-select-image-container');
    const image = document.createElement('img');
    image.classList.add('user-data-select-image');
    image.src = memberObject.imageUrl;
    imageContainer.appendChild(image);

    const userName = document.createElement('div');
    userName.classList.add('user-data-select-name');
    userName.innerHTML = memberObject.name;


    const itemContainer = document.createElement('div');
    itemContainer.classList.add('user-data-select-item');
    itemContainer.append(imageContainer, userName);

    document.getElementById('data-select-inner-container').append(itemContainer);
    // add event listener to div? Give it data attribute
}

export const createDataSelectItems = state => {
    // refactor with ui slice of state refactoring?
    createGroupSelectItem(state);
    Object.values(state.groups[state.ui.groups.selected].members).forEach(memberObject => {
        createUserSelectItem(memberObject);
    })
}
