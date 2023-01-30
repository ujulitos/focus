/* Copyright uJL 2019. */

var conection = true;
var mostrarAlertas = false;
var contentPath = "contenido/";
var mobileCurse = false;
var navegationBlock = false;
var hayEvaluacion = false;
var minimoAprobatorio = 80;
var haySubtitulos = false;
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
    { title: "Pantalla", url: "Txn_Mngr_ECP__01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP__02.html", navegacion: true, menu: true },
    // { title: "Pantalla", url: "Txn_Mngr_ECP__03.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP_01Finiquito_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP_02Creditos_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP_03CuotasIMSS_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP_04Liquidacion_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP_05Percepciones_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP_06Sueldos_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP_07Creditos_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP_08Nomina_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP_09Ordenes_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP_10ISR_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP_11Infotipos_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP_12Ejecucion_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP_13ISN_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP_14Contabilizacion_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP_15Dispersion_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP_16Vales_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP_17CFDI_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP_18PEAguinaldo_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP_19PEBonos_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP_20PEPTU_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP_21ContOracle_01.html", navegacion: true, menu: true },
    { title: "Pantalla", url: "Txn_Mngr_ECP_22RepNomina_01.html", navegacion: true, menu: true },
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
    /*1*/ new buzz.sound("contenido/audios/ins", { formats: ["mp3"], preload: true }),
    /*2*/ new buzz.sound("contenido/audios/Txn_Mngr_ECP_02_01", { formats: ["mp3"], preload: true }),
    /*3*/ new buzz.sound("contenido/audios/Finiquito_01", { formats: ["mp3"], preload: true }),
    /*4*/ new buzz.sound("contenido/audios/Finiquito_02", { formats: ["mp3"], preload: true }),
    /*5*/ new buzz.sound("contenido/audios/Finiquito_02b", { formats: ["mp3"], preload: true }),
    /*6*/ new buzz.sound("contenido/audios/Finiquito_03", { formats: ["mp3"], preload: true }),
    /*7*/ new buzz.sound("contenido/audios/Finiquito_04", { formats: ["mp3"], preload: true }),
    /*8*/ new buzz.sound("contenido/audios/Finiquito_05", { formats: ["mp3"], preload: true }),
    /*9*/ new buzz.sound("contenido/audios/Finiquito_06", { formats: ["mp3"], preload: true }),
    /*10*/ new buzz.sound("contenido/audios/Finiquito_07", { formats: ["mp3"], preload: true }),
    /*11*/ new buzz.sound("contenido/audios/Finiquito_08", { formats: ["mp3"], preload: true }),
    /*12*/ new buzz.sound("contenido/audios/Finiquito_09", { formats: ["mp3"], preload: true }),
    /*13*/ new buzz.sound("contenido/audios/Infonavit_01", { formats: ["mp3"], preload: true }),
    /*14*/ new buzz.sound("contenido/audios/Infonavit_02", { formats: ["mp3"], preload: true }),
    /*15*/ new buzz.sound("contenido/audios/Infonavit_03_04", { formats: ["mp3"], preload: true }),
    /*16*/ new buzz.sound("contenido/audios/Infonavit_05_06", { formats: ["mp3"], preload: true }),
    /*17*/ new buzz.sound("contenido/audios/Infonavit_07_08", { formats: ["mp3"], preload: true }),
    /*18*/ new buzz.sound("contenido/audios/Infonavit_09", { formats: ["mp3"], preload: true }),
    /*19*/ new buzz.sound("contenido/audios/Infonavit_10", { formats: ["mp3"], preload: true }),
    /*20*/ new buzz.sound("contenido/audios/Infonavit_11", { formats: ["mp3"], preload: true }),
    /*21*/ new buzz.sound("contenido/audios/Infonavit_12", { formats: ["mp3"], preload: true }),
    /*22*/ new buzz.sound("contenido/audios/Cuotas_IMSS_01", { formats: ["mp3"], preload: true }),
    /*23*/ new buzz.sound("contenido/audios/Cuotas_IMSS_02", { formats: ["mp3"], preload: true }),
    /*24*/ new buzz.sound("contenido/audios/Cuotas_IMSS_03", { formats: ["mp3"], preload: true }),
    /*25*/ new buzz.sound("contenido/audios/Cuotas_IMSS_04", { formats: ["mp3"], preload: true }),
    /*26*/ new buzz.sound("contenido/audios/Cuotas_IMSS_05", { formats: ["mp3"], preload: true }),
    /*27*/ new buzz.sound("contenido/audios/Cuotas_IMSS_06", { formats: ["mp3"], preload: true }),
    /*28*/ new buzz.sound("contenido/audios/Liquidacion_01", { formats: ["mp3"], preload: true }),
    /*29*/ new buzz.sound("contenido/audios/Liquidacion_02", { formats: ["mp3"], preload: true }),
    /*30*/ new buzz.sound("contenido/audios/Liquidacion_03", { formats: ["mp3"], preload: true }),
    /*31*/ new buzz.sound("contenido/audios/Liquidacion_04", { formats: ["mp3"], preload: true }),
    /*32*/ new buzz.sound("contenido/audios/Liquidacion_05", { formats: ["mp3"], preload: true }),
    /*33*/ new buzz.sound("contenido/audios/Liquidacion_06", { formats: ["mp3"], preload: true }),
    /*34*/ new buzz.sound("contenido/audios/Liquidacion_07", { formats: ["mp3"], preload: true }),
    /*35*/ new buzz.sound("contenido/audios/Liquidacion_08", { formats: ["mp3"], preload: true }),
    /*36*/ new buzz.sound("contenido/audios/Liquidacion_09", { formats: ["mp3"], preload: true }),
    /*37*/ new buzz.sound("contenido/audios/Percepciones_01", { formats: ["mp3"], preload: true }),
    /*38*/ new buzz.sound("contenido/audios/Percepciones_02", { formats: ["mp3"], preload: true }),
    /*39*/ new buzz.sound("contenido/audios/Percepciones_03", { formats: ["mp3"], preload: true }),
    /*40*/ new buzz.sound("contenido/audios/Percepciones_04", { formats: ["mp3"], preload: true }),
    /*41*/ new buzz.sound("contenido/audios/Percepciones_05", { formats: ["mp3"], preload: true }),
    /*42*/ new buzz.sound("contenido/audios/Percepciones_06", { formats: ["mp3"], preload: true }),
    /*43*/ new buzz.sound("contenido/audios/Sueldos_01", { formats: ["mp3"], preload: true }),
    /*44*/ new buzz.sound("contenido/audios/Sueldos_02", { formats: ["mp3"], preload: true }),
    /*45*/ new buzz.sound("contenido/audios/Sueldos_03", { formats: ["mp3"], preload: true }),
    /*46*/ new buzz.sound("contenido/audios/Sueldos_04", { formats: ["mp3"], preload: true }),
    /*47*/ new buzz.sound("contenido/audios/Sueldos_05", { formats: ["mp3"], preload: true }),
    /*48*/ new buzz.sound("contenido/audios/Sueldos_06", { formats: ["mp3"], preload: true }),
    /*49*/ new buzz.sound("contenido/audios/Sueldos_07", { formats: ["mp3"], preload: true }),
    /*50*/ new buzz.sound("contenido/audios/Nomina_01", { formats: ["mp3"], preload: true }),
    /*51*/ new buzz.sound("contenido/audios/Nomina_02", { formats: ["mp3"], preload: true }),
    /*52*/ new buzz.sound("contenido/audios/Nomina_03", { formats: ["mp3"], preload: true }),
    /*53*/ new buzz.sound("contenido/audios/Nomina_04", { formats: ["mp3"], preload: true }),
    /*54*/ new buzz.sound("contenido/audios/Nomina_05", { formats: ["mp3"], preload: true }),
    /*55*/ new buzz.sound("contenido/audios/Nomina_06_07", { formats: ["mp3"], preload: true }),
    /*56*/ new buzz.sound("contenido/audios/Nomina_08", { formats: ["mp3"], preload: true }),
    /*57*/ new buzz.sound("contenido/audios/Nomina_09_11", { formats: ["mp3"], preload: true }),
    /*58*/ new buzz.sound("contenido/audios/Nomina_12", { formats: ["mp3"], preload: true }),
    /*59*/ new buzz.sound("contenido/audios/CFDI_01", { formats: ["mp3"], preload: true }),
    /*60*/ new buzz.sound("contenido/audios/CFDI_02", { formats: ["mp3"], preload: true }),
    /*61*/ new buzz.sound("contenido/audios/CFDI_03", { formats: ["mp3"], preload: true }),
    /*62*/ new buzz.sound("contenido/audios/PE_Aguinaldo_01", { formats: ["mp3"], preload: true }),
    /*63*/ new buzz.sound("contenido/audios/PE_Aguinaldo_02", { formats: ["mp3"], preload: true }),
    /*64*/ new buzz.sound("contenido/audios/PE_Aguinaldo_03", { formats: ["mp3"], preload: true }),
    /*65*/ new buzz.sound("contenido/audios/PE_Aguinaldo_04", { formats: ["mp3"], preload: true }),
    /*66*/ new buzz.sound("contenido/audios/PE_Aguinaldo_05", { formats: ["mp3"], preload: true }),
    /*67*/ new buzz.sound("contenido/audios/PE_Aguinaldo_06", { formats: ["mp3"], preload: true }),
    /*68*/ new buzz.sound("contenido/audios/PE_Aguinaldo_07", { formats: ["mp3"], preload: true }),
    /*69*/ new buzz.sound("contenido/audios/PE_Aguinaldo_08", { formats: ["mp3"], preload: true }),
    /*70*/ new buzz.sound("contenido/audios/PE_Aguinaldo_09", { formats: ["mp3"], preload: true }),
    /*71*/ new buzz.sound("contenido/audios/PE_Aguinaldo_10", { formats: ["mp3"], preload: true }),
    /*72*/ new buzz.sound("contenido/audios/PE_Aguinaldo_11", { formats: ["mp3"], preload: true }),
    /*73*/ new buzz.sound("contenido/audios/PE_Bonos_01", { formats: ["mp3"], preload: true }),
    /*74*/ new buzz.sound("contenido/audios/PE_Bonos_02", { formats: ["mp3"], preload: true }),
    /*75*/ new buzz.sound("contenido/audios/PE_Bonos_03", { formats: ["mp3"], preload: true }),
    /*76*/ new buzz.sound("contenido/audios/PE_Bonos_04", { formats: ["mp3"], preload: true }),
    /*77*/ new buzz.sound("contenido/audios/PE_Bonos_05", { formats: ["mp3"], preload: true }),
    /*78*/ new buzz.sound("contenido/audios/PE_Bonos_06", { formats: ["mp3"], preload: true }),
    /*79*/ new buzz.sound("contenido/audios/PE_Bonos_07", { formats: ["mp3"], preload: true }),
    /*80*/ new buzz.sound("contenido/audios/PE_Bonos_08", { formats: ["mp3"], preload: true }),
    /*81*/ new buzz.sound("contenido/audios/PE_PTU_01", { formats: ["mp3"], preload: true }),
    /*82*/ new buzz.sound("contenido/audios/PE_PTU_02", { formats: ["mp3"], preload: true }),
    /*83*/ new buzz.sound("contenido/audios/PE_PTU_03", { formats: ["mp3"], preload: true }),
    /*84*/ new buzz.sound("contenido/audios/PE_PTU_04", { formats: ["mp3"], preload: true }),
    /*85*/ new buzz.sound("contenido/audios/PE_PTU_05", { formats: ["mp3"], preload: true }),
    /*86*/ new buzz.sound("contenido/audios/PE_PTU_06", { formats: ["mp3"], preload: true }),
    /*87*/ new buzz.sound("contenido/audios/PE_PTU_07", { formats: ["mp3"], preload: true }),
    /*88*/ new buzz.sound("contenido/audios/PE_PTU_08", { formats: ["mp3"], preload: true }),
    /*89*/ new buzz.sound("contenido/audios/PE_PTU_09", { formats: ["mp3"], preload: true }),
    /*90*/ new buzz.sound("contenido/audios/PE_PTU_10", { formats: ["mp3"], preload: true }),
]);
