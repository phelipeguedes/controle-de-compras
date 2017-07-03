
var list = [
	
	{"desc":"arroz", "quantidade":"1", "valor":"5.10"},
	{"desc":"feijão", "quantidade":"1", "valor":"6.20"},
	{"desc":"cerveja", "quantidade":"1", "valor":"3.99"},
	{"desc":"fralda", "quantidade":"1", "valor":"9.99"}
 ];

 function getTotal(list){
 	var total = 0;

 	for(var key in list){
 		total += list[key].valor  *  list[key].quantidade;
 	}

 	document.getElementById('total').innerHTML = formataValor(total);
 }

 function setList(list){
	var table = '<thead><tr><td>Descrição</td><td>Quantidade</td><td>Valor</td><td>Ação</td></tr></thead><tbody>';

	for(var key in list){
		table += '<tr><td>' + formataDescricao(list[key].desc) + '</td><td>' + formataDescricao(list[key].quantidade) + '</td><td>' +  formataValor(list[key].valor) + '</td><td><button class="btn btn-warning" onclick="setUpdate('+key+');">editar</button>&nbsp;<button class="btn btn-danger" onclick="deletar('+key+');">deletar</button></td></tr>';
		// chama a função que formata a descricao (primeira letra maiúscula)
	}

	table +=  '</tbody>';

	document.getElementById('tabela').innerHTML = table;
	getTotal(list);

	salvarNoStorage(list);
}

 //console.log(getTotal(list));

 function formataDescricao(desc){
 	var str = desc.toLowerCase();
 	str = str.charAt(0).toUpperCase() + str.slice(1); //pega o primeiro caractere da string (charAt(0)) e concatena com o restante da string, a partir do 2º caractere (slice(1))

 	return str;
 }

 function formataValor(valor){
 	var str = parseFloat(valor).toFixed(2) + "";  //  apenas 2 casas decimais após a vírgula e concatena o final p/ string. Isso é necessário devido a substituição do ponto p/ vírgula na próxima linha. str deve ser string
 	str = str.replace(" . " , " , "); //substitui o ponto por vírgula
 	str = "R$" + str; // inclui o cifrão no início do valor
 	return str;
 }

 function addData(){
 	if(validacao() == 0){
 		return false;
 	}

 	var produto = document.getElementById('produto').value;
 	var quantidade = document.getElementById('quantidade').value;
 	var valor = document.getElementById('valor').value;

 	//list.unshift({"desc":produto, "quantidade":quantidade, "valor":valor}); add um novo item no início do array
 	list.push({"desc":produto, "quantidade":quantidade, "valor":valor}); // add um novo item no fim do array

 	setList(list); //chama função que faz a linha da tabela
 }

 function setUpdate(id){
 	var obj = list[id];
 	document.getElementById('produto').value = obj.desc;
 	document.getElementById('quantidade').value = obj.quantidade;
 	document.getElementById('valor').value = obj.valor;
 	
 	document.getElementById('spanIdUpdate').innerHTML = '<input type="hidden" id="idUpdate" value=" '+id+' " />';

 	var x = document.getElementById('btnAdd').style.display = 'none';
 	var y = document.getElementById('btnUpdate').style.display = 'inline-block';
 	document.getElementsByClassName('panel-heading')[0].innerHTML = 'Editar Produto';
 }

 function resetForm(){
 	document.getElementById('produto').value = "";
 	document.getElementById('quantidade').value = "";
 	document.getElementById('valor').value = "";

 	document.getElementById('add').style.display = 'block';
 	document.getElementById('btnUpdate').style.display = 'none';

 	document.getElementsByClassName('panel-heading')[0].innerHTML = 'Cadastre um Produto';
 	document.getElementsByClassName('panel-heading')[0].style.backgroundcolor = '#000';

 	document.getElementById('spanIdUpdate').innerHTML = "";
 	document.getElementById('erros').innerHTML = "" ;
 }

 function updateData(id){
 	if(!validacao() == 0){
 		return;
 	}

 	//document.getElementById('idUpdate').innerHTML = '<input type="hidden" id="idUpdate" value=" '+id+' " />';
 	var id = document.getElementById('idUpdate').value;
 	var produto = document.getElementById('produto').value;
 	var quantidade = document.getElementById('quantidade').value;
 	var valor = document.getElementById('valor').value;
 	document.getElementById('erros').innerHTML = "" ;

 	list[id] = {"desc":produto, "quantidade": quantidade, "valor": valor};
 	resetForm();
 	setList(list);

 	alert(id);
 }

 function deletar(id){
 	if(window.confirm('Tem certeza que deseja retirar este produto da lista?')){
 		var i;
 		if(id === list.length - 1){ 	//atribuindo o último elemento do array a variável id
 			list.pop(); 		          //excluindo este elemento com a função pop
 		}  else if (id === 0){
 			list.shift(id);		         //shift() remove o primeiro elemento do array
 		} else {
 			for (i = 0; i < list.length; i++) {
 				list[i]  = list[i + 1];
 			}

 			list.pop();
 			
 		}
 		setList(list); // chama a função que cria a tabela
 	}
 }

 function limparLista(){
 	if(window.confirm("Quer mesmo apagar todos os itens da lista?")){
 		list = []; // list recebe um array vazio, fazendo com que todos os registros sejam apagados.
 		setList(list); // chama a função para fazer a lista
 	}
 }

 function validacao(){
 	var erros = "";
 	var produto = document.getElementById('produto').value;
 	var quantidade = document.getElementById('quantidade').value;
 	var valor = document.getElementById('valor').value;

 	if(produto === ""){
 		erros += '<p>Preencha o campo produto</p>';	
 		//erros += document.getElementById('produto').innerHTML = 'Preencha o campo produto';
 	}	
 	
 	if(quantidade === ""){
 		erros += '<p>Preencha o campo quantidade</p>';
 		//erros += document.getElementById('quantidade').innerHTML = 'Preencha o campo quantidade';
 	}else if(quantidade != parseInt(quantidade)){			// verifica se quantidade é um valor inteiro
 		erros += '<p>Por favor, insira um número inteiro.</p>';
 		//erros += document.getElementById('quantidade').innerHTML = 'Por favor, insora um número inteiro';
 	}

 	if(valor === ""){
 		erros += '<p>Preencha o campo valor</p>';
 		//erros += document.getElementById('valor').innerHTML = 'Preencha o campo valor';
	} else if(valor != parseFloat(valor)){				// verifica se valor é do tipo float(decimal)	
		erros += '<p>Por favor, insira um valor decimal</p>';
		//erros += document.getElementById('valor').innerHTML = 'Por favor, insira um valor decimal';
	}

 	if(erros != ""){
 		document.getElementById('erros').style.display = "block";
 		document.getElementById('erros').innerHTML = "<p>Erro:</p>" + erros;
 		return 0;
 	}  else {
 		return 1;
 	}
 }

 function salvarNoStorage(list){
 	var jsonStr = JSON.stringify(list);
 	localStorage.setItem('list', jsonStr);
 }

 function iniciarListaNoStorage(){
 	var testList = localStorage.getItem('list');
 	if(testList){
 		list = JSON.parse(testList);
 	}

 	setList(list);
 }

 //executando a função setList(list); 
  
 //console.log(validacao());

 iniciarListaNoStorage();