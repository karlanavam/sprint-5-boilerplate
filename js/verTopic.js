var topicId = getParameterByName('topic_id');

//Solo por propositos de debug
if(topicId){
  alert("El topic ID es:"+topicId);
    con.log(topicId);
}

var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/'
};

$.getJSON(api.url, function (tema) {
    tema.forEach(urlIndividual);
    console.log(urlIndividual);
});

var cargarPagina = function () {
    cargarRespuestas();
    urlIndividual();
};

var urlIndividual = function(tema) {
    console.log(tema);
    var id = tema.id;
    console.log(id);
    
    var urlPorTema = api.url + id + "/responses";
};

$(document).ready(cargarPagina);