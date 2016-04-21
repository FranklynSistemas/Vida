(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataGlobal = {},
    numImg = 1,
    urlImg = "img/puzzle0" + numImg + ".jpg";

//let urlImg            = "img/puzzle0"+numImg+".jpg",
var matrizPuzzle = [],
    //Para guardar la matriz de la respuesta...
matrizDesorganiza = [];

var valorCorte = 100; //El valor del corte que se hará...
_utils2.default.creaPuzzle(urlImg, valorCorte, function (_ref) {
    var _ref$error = _ref.error;
    var error = _ref$error === undefined ? false : _ref$error;
    var data = _ref.data;

    if (!error) {
        matrizPuzzle = JSON.parse(JSON.stringify(data));
        matrizDesorganiza = JSON.parse(JSON.stringify(data));
        //Crear clase del fondo...
        _utils2.default.createClass(".fondo", "background: url(" + urlImg + ");\n                                     background-repeat: none;\n                                     font-family: Arial;\n                                     color: white;\n                                     text-shadow: 1px 1px 1px black;");
        imprimePuzzle(data);
    }
});

//Para el estilo de las celdas...
var estiloCelda = function estiloCelda(_ref2) {
    var fila = _ref2.fila;
    var columna = _ref2.columna;
    var ocupado = _ref2.ocupado;

    //margin-right: 5px;
    var style = "width: " + valorCorte + "px;\n                 height: " + valorCorte + "px;\n                 display: inline-block;\n                 border: 1px solid black;";
    var clase = "";
    if (ocupado) {
        style += "background-position: -" + fila + "px -" + columna + "px;\n                  cursor: pointer;\n                  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.42);";
        clase = "class = 'fondo'";
    }
    return { style: style, clase: clase };
};

//Para imprimir el Puzzle...
var imprimePuzzle = function imprimePuzzle(data) {
    dataGlobal = data;
    window.global = data;
    //utils.accesoDOM("puzzle").style.height = utils.accesoDOM("puzzle").style.width = `${(valorCorte * data.length) + (data.length * 5)}px`;
    _utils2.default.accesoDOM("puzzle").style.height = _utils2.default.accesoDOM("puzzle").style.width = valorCorte * dataGlobal.length + data.length * 2 + "px";
    var cortes = "";
    for (var veces = 1; veces <= 2; veces++) {
        for (var i = 0; i < dataGlobal.length; i++) {
            if (veces === 1) {
                cortes += "<div class = 'niveles'>";
            }
            for (var c = 0; c < dataGlobal.length; c++) {
                if (veces === 1) {
                    var _estiloCelda = estiloCelda({
                        fila: dataGlobal[i][c].fila,
                        columna: dataGlobal[i][c].columna,
                        ocupado: dataGlobal[i][c].ocupado
                    });

                    var style = _estiloCelda.style;
                    var clase = _estiloCelda.clase;

                    var numero = dataGlobal[i][c].ocupado ? dataGlobal[i][c].cont : "&nbsp;";
                    cortes += "<div id = '" + i + "_" + c + "' " + clase + " style = '" + style + "'>" + numero + "</div>";
                } else {
                    //Para los Listeners...
                    _utils2.default.accesoDOM(i + "_" + c).addEventListener('click', function (event) {
                        var ind = event.target.id.split("_");
                        presionaPieza(Number(ind[0]), Number(ind[1]));
                    });
                }
            }
            if (veces === 1) {
                cortes += "</div>";
            }
        }
        if (veces === 1) {
            _utils2.default.accesoDOM("puzzle").innerHTML = cortes;
        }
    }
};

var presionaPieza = function presionaPieza(fila, columna) {
    //Saber que el elemento presionado, esté ocupado...
    if (matrizDesorganiza[fila][columna].ocupado) {
        //Revisar si se tiene lugar para mover...
        var direcciones = {
            izquierda: [0, -1],
            arriba: [-1, 0],
            derecha: [0, 1],
            abajo: [1, 0]
        };
        for (var i in direcciones) {
            var posBusca = {
                fila: fila + direcciones[i][0],
                columna: columna + direcciones[i][1]
            };
            //console.log(posBusca);
            var enPosicion = posBusca.fila >= 0 && posBusca.fila < matrizPuzzle.length && posBusca.columna >= 0 && posBusca.columna < matrizPuzzle.length;
            if (enPosicion) {
                //Saber si existe espacio...
                //console.log(`${i} ocupado: ${matrizDesorganiza[posBusca.fila][posBusca.columna].ocupado}`);
                if (!matrizDesorganiza[posBusca.fila][posBusca.columna].ocupado) {
                    cambioficha(fila, columna, posBusca.fila, posBusca.columna);
                }
            }
        }
    }
};

var cambioficha = function cambioficha(fila, columna, filaIr, columnaIr) {
    if (!comprobarPuzzle()) {
        var _estiloCelda2 = estiloCelda({
            fila: dataGlobal[fila][columna].fila,
            columna: dataGlobal[fila][columna].columna,
            ocupado: true
        });

        var style = _estiloCelda2.style;
        var clase = _estiloCelda2.clase;

        var styleNone = "width: 100px;\n                 height: 100px;\n                 display: inline-block;\n                 border: 1px solid black;";

        _utils2.default.accesoDOM(fila + "_" + columna).setAttribute("style", styleNone);
        _utils2.default.accesoDOM(filaIr + "_" + columnaIr).setAttribute("style", style);
        _utils2.default.accesoDOM(fila + "_" + columna).classList.remove("fondo");
        _utils2.default.accesoDOM(filaIr + "_" + columnaIr).classList.add("fondo");
        matrizDesorganiza[filaIr][columnaIr].ocupado = true;
        matrizDesorganiza[fila][columna].ocupado = false;
        dataGlobal[filaIr][columnaIr].fila = dataGlobal[fila][columna].fila;
        dataGlobal[filaIr][columnaIr].columna = dataGlobal[fila][columna].columna;
        var contAux = dataGlobal[filaIr][columnaIr].cont;
        dataGlobal[filaIr][columnaIr].cont = dataGlobal[fila][columna].cont;
        dataGlobal[fila][columna].cont = contAux;

        imprimePuzzle(dataGlobal);
    }
};

var comprobarPuzzle = function comprobarPuzzle() {
    var cont = 0;
    for (var i = 0; i < dataGlobal.length; i++) {

        for (var c = 0; c < dataGlobal.length; c++) {
            if (dataGlobal[i][c].cont === matrizPuzzle[i][c].cont) {
                cont++;
            }
        };
    };
    if (cont === matrizDesorganiza.length * matrizDesorganiza.length) {
        return true;
    } else {
        return false;
    }
};

//Para desorganizar el Puzlle..
var desorganizaPuzzle = function desorganizaPuzzle() {
    matrizDesorganiza = [];
    var valorMaximo = Math.pow(matrizPuzzle.length, 2);
    var desorganiza = [],
        fila = 0,
        columna = 0,
        existe = false,
        cont = 0;
    do {
        //Obtener los valores aleatorio...
        existe = false;
        fila = Math.floor(Math.random() * matrizPuzzle.length);
        columna = Math.floor(Math.random() * matrizPuzzle.length);
        if (desorganiza.length !== 0) {
            for (var i = 0; i < desorganiza.length; i++) {
                if (desorganiza[i].fila === fila && desorganiza[i].columna === columna) {
                    existe = true;
                    break;
                }
            }
        }
        if (!existe) {
            desorganiza.push({ fila: fila, columna: columna });
            if (desorganiza.length === valorMaximo) {
                break;
            }
        }
    } while (1);
    //console.log(desorganiza);
    //Para crear la Matriz desorganizada...
    for (var _i = 0; _i < matrizPuzzle.length; _i++) {
        matrizDesorganiza.push([]);
        for (var c = 0; c < matrizPuzzle.length; c++) {
            var posicion = desorganiza[cont];
            matrizDesorganiza[_i][c] = JSON.parse(JSON.stringify(matrizPuzzle[posicion.fila][posicion.columna]));
            cont++;
        }
    }

    imprimePuzzle(matrizDesorganiza);
};

_utils2.default.accesoDOM("Imagen").addEventListener('change', function (event) {
    numImg = _utils2.default.accesoDOM("Imagen").value;
    urlImg = "img/puzzle0" + numImg + ".jpg";
    _utils2.default.creaPuzzle(urlImg, valorCorte, function (_ref3) {
        var _ref3$error = _ref3.error;
        var error = _ref3$error === undefined ? false : _ref3$error;
        var data = _ref3.data;

        if (!error) {
            matrizPuzzle = JSON.parse(JSON.stringify(data));
            matrizDesorganiza = JSON.parse(JSON.stringify(data));
            //Crear clase del fondo...
            _utils2.default.createClass(".fondo", "background: url(" + urlImg + ");\n                                     background-repeat: none;\n                                     font-family: Arial;\n                                     color: white;\n                                     text-shadow: 1px 1px 1px black;");
            imprimePuzzle(data);
        }
    });
});

//Para los botones...
_utils2.default.accesoDOM("desorganiza").addEventListener('click', function (event) {
    desorganizaPuzzle();
});

_utils2.default.accesoDOM("resuelve").addEventListener('click', function (event) {
    matrizDesorganiza = JSON.parse(JSON.stringify(matrizPuzzle));
    imprimePuzzle(matrizPuzzle);
});

_utils2.default.accesoDOM("comprueba").addEventListener('click', function (event) {
    //console.log("Validación de comprobación");
    if (comprobarPuzzle()) {
        _utils2.default.accesoDOM("Mensajes").innerHTML = "<h1>Ganas un besito</h1>";
        _utils2.default.accesoDOM("Mensajes").setAttribute("style", "color:green");
        _utils2.default.accesoDOM("Mensajes").classList.add("efecto");
        setInterval(function () {
            _utils2.default.accesoDOM("Mensajes").classList.remove("efecto");
        }, 4000);
    } else {
        _utils2.default.accesoDOM("Mensajes").innerHTML = "<h1>Pierdes un besito</h1>";
        _utils2.default.accesoDOM("Mensajes").setAttribute("style", "color:red");
        _utils2.default.accesoDOM("Mensajes").classList.add("efectoMal");
        setInterval(function () {
            _utils2.default.accesoDOM("Mensajes").classList.remove("efectoMal");
        }, 4000);
    }
});

},{"./utils":2}],2:[function(require,module,exports){
'use strict';

var accesoDOM = function accesoDOM(param) {
    return document.getElementById(param);
};

var creaCortes = function creaCortes(dimension, corte) {
    var numeroCortes = dimension / corte,
        posicionCortes = [],
        fila = 0,
        columna = 0,
        ocupado = true,
        cont = 1;
    for (var i = 0; i < numeroCortes; i++) {
        fila = 0;
        posicionCortes.push([]);
        for (var c = 0; c < numeroCortes; c++) {
            ocupado = i === numeroCortes - 1 && c === numeroCortes - 1 ? false : true;
            posicionCortes[i].push({
                fila: fila,
                columna: columna,
                ocupado: ocupado,
                cont: cont
            });
            fila += corte;
            cont++;
        }
        columna += corte;
    }
    return posicionCortes;
};

//Para cargar la imagen y devolverla dividida...
var creaPuzzle = function creaPuzzle(urlImg, corte, callback) {
    var imagen = new Image();
    imagen.onload = function () {
        if (imagen.width === imagen.height) {
            callback({ data: creaCortes(imagen.height, corte) });
        } else {
            callback({ error: true });
        }
    };
    imagen.onerror = function () {
        callback({ error: true });
    };
    imagen.src = urlImg;
};

//Crear una clase en ejecución...
//http://stackoverflow.com/a/22697964
var createClass = function createClass(name, rules) {
    var style = document.createElement('style');
    style.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(style);
    if (!(style.sheet || {}).insertRule) {
        (style.styleSheet || style.sheet).addRule(name, rules);
    } else {
        style.sheet.insertRule(name + "{" + rules + "}", 0);
    }
};

module.exports = {
    accesoDOM: accesoDOM,
    creaPuzzle: creaPuzzle,
    createClass: createClass
};

},{}]},{},[1]);
