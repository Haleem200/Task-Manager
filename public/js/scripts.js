// Select elements
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginSubmitBtn = document.getElementById('loginSubmitBtn');
const signupSubmitBtn = document.getElementById('signupSubmitBtn');
const viewTasksBtn = document.getElementById('viewTasksBtn');
const backBtn = document.getElementById('backBtn');
const addBtn = document.getElementById('addBtn');
const addTaskForm = document.getElementById('addTaskForm');
const addTaskSubmitBtn = document.getElementById('addTaskSubmitBtn');
const cancelTaskBtn = document.getElementById('cancelTaskBtn');
const taskListDiv = document.getElementById('taskList');
const logoutBtn = document.getElementById('logoutBtn');

let token = '';

// Show login form
loginBtn.addEventListener('click', () => {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
});

// Show signup form
signupBtn.addEventListener('click', () => {
    signupForm.style.display = 'block';
    loginForm.style.display = 'none';
});

// Handle login
loginSubmitBtn.addEventListener('click', () => {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    fetch('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {    
    if (data.status === 'success' && data.data.data && data.data.data.token) {
        token = data.data.data.token;
            loginForm.style.display = 'none';
            showTaskPage();
        } else {
            alert('Login failed. Please check your credentials.');
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
    });
});

// Handle signup
// Handle signup
signupSubmitBtn.addEventListener('click', () => {
const username = document.getElementById('signupUsername').value;
const password = document.getElementById('signupPassword').value;
const passwordConfirm = document.getElementById('signupPasswordConfirm').value;

if (password !== passwordConfirm) {
alert('Passwords do not match. Please confirm your password.');
return; // Exit the function early if passwords don't match
}

fetch('/users/register', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify({ username, password, passwordConfirm })
})
.then(response => {
if (!response.ok) {
    throw new Error('Signup failed.');
}
return response.json();
})
.then(data => {
if (data.token) {
    token = data.token;
    signupForm.style.display = 'none';
    showTaskPage();
} else {
    alert('Signup failed. Please try again.');
}
})
.catch(error => {
console.error('Error during signup:', error);
});
});

// Show the task page
function showTaskPage() {
    viewTasksBtn.style.display = 'inline-block';
    addBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'inline-block';
    loginBtn.style.display = 'none';
    signupBtn.style.display = 'none';
}

// Fetch and display tasks for logged-in user
viewTasksBtn.addEventListener('click', function() {
    fetch('/toDos/', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        taskListDiv.innerHTML = '';
        

        (data.data.toDos || []).forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            if (task.status === 'done') {
                taskDiv.classList.add('done-task');
            }

            const titleDiv = document.createElement('div');
            titleDiv.classList.add('task-title');
            const titleInput = document.createElement('input');
            titleInput.type = 'text';
            titleInput.value = task.title;
            titleDiv.appendChild(titleInput);

            const editIcon = document.createElement('span');
            editIcon.classList.add('edit-icon');
            editIcon.innerHTML = '&#9998;';
            editIcon.addEventListener('click', () => {
                titleDiv.classList.add('editing');
                titleInput.focus();
            });
            titleDiv.appendChild(editIcon);

            const confirmIcon = document.createElement('span');
            confirmIcon.classList.add('confirm-icon');
            confirmIcon.innerHTML = '&#10003;';
            confirmIcon.addEventListener('click', () => {
                titleDiv.classList.remove('editing');
                updateTaskTitle(task._id, titleInput.value, titleDiv);
            });
            titleDiv.appendChild(confirmIcon);

            const deleteIcon = document.createElement('span');
            deleteIcon.classList.add('delete-icon');
            deleteIcon.innerHTML = '&#128465;';
            deleteIcon.addEventListener('click', () => {
                showCustomConfirmation(task._id, taskDiv);
            });
            taskDiv.appendChild(deleteIcon);

            const statusDiv = document.createElement('div');
            statusDiv.classList.add('task-status');
            statusDiv.textContent = `Status: ${task.status}`;
            const statusCheckbox = document.createElement('input');
            statusCheckbox.type = 'checkbox';
            statusCheckbox.checked = task.status === 'done';
            statusCheckbox.addEventListener('change', () => {
                const newStatus = statusCheckbox.checked ? 'done' : 'to-do';
                statusDiv.textContent = `Status: ${newStatus}`;
                updateTaskStatus(task._id, newStatus);
                if (newStatus === 'done') {
                    taskDiv.classList.add('done-task');
                } else {
                    taskDiv.classList.remove('done-task');
                }
            });
            statusDiv.appendChild(statusCheckbox);

            taskDiv.appendChild(titleDiv);
            taskDiv.appendChild(statusDiv);
            taskListDiv.appendChild(taskDiv);
        });
        taskListDiv.style.display = 'block';
        backBtn.style.display = 'inline-block';
        addBtn.style.display = 'inline-block';
        viewTasksBtn.style.display = 'none'; // Hide the view tasks button after displaying the tasks
    })
    .catch(error => {
        console.error('Error fetching tasks:', error);
    });
});

// Back button handler
backBtn.addEventListener('click', function() {
    taskListDiv.style.display = 'none';
    backBtn.style.display = 'none';
    addBtn.style.display = 'none';
    viewTasksBtn.style.display = 'inline-block';
});

// Add task button handler
addBtn.addEventListener('click', function() {
    addTaskForm.style.display = 'block';
});

// Add task form submit handler
addTaskSubmitBtn.addEventListener('click', function() {
    const taskTitle = document.getElementById('taskTitle').value;

    fetch('/toDos/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: taskTitle })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            addTaskForm.style.display = 'none';
            document.getElementById('taskTitle').value = '';
            viewTasksBtn.click(); // Refresh the task list
        } else {
            alert('Failed to add task.');
        }
    })
    .catch(error => {
        console.error('Error adding task:', error);
    });
});

// Cancel add task button handler
cancelTaskBtn.addEventListener('click', function() {
    addTaskForm.style.display = 'none';
});

// Function to update task title
function updateTaskTitle(taskId, newTitle, titleDiv) {
    fetch(`/toDos/${taskId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: newTitle })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status !== 'success') {
            alert('Failed to update task title.');
        }
    })
    .catch(error => {
        console.error('Error updating task title:', error);
    });
}

// Function to update task status
function updateTaskStatus(id, newStatus) {
fetch(`/toDos/${id}`, {
method: 'PATCH',
headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
},
body: JSON.stringify({ status: newStatus })
})
.then(response => {
if (!response.ok) {
    throw new Error('Failed to update task status.');
}
return response.json();
})
.then(data => {
if (data.status !== 'success') {
    alert('Failed to update task status.');
}
})
.catch(error => {
console.error('Error updating task status:', error);
});
}


// Function to show custom confirmation dialog
function showCustomConfirmation(taskId, taskDiv) {
    if (confirm('Are you sure you want to delete this task?')) {
        deleteTask(taskId, taskDiv);
    }
}

// Function to delete task
function deleteTask(taskId, taskDiv) {
    fetch(`/toDos/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.status === 204) {
            // No content to parse, deletion was successful
            return { status: 'success' };
        } else {
            // Attempt to parse the JSON response if it's not a 204
            return response.json();
        }
    })
    .then(data => {
        if (data.status === 'success') {
            taskDiv.remove();
        } else {
            alert('Failed to delete task.');
        }
    })
    .catch(error => {
        console.error('Error deleting task:', error);
    });
}

// Logout button handler
logoutBtn.addEventListener('click', function() {
    token = '';
    loginForm.style.display = 'block';
    viewTasksBtn.style.display = 'none';
    backBtn.style.display = 'none';
    addBtn.style.display = 'none';
    logoutBtn.style.display = 'none';
    taskListDiv.style.display = 'none';
    signupForm.style.display = 'none';
    loginBtn.style.display = 'inline-block';
    signupBtn.style.display = 'inline-block';
});
