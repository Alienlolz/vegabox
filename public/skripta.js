window.addEventListener('load', function() {
    // stran nalozena

    var prizgiCakanje = function() {
        document.querySelector('.loading').style.display = "block";
    }
    var ugasniCakanje = function() {
        document.querySelector('.loading').style.display = "none";
    }

    var nalozi = document.getElementById("nalozi");
    nalozi.addEventListener('click',prizgiCakanje);

    // Pridobi seznam datotek
    var pridobiSeznamDatotek = function(event) {
        prizgiCakanje;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                var datoteke = JSON.parse(xhttp.responseText);
                var datotekeHTML = document.querySelector('#datoteke');

                for(var i = 0;i<datoteke.length();i++){
                    var datoteka = datoteke[i];
                    var velikost = datoteka.size;
                    var enota = 'B';
                    datoteke.innerHTML += " \
                    <div class='datoteka'> \
                    <div class='naziv_datoteke'> " + datoteka.datoteka + " (" + velikost + " " + enota + ") </div> \
                    <div class='akcije'> \
                    | <span><a href='/prenesi/" + datoteka.datoteka + "' target='_self'>Prenesi</a></span> \
                    | <span akcija='brisi' datoteka='"+ datoteka.datoteka +"'>Izbriši</span> </div> \
                    </div>";
                } 
            }

            if (datoteke.length > 0) {
                // Dodaj EventListener za dogodek click in klic funkcije brisi
                document.querySelector("span[akcija=brisi]").addEventListener('click',brisi);
            }

            ugasniCakanje;
        }
    };

    var brisi = function(event) {
        prizgiCakanje;

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                /** 2. Preveri da lastnost responseText objekta xhttp odgovarja "Datoteka izbrisana",
                 *  v pozitivnem primeru preusmeri uporabnika na glavno stran (pomoč: window.location)
                 *  sicer sproži alert s sporočilom, ki sporoči uporabniku, da ni moč zbrisati datoteko
                 */
                if (xhttp.responseText == "Datoteka izbrisana") {
                    window.location = hostname;
                } else {
                    alert("Ni dovoljeno zbrisati datoteko.");
                }
                ugasniCakanje;
            }
            
        };
        xhttp.open("GET", "/brisi/"+this.getAttribute("datoteka"), true);
        xhttp.send();
        }
    });