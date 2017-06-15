var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/'
};

var $temaLista = $("#lista-temas");

var cargarPagina = function () {
    cargarTemas();
    $("#add-form").submit(agregarTemas);
};
 

var cargarTemas = function () {
  $.getJSON(api.url, function (tema) {
    tema.forEach(crearTemas);
      console.log(tema);
  });
}

var crearTemas = function (tema) {
    var id = tema.id;
    var autor = tema.author_name;
    var temaContenido = tema.content;
    var respuestas = tema.responses_count;
    console.log(respuestas);
    
    // creamos la fila
    var $tr = $("<tr />");
    // creamos la celda del nombre
    var $temaTd = $("<td />");
    $temaTd.text(temaContenido + "   -  Por: " + autor);
    // creamos la celda del estado
    var $respuestasTd = $("<td />");
    $respuestasTd.html("Respuestas: " + '<a>' + respuestas + '</a>');
    
    // agregamos las celdas a la fila
    $tr.append($temaTd);
    $tr.append($respuestasTd);

    // agregamos filas a la tabla
    $temaLista.append($tr);    
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