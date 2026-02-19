const form = document.getElementById('todo-form');
const list = document.getElementById('list');
let todos = [];

const addToList = (obj) => {
    const li = document.createElement('li');
    const liDiv = document.createElement('div');
    const liDivText = document.createElement('p');
    const liDivCheckbox = document.createElement('input');
    const liDivDelete = document.createElement('button');

    liDivCheckbox.type = 'checkbox';
    liDivCheckbox.checked = obj.completed;
    liDivCheckbox.addEventListener('change', () => {
        obj.completed = liDivCheckbox.checked;
        saveTodos();
    });
    liDivDelete.textContent = 'Delete';
    liDivDelete.addEventListener('click', () => {
        list.removeChild(li);
        todos = todos.filter(todo => todo.id !== obj.id);
        saveTodos();
    });

    liDivText.textContent = obj.text;

    liDiv.appendChild(liDivCheckbox);
    liDiv.appendChild(liDivDelete);
    liDiv.appendChild(liDivText);
    li.appendChild(liDiv);

    list.appendChild(li);

    saveTodos();
}

const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

window.addEventListener('load', () => {
    const storedTodos = localStorage.getItem('todos') || [];
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
        todos.forEach(todo => addToList(todo));
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('todo-input');
    const todoText = input.value.trim();
    if (todoText) {
        const todo = {
            id: Date.now(),
            text: todoText,
            completed: false
        };
        todos.push(todo);
        addToList(todo);
        input.value = '';
    }
});