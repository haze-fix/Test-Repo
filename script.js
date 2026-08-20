const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load saved tasks on start
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  todoList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = task.text;
    span.addEventListener('click', () => toggleTask(index));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => deleteTask(index));

    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    todoInput.value = '';
    saveTasks();
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

todoForm.addEventListener('submit', addTask);
renderTasks();