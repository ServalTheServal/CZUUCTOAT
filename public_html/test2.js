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
		str2 += '<br><input id="a" type="text" size="60" name="a" value=">';

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
			"Vlastní kapitál zahrnuje základní kapitál, kapitálové fondy, fondy tvořené ze zisku, nerozdělený výsledek hospodaření a výsledek hospodaření (zisk nebo ztrátu) běžného roku. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Závazky vůči zaměstnancům z titulu zúčtovaných mezd za provedenou práci patří k vlastním zdrojům hospodářských prostředků. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Rozdíl mezi součtem externích provozních výnosů a součtem externích provozních nákladů představuje zisk z finanční činnosti. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Tržby z realizace výkonů představují složku externích finančních výnosů. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Interní výnosy a interní náklady, které vznikají při zúčtování vnitropodnikových služeb poskytovaných mezi vnitřními organizačními jednotkami, ovlivňují HV podniku jako celku.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Nezaviněná manka a škody na externě pořízených zásobách v rámci norem přirozených úbytků mají charakter mimořádných nákladů",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Součty obratů MD a součty obratů D všech analytických účtů se musejí navzájem rovnat. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Vedoucí podniku může povolit vzájemné kompenzace mank a přebytků zásob vzniklých ve stejném inventarizačního období neúmyslnou záměnou jejich jednotlivých druhů, jestliže se evidují podle jednotlivých druhů a týkají se téže odpovědné osoby.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"V daňové evidenci se každá hospodářská operace účtuje pouze jednostranně (jako změna příslušné složky aktiv nebo pasív).",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"V daňové evidenci je hospodářský výsledek zjišťován neúčetně jako rozdíl peněžních příjmů a peněžních výdajů.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Aktiva tvoří přehled hospodářských prostředků podle zdrojů jejich nabytí. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Závazky vůči zaměstnancům patří k vlastním zdrojům hospodářských prostředků. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Ve vnějším obratu hospodářských prostředků je evidována tvorba produkce výrobků (včetně nedokončených) a zvířat.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Hlavní složkou externích finančních výnosů jsou tržby z realizace výkonů podniku.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Externí finanční náklady ovlivňují hospodářský výsledek z provozní činnosti. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Interní výnosy a interní náklady z titulu zúčtování vnitropodnikových prací a služeb mezi vnitřními organizačními jednotkami vyvolávají změnu stavu zásob vlastní výroby",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Nezaviněná manka na externě pořízených zásobách v rámci norem přirozených úbytků mají charakter externích finančních nákladů.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Účetní zápisy lze provádět pouze na základě účetních dokladů. které ověřují uskutečnění hospodářských operací. Tato zásada nemusí být dodržena u účetních operací, které probíhají automatizovaně při vedení účetnictví na počítači (volbou z nabídky programu).",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"V daňové evidenci je předmětem evidování veškerý majetek, vlastní i cizí kapitál",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Zúčtování povinnosti odvodu zálohy na daň z příjmu z hrubé mzdy <br> MD: Zaměstnanci <br> D: Zúčtování daně z příjmů",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Odpis ztrátové pohledávky za dlužníkem v konkurzním řízení <br> MD: Běžný účet <br> D: Pohledávky za odběrateli",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Bezplatné převzetí budovy:<br> Působivá operace (ovlivňuje hospodářský výsledek).",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Předpis škody zúčtované v mimořádných nákladech viníkovi k náhradě. <br> Nepůsobivá",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"K rozvahovým účtům patří účty, jejichž zůstatky se vykazují v rozvaze. K aktivním účtům patří např. software, bankovní úvěr, pozemky, nedokončená výroba, pohledávky ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Analytické účty se povinně zřizují ke všem syntetickým účtům aktiv a pasív",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Složený účetní případ může být zaúčtován na vrub jednoho (nebo více) účtů normálním zápisem a souběžně ve prospěch více účtů minusovým zápisem",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Pohledávky za odběrateli jsou v rozvaze uváděny jako složka cizího kapitálu. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Rozdíl mezi přidanou hodnotou a externími finančními náklady představuje zisk (+) nebo ztrátu (-) z běžné činnosti. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Na účtech pohledávek za zahraničními odběrateli vznikají kurzové zisky při vzestupu měnového kurzu koruny vůči zahraniční měně.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Rozdíl mezi součtem externích provozních výnosů a externích materiálových nákladů představuje přidanou hodnotu podniku. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Na účtech závazků vůči zahraničním dodavatelům vznikají kurzové zisky při poklesu měnového kurzu koruny vůčí zahraniční měně. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Zaměstnanci, určeni vedoucím účetní jednotky, přezkušují přípustnost hospodářských operací ověřovaných doklady, zaměstnanci v účtárnách přezkušují početní správnost údajů na těchto dokladech. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Přebytky výrobků vlastní výroby zjištěné při inventarizaci jsou účtovány jako mimořádný výnos",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Cena práce zaměstnanců vložené do výrobního procesu je externí finanční náklad",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Penále představuje mimořádný finanční postih za porušení obecně platných právních předpisů (zákonů). ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Změna stavu zásob vlastní výroby neovlivní přidanou hodnotu. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Zápisy na účty analytické evidence lze provádět v peněžních jednotkách, v naturálních jednotkách, v peněžních i naturálních jednotkách současně.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Přebytky zjištěné u externě pořízených hospodářských statků se považují za externí provozní výnos, přebytky zjištěné u zásob vlastní výroby jsou součástí mimořádných výnosů. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Hospodářskou operací se rozumí změna v účetních záznamech, která nepředstavuje změnu objektivní reality, jež je předmětem evidování",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Z praktických důvodů jsou přebytky zásob vlastní výroby součástí mimořádných výnosů. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Ztrátové pohledávky představují položky v zúčtovacích vztazích s odběrateli, které zůstávají po lhůtě splatnosti neuhrazeny a prokazetelné administrativní kroky ze strany věřitele zůstaly bez odezvy. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Manko představuje mimořádný kvalitativní úbytek majetku",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Položky snižující interní provozní výnosy představují část produkce, která byla vyskladněna v prodejní ceně k tržním účelům. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Tržba z prodeje CP za hotové v ceně prodejní<br> MD: Pokladna <br> D: CP",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Úbytky materiálu v rámci norem přirozených úbytků zjištěné při inventarizaci <br> MD: Manka a škody <br> D: Materiál ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Vyskladnění prodaného zboží v ceně pořízení při jeho prodeji odběratelům <br> MD: Odběratelé <br> D: Zboží",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Nedobytné pohledávky představují položky v zúčtovacích vztazích s odběrateli, které nemohly být uhrazeny z konkurzní podstaty podniku, na který byl soudem vyhlášen konkurs",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Položka snižující externí provozní výnosy je kladná změna stavu zásob běžného období",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Položka snižující externí provozní výnos je ta část produkce, která nebyla spotřebována ani prodána v běžném období ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Škoda představuje mimořádný kvantitativní úbytek na majetku. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Účetní operací se rozumí jev, který představuje změnu objektivní reality a je předmětem evidování v účetních záznamech. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Dotace je přísně účelový nenávratný finanční příspěvek poskytovaný ze státního rozpočtu na financování určitých úkolů v celém národním hospodářství.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Úbytky interních provozních výnosů se účtují v předem stanoveném ocenění, přírůstky externích provozních výnosů se účtují v cenách na úrovni vlastních nákladů. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Pokuta představuje mimořádný finanční postih za porušení hospodářských smluv. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Je-li produkce výrobků běžného období větší, než jejich užití, snižuje výsledná změna stavu zásob vlastní výroby provozní výnosy.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"V daňové evidenci se podvojně evidují pouze působivé operace. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Sběrným dokladem se ověřuje uskutečnění více stejnorodých operací, které se uskutečnily v tomtéž dni nebo v tomtéž období nejdéle však čtvrtletním.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Nepůsobivou hospodářskou operací je např. zúčtování nároku na vypořádací podíl při vystoupení člena z družstva",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Manko v rámci norem přirozených úbytků zjištěné při inventarizaci u materiálu neovlivňuje velikost vlastního kapitálu. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"PO ovlivňují aktiva v rozvaze a současně cizí kapitál. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"PO ovlivňují pouze aktiva v rozvaze. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Nepůsobivé operace se evidují na jednom účtu rozvahovém a jednom účtu výsledkovém. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Nepůsobivé operace se evidují pouze na účtech rozvahových, včetně účtů vlastního kapitálu. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Nepůsobivou operací je výplata mezd zaměstnancům, která se eviduje na příslušném účtě aktiv a souvztažném účtě mzdové náklady.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Nepůsobivá operace může být evidována jako zvýšení aktiv a souvztažně jako snížení pasív. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"PO se evidují pouze na výsledkových účtech. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"PO lze evidovat na některém výsledkovém účtu se souvztažným zápisem na příslušném účtu vlastního kapitálu. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Účetní uzávěrka představuje sestavení závěrečných účetních výkazů",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Po převodech sald všech rozvahových účtů na KÚR se strany MD a Dal tohoto účtu rovnají. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Součástí EPN je pořizovací cena externě pořízených složek oběžného majetku v okamžiku zaplacení závazku dodavatelům. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Součástí EPN je cena vnitropodnikové přepravy provedené vlastní nákladní autodopravou při pořízením majetku od externích dodavatelů. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"IPV představují podnikem přivlastněnou hodnotu výkonů, které definitivně opustily podnik a v procesu směny změnily vlastníka. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"IPV představují sumu výkonů jednotlivých úseků činnosti vytvořených ve sledovaném období v prodejní ceně. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Součástí EPN je spotřeba vlastních výrobků v předem stanoveném ocenění. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Součástí EPN jsou zálohy vyplacené zaměstnanci na pracovní cestu. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Součástí EPN je pojistné zdravotního pojištění hrazené zaměstnavatelem za zaměstnance, i když v podstatě jde o externí finanční náklad. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Součástí IPV je produkce výrobků vlastní výroby v prodejní ceně. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Součástí IPV je produkce výrobků vlastní výroby vyskladněná k prodeji v předem stanoveném ocenění. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"PSIV představují spotřebu produkce vl. výroby v běžném období v předem stanoveném ocenění. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"PSIV představují produkci výrobků vl. výroby běžného období v předem stanoveném ocenění",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"PSIV jsou interní V snížené o část produkce vyskladněné k prodeji v předem stanoveném ocenění",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"PSIV jsou potenciálním externím výnosem.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"PEV vzniká, jsou-li interní výnosy větší nebo rovny interním nákladům. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"PEV vzniká, jsou-li interní náklady větší než interní výnosy. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"PEV je v běžném období zdrojem zisku",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"PSEV vzniká, když saldo účtu Změna stavu zásob je kladné. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"PSEV představuje položku, která zvyšuje celkový provozní výnos běžného období.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Účetní doklad povinně obsahuje označení období (měsíčního), do kterého se musí doklad zaúčtovat, pokud se toto období neshoduje s obdobím, v němž byl doklad vystaven.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Účetní doklad povinně obsahuje účtovací předpis vyjadřující spojitost účetního dokladu s účetním zápisem. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Účetní doklad povinně obsahuje interní číslo pro kontrolu úplnosti souboru účetních dokladů. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Předmětem věcné kontroly je úplnost náležitostí účetních dokladů. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Předmětem věcné kontroly je oprávněnost pracovníků, kteří operaci nařídili či schválili",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Věcnou kontrolu účetních dokladů provádí pracovníci v účtárnách. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Formální kontrolu provádí pracovníci, kteří doklady vyhotovují. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Formální kontrolu provádí pracovníci, kteří operaci nařídili či schválili. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Formální kontrola se zaměřuje na správnost součtů částek uváděných v dokladech.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Zásada průkaznosti účetnictví je dodržena, když účetní zápisy jsou v účetních knihách prováděny podle pravidla podvojnosti účetních zápisů. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Zásada kontinuity účetnictví spočívá v chronologickém sledu evidování účetních případů v účetním deníku tak, jak za sebou následují. ",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Nepůsobivé operace se účtují na jednom účtu rozvahovém a jednom účtu výsledkovém",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Nepůsobivé operace se účtují pouze na účtech rozvahových, včetně účtů vlastního kapitálu",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Nepůsobivou operací je výplata mezd zaměstnancům.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Směnku vlastní vystavuje dlužník a zavazuje se zaplatit v den splatnosti směnky částku uvedenou na směnce",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Nárok na nemocenské dávky zvyšuje závazek vůči zaměstnancům a současně snižuje závazek podniku vůči institucím sociálního zabezpečení.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Leasingová společnost nese rizika spojená s užíváním pronajatého předmětu formou finančního leasingu.´",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Odpisy dlouhodobého majetku se účtují:<br>   DHM/DHM",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Přírůstek živé hmotnosti zvířat se vypočte jako rozdíl mezi součtem konečného zůstatku živé hmotnosti včetně přírůstků a součtem počátečního zůstatku živé hmotnosti včetně úbytků.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Srážka zdravotního a sociálního pojištění z hrubých mezd zaměstnanců<br>   MD: Zúčtování s institucemi zdravotního a sociálního zabezepčení<br>   D: Zaměstnanci",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Výplata čistých mezd zaměstnancům převodem ja jejich sporožirové účty u Stavební spořitelny<br>   MD: Ostatní závazky<br>   D: Běžný účet",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"O nákladech účtujeme zásadně v hospodářském období, ve kterém byly vynaloženy.",
			"Pravda",
			"Nepravda",
			"Nepravda",
			"vybiraci");
	pridejOtazku(
			"Zisk je součástní pasiv",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Aktiva se člení na investiční a oběžný majetek z hlediska jejich formy ve struktuře dle stupně likvidnosti jednotlivých složek majetku",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Ve vnějším obratu hospodářských prostředků dochází ke změně jejich vlastníka. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Výsledná změna stavu výrobků představuje buď potenciální externí výnosy nebo položku snižující externí výnosy.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Produkce výrobků vlastní výroby se oceňuje ve vnitropodnikových cenách na bázi kalkulace vlastních nákladů. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Hospodářské operace, při nichž dochází ke vzniku externích finančních nákladů, jsou operace působivé. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Spotřeba výrobků vlastní výroby představuje interní náklady, které jsou současně druhotnými náklady. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Ztráta za běžné období je zaúčtována zápornou částkou na straně MD účtu zisků a ztrát a na straně DAL konečného účtu rozvažného.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Do jednoho sběrného účetního dokladu se mohou shrnovat údaje jednotlivých účetních dokladů ověřujících stejnorodé hospodářské nebo účetní operace, které se týkají nejvýše jednoho měsíčního období. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Součástí přezkušování formální správnosti účetních dokladů je rovněž přezkušování oprávněnosti zaměstnanců k nařizování nebo schvalování hospodářských operací ověřovaných doklady.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Podnikové fondy vyjadřují účelové určení hodnoty, která je vlastnictvím podniku. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Zisk je součástí vlastních zdrojů podniku. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Vyskladnění výrobků k prodeji je ve vnitřním obratu hospodářských prostředků evidováno jako položka snižující interní výnosy podniku. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Přírůstek zásob vlastní výroby v běžném období představuje potenciální externí výnos. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Rozdíl mezi provozními výnosy a externími provozními náklady na spotřebovaný materiál a dodavatelské služby představuje přidanou hodnotu",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Spotřeba výrobků vlastní výroby a spotřeba podnikových prací a služeb ve vlastním podniku představují interní (druhotné) náklady",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Rozdíl mezi součtem interních výnosů a součtem interních nákladů a položek snižujících interní výnosy ovlivňuje velikost přidané hodnoty.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Přezkušování formální správnosti účetních dokladů zahrnuje ověření oprávněnosti zaměstnanců k nařizování nebo schvalování operací, které jsou doklady ověřovány",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Věcnou správnost zůstatků účtů majetku a závazků zabezpečujeme inventarizaci, prostřednictvím které se ověřují a odsouhlasují účetní stavy všech hospodářských prostředků a závazků se skutečnými stavy k určitému datu.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Předvahou lze kontrolovat pouze formální správnost účetních zápisů.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Průkaznost účetnictví se musí při jeho vedení na počítači zajistit tak, že alespoň jedna výstupní sestava umožní kontrolu vstupních dat (např. čísla účetních dokladů",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Výsledek hospodaření se v daňové evidenci zjišťuje porovnáním čistého jmění na začátku a konci hospodářského období",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Vyřazení zcela opotřebeného stroje (účetně již plně odepsaného) z účetnictví <br> MD: Oprávky k HIM <br> D: HIM",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Nákup poštovních známek za hotové (k přímé spotřebě)<br> MD: Služby <br> D: Pokladna",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Tržba za prodej zboží:<br>a) Úbytek zboží ze skladu (výdejka) .....20 <br>   MD: Prodané zboží <br>   D: Zboží na skladě<br><br>b) Tržba za prodané zboží bez DPH .....25 <br>   D: Tržby za zboží <br><br>c) DPH k odvodu ................................5,5 <br>   D: DPH<br><br>d) Fakturovaná částka celkem .............30,5 <br>   MD: Odběratelé",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Spotřeba náhradních součástek pro opravy strojů v dílnách. <br> Působivá (ovlivňuje hospodářský výsledek). ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Výplata záloh na služební cestu zaměstnanci v hotovosti. <br> Nepůsobivá",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Spotřeba vlastních osiv ve výrobním procesu.<br> Působivá (ovlivňuje hospodářský výsledek).",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Zůstatky účtů Oprávky k hmotnému investičnímu majetku se vykazují v aktivech rozvahy s minusovým znaménkem.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Pod pojmem podnikové fondy rozumíme v účetnictví složku pasiv a to vlastních zdrojů podniku ´",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Provozní výnosy zahrnují tržby za realizované výkony a přírůstky zásob vlastní výroby za sledované období",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Vlastní náklady podniku jsou kvantitativně totožné s pojmem externí provozní náklady. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Interní výnosy, zúčtované z titulu vnitropodnikových prací a služeb poskytovaných mezi vnitřními organizačními jednotkami, představují složku provozního výnosu, která ovlivňuje hospodářský výsledek podniku.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Nezaviněná manka a škody na meziproduktu v rámci norem přirozených úbytků mají charakter interních nákladů. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Konečné zůstatky účtů Oprávky k hmotnému investičnímu majetku vyjadřují kumulativní odpisy zúčtované za dobu jeho užívání. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Každý účetní případ musí být zapsán z věcného hlediska v hlavní knize (popř. ještě v příslušných knihách analytické evidence) a z časového hlediska v deníku (popř. v denících).",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Hospodářské operace, které souvisí s výrobním procesem, nepřímo ovlivňují velikost vlastního jmění",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Výsledovka je upravena ve formě dvoustranné tabulky, jejíž levá strana obsahuje náklady a pravá strana výnosy. Rozdíl vyrovnává strany výsledovky podle jejich vzájemného poměru.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Potenciální externí provozní výnos představuje součást provozních výnosů podniku. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Účty uspořádací slouží k soustřeďování položek a jejich rozúčtování podle zvolených kriterií (rozvrhových základen).",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"V daňové evidenci se odpisy investičního majetku vyjádří snížením jeho ceny v inventárním soupisu na konci období. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Oběh účetních dokladů závazně upravuje vedoucí organizace (příkazem nebo organizační směrnicí). ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Pro rozepisování souhrnných částek z účtu syntetické evidence na účty analyitcké evidence platí, že souhrnné částky musí být rozepsány beze zbytku na analytické účty do všech stupňů podrobností",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Účty kalkulační tvoří analytickou evidenci N a V a slouží k jejich zachycování podle účelu vynaložení na jednotlivé výrobní a ostatní odvětvové činnosti a v rámci nich podle kalkul. úseků",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Externí finanční výnosy nepředstavují realizaci výkonů podniku v procesu směny",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Odpis je cena opotřebení externě pořízených složek investičního majetku",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Změna stavu zásob vlastní výroby je součástí výnosů z provozní činnosti",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Kurzová ztráta na valutách v pokladně z důvodů revalvační změny měnového kurzu <br> MD: Kurzové ztráty <br> D: Pokladna",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Přijaté náhrady škod od pojišťovny (pojistné plnění) - výpis z BÚ <br> MD: BÚ <br> D: Ostatní mimořádné výnosy",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Úhrada pojistného ze zákonné odpovědnosti složenkou<br> MD: Ostatní finanční náklady <br> D: BÚ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Přijaté úroky z termínovaných vkladů<br> MD: BÚ <br> D: Úroky",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Předpis manka viníkovi k náhradě<br> MD: Ostatní pohledávky za zaměstnanci <br> D: Ostatní mimořádné výnosy",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Odpis ztrátové pohledávky za podnikem, na který je vypsán konkurz <br> MD: Ostatní mimořádné náklady <br> D: Odběratelé",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Z důvodů změny ocenění majetku došlo ke zvýšení ceny majetku - materiálu <br> MD: Materiál <br> D: Výnosy ze změny metody",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Výkaz zisků a ztrát je formálně upravený jako tabulka, ve které se postupně uvádí výnosy a náklady jednotlivých sfér činností podniku a odděleně se vyčíslí jejich výsledky.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Interní výnosy a interní náklady jsou podnikovým meziproduktem a tvoří součást hrubé produkce a jejího užití. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Dotace je druh podmíněné nenávratné finanční pomoci poskytované ze státního rozpočtu na podnikatelský záměr předložený určitým žadatelem. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Provozní zisk a finanční zisk tvoří zisk z běžné činnosti. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Účty spojovací se používají při vedení účetnictví v samostatných okruzích ke spojení okruhů tzv. doplňkového účetnictví se základním účetnictvím.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Analytická evidence není součástí hlavní účetní knihy",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Po proúčtování vnitropodnikových prací a služeb se zvyšuje obrat nákladů a výnosů o stejně velké částky, avšak hospodářský výsledek podniku jako celku se nezmění. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Interní finanční náklady a interní finanční výnosy jsou zúčtované nikoliv placené pokuty a penále vnitřních organizačních jednotek podniku při uplatňování zásad pro vnitropodnikovou ekonomiku. "
,
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Externí finanční výnosy jsou úroky, dividendy, dotace, subvence. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Analytická evidence je fakultativní (nevede se ke všem účtům). ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Na podrozvahových účtech se účtuje o majetku, který podnik užívá, ale není jeho vlastníkem.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Z praktických důvodů jsou některé externí finanční náklady součástí nákladů na provozní činnost podniku (daně silniční, z nemovitosti, příspěvky na SZ hrazené zaměstnatelem za zaměstnance).",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Položka snižující externí provozní výnosy podniku vzniká, jsou-li úbytky výrobků vlastní výroby v běžném období větší než jejich přírůstky, tedy došlo ke spotřebě nebo prodeji veškeré produkce běžného roku a částí počáteční zásoby výrobků vlastní výroby",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Externí finanční náklady nepředstavují hmotně energetické spotřeby ve výrobním procesu. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Zůstatky podrozvahových účtů se nezahrnují do součtu rozvahy.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Prostředkem věcné kontroly účetního zápisu je předvaha a kontrolní soupiska analytických účtů. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Externí náklady představují vstupy do výrobního procesu, jejichž původ je vně podniku. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Aktivace výkonů ovlivní přidanou hodnotu. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Nepůsobivé hospodářské operace ovlivňují stav (pouze) rozvahových položek s výjimkou čistého jmění.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Snížení ceny majetku při vytvoření opravné položky k němu snižuje velikost vlastního kapitálu",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"PO (působivé operace) ovlivňují vlastní kapitál a současně aktiva v rozvaze",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"PO ovlivňují vlastní kapitál a současně cizí kapitál. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"PO ovlivňují hospodářský výsledek a jeho prostřednictvím vlastní kapitál. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Nepůsobivé operace se evidují na rozvahových účtech výjimkou účtů vlastního kapitálu. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"PO lze evidovat pouze na rozvahových účtech. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"PO lze evidovat na jednom účtu výsledkovém a se souvztažným zápisem na aktivním rozvahovém účtu ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Účetní uzávěrka představuje vyčíslení konečných zůstatků rozvahových účtů, celkových obratů výsledkových účtů a jejich převody na příslušné uzávěrkové účty.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Po převodu obratů všech nákladových a výnosových účtů na účet zisků a ztrát představuje saldo tohoto účtu hospodářský výsledek před zdaněním ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Při vedení účetnictví na počítači nemusí být účetní uzávěrkové operace doloženy účetními doklady",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Součástí EPN je cena opotřebení externě pořízených složek investičního majetku. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Součástí EPN je cena práce vlastních zaměstnanců vynaložená ve výrobním procesu. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Součástí EPN jsou nezaviněná manka v rámci norem přirozených úbytků zjištěná na materiálu. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"IPV představují vnitropodnikovou cenu za poskytnuté vnitropodnikové práce a služby jiným odběratelským úsekům téhož podniku. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"IPV se oceňují předem stanovenými vnitropodnikovými cenami na bázi kalkulace vlastních nákladů. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Součástí IPV jsou přebytky zásob vlastní výroby zjištěné při inventarizaci. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Součástí EPN jsou odpisy hmotného investičního majetku, které vyjadřují cenu jeho opotřebení připadající na hospodářské období.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Součástí EPN je cena spotřebované energie dle faktur energetických závodů",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Součástí IPV je produkce výrobků vlastní výroby běžného období v předem stanovených cenách na bázi vlastních nákladů. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Součástí IPV je vnitropodniková cena přebytků výrobků vlastní výroby zjištěných při inventarizaci. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Součástí IPV je vnitropodniková cena rozpracované výroby ve výši nákladů vynaložených na rozpracovanost.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"PSIV je část produkce jednotlivých úseků činnosti, která byla vyskladněna v běžném období k realizaci v předem stanoveném ocenění",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"PEV je přebytek interních výnosů nad interními náklady a položkami snižujícími interní výnosy",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"PEV vzniká, je-li saldo účtu změna stavu zásob vlastní výroby kladné. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"PSEV vzniká, když strana MD účtu Změna stavu zásob je větší než strana D. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"PSEV vzniká, když v běžném období jsou interní výnosy menší než interní náklady a položky snižující interní výnosy. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"PSEV vzniká při poklesu zásoby výrobků z produkce minulého období v důsledku jejího vyskladnění k prodeji v běžném období",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Účetní doklad povinně obsahuje podpis osoby odpovědné za účetní případ.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Účetní doklad povinně obsahuje datum uskutečnění účetního případu, není-li shodné s datem vyhotovení účetního dokladu. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Předmětem věcné kontroly je přípustnost hosp.operací v případě, ji nařídí vedoucí účetní jednotky",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Formální kontrolu provádí pracovníci v účtárně. ",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Formální kontrola se zaměřuje na pravoplatnost podpisů uvedených na dokladech",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Nepůsobivé oprace se evidují na rozvahových účtech s vyjímkou účtu vlastního kapitálu.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Emisní ážio představuje rozdíl mezi nominální hodnotou akcií a jejich prodejní cenou v druhé a dalších emisích",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Dlouhodobý hmotný majetek je majetek dlouhodobé povahy v ocenění stanoveném účetní jednotkou povinně od částky Kč 40.000,-",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Zvířata základního státa a tažná jsou dlouhodobým hmotným majetkem bez ohledu na pořizovací cenu.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Při bezplatném předání zásob vypočte a odvede dárce DPH a obdarovaný vypočte a zaplatí darovací daň.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Do pořizovací ceny zásob nakoupených od zahraničního dodavatele vstupuje cena pořízení, clo, spotřební daň a DPH.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Záporné oceňovací odchylky vznikají, je-li skladová cena zboží větší než cena pořizovací.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Hrubé mzda zaměstnanců<br>   MD: Mzdové náklady<br>   D: Zaměstnanci",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Srážka daně z příjmu fyzických osob (zálohově)<br>   MD: Zaměstnanci<br>   D: Zúčtování daně z příjmů",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Zúčtování náhrady škody zaviněné zaměstnancem srážkou z jeho mzdy<br>   MD: Pohledávky za zaměstnanci <br>  D: Zaměstnanci",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Přezkoumávání formální správnosti účetních dokladů zahrnuje ověření oprávněnosti zaměstnanců k nařizování nebo schvalování operací, ktreré jsou doklady ověřovány.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Věcnou správnost účtů majetku a závazků zabezpečujeme inventarizací, prostřednictvím které se ověřují a odsouhlasují účetní stavy všech hospodářských prostředků a závazků se skutečnými stavy v určitém datu.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Předvahou lze kontrolovat pouze věcnou správnost účetních zápisů.",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
	pridejOtazku(
			"Průkaznost účetnictví se musí při jeho vedení na počítači zajistit tak, že alespoň jedna výstupní sestava umožní kontrolu vstupních dat (např. úplnost zaúčtování všech účetních dokladů).",
			"Pravda",
			"Nepravda",
			"Pravda",
			"vybiraci");
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