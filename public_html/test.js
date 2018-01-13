var n = 0;
var otazky = new Array();
var odpovezene = new Array();
var spatneOtazky = new Array();

var spravne = 0;
var spatne = 0;

var otazka;

var x = 0;

function start() {
	zalozOtazky();
	document.getElementById('start').remove();

	document.getElementById('otazka').style.visibility = 'visible';
	//document.getElementById('odpoved').style.visibility = 'visible';
	document.getElementById('check').style.visibility = 'visible';
	document.getElementById('otazkaCislo').style.visibility = 'visible';

	nactiOtazku();
}

function nactiOtazku() {
	if (otazky.length <= n) {
		document.getElementById("form").style.visibility = 'hidden';
		document.getElementById("otazkaCislo").style.visibility = 'hidden';
		document.getElementById("dalsi").style.visibility = "hidden";

		document.getElementById("check").innerHTML = '<p>Správných odpovědí: ' + spravne + '</p>' +
				'<p>Špatných odpovědí: ' + spatne + '</p>' +
				'<button id="spatneOtazky" type="button" onclick=nactiSpatne()>Znovu špatné otázky</button>';
		return;
	}

	while (true) {
		x = Math.floor((Math.random() * otazky.length));

		if (odpovezene.indexOf(x.toString()) == -1)
		{
			odpovezene.push(x.toString());
			break;
		} else {
			continue;
		}
	}

	var used = new Array();
	var rand;
	var numOfQuestion = 0;

	document.getElementById('otazkaCislo').innerHTML = "Otázka " + (n + 1) + " z " + (otazky.length);
	document.getElementById("check").style.visibility = 'hidden';
	document.getElementById("dalsi").style.visibility = 'hidden';
	otazka = otazky[x];
	//document.getElementById('otazka').innerHTML = '<div id="form">' + otazka.otazka + '<br>';

	var str2;
	str2 = '<div id="form">' + otazka.otazka + '<br>';
	if (otazka.typ == "vybiraci")
	{
		str2 += '<br><input id="a" type="radio" name="a" value="a">' + '<span id="aa"> ' + "Pravda" + '</span>';
		str2 += '<br><input id="b" type="radio" name="a" value="a">' + '<span id="bb"> ' + "Nepravda" + '</span>';
	} else
		str2 += '<br><input id="a" type="text" size="60" name="a" value="">';

	str2 += '<br><br><input id="end" type="button" value="Odpovědět" onclick=check()>' + '</div>';
	document.getElementById('otazka').innerHTML = str2;

	/*
	 document.getElementById('otazka').innerHTML = '<div id="form">' + otazka.otazka + '<br>' + 
	 '<br><input id="a" type="radio" name="a" value="a">' + '<span id="aa"> ' + otazka.a + '</span>' +
	 '<br><input id="b" type="radio" name="a" value="a">' + '<span id="bb"> ' + otazka.b + '</span>' +
	 '<br><input id="c" type="radio" name="a" value="a">' + '<span id="cc"> ' + otazka.c + '</span>' +
	 '<br><input id="d" type="radio" name="a" value="a">' + '<span id="dd"> ' + otazka.d + '</span>' + '<br>' +
	 '<br><input id="end" type="button" value="Odpovědět" onclick=check()>' +
	 '</div>';*/
}

function nactiSpatne() {
	document.getElementById("form").style.visibility = 'visible';
	document.getElementById("otazkaCislo").style.visibility = 'visible';
	document.getElementById("dalsi").style.visibility = 'visible';
	document.getElementById('otazka').style.visibility = 'visible';
	document.getElementById('check').style.visibility = 'visible';

	otazky = [];
	otazky = spatneOtazky;
	spatneOtazky = [];
	n = 0;
	x = 0;
	spravne = 0;
	spatne = 0;
	odpovezene = [];
	nactiOtazku();
}

function isEnter(e) {
	if ((event.which == 13 || event.keyCode == 13)) {
		if (document.getElementById("dalsi").style.visibility == 'visible') {
			nactiOtazku();
		} else {
			check();
		}
	}
}

function check() {
	if (otazka.typ == "vybiraci")
		checkVybiraci();
	else
		checkPsaci();
}

function checkPsaci() {
	var ok = true;
	document.getElementById("check").style.visibility = 'visible';

	if (document.getElementById("a").value.toString().toLowerCase() == otazka.odpoved.toString().toLowerCase()) {
		document.getElementById("check").innerHTML = '<p style="color:green">Správná odpověď</p>';
		spravne++;
	} else {
		document.getElementById("check").innerHTML = '<p style="color:red">Špatně!</p>' +
				'Správná odpověď je: ' + otazka.odpoved;
		spatne++;
		spatneOtazky.push(otazka);
	}
	
	if (otazky.length > n) {
		odpovezene.push(x);
		n++;
	}
	
	document.getElementById("end").value = "Další";
	document.getElementById("end").onclick = nactiOtazku;
	
}

function checkVybiraci() {
	//document.getElementById("check").innerHTML = document.getElementById("id1").value;
	document.getElementById("check").style.visibility = 'visible';
	if (document.getElementById("a").checked == true) {
		if (otazka.a == otazka.odpoved) {
			document.getElementById("check").innerHTML = '<p style="color:green">Správná odpověď</p>';
			spravne++;
		} else {
			document.getElementById("aa").style.backgroundColor = 'LightCoral';
			if (otazka.b == otazka.odpoved)
				document.getElementById("bb").style.backgroundColor = 'LightGreen';

			document.getElementById("check").innerHTML = '<p style="color:red">Špatně!</p>' +
					'Správná odpověď je: ' + otazka.odpoved;
			spatne++;
			spatneOtazky.push(otazka);
		}
	} else if (document.getElementById("b").checked == true) {
		if (otazka.b == otazka.odpoved) {
			document.getElementById("check").innerHTML = '<p style="color:green">Správná odpověď</p>';
			spravne++;
		} else {
			document.getElementById("bb").style.backgroundColor = 'LightCoral';
			if (otazka.a == otazka.odpoved)
				document.getElementById("aa").style.backgroundColor = 'LightGreen';

			document.getElementById("check").innerHTML = '<p style="color:red">Špatně!</p>' +
					'Správná odpověď je: ' + otazka.odpoved;
			spatne++;
			spatneOtazky.push(otazka);
		}
	} else {
		if (otazka.b == otazka.odpoved)
			document.getElementById("bb").style.backgroundColor = 'LightGreen';
		else if (otazka.a == otazka.odpoved)
			document.getElementById("aa").style.backgroundColor = 'LightGreen';
		document.getElementById("check").innerHTML = '<p style="color:red">Špatně!</p>' +
				'Správná odpověď je: ' + otazka.odpoved;
		spatne++;
		spatneOtazky.push(otazka);
	}

	if (otazky.length > n) {
		odpovezene.push(x);
		n++;

		//document.getElementById("end").style.visibility = 'hidden';
		//document.getElementById("dalsi").style.visibility = 'visible';
	}

	document.getElementById("end").value = "Další";
	document.getElementById("end").onclick = nactiOtazku;

	/*else{
	 document.getElementById("form").remove();
	 document.getElementById("otazkaCislo").remove();;
	 document.getElementById("check").innerHTML = '<p>Správných odpovědí: ' + spravne + '</p>' + 
	 '<p>Špatných odpovědí: ' + spatne + '</p>'
	 }*/
}

function zalozOtazky() {
	pridejOtazku(
			"Aktiva jsou v rozvaze seřazena podle likvidnosti.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Aktiva se člení na dlouhodobý a oběžný majetek z hlediska jejich formy. Jsou seřazena podle stupně likvidnosti jednotlivých složek majetku.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Aktiva tvoří přehled hospodářských prostředků podle zdrojů jejich nabytí.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Aktivace vnitropodnikových služeb ovlivní externí provozní výnosy.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Cena práce vlastních zaměstnanců vynaložená ve výrobním procesu je externím provozním nákladem.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Cena práce zaměstnanců vložená do výrobního procesu je externí finanční náklad.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Daň z příjmů právnických osob je zaúčtována:<br>MD: Daň z příjmů (náklad)<br>D: Daň z příjmů (pasivum).",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Do aktivní rozvahové položky <i>Dospělá zvířata a jejich skupiny</i> patří kategorie skotu, který je určen k reprodukci.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Faktura dopravce za přepravu nakoupeného materiálu - způsob B:<br>a) cena bez DPH ...... MD: Spotřeba materiálu / -<br>b) DPH .................................... MD: DPH / -<br>c) Celkem .........................................../<br> D: Dodavatelé",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Hospodářské operace při nichž dochází k převodu finančních prostředků z běžného účtu do pokladny jsou operace nepůsobivé.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Hospodářské operace, které souvisí s výrobním procesem (se vznikem nákladů a výnosů) ovlivňují velikost vlastního kapitálu.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Konečné zůstatky Oprávek k dlouhodobému majetku vyjadřují kumulativní odpisy zúčtované za dobu používání majetku.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Náklad vzniká z důvodu úbytku majetku, eventuelně zvýšení závazku.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Nákladové a výnosové účty jsou často nazývány účty výsledkovými, jelikož roční obraty těchto účtů jsou zobrazeny ve Výkazu zisku a ztráty.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Nákup obilí určeného k prodeji dle FAP - způsob B:<br>a) cena bez DPH ...... MD: Prodané zboží /<br>b) DPH ....................................MD: DPH /<br>c) Celkem .........................................../ D:Dodavatelé",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Nákup počítače na fakturu. Účetní jednotka si stanovila výši ocenění, od které bude majetek zařazen do dlouhodobého hmotného majetku 40 000 Kč. Firma je plátcem daně z přidané hodnoty. Přijatá faktura:<br>a) cena bez DPH ... 42 000 Kč ...... MD: Pořízení DHM /<br>b) DPH ............... 8 400 Kč ...... MD: DPH /<br>c) Celkem .......... 50 400 Kč ................ / <br>D: Dodavatelé",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Nákup software na fakturu. Účetní jednotka si stanovila výši ocenění, od které bude majetek zařazen do dlouhodobého nehmotného majetku 60 000 Kč. Firma je plátcem daně z přidané hodnoty. Přijatá faktura:<br>a) cena bez daně ... 53 000 Kč ... MD: Pořízení DNM /<br>b) DPH ............... 10 600 Kč ... MD: Pořízení DNM /<br>c) Celkem ........... 63 600 Kč ......................... / <br>D: Dodavatelé",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Nepůsobivá operace může být účtována jako zvýšení aktiv a souvztažně jako zvýšení cizího kapitálu.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Nepůsobivé hospodářské operace ovlivňují stav (pouze) rozvahových položek s výjimkou vlastního kapitálu. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Nepůsobivé hospodářské operace ovlivňují stav rozvahových položek i vlastního kapitálu.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Nepůsobivé operace se účtují na jednom účtu rozvahovém a jednom účtu výsledkovém.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Nepůsobivé operace se účtují pouze na účtech rozvahových, včetně účtů vlastního kapitálu.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Nepůsobivou operací je výplata mezd zaměstnancům.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Nezaviněná manka a škody na externě pořízených zásobách v rámci norem přirozených úbytků představují mimořádné náklady.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Odpisy dlouhodobého majetku se účtují nepřímo s využitím účtu Oprávky k dlouhodobému majetku, který vyjadřuje snížení hodnoty majetku.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Počáteční stav na účtu Běžný účet se uvádí na straně MD účtu.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Podnikové fondy jsou tvořeny účelově, představují vlastní zdroj financování hospodářských prostředků podniku.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Pořizovací cena nakoupených složek oběžného majetku v okamžiku zaplacení závazku dodavatelům není součástí externích provozních nákladů.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Úbytky zjištěné při inventarizaci se rozlišují mimo jiné i podle příčiny vzniku na nezaviněné a zaviněné.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Záporná změna stavu vlastních zásob představuje tu část produkce, která nebyla spotřebována ani prodána v běžném období.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Záporný stav účtu změna stavu zásob vlastní výroby vzniká, jsou-li úbytky výrobků vlastní výroby v běžném období větší než jejich přírůstky, tedy došlo-li ke spotřebě nebo prodeji veškeré produkce běžného roku a části počáteční zásoby výrobků vlastní výroby.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Konečné zůstatky účtů Oprávek k dlouhodobému hmotnému majetku vyjadřují kumulativní odpisy zúčtované za dobu jeho užívání.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Na účtech pohledávek za zahraničními odběrateli vznikají kurzové ztráty při devalvaci koruny vůči zahraniční měně.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"O nákladech účtujeme zásadně v hospodářském období, ve kterém byly uhrazeny.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Plátce DPH může účtovat o DPH, ale nemusí (záleží na jeho uvážení).",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte pravdivost následujícího tvrzení: Přírůstek zásob vlastní výroby v běžném období k 31.12. představuje interní náklad.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Spotřeba výrobků vlastní výroby představuje interní náklady, které jsou současně druhotnými náklady.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Úbytek cenných papírů v důsledku jejich prodeje je působivá operace.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Vyskladnění výrobků k prodeji je v interním obratu hospodářských prostředků evidováno jako náklad na prodané výrobky.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Ve vnitřním obratu hospodářských prostředků je evidována tvorba produkce výrobků (včetně nedokončených), zvířat a materiálu.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte pravdivost tvrzení z hlediska vlivu hospodářské operace na vlastní kapitál: Předpis zaviněného manka z provozní oblasti viníkovi k náhradě je nepřímo působivá hospodářská operace.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte pravdivost tvrzení z hlediska vlivu hospodářské operace na vlastní kapitál: Spotřeba vyrobené chlévské mrvy na podzimní hnojení je přímo působivá hospodářská operace.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte pravdivost tvrzení z hlediska vlivu hospodářské operace na výsledek hospodaření: Faktura zaslaná odběrateli za prodej výrobků živočišné výroby neovlivňuje výsledek hospodaření.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte pravdivost tvrzení z hlediska vlivu hospodářské operace na výsledek hospodaření: Nákup kancelářských potřeb v hotovosti převzatých na sklad - operace neovlivňuje výsledek hospodaření.<br>Vyberte jednu z nabízených možností:",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte pravdivost tvrzení z hlediska vlivu hospodářské operace na výsledek hospodaření: Spotřeba  krmiv vlastní výroby v živočišné výrobě - operace neovlivňuje výsledek hospodaření.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte pravdivost tvrzení z hlediska vlivu hospodářské operace na výsledek hospodaření: Výběr peněžních prostředků z běžného účtu do pokladny ovlivňuje výsledek hospodaření.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte pravdivost tvrzení z hlediska vlivu hospodářské operace na výsledek hospodaření:<br>Vyskladnění vypěstovaných brambor podnikem k prodeji (dle skladové výdejky). Jedná se o působivou operaci.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Nepůsobivé hospodářské operace ovlivňují stav rozvahových položek i vlastního kapitálu.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Provozní výnosy zahrnují tržby za realizované výkony a úbytky nakoupených zásob za sledované období.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Aktivace vlastních výkonů ovlivní provozní výnosy podniku.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Součástí EPN je cena opotřebení externě pořízených složek dlouhodobého majetku.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Součástí externích provozních nákladů je cena práce vlastních zaměstnanců vynaložená ve výrobním procesu.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte správnost účtovacího předpisu následující operace. Spotřeba nakoupených hnojiv v rostlinné výrobě (dle SV) - úbytek hnojiv ze skladu:<br>MD: Spotřeba materiálu / D: Materiál",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte správnost účtovacího předpisu následující operace. Spotřeba nakoupených osiv při setí ozimé pšenice - úbytek osiva ze skladu (dle výdejky):<br>MD: Změna stavu výrobků / D: Výrobky",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte správnost účtovacího předpisu u plátce DPH. Produkce výrobků vlastní výroby:<br>MD: Výrobky / D: Změna stavu výrobků",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte správnost účtovacího předpisu u plátce DPH:<br>Příjem sklizené cukrové řepy na sklad:<br>MD: Výrobky / D: Změna stavu výrobků",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte správnost účtovacího předpisu. Prodej cenných papírů v tržní ceně dle PPD.<br>MD: Pokladna / D: Cenné papíry",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte správnost účtovacího předpisu. Prodej zboží v prodejní ceně - FAV.<br>MD: Odběratelé / D: Zboží",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte správnost účtovacího předpisu. Úbytky materiálu v rámci norem přirozených úbytků zjištěné při inventarizaci - VÚD.<br>MD: Manka a škody / D: Materiál",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte správnost účtovacího předpisu. Vyskladnění prodaného zboží v pořizovací ceně při jeho prodeji - SV.<br>MD: Odběratelé / D: Tržby za zboží",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte správnost účtovacího předpisu.<br>Prodej zboží na fakturu u plátce DPH:<br>a) úbytek zboží ze skladu (výdejka)<br>MD: Prodané zboží / D: Zboží<br>Vystavená faktura:<br>b) cena bez daně ...... - / D: Tržby za zboží<br>c) DPH ............... MD: DPH / -<br>d) fakturovaná částka celkem ....... MD: Odběratelé / - ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte správnost účtovacího předpisu: Prodej obilí dle nákupních lístků odběratelské organizace.<br>MD: Odběratelé / D: Výrobky",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte správnost účtovacího předpisu: Zaúčtování odpisů dlouhodobého majetku nepřímou metodou (DHM).<br>MD: Odpisy / D: Oprávky k DHM",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte správnost účtovacího předpisu:<br>Tržba z prodeje krátkodobých cenných papírů za hotové v prodejní ceně dle PPD<br>MD: Pokladna / D: Prodané cenné papíry",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte správnost účtování následující operace - firma není plátce DPH:<br>Spotřeba skladovaného materiálu ve výrobě - způsob B:<br>MD: Spotřeba materiálu / D: Materiál",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte správnost účtování následující operace. Jedná se o plátce DPH:<br>FAP za nakoupené zboží - způsob B účtování o zásobách:<br>a) základ daně ....... MD: Zboží / -<br>b) DPH ......... MD: DPH / -<br>c) celkem .......... - / D: Dodavatelé",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte správnost účtování následující operace: Nákup poštovních známek za hotové a jejich okamžité vylepení na dopisy.<br>MD: Ostatní služby / D: Pokladna",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte správnost účtování následující operace: Prodej vlastních výrobků v tržní ceně - FAV.<br>MD: Odběratelé / D: Výrobky",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte správnost účtování následující operace: Předpis škody ošetřovateli k náhradě za zaviněný úhyn zvířat.<br>MD: Pohledávky za zaměstnanci / D: Manka a škody",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte správnost účtování následující operace: Vnitropodniková faktura za přepravu nakoupených selat vlastní nákladní autodopravou.<br>MD: Služby /D: Dodavatelé",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte správnost účtování následující operace: Zaúčtování přírůstku hmotnosti zvířat v kategorii Prasata ve výkrmu (doklad o zjištěné hmotnosti).<br>MD: Zvířata /D: Změna stavu zvířat",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Posuďte správnost účtování následující operace: Zůstatková cena stroje (nebyl plně odepsán) zaúčtována do nákladů při jeho vyřazení v důsledku prodeje:<br>MD: Zůstatková cena prodaného DHM / D: Oprávky k DHM",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Pro rozepisování souhrnných částek ze syntetických účtů na analytické účty platí, že souhrnné částky musí být beze zbytku rozepsány do všech stupňů podrobnosti.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Prodej sena vlastní výroby - vystavená faktura:<br>a) cena bez DPH ...................... / D: Tržby za výrobky<br>d) DPH .................................. / D: DPH<br>c) celkem ........... MD: Odběratelé /",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Přebytky výrobků vlastní výroby zjištěné při inventarizaci se zachytí jako mimořádný výnos.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Přijatá faktura za nakoupený materiál (nejsou náklady spojené s pořízením) bude u plátce DPH zaúčtována:<br>a) cena pořízení ............................. MD: Pořízení materiálu / <br>b) DPH .......................................... / D: DPH<br>c) Celkem ........... / D: Dodavatelé",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Připsané úroky na běžném účtu jsou nákladem.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Přírůstek Závazku vůči dodavateli se účtuje na straně MD účtu.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Působivé hospodářské operace lze evidovat na jednom účtu výsledkovém a se souvztažným zápisem na rozvahovém účtu aktiv. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Působivé hospodářské operace lze evidovat na některém výsledkovém účtu se souvztažným zápisem na rozvahovém účtu cizího kapitálu. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Působivé hospodářské operace mohou ovlivňovat aktiva v rozvaze a současně cizí kapitál. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Působivé hospodářské operace mohou ovlivňovat vlastní kapitál a současně cizí kapitál. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Působivé hospodářské operace mohou ovlivňovat výsledek hospodaření a jeho prostřednictvím vlastní kapitál. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Sklizeň ječmene z vlastní produkce na sklad - SP.<br>MD: Materiál / D: Změna stavu výrobků",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Součástí externích provozních nákladů jsou odpisy dlouhodobého hmotného majetku, které vyjadřují cenu jeho opotřebení připadající na hospodářské období.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Splátka úvěru dle výpisu z běžného účtu a výpisu z úvěrového účtu je působivá operace.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Spotřeba výrobků vlastní výroby a spotřeba podnikových prací a služeb ve vlastním podniku představují interní (druhotné) náklady.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Tržby z realizace vlastních výkonů představují složku externích provozních výnosů.<br>Vyberte jednu z nabízených možností:",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Úbytek na účtu Základní kapitál se účtuje na straně MD účtu.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Účet změna stavu zásob vlastní činnosti může mít konečné saldo kladné (je-li tvorba produkce v daném období vyšší než její užití) nebo záporné (je-li tvorba produkce v daném období nižší než její užití).",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Účtování o penězích. Posuďte správnost účtovacího předpisu:<br>Přijetí bankovního úvěru převodem peněžních prostředků na běžný účet dle výpisu z běžného účtu a výpisu z úvěrového účtu (VBÚ, VÚÚ)<br>MD: Běžný účet / D: Úvěr",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Účtování o penězích. Posuďte správnost účtovacího předpisu:<br>Vklad podnikatele na běžný účet při založení firmy dle výpisu z běžného účtu (VBÚ)<br> MD: Běžný účet / D: Pokladna",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Vyplacená záloha zaměstnanci na pracovní cestu je nákladem.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Vyskladnění nakoupeného obilí určeného k prodeji SV - způsob B:<br>MD: Prodané zboží / D: Zboží",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Zaplacená záloha obchodníkovi s cennými papíry z běžného účtu je působivá operace.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Závazky vůči státním organizacím patří k vlastním zdrojům hospodářských prostředků.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Závazky vůči zaměstnancům z titulu zúčtovaných mezd za provedenou práci patří k vlastním zdrojům financování hospodářských prostředků.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Zemědělská farma nakupuje osivo pro svoji potřebu (budou vynaloženy i náklady spojené s pořízením). Přijatá faktura - způsob A:<br>a) cena bez DPH ...... MD: Pořízení materiálu /<br>b) DPH .............................................../ D: DPH<br>c) Celkem .........................................../ D:Dodavatelé",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Zúčtování zůstatkové ceny při vyřazení stroje v důsledku jeho prodeje je působivá operace, která ovlivňuje výsledek hospodaření.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Došlá faktura za opravu strojů (od neplátce DPH). Zaúčtujte.",
			"",
			"",
			"Opravy a udržování / Dodavatelé",
			"psaci");
	pridejOtazku(
			"Odvod sociálního zabezpečení a zdravotního pojištění místní správě sociálního zabezpečení (dle VBÚ). Zaúčtujte. ",
			"",
			"",
			"Zúčtování s ISZ pojištění / Běžný účet",
			"psaci");
	pridejOtazku(
			"Poskytnutí peněžní zálohy zaměstnanci na služební cestu v hotovosti (výdajový pokladní doklad). Zaúčtujte.",
			"",
			"",
			"Pohledávky za zaměstnanci / Pokladna",
			"psaci");
	pridejOtazku(
			"Předpis daně z nemovitosti. Zaúčtujte.",
			"",
			"",
			"Daň z nemovitosti / Ostatní daně a poplatky",
			"psaci");
	pridejOtazku(
			"Předpis odvodu sociálního a zdravotního pojištění hrazeného zaměstnavatelem (dle zúčtovací a výplatní listiny). Zaúčtujte.",
			"",
			"",
			"Zákonné SZ pojištění / Zúčtování s ISZ pojištění",
			"psaci");
	pridejOtazku(
			"Převod peněžních prostředků z pokladny na běžný účet (výdajový pokladní doklad; výpis z běžného účtu). Zaúčtujte.",
			"",
			"",
			"Běžný účet / Pokladna",
			"psaci");
	pridejOtazku(
			"Přijatá faktura za nákup stravenek (nebyly vydány zaměstnancům). Zaúčtujte.",
			"",
			"",
			"Ceniny / Dodavatelé",
			"psaci");
	pridejOtazku(
			"Úbytek zboží v rámci normy přirozených úbytků - způsob A. Zaúčtujte.",
			"",
			"",
			"Prodané zboží / Zboží",
			"psaci");
	pridejOtazku(
			"Účetní jednotka obdržela fakturu za daňové poradenství (přijatá faktura). Zaúčtujte.",
			"",
			"",
			"Ostatní služby / Dodavatelé",
			"psaci");
	pridejOtazku(
			"Úhrada závazku vůči dodavateli z běžného účtu (výpis z běžného účtu). Zaúčtujte.",
			"",
			"",
			"Dodavatelé / Běžný účet",
			"psaci");
	pridejOtazku(
			"Výplata doplatku čistých mezd zaměstnancům v hotovosti. Zaúčtujte.",
			"",
			"",
			"Zaměstnanci / Pokladna",
			"psaci");
	pridejOtazku(
			"Výplata zálohy na čistou mzdu zaměstnanci v hotovosti (výdajový pokladní doklad). Zaúčtujte.",
			"",
			"",
			"Zaměstnanci / Pokladna",
			"psaci");
	pridejOtazku(
			"Vypořádání nadměrného odpočtu u DPH - VBÚ. Zaúčtujte.",
			"",
			"",
			"Běžný účet / DPH",
			"psaci");
	pridejOtazku(
			"Vyskladnění sena vlastní výroby k prodeji dle skladové výdejky. Zaúčtujte.",
			"",
			"",
			"Změna stavu výrobků / Výrobky",
			"psaci");
	pridejOtazku(
			"Vystavená faktura odběrateli za prodané zboží v prodejní ceně. = 2. krok prodeje. Zaúčtujte.",
			"",
			"",
			"Odběratelé / Tržby z prodeje služeb",
			"psaci");
	pridejOtazku(
			"Vystavená faktura za daňové poradenství. Zaúčtujte.",
			"",
			"",
			"Odběratelé / Tržby z prodeje služeb",
			"psaci");
	pridejOtazku(
			"Z běžného účtu (dle VBÚ) byla zaplacena daňová povinnost u DPH. Zaúčtujte",
			"",
			"",
			"DPH / Běžný účet",
			"psaci");
	pridejOtazku(
			"Zařazení nakoupeného software do používání (při jeho pořízení byly zaúčtované náklady spojené s pořízením)- nyní bude vykázán v dlouhodobém majetku. Zaúčtujte.",
			"",
			"",
			"Software / Pořízení DNM",
			"psaci");
	pridejOtazku(
			"Zařazení počítače do používání na majetkový účet (při jeho pořízení byly zaúčtované náklady spojené s pořízením)- nyní bude vykázán v dlouhodobém majetku. Zaúčtujte.",
			"",
			"",
			"DMV / Pořízení DHM",
			"psaci");
	pridejOtazku(
			"Zúčtování zůstatkové ceny počítače při jeho darování mateřské škole. (Bude následovat jeho vyřazení z evidence). ",
			"",
			"",
			"ZC prodaného DHM / Oprávky k DHM",
			"psaci");
}

function pridejOtazku(otazka, a, b, odpoved, typ) {
	var q = {
		a: a,
		b: b,
		otazka: otazka,
		odpoved: odpoved,
		typ: typ
	};

	otazky.push(q);
}