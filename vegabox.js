var mime = require('mime');
var formidable = require('formidable');
var http = require('http');
var fsextra = require('fs-extra');
var util = require('util');
var path = require('path');

var dataDir = "./data/"
var streznik = http.createServer(function(request,response){
    if(request.url == '/'){
        //posredujOsnovnoStr(response);
    }else if(request.url == '/datoteke') {//poglej
        //posredujSeznamDatotek(response);
    }else if (request.url.startsWith('/prenesi')) {//prenesi
        //posredujStaticnoVsebino(response, dataDir + zahteva.url.replace("/prenesi", ""), "application/otec-stream");
    }else if(request.url == '/izbrisi'){
        //izbrisiDatoteko(response, dataDir + request.url.replace("/izbrisi",""));
    }else if(request.url == '/nalozi'){//nalozi
        //naloyiDatoteko(zahtevo, odgovor);
    }else {
        posredujStaticnoVsebuno(odgovor, './public'+request.url,"");
    }
});

function posredujOsnovnoStr(response){
    posredujStaticnoVsebuno(response, './public/vegabox.html',"");
}
