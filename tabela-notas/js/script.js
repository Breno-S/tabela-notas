let min_alunos = 1;
let max_alunos = 10;
let num_alunos = 1;

let min_notas = 1;
let max_notas = 6;
let num_notas = 1;

function adicionaNota() {
    let row_notas1 = document.getElementById("row-dados1");
    num_notas = row_notas1.childElementCount - 3;

    console.log(num_alunos);
    console.log(num_notas);

    if (num_notas < 6) {
        num_notas++;
        let novo_td = document.createElement('td');

        let nova_nota = document.createElement('input');
            nova_nota.type = 'number';
            nova_nota.min = 0;
            nova_nota.max = 0;
            nova_nota.id = `nota${num_alunos}-${num_notas}`;
        
        novo_td.appendChild(nova_nota);

        document.getElementById('row-dados1').appendChild(novo_td);
    }
    
}

function removeNota() {

}

function calcula() {
    console.log(num_alunos);
    console.log(num_notas);

    let soma_notas = 0;
    
    for (let i = 1; i <= num_alunos; i++) {
        for (let j = 1; j <= num_notas; j++) {
            let nota = Number(document.getElementById(`nota${i}-${j}`).value);
            soma_notas += nota;
        }
    }

    media = soma_notas/num_notas*num_alunos;

    console.log(soma_notas);
    console.log(media);
}