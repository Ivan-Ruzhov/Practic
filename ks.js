const listFindRep = document.querySelector('[data-type = "list"]')
const input = document.querySelector('.wrapper__input')
const saveRep = document.querySelector('.wrapper__save-repositories')
const arrLi = document.querySelectorAll('.wrapper__list-element')
const mapRes = []

const inputVal = function (arr) {
    for (let i = 0; i < arrLi.length; i++) {
        arrLi[i].textContent = arr[i].name;
        mapRes.push({
            Name: arr[i].name,
            Owner: arr[i].owner.login,
            Stars: arr[i].stargazers_count,
        })
    }
}

const createAppend = function (tagName, className, element) {
    const elem = document.createElement(tagName);
    elem.classList.add(className)
    if(element){
        elem.textContent = element
    }
    return elem;
}
const deleteElem = function (event) {
    const parent = event.target.parentNode
    parent.remove()
}

// const closePup = function () {
//     listFindRep.classList.add('wrapper__list-repositories_close')
// }

const findRep = function (elem, name, arr) {
    for (let i = 0; i < arr.length; i++) {
        if(name.textContent === arr[i].Name) {
            const newUl = createAppend('ul', 'info__list')
            const elemOne = createAppend('li', 'info__elem', `Name : ${arr[i].Name}`)
            const elemTwo = createAppend('li', 'info__elem',`Owner: ${arr[i].Owner}`)
            const elemThree = createAppend('li', 'info__elem', `Stars: ${arr[i].Stars}`)
            newUl.append(elemOne,elemTwo,elemThree)
            elem.append(newUl)
        }
    }
    mapRes.length = 0;
    return elem;
}

const appendRep = function (event) {
    const list = createAppend('li', 'wrapper__save-list');
    const button = createAppend('button', 'wrapper__button-close')
    findRep(list, event.target, mapRes)
    saveRep.append(list)
    list.append(button)
    listFindRep.classList.add('wrapper__list-repositories_close')
    input.value = ''
}

const debounce = (fn, debounceTime) => {
    let timer;
    return function(...arg) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arg)
        }, debounceTime)
    }
};

const call = async function  ()  {
        const repos = fetch(`https://api.github.com/search/repositories?q= ${input.value}&sort=stars`)
        listFindRep.classList.remove('wrapper__list-repositories_close');
        await repos.then(response => response.json())
            .then(arr => arr.items)
            .then(items => {
               inputVal(items)
            })
        .catch(e => console.error(e))
        if (input.value === "") {
            listFindRep.classList.add('wrapper__list-repositories_close')
        }
}

const open =  debounce(call, 400)
input.addEventListener('input', open)
listFindRep.addEventListener('click', appendRep)
saveRep.addEventListener('click', deleteElem)





