// Step One - controller accept request
function getMessage() {
    let msg = document.getElementById("txtmessage").value;
    displayMessage(msg);
}
// Final Step - view
function displayMessage(message) {

    //fist get ol element from page
    element = document.getElementById("results");
    //next create new li element
    let item = document.createElement("li");
    //add classes to li element
    item.classList.add("list-group-item");
    // set message for li element
    item.innerHTML = message;
    // add new item to list
    element.appendChild(item);
}