const draggableList = document.getElementById('draggable-list')
const btnCheck = document.getElementById('check-btn')

const richestPeople = [
    'Jeff Bezos',
    'Elon Musk',
    'Bernard Arnault',
    'Bill Gates',
    'Mark Zuckerberg',
    'Warren Buffett',
    'Larry Ellison',
    'Larry Page',
    'Sergey Brin',
    'Amancio Ortega'
]

// Store list items created by js like li elements
const listItems = [];

let dragStartIndex

createList()

// INSERT LIST ITEMS INTO DOM
function createList() {
    // CODE FROM COURSE
    // [...richestPeople] //create copy of original array
    //     .map(people => ({ value: people, sort: Math.random() })) //put values into object and add math.random value
    //     .sort((a, b) => a.sort - b.sort) // sort object
    //     .map(people => people.value) // get only people out of object with new sort
    //     .forEach((person, index) => {
    //         const listItem = document.createElement('li')
    //         listItem.setAttribute('data-index', index)
    //         console.log(person)

    //         listItem.innerHTML = `
    //     <span class="number">${index + 1}</span>
    //     <div class="draggable" draggable="true">
    //     <p class="person-name">${person}</p>
    //     <i class="fas fa-grip-lines"></i>
    //     </div>
    //     `

    // MY CODE
    let newPeopleArray = []
    // Randomize items, pull from richestPeople and push to newArray
    while (newPeopleArray.length < richestPeople.length) {
        let random = Math.floor(Math.random() * (richestPeople.length - 0) + 0)
        if (newPeopleArray.includes(richestPeople[random]) === false) {
            newPeopleArray.push(richestPeople[random])
        }
    }
    // Pull people to DOM
    newPeopleArray.forEach((person, index) => {
        const listItem = document.createElement('li')
        listItem.setAttribute('data-index', index)

        listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
        </div>
        `

        // push created li element into array
        listItems.push(listItem)

        draggableList.appendChild(listItem)
    })

    addEventListeners()
}

// Drag and Drop API - https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

function dragStart() {
    // console.log('start')
    dragStartIndex = this.closest('li').getAttribute('data-index')

}
function dragEnter(e) {
    // console.log('enter')
    // this.classList.add('over')

    // it works with "e" also
    e.target.parentElement.classList.add('over')
}
function dragLeave() {
    // console.log('leave')
    this.classList.remove('over')
}
function dragOver(e) {
    console.log('over')

    // DRAG OVER EVENT IS A PROBLEM, STOP IT !
    e.preventDefault()

    e.target.parentElement.classList.add('over')
}
function dragDrop() {
    // console.log('drop')
    const dragEndIndex = this.getAttribute('data-index')
    swapItems(dragStartIndex, dragEndIndex)

    this.classList.remove('over')
}

// SWAP ELEMENTS ON DROP
function swapItems(fromIndex, toIndex) {
    // console.log(fromIndex, toIndex)

    const itemOne = listItems[fromIndex].querySelector('.draggable')
    const itemTwo = listItems[toIndex].querySelector('.draggable')

    listItems[fromIndex].appendChild(itemTwo)
    listItems[toIndex].appendChild(itemOne)
}

// CHECK THE CORRECT ORDER OF LIST ITEMS
function checkOrder() {
    const allItemNamesLi = document.querySelectorAll('li .person-name')
    // console.log(allItemNamesLi)

    allItemNamesLi.forEach((itemName, idx) => {
        // pull out item name value
        const itemNameValue = itemName.innerHTML
        // if item name value is same as richestPeople index
        if (itemNameValue === richestPeople[idx]) {
            itemName.closest('li').classList.remove('wrong')
            itemName.closest('li').classList.add('right')
        } else {
            itemName.closest('li').classList.remove('right')
            itemName.closest('li').classList.add('wrong')
        }
    })
}


function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable')
    const dragListItems = document.querySelectorAll('.draggable-list li')

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart)
    })

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    })
}

btnCheck.addEventListener('click', checkOrder)