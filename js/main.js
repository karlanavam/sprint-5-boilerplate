var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/'
};

var arregloTemas = [];

var $temaLista = $("#lista-temas");

var cargarPagina = function () {
    cargarTemas();
    filtroTemas();
    $("#add-form").submit(agregarTemas);
    $("#buscarFiltro").submit(filtroTemas);
};

$.getJSON(api.url, function(tema) {
    arregloTemas.forEach(function(temaAArreglo){
      arregloTemas.push(temaAArreglo); 
       console.log(arregloTemas);
    });
});   

var filtroTemas = function (e) {
    e.preventDefault();
    
    var buscarEsteTema = $('#buscar').val().toLowerCase();
    console.log(buscarEsteTema);
    var filtrados = arregloTemas.filter(function(tema){
        return tema.content.toLocaleLowerCase().indexOf(buscarEsteTema) >= 0;
    });
    cargarTemas(filtrados);
};
 
var cargarTemas = function () {
  $.getJSON(api.url, function (tema) {
    tema.forEach(crearTemas);
  });
}

var crearTemas = function (tema) {
    var id = tema.id;
    var autor = tema.author_name;
    var temaContenido = tema.content;
    var respuestas = tema.responses_count;
    
    // creamos la fila
    var $tr = $("<tr />");
    // creamos la celda del nombre
    var $temaTd = $("<td />");
    $temaTd.text(temaContenido + "   -  Por: " + autor);
    // creamos la celda del estado
    var $respuestasTd = $("<td />");
    $respuestasTd.text("Respuestas: " );
    $respuestasTd.attr("href", "verTopic.html");
    
    //Agregamos a para que nos direccionen
    var $a = $("<a />");
    $a.text(respuestas);
    $a.attr("href", "verTopic.html");
    
    // agregamos las celdas a la fila
    $tr.append($temaTd);
    $tr.append($respuestasTd);
    
    $respuestasTd.append($a);

    // agregamos filas a la tabla
    $temaLista.append($tr);  
    
    var inputBuscar = $('#buscar').val();
    
    if (inputBuscar === temaContenido) {
        console.log(inputBuscar);
        console.log(temaContenido);
    }
};

var agregarTemas = function (e) {
    e.preventDefault();
    var nombre = $("#autor-contenido").val();
    var contenidoTema = $("#tema-contenido").val();
    $.post(api.url, {
    author_name: nombre,
    content: contenidoTema    
    }, function (tema) {
    crearTemas(tema);
    $("#myModal").modal("hide");
    });
};

$(document).ready(cargarPagina);
