const list = document.getElementById('list')
const BtnSearch = document.getElementById('ButtonSearch')
const SearchText = document.getElementById('searchText')
const menu = document.getElementById('TagsList')
const overlay = document.getElementById('overlay')
const modalTitle = document.getElementById('ModalTitle')
const modalSelect = document.getElementById('ModalSelect')
const modalSaveBtn = document.getElementById('ModalButtonSave')
const btnNote = document.getElementById('newNoteButton')
const btnModalClose = document.getElementById('btnModalClose')

let active_tag = 1

const tags = [
    { id: 1, title: 'Все' },
    { id: 2, title: 'Идеи' },
    { id: 3, title: 'Личное' },
    { id: 4, title: 'Работа' },
    { id: 5, title: 'Список покупок' }
]

const notes = []

function func_create_note(note_title, note_tag) {
    const id_last = notes.length + 1
    const newNote = {
        id: id_last, 
        title: note_title, 
        tag: note_tag, 
        updateAt: new Date().toDateString()
    }
    notes.push(newNote)
    render()
}

function create_note(note){
    const element = document.createElement('div')
    element.classList.add('zadachi__item')

    const topDiv = document.createElement('div')
    topDiv.classList.add('zadachi__item-top')
    
    const titleSpan = document.createElement('span')
    titleSpan.innerText = note.title

    const tagSpan = document.createElement('span')
    const foundTag = tags.find(obj => obj.id === note.tag)
    tagSpan.innerText = foundTag ? foundTag.title : '—'

    topDiv.appendChild(titleSpan)
    topDiv.appendChild(tagSpan)

    const downDiv = document.createElement('div')
    downDiv.classList.add('zadachi__item-down')
    const dateSpan = document.createElement('span')
    dateSpan.innerText = note.updateAt
    downDiv.appendChild(dateSpan)

    element.appendChild(topDiv)
    element.appendChild(downDiv)
    
    return element
}

function get_notes(search_value){
    const filtered_notes = notes.filter(function(i) {
        return i.title.toLowerCase().includes(search_value.toLowerCase())
    })
    return filtered_notes
}

function render(){
    list.innerHTML = ''
    let filtered = get_notes(SearchText.value)

    if (active_tag !== 1){
        filtered = filtered.filter(i => i.tag === active_tag)
    }
    
    if(filtered.length === 0){
        const emptyState = document.createElement('div')
        emptyState.className = 'empty-state'
        emptyState.textContent = 'Заметок не найдено'
        list.appendChild(emptyState)
        return
    }
    
    for (let i of filtered){
        const element = create_note(i)
        list.appendChild(element)
    }
}

function init(){
    render()
    
    BtnSearch.addEventListener('click', render)
    
    btnNote.addEventListener('click', function() {
        modalTitle.value = ''
        modalSelect.value = '2'
        overlay.classList.add('overlayOpened')
    })
    
    btnModalClose.addEventListener('click', function() {
        overlay.classList.remove('overlayOpened')
    })
    
    modalSaveBtn.addEventListener('click', function() {
        const title = modalTitle.value.trim()
        if (title) {
            func_create_note(title, Number(modalSelect.value))
            overlay.classList.remove('overlayOpened')
            modalTitle.value = ''
        }
    })

    SearchText.addEventListener('keydown', function(k) {
        if (k.key === 'Enter') {
            render()
        }
    })

    document.addEventListener('keydown', function(k) {
        if (k.key === 'Escape') {
            overlay.classList.remove('overlayOpened')
        }
    })

    document.addEventListener('click', function(e) {
        const clicked_element = e.target
        if (clicked_element.classList.contains('tegs_li')) {
            document.querySelectorAll('.tegs_li').forEach(el => el.classList.remove('active'))
            clicked_element.classList.add('active')
            
            const tagTitle = clicked_element.innerText
            const tag = tags.find(t => t.title === tagTitle)
            if (tag) {
                active_tag = tag.id
                render()
            }
        }
    })
}

init()