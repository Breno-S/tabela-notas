const max_alunos = 10;
const min_alunos = 1;

const max_notas = 6;
const min_notas = 1;

let num_notas = 1;
let num_alunos = 1;

let media_total = 0;
let campoMediaTotal = document.getElementById('output-media');

let corpoTabela = document.querySelector('tbody');

/* FUNÇÔES PARA ADICIONAR ELEMENTOS */

function adicionaColuna() {
	num_alunos = getNumAlunos();
	num_notas = getNumNotas();
	
	// limita o número de notas
	if (num_notas < max_notas) {
		let cabecalho = document.querySelector('thead tr');

		let new_th = document.createElement('th');
		new_th.innerText = `Nota ${num_notas+1}`;

		cabecalho.insertBefore(new_th, cabecalho.children[num_notas+2]);

		for (let i = 0; i < num_alunos; i++) {	
			let new_td = document.createElement('td');

			let new_input = document.createElement('input');
			new_input.type = "number";
			new_input.min = "0";
			new_input.max = "100";
			new_input.oninput = calcula;
			
			new_td.appendChild(new_input);
			
			let row_dados = corpoTabela.children[i];
			row_dados.insertBefore(new_td, row_dados.children[num_notas+2]);
		}
	}

	num_notas = getNumNotas();
	console.log("adiciou coluna");
	console.log("num notas = " + num_notas);

	calcula();
}

function adicionaLinha() {
	num_alunos = getNumAlunos();
	num_notas = getNumNotas();

	// limita o número de alunos
	if (num_alunos < max_alunos) {
		let new_tr = document.createElement('tr');
			new_tr.innerHTML = `<td class="numero">${num_alunos+1}</td>
								<td><input class="nome" type="text"></td>`;
			
			for (let i = 1; i <= num_notas; i++) {
				new_tr.innerHTML += `<td><input class="nota" type="number" min="0" max="100" onblur="calcula()"></td>`;
			}

			new_tr.innerHTML += `<td class="media"></td>
								 <td><p class="situacao"></p></td>`;

		corpoTabela.appendChild(new_tr);
	}

	num_alunos = getNumAlunos();
	console.log("adicionou linha");
	console.log("num alunos = " + num_alunos);

	calcula();
}

/* FUNÇÔES PARA REMOVER ELEMENTOS */

function removeLinha() {
	num_alunos = getNumAlunos();

	if (num_alunos > 1) {
		let linha_a_remover = corpoTabela.lastChild;
	
		corpoTabela.removeChild(linha_a_remover);
	}

	num_alunos = getNumAlunos();
	console.log("removeu linha");
	console.log("num alunos = " + num_alunos);

	calcula();
	manterOrdemNums();
}

function removeColuna(){
	num_alunos = getNumAlunos();
	num_notas = getNumNotas();

	if (num_notas > 1) { 
 		for (let i = 0; i < num_alunos; i++) { 
			let row_dados = corpoTabela.children[i]
			let td_a_remover = row_dados.children[(row_dados.children).length-3];
			row_dados.removeChild(td_a_remover);
		}	
		
		let cabecalho = document.querySelector('thead tr');
		let tr_a_remover = cabecalho.children[num_notas+1];
		cabecalho.removeChild(tr_a_remover);
    }

	num_notas = getNumNotas();
	console.log("removeu coluna");
	console.log("num notas = " + num_notas);

	calcula();
}

/* FUNÇÃO DE CALCULAR MÉDIAS E EXIBIR SITUAÇÃO*/

function calcula() {
	campoMediaTotal.textContent = "";
	media_total = 0;

	num_alunos = getNumAlunos();
	num_notas = getNumNotas();

	for (let i = 0; i < num_alunos; i++) {
		let media_aluno = 0;

		let row_dados = corpoTabela.children[i];
		for (let j = 0; j < num_notas; j++) {
			let nota = row_dados.children[2+j].firstElementChild.value;

			media_aluno += parseFloat(nota);
			media_total += parseFloat(nota);
		}
		media_aluno /= num_notas;
		
		let campoMedia = row_dados.children[(row_dados.children.length)-2];
		let campoSituacao = row_dados.children[(row_dados.children.length)-1].firstElementChild;

		if (!(isNaN(media_aluno))) {
			campoMedia.textContent = media_aluno.toFixed(2);
			if (media_aluno < 50) {
				campoSituacao.textContent = "Reprovado";
				campoSituacao.style.backgroundColor = "red";
			} else if (media_aluno >= 50 && media_aluno < 70) {
				campoSituacao.textContent = "Recuperação";
				campoSituacao.style.backgroundColor = "yellow";
			} else {
				campoSituacao.textContent = "Aprovado";
				campoSituacao.style.backgroundColor = "green";
			}
		} else {
			campoMedia.textContent = "";
			campoSituacao.textContent = "";
			campoSituacao.style.backgroundColor = "";
		}
	}

	media_total /= num_notas*num_alunos;

	if (!(isNaN(media_total))) {
		campoMediaTotal.textContent = media_total.toFixed(2);
	} else {
		campoMediaTotal.textContent = "";
	}
}

/* FUNÇÔES DE ORDENAÇÂO */

function ordemAlfabetica() {
	num_alunos = getNumAlunos();

	if (num_alunos > 1) {
		let array_nomes = [];

		for (let i = 0; i < num_alunos; i++) {
			let row_dados = corpoTabela.children[i];
			let nome = row_dados.children[1].firstElementChild.value.toUpperCase();
			
			array_nomes[i] = nome;
		}

		array_nomes.sort(function(a, b){
			if (a > b) {
				return 1;
			}
			if (a < b) {
				return -1;
			}
			return 0;
		});

		let array_temp = [];

		for (let i = 0; i < num_alunos; i++) {
			let linha_a_remover = corpoTabela.firstElementChild;
			
			array_temp[i] = linha_a_remover;
			corpoTabela.removeChild(linha_a_remover);
		}
		
		for (let i = 0; i < array_nomes.length; i++) {
			for (let j = 0; j < array_temp.length; j++) {
				if (array_temp[j].children[1].firstElementChild.value.toUpperCase() == array_nomes[i]) {
					corpoTabela.appendChild(array_temp[j]);
				}
			}	
		}
		
		calcula();
		manterOrdemNums();
	}
}

function ordemMedia() {
	num_alunos = getNumAlunos();
	
	let array_media = [];
	
	for (let i = 0; i < num_alunos; i++) {
		let row_dados = corpoTabela.children[i];
		let media = parseFloat(row_dados.children[row_dados.children.length-2].textContent);

		if (isNaN(media)) {
			alert(`Atenção: um ou mais campos mal preenchidos na linha #${i+1}`);
			return;
		}

		array_media[i] = media;
	}
	
	array_media.sort(function (a, b) { 
		if (a < b) { 
			return 1; 
		} 
		if (a > b) { 
			return -1; 
		}
		return 0; 
	});
	
	let array_temp = [];
	
	for (let i = 0; i < num_alunos; i++) {
		let linha_a_remover = corpoTabela.firstElementChild;
		
		array_temp[i] = linha_a_remover;
		corpoTabela.removeChild(linha_a_remover);
	}
	
	for (let i = 0; i < array_media.length; i++) {
		for (let j = 0; j < array_temp.length; j++) {
			if (parseFloat(array_temp[j].children[(array_temp[j].children.length)-2].textContent) == array_media[i]) {
				corpoTabela.appendChild(array_temp[j]);
			}
		}
	}
		
		calcula();
		manterOrdemNums();
}

function limpar() {
	let num_notas = getNumNotas();
	let num_alunos = getNumAlunos();

	for (let i = 0; i < num_alunos; i++) {
		let row_dados = corpoTabela.children[i];

		let inputNome = row_dados.children[1].firstElementChild;
		inputNome.value = "";

		index_comeco_notas = 2;
		for (let j = 0; j < num_notas; j++) {
			let inputNota = row_dados.children[index_comeco_notas+j].firstElementChild;
			inputNota.value = "";
		}
	}

	calcula();
}

/* UTILIDADES */

function getNumAlunos() {
	return document.querySelector('tbody').childElementCount;
}

function getNumNotas() {
	let row_dados = corpoTabela.children[0];
	return row_dados.childElementCount - 4;
}

function manterOrdemNums() {
	let num_alunos = getNumAlunos();

	for (let i = 0; i < num_alunos; i++) {
		let row_dados = corpoTabela.children[i];
		let td_num = row_dados.firstElementChild;
		
		td_num.innerText = i+1;
	}

}