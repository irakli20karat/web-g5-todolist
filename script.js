const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoInputDate = document.getElementById("todo-input-date");
const todoList = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
}

const renderTodos = () => {
    todoList.innerHTML = "";
    todos.forEach((todo) => {
        let date = new Date(todo.date).toDateString();
        const li = document.createElement("li");
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `<span><p>${todo.text}</p><p class="date">${date}</p></span>
        <div class="actions">
            <button class="btn-check" onclick="doneBtnClickHandler(${todo.id})">done</button>
            <button class="btn-delete" onclick="deleteBtnClickHandler(${todo.id})">remove</button>
        </div>
`;
        todoList.appendChild(li);
    });
}

const deleteBtnClickHandler = (id) => {
    todos = todos.filter((todo) => todo.id !== id)
    saveToLocalStorage();
    renderTodos();
}

const doneBtnClickHandler = (id) => {
    todos = todos.map((todo) => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo
    })

    saveToLocalStorage();
    renderTodos();
}

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value.trim();
    todoInput.value = '';
    if (!inputValue) return;

    const dateValue = todoInputDate.value;
    todoInputDate.value = '';
    if (!dateValue) return;

    const newTodo = {
        id: Date.now(),
        text: inputValue,
        date: dateValue,
        completed: false
    }
    todos.push(newTodo);
    console.log(todos);
    saveToLocalStorage();
    renderTodos();
})

renderTodos();