window.onload = function() {
    displayWeather();
    loadTasks();
};

function displayWeather() {
    // Check if geolocation is supported
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiKey = 'f12fdeff96f043e880edec546683c5c1'; // Your actual API key
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('weather').innerText =
                        `${data.name}: ${data.weather[0].description}, ${data.main.temp}°C`;
                })
                .catch(err => {
                    document.getElementById('weather').innerText = 'Weather data unavailable.';
                });
        });
    } else {
        document.getElementById('weather').innerText = 'Geolocation not supported in your browser.';
    }
}

// To-Do Checklist Functions

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('todoList')) || [];
    const list = document.getElementById('todo-list');
    list.innerHTML = '';
    tasks.forEach((task, i) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.style.cursor = 'pointer';
        if (task.completed) li.style.textDecoration = 'line-through';
        li.onclick = () => toggleTask(i);
        const del = document.createElement('button');
        del.textContent = 'Delete';
        del.style.marginLeft = '1em';
        del.onclick = e => {
            e.stopPropagation();
            deleteTask(i);
        };
        li.appendChild(del);
        list.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById('new-task');
    if (!input.value.trim()) return;
    const tasks = JSON.parse(localStorage.getItem('todoList')) || [];
    tasks.push({ text: input.value.trim(), completed: false });
    localStorage.setItem('todoList', JSON.stringify(tasks));
    input.value = '';
    loadTasks();
}

function toggleTask(index) {
    const tasks = JSON.parse(localStorage.getItem('todoList'));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('todoList', JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('todoList'));
    tasks.splice(index, 1);
    localStorage.setItem('todoList', JSON.stringify(tasks));
    loadTasks();
}
