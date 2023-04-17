window.addEventListener('load', function() {
    var prizgiCakanje = function() {
        document.querySelector('.loading').style.display = block;
    }
    var ugasniCakanje = function() {
        document.querySelector('.loading').style.display = none;
    }

    var nalozi = Document.getElementById("nalozi");
    nalozi.addEventListener('click',prizgiCakanje);

    // Pridobi seznam datotek
    var pridobiSeznamDatotek = function(event) {
        prizgiCakanje();
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                var datoteke = JSON.parse(xhttp.responseText);
                var datotekeHTML = document.querySelector('.datoteka');

                for (var i = 0; i<datoteke.length;i++) {
                    var dodatoteka = datoteke[i];

                    var velikost = datoteke.size;

                    var enota = 'B';

                    datoteke.innerHTML += " \
                        <div class='datoteka'> \
                        <div class='naziv_datoteke'> " + datoteka.datoteka + " (" + velikost + " " + enota + ") </div> \
                        <div class='akcije'> \
                        | <span><a href='/prenesi/" + datoteka.datoteka + "' target='_self'>Prenesi</a></span> \
                        | <span akcija='brisi' datoteka='"+ datoteka.datoteka +"'>Izbriši</span> </div> \
                    </div>";
                }

                if (datoteke.length > 0) {
                    document.querySelector("span[akcija=brisi]").addEventListener('click',brisi);
                }
                ugasniCakanje();
            }
        };
    }

    var brisi = function(event) {
        prizgiCakanje(); 

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {

				if (xhttp.responseText == "Datoteka izbrisana") {
					window.location = "vegabox.html";
				} else {
					alert("Ni bilo mogoče zbrisati datoteko!");
				}
                ugasniCakanje();
			}
			
		};
		xhttp.open("GET", "/brisi/"+this.getAttribute("datoteka"), true);
		xhttp.send();
    }
});