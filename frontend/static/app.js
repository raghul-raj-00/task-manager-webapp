const API_URL = 'https://task-manager-webapp-31wl.onrender.com';

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(`page-${pageId}`).style.display = 'block';
}

async function apiRequest(endpoint, method = 'GET', body = null) {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${API_URL}${endpoint}`, options);
    if (response.status === 401) {
        logout();
        showPage('login');
    }
    return response;
}

async function register(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const res = await apiRequest('auth/register', 'POST', data);
    if (res.ok) {
        alert('Registered successfully!');
        showPage('login');
    } else {
        const err = await res.json();
        alert(err.detail || 'Registration failed');
    }
}

async function login(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // FastAPI OAuth2 password flow expects x-www-form-urlencoded
    const formBody = new URLSearchParams();
    formBody.append('username', data.username);
    formBody.append('password', data.password);

    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_URL}auth/login`, {
        method: 'POST',
        headers,
        body: formBody
    });

    if (res.ok) {
        const { access_token } = await res.json();
        localStorage.setItem('token', access_token);
        localStorage.setItem('username', data.username);
        updateAuthUI();
        showPage('tasks');
        loadTasks();
    } else {
        const err = await res.json();
        alert(err.detail || 'Login failed');
    }
}

function updateAuthUI() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    document.getElementById('auth-links').style.display = token ? 'block' : 'block'; 
    document.getElementById('user-info').style.display = token ? 'inline' : 'none';
    document.getElementById('username-display').textContent = username || '';
    
    // Hide login/reg links if logged in
    const links = document.querySelectorAll('#auth-links a');
    links.forEach(l => l.style.display = token ? 'none' : 'inline');
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    updateAuthUI();
    showPage('login');
}

async function loadTasks(completed = null) {
    let url = 'tasks/';
    if (completed !== null) url += `?completed=${completed}`;
    
    const res = await apiRequest(url);
    if (res.ok) {
        const tasks = await res.json();
        const list = document.getElementById('task-list');
        list.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="task-info ${task.is_completed ? 'completed' : ''}">
                    <strong>${task.title}</strong>
                    <small>${task.description || ''}</small>
                </div>
                <div>
                    <button onclick="toggleTask(${task.id}, ${task.is_completed})">${task.is_completed ? 'Undo' : 'Done'}</button>
                    <button onclick="deleteTask(${task.id})" style="background:red">Delete</button>
                </div>
            `;
            list.appendChild(li);
        });
    }
}

async function createTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;
    if (!title) return alert('Title is required');

    const res = await apiRequest('tasks/', 'POST', { title, description });
    if (res.ok) {
        document.getElementById('task-title').value = '';
        document.getElementById('task-desc').value = '';
        loadTasks();
    }
}

async function toggleTask(id, currentStatus) {
    const res = await apiRequest(`tasks/${id}`, 'PUT', { is_completed: !currentStatus });
    if (res.ok) loadTasks();
}

async function deleteTask(id) {
    if (!confirm('Delete this task?')) return;
    const res = await apiRequest(`tasks/${id}`, 'DELETE');
    if (res.ok) loadTasks();
}

document.getElementById('login-form').addEventListener('submit', login);
document.getElementById('register-form').addEventListener('submit', register);

updateAuthUI();
if (localStorage.getItem('token')) {
    showPage('tasks');
    loadTasks();
} else {
    showPage('login');
}
