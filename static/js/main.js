var form = document.querySelector('#addForm');
var items = document.querySelector('#items');
var filter = document.querySelector('#filter');

// Event for Adding
form.addEventListener('submit', addItem);
// Delete Event
items.addEventListener('click',removeItem);
// Filter Event
filter.addEventListener('keyup',filterItem)


// Add Item
function addItem(e) {
    /**
     * Add item from text box. For empty textbox it will prompt error message.
     */
    e.preventDefault();

    // Get new item from Textbox
    var newItem = document.querySelector('#item');

    if (newItem.value.trim() != '') {
        // Create li
        var li = document.createElement('li');
        // Add li class
        // li.classList.add('list-group-item');
        li.className = 'list-group-item';
        // add the Text to li from form
        li.appendChild(document.createTextNode(newItem.value));

        var deleteBtn = document.createElement('button');
        // deleteBtn.classList.add = 'btn btn-danger btn-sm float-right delete';
        deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
        deleteBtn.appendChild(document.createTextNode('X'));
        li.appendChild(deleteBtn);

        items.appendChild(li);
        successMessage('Item Added!');
        newItem.value = '';

    } else {
        console.log("Empty Textbox!!");
        errorMessage("Item can not be empty!");
    }
}

// Remove Item
function removeItem(e){
    /**
     * Remove item from list on button click.
     */
    e.preventDefault();
    let itmName = e.target.parentNode.firstChild.textContent;
    if(e.target.classList.contains('delete')){
        if(confirm("Are You Sure to delete " + itmName + "?")){
            var li = e.target.parentNode;
            items.removeChild(li);
            successMessage("Removed Successfully!")
        }
    }
}

// Error Message
function errorMessage(message){
    /**
     * Used to display a message in danger alert.
     */
    var msg = document.createElement('div');
    msg.classList.add('alert');
    msg.classList.add('alert-danger');
    msg.appendChild(document.createTextNode(message));

    var refElement = document.querySelector('#main');
    var container = document.querySelectorAll('.container');

    container[1].insertBefore(msg,refElement);

    setTimeout(() =>{
        container[1].removeChild(msg);
        },3000);
}

// Success Message
function successMessage(message){
    /**
     * Used to display a message in success alert.
     */
    var msg = document.createElement('div');
    msg.classList.add('alert');
    msg.classList.add('alert-success');
    msg.appendChild(document.createTextNode(message));

    var refElement = document.querySelector('#main');
    var container = document.querySelectorAll('.container');

    container[1].insertBefore(msg,refElement);

    setTimeout(() =>{
        container[1].removeChild(msg);
        },3500);
}

// Filter Item
function filterItem(e){
    /**
     * Filter the text entered on Searchbar.
     */
    
    // getting value from filter 
    var filterText = e.target.value.toLowerCase();
    // getting all the lis
    var listItems = items.getElementsByTagName('li');
    // converting to Array and check
    Array.from(listItems).forEach(function(item){
        let itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(filterText) != -1){
            item.style.display = 'block';
        }
        else{
            item.style.display = 'none';
        }
    });
}