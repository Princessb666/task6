document.addEventListener('DOMContentLoaded', loadTasks);

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasks();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span class="task-text" onclick="toggleComplete('${task.id}')">${task.text}</span>
            <div class="actions">
                <button onclick="deleteTask('${task.id}')" class="delete-btn">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();

    if (text === '') {
        alert('Please enter a task.');
        return;
     }

    const newTask = {
        id: Date.now().toString(),
        text: text,
        completed: false
    };

    const tasks = getTasks();
    tasks.push(newTask);
    saveTasks(tasks);

    input.value = '';
    loadTasks();
}

function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
    loadTasks();
}

function toggleComplete(id) {
    let tasks = getTasks();
    tasks = tasks.map(task => {
if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    saveTasks(tasks);
    loadTasks();
}