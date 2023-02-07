const listFindRep = document.querySelector('[data-type = "list"]')
const input = document.querySelector('.wrapper__input')
const saveRep = document.querySelector('.wrapper__save-repositories')
const mapRes = []

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

const closePup = function () {
    listFindRep.classList.add('wrapper__list-repositories_close')
}

const findRep = function (elem, name, arr) {
    for (let i = 0; i < arr.length; i++) {
        if(name.textContent === arr[i].Name) {
            elem.insertAdjacentHTML('afterbegin', `
        <ul class = "info__list">
            <li class="info__elem">Name : ${arr[i].Name}</li>
            <li class="info__elem">Owner: ${arr[i].Owner}</li>
            <li class="info__elem">Stars: ${arr[i].Stars}</li>
        </ul>`)
        }
    }
    mapRes.length = 0;
    return elem;
}

const appendRep = function (event) {
    if(input.value !== " ") {
        const list = createAppend('li', 'wrapper__save-list');
        const button = createAppend('button', 'wrapper__button-close')
        list.append(button)
        findRep(list, event.target, mapRes)
        saveRep.append(list)
        listFindRep.classList.add('wrapper__list-repositories_close')
        input.value = ''
    }
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
                const arrLi = document.querySelectorAll('.wrapper__list-element')
                for (let i = 0; i < arrLi.length; i++) {
                    arrLi[i].textContent = items[i].name;
                    mapRes.push({
                        Name: items[i].name,
                        Owner: items[i].owner.login,
                        Stars: items[i].stargazers_count,
                    })
                }
            }).catch(e => console.error(e))
        if (input.value === "") {
            listFindRep.classList.add('wrapper__list-repositories_close')
        }
}

const open = debounce(call, 400)

input.addEventListener('input', open)

listFindRep.addEventListener('click', appendRep)

saveRep.addEventListener('click', deleteElem)




