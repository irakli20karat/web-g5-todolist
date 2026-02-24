const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

const todos = JSON.parse(localStorage.getItem("todos")) || [];

const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
}

const renderTodos = () => {
    todoList.innerHTML = "";
    todos.forEach((todo) => {
        const li = document.createElement("li");
        li.className = `todo-item ${todo.completed ? "completed" : ""}`;
        li.innerHTML = `<span>${todo.text}</span>
            <div class="actions">
                <button class="btn-check" onclick="toggleTodo(${todo.id})">done</button>
                <button class="btn-delete" onclick="deleteTodo(${todo.id})">remove</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

const toggleTodo = (id) => {
    const todo = todos.map((o) =>
        o.id === id ? { ...o, completed: !o.completed } : o
    );
    todos.splice(0, todos.length, ...todo);

    saveToLocalStorage();
    renderTodos();
}

const deleteTodo = (id) => {
    const index = todos.filter((o) => o.id === id)[0];
    todos.splice(todos.indexOf(index), 1);

    saveToLocalStorage();
    renderTodos();
}

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value.trim();
    if (inputValue === "") return;
    console.log(inputValue);

    const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
    }

    todoInput.value = "";

    todos.push(newTodo);
    console.log(todos);
    saveToLocalStorage();
    renderTodos();
})

renderTodos();