const goalInput = document.getElementById("goalInput");
const goalList = document.getElementById("goalList");

// Load goals from localStorage
let goals = JSON.parse(localStorage.getItem("goals")) || [];

// Render goals
function renderGoals() {
    goalList.innerHTML = "";

    goals.forEach((goal, index) => {
        const li = document.createElement("li");
        li.className = goal.completed ? "completed" : "";

        li.innerHTML = `
            <span>${goal.text}</span>
            <button class="complete-btn" onclick="toggleGoal(${index})">✔</button>
        `;

        goalList.appendChild(li);
    });
}

// Add new goal
function addGoal() {
    const goalText = goalInput.value.trim();
    if (!goalText) return;

    goals.push({
        text: goalText,
        completed: false
    });

    localStorage.setItem("goals", JSON.stringify(goals));
    goalInput.value = "";
    renderGoals();
}

// Toggle completed state
function toggleGoal(index) {
    goals[index].completed = !goals[index].completed;
    localStorage.setItem("goals", JSON.stringify(goals));
    renderGoals();
}

// Initial render
renderGoals();