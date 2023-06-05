/* Copyright uJL 2019. */

var conection = true;
var mostrarAlertas = false;
var contentPath = "contenido/";
var mobileCurse = false;
var navegationBlock = false;
var hayEvaluacion = false;
var minimoAprobatorio = 80;
var haySubtitulos = true;
var conIntentos = false;
var maxIntentos = 2;
var intento = 0;
var sourceHeigth = 750;
var sourceWidth = 1200;
var posTopPantalla = 0;
var posBottomPantalla = 0;
var altoPantalla = 750;
var pantallaCompleta = false;

/* Pantallas del curso */
var course = new Object();
course.pages = [
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_02.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_03.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_04.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_05.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_06.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_07.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_08.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_09.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_10.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_11.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_12.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "JCuervo_CVE_EstOrg_13.html", navegacion: true, menu: true }
];

/* Pantallas de recursos */
var recursos = new Object();
recursos.pages = [
    { title: "Índice", url: "indice.html", navegacion: true, menu: true },
    { title: "Ayuda", url: "ayuda.html", navegacion: true, menu: true }
];

/* Audios del curso */
var grupoAudios = new buzz.group([
    /*0*/ new buzz.sound("contenido/audios/audio0", { formats: ["mp3"], preload: true }),
    /*1*/ new buzz.sound("contenido/audios/01", { formats: ["mp3"], preload: true }),
    /*2*/ new buzz.sound("contenido/audios/02", { formats: ["mp3"], preload: true }),
    /*3*/ new buzz.sound("contenido/audios/03", { formats: ["mp3"], preload: true }),
    /*4*/ new buzz.sound("contenido/audios/04", { formats: ["mp3"], preload: true }),
    /*5*/ new buzz.sound("contenido/audios/05", { formats: ["mp3"], preload: true }),
    /*6*/ new buzz.sound("contenido/audios/06", { formats: ["mp3"], preload: true }),
    /*7*/ new buzz.sound("contenido/audios/07", { formats: ["mp3"], preload: true }),
    /*8*/ new buzz.sound("contenido/audios/08", { formats: ["mp3"], preload: true }),
    /*9*/ new buzz.sound("contenido/audios/09", { formats: ["mp3"], preload: true }),
    /*10*/ new buzz.sound("contenido/audios/10", { formats: ["mp3"], preload: true }),
    /*11*/ new buzz.sound("contenido/audios/11", { formats: ["mp3"], preload: true }),
    /*12*/ new buzz.sound("contenido/audios/12", { formats: ["mp3"], preload: true }),
    /*13*/ new buzz.sound("contenido/audios/13", { formats: ["mp3"], preload: true }),
    /*14*/ new buzz.sound("contenido/audios/14", { formats: ["mp3"], preload: true }),
    /*15*/ new buzz.sound("contenido/audios/15", { formats: ["mp3"], preload: true }),
    /*16*/ new buzz.sound("contenido/audios/16", { formats: ["mp3"], preload: true }),
    /*17*/ new buzz.sound("contenido/audios/17", { formats: ["mp3"], preload: true }),
    /*18*/ new buzz.sound("contenido/audios/18", { formats: ["mp3"], preload: true }),
    /*19*/ new buzz.sound("contenido/audios/19", { formats: ["mp3"], preload: true }),
    /*20*/ new buzz.sound("contenido/audios/20", { formats: ["mp3"], preload: true }),
    /*21*/ new buzz.sound("contenido/audios/21", { formats: ["mp3"], preload: true }),
    /*22*/ new buzz.sound("contenido/audios/22", { formats: ["mp3"], preload: true }),
    /*23*/ new buzz.sound("contenido/audios/23", { formats: ["mp3"], preload: true }),
    /*24*/ new buzz.sound("contenido/audios/24", { formats: ["mp3"], preload: true }),
    /*25*/ new buzz.sound("contenido/audios/25", { formats: ["mp3"], preload: true }),
    /*26*/ new buzz.sound("contenido/audios/26", { formats: ["mp3"], preload: true }),
    /*27*/ new buzz.sound("contenido/audios/27", { formats: ["mp3"], preload: true }),
    /*28*/ new buzz.sound("contenido/audios/28", { formats: ["mp3"], preload: true }),
    /*29*/ new buzz.sound("contenido/audios/29", { formats: ["mp3"], preload: true }),
    /*30*/ new buzz.sound("contenido/audios/30", { formats: ["mp3"], preload: true }),
    /*31*/ new buzz.sound("contenido/audios/31", { formats: ["mp3"], preload: true }),
    /*32*/ new buzz.sound("contenido/audios/32", { formats: ["mp3"], preload: true }),
    /*33*/ new buzz.sound("contenido/audios/33", { formats: ["mp3"], preload: true }),
    /*34*/ new buzz.sound("contenido/audios/34", { formats: ["mp3"], preload: true }),
    /*35*/ new buzz.sound("contenido/audios/35", { formats: ["mp3"], preload: true }),
    /*36*/ new buzz.sound("contenido/audios/36", { formats: ["mp3"], preload: true }),
    /*37*/ new buzz.sound("contenido/audios/37", { formats: ["mp3"], preload: true }),
    /*38*/ new buzz.sound("contenido/audios/38", { formats: ["mp3"], preload: true }),   
    /*39*/ new buzz.sound("contenido/audios/39", { formats: ["mp3"], preload: true }),
    /*40*/ new buzz.sound("contenido/audios/40", { formats: ["mp3"], preload: true }),
    /*41*/ new buzz.sound("contenido/audios/41", { formats: ["mp3"], preload: true }),
    /*42*/ new buzz.sound("contenido/audios/42", { formats: ["mp3"], preload: true }),
    /*43*/ new buzz.sound("contenido/audios/43", { formats: ["mp3"], preload: true }),
    /*44*/ new buzz.sound("contenido/audios/44", { formats: ["mp3"], preload: true }),
    /*45*/ new buzz.sound("contenido/audios/45", { formats: ["mp3"], preload: true }),
    /*46*/ new buzz.sound("contenido/audios/46", { formats: ["mp3"], preload: true }),
    /*47*/ new buzz.sound("contenido/audios/47", { formats: ["mp3"], preload: true }),
    /*48*/ new buzz.sound("contenido/audios/48", { formats: ["mp3"], preload: true }),
    /*49*/ new buzz.sound("contenido/audios/49", { formats: ["mp3"], preload: true }),
    /*50*/ new buzz.sound("contenido/audios/50", { formats: ["mp3"], preload: true }),    
    /*51*/ new buzz.sound("contenido/audios/51", { formats: ["mp3"], preload: true }),
    /*52*/ new buzz.sound("contenido/audios/52", { formats: ["mp3"], preload: true }),
    /*53*/ new buzz.sound("contenido/audios/53", { formats: ["mp3"], preload: true }),
    /*54*/ new buzz.sound("contenido/audios/54", { formats: ["mp3"], preload: true }),
    /*55*/ new buzz.sound("contenido/audios/55", { formats: ["mp3"], preload: true }),
    /*56*/ new buzz.sound("contenido/audios/56", { formats: ["mp3"], preload: true }),
    /*57*/ new buzz.sound("contenido/audios/57", { formats: ["mp3"], preload: true }),
    /*58*/ new buzz.sound("contenido/audios/58", { formats: ["mp3"], preload: true }),
    /*59*/ new buzz.sound("contenido/audios/59", { formats: ["mp3"], preload: true }),
    /*60*/ new buzz.sound("contenido/audios/60", { formats: ["mp3"], preload: true }),
    /*61*/ new buzz.sound("contenido/audios/61", { formats: ["mp3"], preload: true }),
    /*62*/ new buzz.sound("contenido/audios/62", { formats: ["mp3"], preload: true }),    
    /*63*/ new buzz.sound("contenido/audios/63", { formats: ["mp3"], preload: true }),
    /*64*/ new buzz.sound("contenido/audios/64", { formats: ["mp3"], preload: true }),
    /*65*/ new buzz.sound("contenido/audios/65", { formats: ["mp3"], preload: true }),
    /*66*/ new buzz.sound("contenido/audios/66", { formats: ["mp3"], preload: true }),
    /*67*/ new buzz.sound("contenido/audios/67", { formats: ["mp3"], preload: true }),
    /*68*/ new buzz.sound("contenido/audios/68", { formats: ["mp3"], preload: true }),
    /*69*/ new buzz.sound("contenido/audios/69", { formats: ["mp3"], preload: true }),
    /*70*/ new buzz.sound("contenido/audios/70", { formats: ["mp3"], preload: true }),
    /*71*/ new buzz.sound("contenido/audios/71", { formats: ["mp3"], preload: true }),
    /*72*/ new buzz.sound("contenido/audios/72", { formats: ["mp3"], preload: true }),
    /*73*/ new buzz.sound("contenido/audios/73", { formats: ["mp3"], preload: true }),
    /*74*/ new buzz.sound("contenido/audios/74", { formats: ["mp3"], preload: true }),    
    /*75*/ new buzz.sound("contenido/audios/75", { formats: ["mp3"], preload: true }),
    /*76*/ new buzz.sound("contenido/audios/76", { formats: ["mp3"], preload: true }),
    /*77*/ new buzz.sound("contenido/audios/77", { formats: ["mp3"], preload: true }),
    /*78*/ new buzz.sound("contenido/audios/78", { formats: ["mp3"], preload: true }),
    /*79*/ new buzz.sound("contenido/audios/79", { formats: ["mp3"], preload: true }),
    /*80*/ new buzz.sound("contenido/audios/80", { formats: ["mp3"], preload: true }),
    /*81*/ new buzz.sound("contenido/audios/81", { formats: ["mp3"], preload: true }),
    /*82*/ new buzz.sound("contenido/audios/82", { formats: ["mp3"], preload: true }),
    /*83*/ new buzz.sound("contenido/audios/83", { formats: ["mp3"], preload: true }),
    /*84*/ new buzz.sound("contenido/audios/84", { formats: ["mp3"], preload: true }),
    /*85*/ new buzz.sound("contenido/audios/85", { formats: ["mp3"], preload: true }),
    /*86*/ new buzz.sound("contenido/audios/86", { formats: ["mp3"], preload: true }),    
    /*87*/ new buzz.sound("contenido/audios/87", { formats: ["mp3"], preload: true }),
    /*88*/ new buzz.sound("contenido/audios/88", { formats: ["mp3"], preload: true }),
    /*89*/ new buzz.sound("contenido/audios/89", { formats: ["mp3"], preload: true }),
    /*90*/ new buzz.sound("contenido/audios/90", { formats: ["mp3"], preload: true }),
    /*91*/ new buzz.sound("contenido/audios/91", { formats: ["mp3"], preload: true }),
    /*92*/ new buzz.sound("contenido/audios/92", { formats: ["mp3"], preload: true }),
    /*93*/ new buzz.sound("contenido/audios/93", { formats: ["mp3"], preload: true }),
    /*94*/ new buzz.sound("contenido/audios/94", { formats: ["mp3"], preload: true }),
    /*95*/ new buzz.sound("contenido/audios/95", { formats: ["mp3"], preload: true }),
    /*96*/ new buzz.sound("contenido/audios/96", { formats: ["mp3"], preload: true }),
    /*97*/ new buzz.sound("contenido/audios/97", { formats: ["mp3"], preload: true }),
    /*98*/ new buzz.sound("contenido/audios/98", { formats: ["mp3"], preload: true }),    
    /*99*/ new buzz.sound("contenido/audios/99", { formats: ["mp3"], preload: true }),
    /*100*/ new buzz.sound("contenido/audios/100", { formats: ["mp3"], preload: true }),
    /*101*/ new buzz.sound("contenido/audios/101", { formats: ["mp3"], preload: true }),
    /*102*/ new buzz.sound("contenido/audios/102", { formats: ["mp3"], preload: true }),
    /*103*/ new buzz.sound("contenido/audios/103", { formats: ["mp3"], preload: true }),
    /*104*/ new buzz.sound("contenido/audios/104", { formats: ["mp3"], preload: true }),
    /*105*/ new buzz.sound("contenido/audios/105", { formats: ["mp3"], preload: true }),
    /*106*/ new buzz.sound("contenido/audios/106", { formats: ["mp3"], preload: true }),
    /*107*/ new buzz.sound("contenido/audios/107", { formats: ["mp3"], preload: true }),
    /*108*/ new buzz.sound("contenido/audios/108", { formats: ["mp3"], preload: true }),
    /*109*/ new buzz.sound("contenido/audios/109", { formats: ["mp3"], preload: true }),
    /*110*/ new buzz.sound("contenido/audios/110", { formats: ["mp3"], preload: true }),
    /*111*/ new buzz.sound("contenido/audios/111", { formats: ["mp3"], preload: true }),
    /*112*/ new buzz.sound("contenido/audios/112", { formats: ["mp3"], preload: true }),
    /*113*/ new buzz.sound("contenido/audios/113", { formats: ["mp3"], preload: true }),
    /*114*/ new buzz.sound("contenido/audios/114", { formats: ["mp3"], preload: true }),
    /*115*/ new buzz.sound("contenido/audios/115", { formats: ["mp3"], preload: true }),
    /*116*/ new buzz.sound("contenido/audios/116", { formats: ["mp3"], preload: true }),
    /*117*/ new buzz.sound("contenido/audios/117", { formats: ["mp3"], preload: true }),
    /*118*/ new buzz.sound("contenido/audios/118", { formats: ["mp3"], preload: true }),
    /*119*/ new buzz.sound("contenido/audios/119", { formats: ["mp3"], preload: true }),
    /*120*/ new buzz.sound("contenido/audios/120", { formats: ["mp3"], preload: true }),
    /*121*/ new buzz.sound("contenido/audios/121", { formats: ["mp3"], preload: true }),
    /*122*/ new buzz.sound("contenido/audios/122", { formats: ["mp3"], preload: true }),
    /*123*/ new buzz.sound("contenido/audios/123", { formats: ["mp3"], preload: true }),
    /*124*/ new buzz.sound("contenido/audios/124", { formats: ["mp3"], preload: true }),
    /*125*/ new buzz.sound("contenido/audios/125", { formats: ["mp3"], preload: true }),
    /*126*/ new buzz.sound("contenido/audios/126", { formats: ["mp3"], preload: true }),
    /*127*/ new buzz.sound("contenido/audios/127", { formats: ["mp3"], preload: true }),
    /*128*/ new buzz.sound("contenido/audios/128", { formats: ["mp3"], preload: true }),
    /*129*/ new buzz.sound("contenido/audios/129", { formats: ["mp3"], preload: true }),
    /*130*/ new buzz.sound("contenido/audios/130", { formats: ["mp3"], preload: true }),
    /*131*/ new buzz.sound("contenido/audios/131", { formats: ["mp3"], preload: true }),
    /*132*/ new buzz.sound("contenido/audios/132", { formats: ["mp3"], preload: true }),
    /*133*/ new buzz.sound("contenido/audios/133", { formats: ["mp3"], preload: true })
]);
