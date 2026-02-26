let tarefas = JSON.parse(localStorage.getItem('memoriaTarefas')) || [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const textoDigitado = taskInput.value.trim(); // um nome ao texto

    if (textoDigitado !== '') { 
        let objetoTarefa = {
            text: textoDigitado,
            concluida: false
        };
        tarefas.push(objetoTarefa);
        salvarTarefas();  // Salva a lista atualizada no localStorage
    }
    taskInput.value = '';
    renderTasks();
}
function renderTasks(listaParaExibir = tarefas) {
    const listaHTML = document.getElementById('taskList');
    listaHTML.innerHTML = ''; 

    listaParaExibir.forEach((tarefa, index) => {
        const novoItem = document.createElement('li');
        const textoTarefa = document.createElement('span');
        
        textoTarefa.textContent = tarefa.text;

        if (tarefa.concluida) {
            textoTarefa.style.textDecoration = 'line-through';
            textoTarefa.style.color = 'gray';
        }

        const botaoApagar = document.createElement('button');
        const botaoConcluir = document.createElement('button');
        
        botaoConcluir.textContent = tarefa.concluida ? '✅' : '⭕';
        botaoApagar.textContent = '❌';

        novoItem.appendChild(textoTarefa);
        novoItem.appendChild(botaoConcluir);
        novoItem.appendChild(botaoApagar);
        listaHTML.appendChild(novoItem);

        // Ações dos botões
        botaoConcluir.addEventListener('click', function() {
            tarefa.concluida = !tarefa.concluida;
            salvarTarefas(); // Salva primeiro
            renderTasks();   // Redesenha a lista principal
        });

        botaoApagar.addEventListener('click', function() {
            const indexReal = tarefas.indexOf(tarefa);
            tarefas.splice(indexReal, 1);
            salvarTarefas();
            renderTasks();
        });
    });
    
}

function mostrarTodas() {
    renderTasks(tarefas);
}

function mostrarPendentes() {
    const pendentes = tarefas.filter(t => !t.concluida);
    renderTasks(pendentes);
}

function mostrarConcluidas() {
    const concluidas = tarefas.filter(t => t.concluida);
    renderTasks(concluidas);
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

function atualizarBotaoAtivo(idBotao) {
    // Remove a classe 'active' de todos os botões de filtro
    document.getElementById('filterAll').classList.remove('active');
    document.getElementById('filterCompleted').classList.remove('active');
    document.getElementById('filterPending').classList.remove('active');
    
    // Adiciona a classe 'active' apenas no botão clicado
    document.getElementById(idBotao).classList.add('active');
}

// Agora atualizamos as suas funções de filtro:
function filterAll() {
    atualizarBotaoAtivo('filterAll');
    renderTasks(tarefas);
}

function filterCompleted() {
    atualizarBotaoAtivo('filterCompleted');
    const completas = tarefas.filter(t => t.concluida);
    renderTasks(completas);
}

function filterPending() {
    atualizarBotaoAtivo('filterPending');
    const pendentes = tarefas.filter(t => !t.concluida);
    renderTasks(pendentes);
}

renderTasks();