/* Só p contextualizar
    apresentou na aula 12 de 21.10 (12 da pasta dele 11 no meu notion) mas só deu 1° codigo na aula 13 (12 no meu) nos 70% da aula dps de explicar o projeto
*/

const contador = document.querySelector('#contador');
const botao1 = document.querySelector('#botao1');
const botao2 = document.querySelector('#botao2');
const botao3 = document.querySelector('#botao3');

contando = 0;

botao1.addEventListener('click', function(){
    contando = contando + 1;
    contador.textContent = contando;
})