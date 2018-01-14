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
			"Při účetní uzávěrce se roční obraty nákladových a výnosovách účtu převádejí rovnou na Konečný účet Rozvazný",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Výplata mzdy zaměstantcům v hotovosti je pusobivá operace",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Výběr penez z firemniho běžného účtu pro osobní spotřebu je pusobivá operace a účtuje se jako UIP / BU",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Zaúčtovaná nároku zaměstnanců na hrubé mzdy podle zúčtovací a výplatní listiny je operace působivá",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Vyskladnění zboží k prodeji v pořizovací ceně je působivá operace",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Hmotností přírustek zvířat ve výkrmu se účtuje jako:<br>Dospělá zvířata a jejich skupiny/ Změna stavu zvířat",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Spotřeba osvia ze sklizně minulého roku ( skladová výdejka) se účtuje jako <br>Spotřeba materiálu/ Materiál",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Při nákupu , DPH se účtuje na stranu vstupu tj. Na stranu MD",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Nárok na vrácení DPH od finančního úřadu je v případě kdy strany MD účtu DPH je větší než strana Dal",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Pokud strana MD u účtu DPH obsahuje částku 1000 a strana Dal 500 jedná se o danový závazek vučí finančnímu úřadu",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"U plátce DPH, částka DPH se zahrnuje do pořizovací ceny",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Účet DPH je výsledkový účet a vykazuje se v Rozvaze",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Danová povinnost z titulu DPH vzniká v případě že strana Dal účtu DPH je větší než strana MD",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Nepůsobivá operace se účtuje na účtehc aktiv a cizího kapitálu",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Nepusobivá operace se účtuje na rozvahových účtech tj. Na účtech aktiv,cicího kapitálu a vlastního kapitálu",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"[?] Účet: Změna stavu výrobků může mít kladní a záporný konečný zůstatek. Jestli má kladný zůstatek vykazuje se v aktivech s plusem. Jestli má záporný zůstatek vykazuje se v pasivech s mínusem",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"[?] Účet“ Změna stavu výrobků“ je nákladový účet. Pokud ale mý záporný zůstatek tak se vykazuje jako výnos",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"[?] Přírustek vlastních zásob na skladě po sklizni se účtuje  Výrobky / Změna stavu výrobků",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Oprávky k dlouhodébomu majetku jsou kontraaktivní účet a vykazující v rozvaze",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Zřizovací výdaje patří do dlouhodobého hmotného majetku",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Spotřeba materiálu ve výrobním procesu (skladová výdejka)",
			"",
			"",
			"Spotřeba materiálu / Materiál",
			"psaci");
	pridejOtazku(
			"Přijatá Faktura od PRE za spotřebu elektrické energie",
			"",
			"",
			"Spotřeba energie / Dodavatelé",
			"psaci");
	pridejOtazku(
			"Vyskladnění zboží ze skladu z duvodu prodeje (skladová výdejka",
			"",
			"",
			"Prodané zboží / Zboží",
			"psaci");
	pridejOtazku(
			"Tržba za zboží v ceně prodejní (vystavení faktury)",
			"",
			"",
			"Odběratelé / Tržby za zboží",
			"psaci");
	pridejOtazku(
			"Nákup zboží na fakturu (přijatá faktura neplátce dph) částka 250kč",
			"",
			"",
			"Zboží / Dodavatelé",
			"psaci");
	pridejOtazku(
			"Doprava nakoupeného zboží vlastní autodoprava",
			"",
			"",
			"Pořízení zboží / Aktivace VP služeb",
			"psaci");
	pridejOtazku(
			"Zúčtovaní nároku zaměstnanců na hrubé mzdy dle účtovací a výplatní listiny",
			"",
			"",
			"Mzdové náklady / Zaměstnanci",
			"psaci");
	pridejOtazku(
			"Srážka ze mzdy zaměstnanců na sociální a zdravotní pojištění podle ZVL",
			"",
			"",
			"Zaměstnanci / Zúčtování s ISZ pojištení",
			"psaci");
	pridejOtazku(
			"Srážka záloha na dan z přijmů zamšstnanců ze závislé činnosti podle ZVL",
			"",
			"",
			"Zaměstnanci / Ostatní přímé daně",
			"psaci");
	pridejOtazku(
			"Přepis odvodu sociálního a zdravotní pojištění hrazené zamšstnavatelem za své zamšstnance",
			"",
			"",
			"Zákonné SZ pojištění / Zúčtování s ISZ pojištění",
			"psaci");
	pridejOtazku(
			"Zúčtování ročního odpisu dostihového koně nepřimou metodou odpisovaní (odpisová plán)",
			"",
			"",
			"Odpisy / Oprávky k DHM",
			"psaci");
	pridejOtazku(
			"Přijatá faktura za převoz zakoupeného stroje od dodavatele",
			"",
			"",
			"Pořízení DHM / Dodavatelé",
			"psaci");
	pridejOtazku(
			"Zařazení zakoupeného služebního automobilu do užívání v podniku",
			"",
			"",
			"DHM / Pořízení DHM",
			"psaci");
	pridejOtazku(
			"Vyskladnění služebního automobilu k prodeji v zůstatkové ceně ",
			"",
			"",
			"ZC prodaného DHM / Oprávky k DHM",
			"psaci");
	pridejOtazku(
			"[?] Vyřazení častečně odepsaného služebního automobilu z důvodu krádeže – zúčtovaní zůstatkové ceny",
			"",
			"",
			"Oprávky k DHM / HMV ",
			"psaci");
	pridejOtazku(
			"Prodej nepotřebného strone odvěratelům za hotové ",
			"",
			"",
			"Pokladna / Tržby z prodeje DM",
			"psaci");
	pridejOtazku(
			"Úbytek zboží v rámci norem přirazovanách úbytků ",
			"",
			"",
			"Prodané zboží / Zboží",
			"psaci");
	pridejOtazku(
			"Záviněný úbytek materilu nad rámce norem přirozených úbytků",
			"",
			"",
			"Manka a škody / Materiál",
			"psaci");
	pridejOtazku(
			"Nákup materiálu na fakturu způsobem A",
			"",
			"",
			"Pořízení materiálu / Dodavatelé",
			"psaci");
	pridejOtazku(
			"Doprava nakoupeného zboží na fakturu zpusobem A",
			"",
			"",
			"Pořízení zboží / Dodavatelé",
			"psaci");
	pridejOtazku(
			"Prodej materiálu na fakturu v prodejní ceně",
			"",
			"",
			"Odběratelé / Tržby za zboží",
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