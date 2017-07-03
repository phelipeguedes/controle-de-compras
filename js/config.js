
function setConfig(){
	var texts = {
		"title": "Controle de Compras"
	};	

	document.title = texts.title; //setando o título da página
	document.getElementById("navTitle").innerHTML = texts.title; //setando o atributo com id 'navTitle'
}

setConfig(); // executando a função


