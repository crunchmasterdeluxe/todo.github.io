window.onload = filterDisplay();

class Todo {
    constructor(thingToDo) {
        this.id = Math.random().toString(15).slice(2);
        this.thing = thingToDo;
        this.isDone = false;
    }
}

function readFromLS() {
  let items = JSON.parse(localStorage.getItem('items'));
  if (items === null) {
      return [];
  }
  return items;
}

function writeToLS(item) {
    console.log('Adding info to local storage: ' + JSON.stringify(item));
  // let itemArray = readFromLS();
  // updatedArray = items.push(item);
  // alert(JSON.Stringify(itemArray));
  // itemString = JSON.Stringify(itemArray);
  // localStorage.setItem('items', updatedArray);
    let itemArray = readFromLS();
    itemArray.push(item);
    localStorage.setItem('items', JSON.stringify(itemArray));
}

function addItem(item) {
    let thingToDo = item;
    writeToLS(new Todo(thingToDo));
    // reset value
    document.getElementById('new-thing').value = '';
    filterDisplay();
}

async function checkOff(itemArray){
  // let itemArray = readFromLS();
  console.log(itemArray.length);
  itemArray.forEach(item => {
    let boxId = 'box-' + item.id;
    console.log(boxId);
    boxId.addEventListener("click",completeItem(item),false)
  });
}

function displayItem(todo) {
    console.log('displayItem received values: ' + JSON.stringify(todo));
    // Create div for todo item
    let item = document.createElement('DIV');
    item.setAttribute('class','item');
    item.setAttribute('id',todo.id);

    // Create checkbox
    let checkbox = document.createElement('INPUT');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('class','checkbox');
    let boxId = 'box-' + todo.id;
    checkbox.setAttribute('id',boxId);
    // checkbox.addEventListener("change",completeItem(todo),false)
    if (todo.isDone) {
      checkbox.setAttribute('checked', 'checked');
      item.setAttribute('class','item-checked');
    }
    else {
      checkbox.removeAttribute('checked');
    }

    let description = document.createElement('LABEL');
    description.innerText = todo.thing;
    checkbox.appendChild(description);

    let remove = document.createElement('BUTTON');
    remove.innerText = 'X';

    // add to div
    item.appendChild(checkbox);
    item.appendChild(description);
    item.appendChild(remove);
    document.getElementById('flex-container2').appendChild(item);
}

function filterDisplay(displayType = 'all') {

    let items = readFromLS();
    console.log('Current items: ' + JSON.stringify(items));
    document.getElementById('flex-container2').innerHTML = "";
    if (items !== null) {
        //showCount(`${todos.length} TASKS`);
        if (items.length > 0) {
            items.forEach(item => {
                console.log(JSON.stringify(item))
                displayItem(item);
            });
        }
        showRemaining(items);
    }
    else {

    }
}

async function completeItem(item) {
    console.log(item.isDone)
    item.isDone = true;
}

function showRemaining(items) {
  let message = `${items.length} Tasks Left`;
  document.getElementById("message-holder").innerHTML = message;
}
