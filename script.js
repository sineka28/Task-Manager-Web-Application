let tasks = [];

/* =========================
   ADD TASK
========================= */
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const dueDate = document.getElementById("dueDate");
    const priority = document.getElementById("priority");

    const text = taskInput.value.trim();

    if (!text) {
        alert("Enter a task!");
        return;
    }

    const task = {
        text: text,
        date: dueDate.value,
        priority: priority.value,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";
    dueDate.value = "";

    renderTasks();
}

/* =========================
   RENDER TASKS
========================= */
function renderTasks() {
    const list = document.getElementById("taskList");
    const counter = document.getElementById("taskCounter");

    list.innerHTML = "";

    tasks.forEach((t, i) => {
        const li = document.createElement("li");

        li.classList.add(t.priority.toLowerCase());
        if (t.completed) li.classList.add("completed");

        li.innerHTML = `
            <span onclick="toggleComplete(${i})">
                ${t.text} 
                ${t.date ? "📅 " + t.date : ""}
                (${t.priority})
            </span>

            <button onclick="deleteTask(${i})">❌</button>
        `;

        list.appendChild(li);
    });

    counter.innerText = "Total Tasks: " + tasks.length;
}

/* =========================
   DELETE TASK
========================= */
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

/* =========================
   COMPLETE TASK
========================= */
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

/* =========================
   CLEAR TASKS
========================= */
function clearTasks() {
    tasks = [];
    renderTasks();
}

/* =========================
   DARK MODE
========================= */
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

/* =========================
   AI TASK MANAGER
========================= */
async function askAI() {
    const prompt = document.getElementById("aiPrompt").value;
    const output = document.getElementById("aiResponse");

    if (!prompt.trim()) {
        output.innerHTML = "Please enter input.";
        return;
    }

    output.innerHTML = "Thinking... 🤖";

    const apiKey = "AQ.Ab8RN6I_ocdUWWQEfOv4G5h6qiS887o33NRGOi2tLn6O19CiYw";

    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `
You are a SMART AI TASK PLANNER.

Rules:
- Classify tasks into HIGH / MEDIUM / LOW
- Organize into TODAY / TOMORROW / THIS WEEK
- Keep output clean and structured
- Be short and practical

User input:
${prompt}
                        `
                    }]
                }]
            })
        });

        const data = await res.json();

        if (data.error) {
            output.innerHTML = "❌ " + data.error.message;
            return;
        }

        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        output.innerHTML = text
            ? text.replace(/\n/g, "<br>")
            : "No response from AI";

    } catch (err) {
        output.innerHTML = "❌ " + err.message;
    }
}
