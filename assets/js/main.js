const inputTarefa= document.querySelector('.input-nova-tarefa')
const btnTarefa = document.querySelector('.btn-add-tarefa')
const tarefas = document.querySelector('.tarefas')
function criaLi(){
    const li = document.createElement('li');
    return li
}
// a função criaLi cria um elemento HTML li e retorna para
// que possamos acessar
function limpaInput(){
    inputTarefa.value = ''
    inputTarefa.focus();
}
// a função limpaInput sempre retira o valor que está presente no
//  input e retorna o foco para ele também
function criaBotaoApagar(li){
    li.innerHTML += ' '
    const botaoApagar = document.createElement('button')
    botaoApagar.innerHTML = 'Apagar'
    // botaoApagar.classList.add('apagar')
    botaoApagar.setAttribute('class','apagar')
    botaoApagar.setAttribute('title','Apagar esta tarefa')
    li.appendChild(botaoApagar)
}
// a função criaBotaoApagar cria um elemento button e o coloca dentro
// da tag li;
function criaTarefa(textoInput){
    const li = criaLi();
    li.innerText = textoInput
    tarefas.appendChild(li)
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}
// a função criaTarefa cria uma li, adiciona nela o texto que está 
// no input e coloca esta li como 'filha' da tag ul que tem a classe
// tarefas. Também roda a função limpaInput() e a função criaBtnApagar()
inputTarefa.addEventListener('keypress',function(e){
    if (e.keyCode === 13 ){
        if(!inputTarefa.value)return;
        criaTarefa(inputTarefa.value)
    }
})
// este EventListener verifica se está verificando se a tecla enter
// está sendo pressionada; caso esteja, rada a função criaTarefa 
btnTarefa.addEventListener('click',function(){
    if (!inputTarefa.value)return;
    criaTarefa(inputTarefa.value)
})
// roda a função criaTarefa caso o botão seja clicado;
document.addEventListener('click',function(e){
    const el = e.target;
    if (el.classList.contains('apagar')){
        el.parentElement.remove()
        salvarTarefas();
    }
})
function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li')
    const listaDeTarefas = [];

    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace('Apagar','').trim()
        listaDeTarefas.push(tarefaTexto)
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas)
    console.log(tarefasJSON)
    localStorage.setItem('tarefas',tarefasJSON)
    
}
function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    for (let tarefa of listaDeTarefas){
        criaTarefa(tarefa)
    }
}
adicionaTarefasSalvas()