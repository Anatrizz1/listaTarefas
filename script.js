let tarefas = JSON.parse(localStorage.getItem('memoriaTarefas')) || [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        let novaTarefa = {
            text: taskText,
            concluida: false
        };
        tarefas.push(novaTarefa);
    }
    taskInput.value = '';
    renderTasks();
}

function renderTasks() {
    const listaHTML = document.getElementById('taskList');
    listaHTML.innerHTML = ''; 

    for (let i = 0; i < tarefas.length; i++) {
        const novoItem = document.createElement('li');
        const textoTarefa = document.createElement('span');
        textoTarefa.textContent = tarefas[i].text;
        if (tarefas[i].concluida) {
            textoTarefa.style.textDecoration = 'line-through';
            textoTarefa.style.color = 'gray';
        }
        const botaoApagar = document.createElement('button');
        const botaoConcluir = document.createElement('button');
        botaoConcluir.textContent = tarefas[i].concluida ? '✅' : '⭕' ;
        botaoApagar.textContent = '❌';
        novoItem.appendChild(textoTarefa);
        novoItem.appendChild(botaoConcluir);
        novoItem.appendChild(botaoApagar);
        listaHTML.appendChild(novoItem);
        botaoConcluir.addEventListener('click', function() {
            tarefas[i].concluida = !tarefas[i].concluida;
            renderTasks();
        });
        botaoApagar.addEventListener('click', function() {
            tarefas.splice(i, 1);
            renderTasks();
        });
    }
    salvarTarefas();
}

addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    } else if (event.key === 'Backspace' && taskInput.value === '') {
        tarefas.pop();
        renderTasks();
    }
});

function salvarTarefas() {
    // Cria uma gaveta chamada 'memoriaTarefas' e guarda a minha lista traduzida em texto lá dentro
    localStorage.setItem('memoriaTarefas', JSON.stringify(tarefas));
}

renderTasks();