// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const filterTasks = document.getElementById('filterTasks');

// Task array to store all tasks
let tasks = [];

// Add task
const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(task);
        renderTasks();
        taskInput.value = '';
    }
};

// Render tasks
const renderTasks = () => {
    const filteredTasks = filterTasks.value === 'all' ? tasks :
        filterTasks.value === 'completed' ? tasks.filter(task => task.completed) :
        tasks.filter(task => !task.completed);

    taskList.innerHTML = '';
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text}</span>
            <div class="task-actions">
                <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        // Complete task
        li.querySelector('.complete-btn').addEventListener('click', () => {
            task.completed = !task.completed;
            renderTasks();
        });

        // Edit task
        li.querySelector('.edit-btn').addEventListener('click', () => {
            const newText = prompt('Edit task:', task.text);
            if (newText !== null) {
                task.text = newText.trim();
                renderTasks();
            }
        });

        // Delete task
        li.querySelector('.delete-btn').addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks();
        });

        taskList.appendChild(li);
    });
};

// Event listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
filterTasks.addEventListener('change', renderTasks);

// Initial render
renderTasks();