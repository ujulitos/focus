//	HYPE.documents["ayuda"]

(function(){(function k(){function l(a,b,d){var c=!1;null==window[a]&&(null==window[b]?(window[b]=[],window[b].push(k),a=document.getElementsByTagName("head")[0],b=document.createElement("script"),c=h,false==!0&&(c=""),b.type="text/javascript",b.src=c+"/"+d,a.appendChild(b)):window[b].push(k),c=!0);return c}var h="ayuda.hyperesources",c="ayuda",e="ayuda_hype_container";if(false==!1)try{for(var f=document.getElementsByTagName("script"),
a=0;a<f.length;a++){var b=f[a].src,d=null!=b?b.indexOf("/ayuda_hype_generated_script.js"):-1;if(-1!=d){h=b.substr(0,d);break}}}catch(n){}if(false==!1&&(a=navigator.userAgent.match(/MSIE (\d+\.\d+)/),a=parseFloat(a&&a[1])||null,a=l("HYPE_601","HYPE_dtl_601",!0==(null!=a&&10>a||false==!0)?"HYPE-601.full.min.js":"HYPE-601.thin.min.js"),false==!0&&(a=a||l("HYPE_w_601","HYPE_wdtl_601","HYPE-601.waypoints.min.js")),a))return;f=window.HYPE.documents;
if(null!=f[c]){b=1;a=c;do c=""+a+"-"+b++;while(null!=f[c]);d=document.getElementsByTagName("div");b=!1;for(a=0;a<d.length;a++)if(d[a].id==e&&null==d[a].getAttribute("HYP_dn")){var b=1,g=e;do e=""+g+"-"+b++;while(null!=document.getElementById(e));d[a].id=e;b=!0;break}if(!1==b)return}b=[];b=[{name:"cerrarAyuda",source:"function(hypeDocument, element, event) {\tif (parent) {\n     parent.cierraAyuda();\n\t}\n}",identifier:"487"}];d={};g={};for(a=0;a<b.length;a++)try{g[b[a].identifier]=b[a].name,d[b[a].name]=eval("(function(){return "+b[a].source+"})();")}catch(m){window.console&&window.console.log(m),d[b[a].name]=
function(){}}a=new HYPE_601(c,e,{"3":{n:"roboto-bold-webfont.woff"},"12":{n:"roboto-regular-webfont.ttf"},"21":{p:1,n:"manita.png",g:"679",t:"@1x"},"4":{n:"roboto-bold-webfont.woff2"},"30":{p:1,n:"adelante_1.png",g:"715",t:"@1x"},"13":{n:"roboto-regular-webfont.woff"},"5":{n:"roboto-italic-webfont.eot"},"22":{p:1,n:"menu.png",g:"676",t:"@1x"},"6":{p:1,n:"roboto-italic-webfont.svg",g:"15",t:"image/svg+xml"},"31":{p:1,n:"salir.png",g:"713",o:true,t:"@1x"},"14":{n:"roboto-regular-webfont.woff2"},"7":{n:"roboto-italic-webfont.ttf"},"23":{p:1,n:"atras_1.png",g:"688",t:"@1x"},"40":{p:1,n:"interfaz_2x.jpg",g:"671",o:true,t:"@2x"},"32":{p:1,n:"salir_2x.png",g:"713",o:true,t:"@2x"},"15":{p:1,n:"schenker_m3-39.png",g:"485",t:"@1x"},"8":{n:"roboto-italic-webfont.woff"},"24":{p:1,n:"botones.png",g:"693",t:"@1x"},"9":{n:"roboto-italic-webfont.woff2"},"33":{p:1,n:"interactivo.jpg",g:"719",o:true,t:"@1x"},"16":{p:1,n:"Asset%2088.png",g:"681",t:"@1x"},"41":{p:1,n:"indice.jpg",g:"666",o:true,t:"@1x"},"25":{p:1,n:"adelante.png",g:"690",t:"@1x"},"42":{p:1,n:"indice_2x.jpg",g:"666",o:true,t:"@2x"},"34":{p:1,n:"interactivo_2x.jpg",g:"719",o:true,t:"@2x"},"17":{p:1,n:"flecha_azul.png",g:"685",t:"@1x"},"26":{p:1,n:"comenzar.png",g:"709",t:"@1x"},"35":{p:1,n:"slide.jpg",g:"721",o:true,t:"@1x"},"18":{p:1,n:"candado.png",g:"668",t:"@1x"},"27":{p:1,n:"comenzar_1.png",g:"711",o:true,t:"@1x"},"36":{p:1,n:"slide_2x.jpg",g:"721",o:true,t:"@2x"},"19":{p:1,n:"avance.png",g:"670",t:"@1x"},"28":{p:1,n:"comenzar_1_2x.png",g:"711",o:true,t:"@2x"},"-1":{n:"PIE.htc"},"37":{p:1,n:"ejercicio-1.jpg",g:"725",o:true,t:"@1x"},"29":{p:1,n:"atras.png",g:"714",t:"@1x"},"-2":{n:"blank.gif"},"38":{p:1,n:"ejercicio-1_2x.jpg",g:"725",o:true,t:"@2x"},"39":{p:1,n:"interfaz.jpg",g:"671",o:true,t:"@1x"},"10":{n:"roboto-regular-webfont.eot"},"0":{n:"roboto-bold-webfont.eot"},"1":{p:1,n:"roboto-bold-webfont.svg",g:"14",t:"image/svg+xml"},"11":{p:1,n:"roboto-regular-webfont.svg",g:"16",t:"image/svg+xml"},"2":{n:"roboto-bold-webfont.ttf"},"20":{p:1,n:"flechas.png",g:"675",t:"@1x"}},h,["<style>\n@font-face {\n     font-family: \"robotoregular\";\n     src: \n     url(\"ayuda.hyperesources/roboto-regular-webfont.eot?#iefix\") format(\"embedded-opentype\"),\n     url(\"ayuda.hyperesources/roboto-regular-webfont.woff\") format(\"woff\"),\n     url(\"ayuda.hyperesources/roboto-regular-webfont.woff2\") format(\"woff2\"),\n     url(\"ayuda.hyperesources/roboto-regular-webfont.ttf\") format(\"truetype\"),\n     url(\"ayuda.hyperesources/roboto-regular-webfont.svg#robotoregular\") format(\"svg\");\n     font-weight: normal;\n     font-style: normal;\n     \n}\n</style>\n","<style>\n@font-face {\n     font-family: \"robotoitalic\";\n     src: \n     url(\"ayuda.hyperesources/roboto-italic-webfont.eot?#iefix\") format(\"embedded-opentype\"),\n     url(\"ayuda.hyperesources/roboto-italic-webfont.woff\") format(\"woff\"),\n     url(\"ayuda.hyperesources/roboto-italic-webfont.woff2\") format(\"woff2\"),\n     url(\"ayuda.hyperesources/roboto-italic-webfont.ttf\") format(\"truetype\"),\n     url(\"ayuda.hyperesources/roboto-italic-webfont.svg#robotoitalic\") format(\"svg\");\n     font-weight: normal;\n     font-style: normal;\n     \n}\n</style>","<style>\n@font-face {\n     font-family: \"robotobold\";\n     src: \n     url(\"ayuda.hyperesources/roboto-bold-webfont.eot?#iefix\") format(\"embedded-opentype\"),\n     url(\"ayuda.hyperesources/roboto-bold-webfont.woff\") format(\"woff\"),\n     url(\"ayuda.hyperesources/roboto-bold-webfont.woff2\") format(\"woff2\"),\n     url(\"ayuda.hyperesources/roboto-bold-webfont.ttf\") format(\"truetype\"),\n     url(\"ayuda.hyperesources/roboto-bold-webfont.svg#robotobold\") format(\"svg\");\n     font-weight: normal;\n     font-style: normal;\n     \n}\n</style>"],d,[{n:"interfaz",o:"1",X:[0]},{n:"Indice",o:"59",X:[1]},{n:"Pantalla Interactiva",o:"141",X:[2]},{n:"Slide",o:"625",X:[3]},{n:"Ejercicio",o:"695",X:[4]}],[{o:"3",p:"600px",a:100,Y:1200,Z:667,b:100,cA:false,c:"#000000",L:[],bY:1,d:1200,U:{"490":{V:{"491_hover":"738","Control temporal principal":"739"},W:"739",n:"close"},"46":{V:{"Control temporal principal":"737"},W:"737",n:"siguiente"}},T:{"739":{b:[],c:"490",z:0,i:"739",a:[],n:"Control temporal principal",s:"490",f:30},kTimelineDefaultIdentifier:{i:"kTimelineDefaultIdentifier",n:"Control temporal principal",z:1.08,b:[],a:[{f:"c",y:0,z:0.14,i:"b",e:-24,s:-94,o:"733"},{f:"c",y:0.14,z:0.04,i:"b",e:-42,s:-24,o:"733"},{f:"c",y:0.15,z:0.06,i:"e",e:1,s:0,o:"736"},{y:0.18,i:"b",s:-42,z:0,o:"733",f:"c"},{f:"c",y:0.21,z:0.08,i:"cQ",e:0.89830563189674228,s:0.41830563189674219,o:"734"},{f:"c",y:0.21,z:0.08,i:"cR",e:0.89709145427286374,s:0.41709145427286348,o:"734"},{f:"c",y:0.21,z:0.08,i:"e",e:1,s:0,o:"734"},{y:0.21,i:"e",s:1,z:0,o:"736",f:"c"},{f:"c",y:0.29,z:0.02,i:"cQ",e:0.81830563189674221,s:0.89830563189674228,o:"734"},{f:"c",y:0.29,z:0.02,i:"cR",e:0.81709145427286356,s:0.89709145427286374,o:"734"},{y:0.29,i:"e",s:1,z:0,o:"734",f:"c"},{f:"c",y:0.29,z:0.04,i:"e",e:0.75009889240506333,s:0,o:"730"},{y:1.01,i:"cR",s:0.81709145427286356,z:0,o:"734",f:"c"},{y:1.01,i:"cQ",s:0.81830563189674221,z:0,o:"734",f:"c"},{f:"c",y:1.03,z:0.05,i:"e",e:1,s:0,o:"731"},{f:"c",y:1.03,z:0.05,i:"e",e:1,s:0,o:"732"},{f:"c",y:1.03,z:0.05,i:"e",e:1,s:0,o:"735"},{y:1.03,i:"e",s:0.75009889240506333,z:0,o:"730",f:"c"},{y:1.08,i:"e",s:1,z:0,o:"731",f:"c"},{y:1.08,i:"e",s:1,z:0,o:"732",f:"c"},{y:1.08,i:"e",s:1,z:0,o:"735",f:"c"}],f:30},"737":{b:[],c:"46",z:0,i:"737",a:[],n:"Control temporal principal",s:"46",f:30},"738":{b:[],c:"490",z:1,i:"738",a:[{f:"c",y:0,z:1,i:"h",e:"713",s:"713",o:"728"},{y:1,i:"h",s:"713",z:0,o:"728",f:"c"}],n:"491_hover",s:"490",f:30}},bZ:180,O:["733","736","729","734","728","490","731","730","727","46","732","735"],n:"Dise\u00f1o sin t\u00edtulo","_":0,v:{"729":{k:"div",x:"visible",c:1200,d:667,z:1,a:0,j:"absolute",bS:383,b:0},"735":{h:"670",p:"no-repeat",x:"visible",a:477,q:"100% 100%",b:488,j:"absolute",dB:"img",z:12,k:"div",bF:"729",d:93,c:245,r:"inline",e:0},"730":{c:889,d:529,I:"None",r:"none",e:0,J:"None",K:"None",g:"#FFFFFF",L:"None",M:0,w:"",N:0,A:"#D8DDE4",x:"visible",j:"absolute",B:"#D8DDE4",k:"div",O:0,C:"#D8DDE4",z:8,bF:"729",D:"#D8DDE4",P:0,a:155,b:82},"733":{c:570,d:77,I:"None",J:"None",K:"None",g:"#48D8CE",L:"None",M:0,w:"",aI:10,A:"#D8DDE4",N:0,x:"visible",O:0,aJ:10,j:"absolute",C:"#D8DDE4",z:1,k:"div",D:"#D8DDE4",aK:10,B:"#D8DDE4",bF:"729",P:0,a:315,aL:10,b:-94},"727":{h:"715",p:"no-repeat",x:"visible",a:0,q:"100% 100%",b:0,j:"absolute",bF:"46",z:19,k:"div",dB:"img",d:84,c:84,r:"inline"},"736":{G:"#FFFFFF",aU:8,c:327,d:32,aV:8,r:"inline",e:0,s:"robotobold",t:20,Z:"break-word",w:"Interfaz",bF:"729",j:"absolute",x:"visible",k:"div",y:"preserve",z:2,aS:8,aT:8,a:428,F:"center",b:-5},"731":{h:"676",p:"no-repeat",x:"visible",a:167,q:"100% 100%",b:57,j:"absolute",dB:"img",z:10,k:"div",bF:"729",d:125,c:181,r:"inline",e:0},"734":{h:"671",p:"no-repeat",x:"visible",a:56,q:"100% 100%",b:0,j:"absolute",dB:"img",z:7,k:"div",bF:"729",d:667,c:1086.7,cQ:0.41830563189674219,e:0,r:"inline",cR:0.41709145427286348},"728":{b:0,z:30,K:"None",c:38,L:"None",d:38,aS:6,M:0,bD:"none",cQ:1,N:0,aT:6,dB:"button",O:0,cR:1,aU:6,P:0,h:"713",bF:"490",aV:6,j:"absolute",aI:4,k:"div",aJ:4,aK:4,aL:4,A:"#A0A0A0",p:"no-repeat",q:"100% 100%",B:"#A0A0A0",aM:"738",Z:"break-word",C:"#A0A0A0",r:"inline",D:"#A0A0A0",t:13,aA:{a:[{p:4,h:"487"}]},F:"center",G:"#000000",aP:"pointer",w:"<br>",x:"visible",I:"None",a:0,y:"preserve",J:"None"},"490":{cS:true,x:"visible",a:1144,bS:33,b:16,j:"absolute",cA:false,c:56,k:"div",z:2,cL:"490",d:40,bY:1,bX:false,bZ:180,cM:true,cV:[]},"732":{h:"675",p:"no-repeat",x:"visible",a:828,q:"100% 100%",b:464,j:"absolute",dB:"img",z:11,k:"div",bF:"729",d:141,c:210,r:"inline",e:0},"46":{c:102,aE:{a:[{d:0.59999999999999998,p:1,g:5,f:1}]},bS:339,d:84,r:"inline",cA:false,aP:"pointer",cS:true,cK:{a:[{b:"737",p:3,z:false}]},j:"absolute",x:"visible",cL:"46",k:"div",dB:"button",z:3,cM:true,bX:false,cV:[],bY:1,a:1098,bZ:180,b:274}}},{o:"81",p:"600px",a:100,Y:1200,Z:667,b:100,cA:false,c:"#000000",L:[],bY:1,d:1200,U:{"53":{V:{"Control temporal principal":"747"},W:"747",n:"anterior"},"490":{V:{"491_hover":"738","Control temporal principal":"739"},W:"739",n:"close"},"46":{V:{"Control temporal principal":"737"},W:"737",n:"siguiente"}},T:{"747":{b:[],c:"53",z:0,i:"747",a:[],n:"Control temporal principal",s:"53",f:30},"739":{b:[],c:"490",z:0,i:"739",a:[],n:"Control temporal principal",s:"490",f:30},kTimelineDefaultIdentifier:{i:"kTimelineDefaultIdentifier",n:"Control temporal principal",z:1.04,b:[],a:[{f:"c",y:0,z:0.14,i:"b",e:-24,s:-94,o:"742"},{f:"c",y:0.14,z:0.04,i:"b",e:-42,s:-24,o:"742"},{f:"c",y:0.15,z:0.06,i:"e",e:1,s:0,o:"744"},{y:0.18,i:"b",s:-42,z:0,o:"742",f:"c"},{f:"c",y:0.21,z:0.08,i:"cR",e:0.94549469836140509,s:0.34549469836140489,o:"745"},{f:"c",y:0.21,z:0.08,i:"cQ",e:0.94279166666666658,s:0.34279166666666672,o:"745"},{f:"c",y:0.21,z:0.08,i:"e",e:1,s:0,o:"745"},{y:0.21,i:"e",s:1,z:0,o:"744",f:"c"},{f:"c",y:0.29,z:0.02,i:"cR",e:0.84549469836140489,s:0.94549469836140509,o:"745"},{f:"c",y:0.29,z:0.02,i:"cQ",e:0.84279166666666672,s:0.94279166666666658,o:"745"},{y:0.29,i:"e",s:1,z:0,o:"745",f:"c"},{f:"c",y:0.29,z:0.05,i:"e",e:1,s:0,o:"743"},{f:"c",y:0.29,z:0.05,i:"e",e:1,s:0,o:"741"},{y:1.01,i:"cQ",s:0.84279166666666672,z:0,o:"745",f:"c"},{y:1.01,i:"cR",s:0.84549469836140489,z:0,o:"745",f:"c"},{y:1.04,i:"e",s:1,z:0,o:"743",f:"c"},{y:1.04,i:"e",s:1,z:0,o:"741",f:"c"}],f:30},"737":{b:[],c:"46",z:0,i:"737",a:[],n:"Control temporal principal",s:"46",f:30},"738":{b:[],c:"490",z:1,i:"738",a:[{f:"c",y:0,z:1,i:"h",e:"713",s:"713",o:"728"},{y:1,i:"h",s:"713",z:0,o:"728",f:"c"}],n:"491_hover",s:"490",f:30}},bZ:180,O:["742","744","740","728","490","745","743","53","746","727","46","741"],n:"Dise\u00f1o sin t\u00edtulo","_":1,v:{"746":{w:"",h:"714",p:"no-repeat",x:"visible",a:16,q:"100% 100%",b:0,j:"absolute",dB:"img",z:21,k:"div",bF:"53",d:84,c:84,r:"inline",f:0},"741":{h:"668",p:"no-repeat",x:"visible",a:532,q:"100% 100%",b:409,j:"absolute",dB:"img",z:7,k:"div",bF:"740",d:92,c:303,r:"inline",e:0},"53":{c:106,aE:{a:[{d:0.59999999999999998,p:1,g:4,f:2}]},bS:342,d:84,r:"inline",cA:false,aP:"pointer",cS:true,cK:{a:[{b:"747",p:3,z:false}]},j:"absolute",x:"visible",cL:"53",k:"div",dB:"button",z:5,cM:true,bX:false,cV:[],bY:1,a:0,bZ:180,b:274},"744":{G:"#FFFFFF",aU:8,c:327,d:32,aV:8,r:"inline",e:0,s:"robotobold",t:20,Z:"break-word",w:"\u00cdndice",bF:"740",j:"absolute",x:"visible",k:"div",y:"preserve",z:3,aS:8,aT:8,a:428,F:"center",b:-5},"727":{h:"715",p:"no-repeat",x:"visible",a:0,q:"100% 100%",b:0,j:"absolute",dB:"img",z:19,k:"div",bF:"46",d:84,c:84,r:"inline",cM:true},"742":{c:570,d:77,I:"None",r:"inline",J:"None",K:"None",g:"#48D8CE",L:"None",M:0,N:0,aI:10,A:"#D8DDE4",x:"visible",j:"absolute",O:0,aJ:10,k:"div",C:"#D8DDE4",z:1,B:"#D8DDE4",D:"#D8DDE4",aK:10,bF:"740",P:0,a:315,aL:10,b:-94},"745":{w:"",h:"666",p:"no-repeat",x:"visible",a:34,q:"100% 100%",b:30,dB:"img",j:"absolute",z:5,k:"div",bF:"740",d:605.56700000000001,c:1132,cQ:0.34279166666666672,e:0,r:"inline",cR:0.34549469836140489},"728":{b:0,z:30,K:"None",c:38,L:"None",d:38,aS:6,M:0,bD:"none",cQ:1,N:0,aT:6,dB:"button",O:0,cR:1,aU:6,P:0,h:"713",bF:"490",aV:6,j:"absolute",aI:4,k:"div",aJ:4,aK:4,aL:4,A:"#A0A0A0",p:"no-repeat",q:"100% 100%",B:"#A0A0A0",aM:"738",Z:"break-word",C:"#A0A0A0",r:"inline",D:"#A0A0A0",t:13,aA:{a:[{p:4,h:"487"}]},F:"center",G:"#000000",aP:"pointer",w:"<br>",cM:true,x:"visible",I:"None",a:0,y:"preserve",J:"None"},"490":{cS:true,x:"visible",a:1144,bS:33,b:16,j:"absolute",cA:false,c:56,k:"div",z:22,cL:"490",d:40,bY:1,bX:false,bZ:180,cM:true,cV:[]},"740":{k:"div",x:"visible",c:1200,d:667,z:3,a:0,j:"absolute",bS:383,b:0},"743":{h:"670",p:"no-repeat",x:"visible",a:123,q:"100% 100%",b:121,j:"absolute",dB:"img",z:6,k:"div",bF:"740",d:92,c:245,r:"inline",e:0},"46":{c:102,aE:{a:[{d:0.59999999999999998,p:1,g:5,f:1}]},bS:339,d:84,r:"inline",cA:false,aP:"pointer",cS:true,cK:{a:[{b:"737",p:3,z:false}]},j:"absolute",x:"visible",cL:"46",k:"div",dB:"button",z:4,cM:true,bX:false,cV:[],bY:1,a:1098,bZ:180,b:274}}},{o:"155",p:"600px",a:100,Y:1200,Z:667,b:100,cA:false,c:"#000000",L:[],bY:1,d:1200,U:{"490":{V:{"491_hover":"738","Control temporal principal":"739"},W:"739",n:"close"},"53":{V:{"Control temporal principal":"747"},W:"747",n:"anterior"},"46":{V:{"Control temporal principal":"737"},W:"737",n:"siguiente"}},T:{"747":{b:[],c:"53",z:0,i:"747",a:[],n:"Control temporal principal",s:"53",f:30},"739":{b:[],c:"490",z:0,i:"739",a:[],n:"Control temporal principal",s:"490",f:30},kTimelineDefaultIdentifier:{i:"kTimelineDefaultIdentifier",n:"Control temporal principal",z:1.13,b:[],a:[{f:"c",y:0,z:0.14,i:"b",e:-24,s:-94,o:"751"},{f:"c",y:0.14,z:0.04,i:"b",e:-42,s:-24,o:"751"},{f:"c",y:0.15,z:0.06,i:"e",e:1,s:0,o:"750"},{y:0.18,i:"b",s:-42,z:0,o:"751",f:"c"},{f:"c",y:0.21,z:0.08,i:"cR",e:1.0800000000000001,s:0.59999999999999998,o:"754"},{f:"c",y:0.21,z:0.08,i:"cQ",e:1.0800000000000001,s:0.59999999999999998,o:"754"},{f:"c",y:0.21,z:0.08,i:"e",e:1,s:0,o:"754"},{y:0.21,i:"e",s:1,z:0,o:"750",f:"c"},{f:"c",y:0.29,z:0.02,i:"cR",e:1,s:1.0800000000000001,o:"754"},{f:"c",y:0.29,z:0.02,i:"cQ",e:1,s:1.0800000000000001,o:"754"},{y:0.29,i:"e",s:1,z:0,o:"754",f:"c"},{f:"c",y:0.29,z:0.02,i:"e",e:1,s:0,o:"749"},{y:1.01,i:"cQ",s:1,z:0,o:"754",f:"c"},{y:1.01,i:"cR",s:1,z:0,o:"754",f:"c"},{f:"c",y:1.01,z:0.12,i:"e",e:0.65000000000000002,s:0,o:"752"},{y:1.01,i:"e",s:1,z:0,o:"749",f:"c"},{y:1.13,i:"e",s:0.65000000000000002,z:0,o:"752",f:"c"}],f:30},"737":{b:[],c:"46",z:0,i:"737",a:[],n:"Control temporal principal",s:"46",f:30},"738":{b:[],c:"490",z:1,i:"738",a:[{f:"c",y:0,z:1,i:"h",e:"713",s:"713",o:"728"},{y:1,i:"h",s:"713",z:0,o:"728",f:"c"}],n:"491_hover",s:"490",f:30}},bZ:180,O:["751","750","748","728","490","752","754","749","53","746","727","46","753"],n:"Dise\u00f1o sin t\u00edtulo","_":2,v:{"752":{c:925,d:495,I:"None",r:"inline",e:0,J:"None",K:"None",g:"#FFFFFF",L:"None",M:0,w:"",N:0,A:"#D8DDE4",x:"visible",j:"absolute",B:"#D8DDE4",k:"div",O:0,C:"#D8DDE4",z:7,bF:"748",D:"#D8DDE4",P:0,a:138,b:100},"746":{w:"",h:"714",p:"no-repeat",x:"visible",a:16,q:"100% 100%",b:0,j:"absolute",dB:"img",z:21,k:"div",bF:"53",d:84,c:84,r:"inline",cM:true,f:0},"53":{c:96,aE:{a:[{d:0.59999999999999998,p:1,g:4,f:2}]},bS:342,d:84,r:"inline",cA:false,aP:"pointer",cS:true,cK:{a:[{b:"747",p:3,z:false}]},j:"absolute",x:"visible",cL:"53",k:"div",dB:"button",z:9,cM:true,bX:false,cV:[],bY:1,a:0,bZ:180,b:274},"749":{h:"679",p:"no-repeat",x:"visible",a:533,q:"100% 100%",b:234,j:"absolute",dB:"img",z:15,k:"div",bF:"748",d:161,c:406,r:"inline",e:0},"750":{G:"#FFFFFF",aU:8,c:327,d:32,aV:8,r:"inline",e:0,s:"robotobold",t:20,Z:"break-word",w:"Pantalla interactiva \n",bF:"748",j:"absolute",x:"visible",k:"div",y:"preserve",z:2,aS:8,aT:8,a:428,F:"center",b:-5},"727":{h:"715",p:"no-repeat",x:"visible",a:0,q:"100% 100%",b:0,j:"absolute",dB:"img",z:19,k:"div",bF:"46",d:84,c:84,r:"inline",cM:true},"753":{h:"681",p:"no-repeat",x:"visible",a:899,q:"100% 100%",b:286,j:"absolute",bF:"748",z:8,k:"div",dB:"img",d:40,c:27,r:"inline"},"751":{c:570,d:77,I:"None",J:"None",K:"None",g:"#48D8CE",L:"None",M:0,w:"",aI:10,A:"#D8DDE4",N:0,x:"visible",O:0,aJ:10,j:"absolute",C:"#D8DDE4",z:1,k:"div",D:"#D8DDE4",aK:10,B:"#D8DDE4",bF:"748",P:0,a:315,aL:10,b:-94},"728":{b:0,z:30,K:"None",c:38,L:"None",d:38,aS:6,M:0,bD:"none",cQ:1,N:0,aT:6,dB:"button",O:0,cR:1,aU:6,P:0,h:"713",bF:"490",aV:6,j:"absolute",aI:4,k:"div",aJ:4,aK:4,aL:4,A:"#A0A0A0",p:"no-repeat",q:"100% 100%",B:"#A0A0A0",aM:"738",Z:"break-word",C:"#A0A0A0",r:"inline",D:"#A0A0A0",t:13,aA:{a:[{p:4,h:"487"}]},F:"center",G:"#000000",aP:"pointer",w:"<br>",cM:true,x:"visible",I:"None",a:0,y:"preserve",J:"None"},"490":{cS:true,x:"visible",a:1144,bS:33,b:16,j:"absolute",cA:false,c:56,k:"div",z:7,cL:"490",d:40,bY:1,bX:false,bZ:180,cM:true,cV:[]},"748":{k:"div",x:"visible",c:1200,d:667,z:6,a:0,j:"absolute",bS:383,b:0},"754":{h:"719",p:"no-repeat",x:"visible",a:138,q:"100% 100%",b:100,j:"absolute",dB:"img",z:5,k:"div",bF:"748",d:495,c:925,cQ:0.59999999999999998,e:0,r:"inline",cR:0.59999999999999998},"46":{c:102,aE:{a:[{d:0.59999999999999998,p:1,g:5,f:1}]},bS:339,d:84,r:"inline",cA:false,aP:"pointer",cS:true,cK:{a:[{b:"737",p:3,z:false}]},j:"absolute",x:"visible",cL:"46",k:"div",dB:"button",z:8,cM:true,bX:false,cV:[],bY:1,a:1098,bZ:180,b:274}}},{o:"637",p:"600px",a:100,Y:1200,Z:667,b:100,cA:false,c:"#000000",L:[],bY:1,d:1200,U:{"490":{V:{"491_hover":"738","Control temporal principal":"739"},W:"739",n:"close"},"53":{V:{"Control temporal principal":"747"},W:"747",n:"anterior"},"46":{V:{"Control temporal principal":"737"},W:"737",n:"siguiente"}},T:{"747":{b:[],c:"53",z:0,i:"747",a:[],n:"Control temporal principal",s:"53",f:30},"739":{b:[],c:"490",z:0,i:"739",a:[],n:"Control temporal principal",s:"490",f:30},kTimelineDefaultIdentifier:{i:"kTimelineDefaultIdentifier",n:"Control temporal principal",z:1.13,b:[],a:[{f:"c",y:0,z:0.14,i:"b",e:-24,s:-94,o:"762"},{f:"c",y:0.14,z:0.04,i:"b",e:-42,s:-24,o:"762"},{f:"c",y:0.15,z:0.06,i:"e",e:1,s:0,o:"758"},{y:0.18,i:"b",s:-42,z:0,o:"762",f:"c"},{f:"c",y:0.21,z:0.08,i:"cQ",e:1.0799999999999998,s:0.59999999999999998,o:"763"},{f:"c",y:0.21,z:0.08,i:"cR",e:1.0823171832749838,s:0.60231718327498351,o:"763"},{f:"c",y:0.21,z:0.08,i:"e",e:1,s:0,o:"763"},{y:0.21,i:"e",s:1,z:0,o:"758",f:"c"},{f:"c",y:0.29,z:0.02,i:"cQ",e:1,s:1.0799999999999998,o:"763"},{f:"c",y:0.29,z:0.02,i:"cR",e:1.0023171832749835,s:1.0823171832749838,o:"763"},{y:0.29,i:"e",s:1,z:0,o:"763",f:"c"},{f:"c",y:0.29,z:0.06,i:"e",e:1,s:0,o:"760"},{f:"c",y:0.29,z:0.06,i:"e",e:1,s:0,o:"756"},{y:1.01,i:"cR",s:1.0023171832749835,z:0,o:"763",f:"c"},{y:1.01,i:"cQ",s:1,z:0,o:"763",f:"c"},{f:"c",y:1.01,z:0.12,i:"e",e:0.65000000000000002,s:0,o:"757"},{f:"c",y:1.01,z:0.02,i:"e",e:1,s:0,o:"761"},{f:"c",y:1.01,z:0.02,i:"e",e:1,s:0,o:"759"},{f:"c",y:1.03,z:0.05,i:"e",e:1,s:0,o:"764"},{y:1.03,i:"e",s:1,z:0,o:"761",f:"c"},{y:1.03,i:"e",s:1,z:0,o:"759",f:"c"},{y:1.05,i:"e",s:1,z:0,o:"760",f:"c"},{y:1.05,i:"e",s:1,z:0,o:"756",f:"c"},{y:1.08,i:"e",s:1,z:0,o:"764",f:"c"},{y:1.13,i:"e",s:0.65000000000000002,z:0,o:"757",f:"c"}],f:30},"737":{b:[],c:"46",z:0,i:"737",a:[],n:"Control temporal principal",s:"46",f:30},"738":{b:[],c:"490",z:1,i:"738",a:[{f:"c",y:0,z:1,i:"h",e:"713",s:"713",o:"728"},{y:1,i:"h",s:"713",z:0,o:"728",f:"c"}],n:"491_hover",s:"490",f:30}},bZ:180,O:["762","758","755","728","490","757","763","759","761","756","760","53","746","727","46","764"],n:"Dise\u00f1o sin t\u00edtulo","_":3,v:{"746":{w:"",h:"714",p:"no-repeat",x:"visible",a:16,q:"100% 100%",b:0,j:"absolute",dB:"img",z:21,k:"div",bF:"53",d:84,c:84,r:"inline",cM:true,f:0},"763":{h:"721",p:"no-repeat",x:"visible",a:136,q:"100% 100%",b:100,j:"absolute",dB:"img",z:6,k:"div",bF:"755",d:495,c:927,cQ:0.59999999999999998,e:0,r:"inline",cR:0.60231718327498351},"53":{c:96,aE:{a:[{d:0.59999999999999998,p:1,g:4,f:2}]},bS:342,d:84,r:"inline",cA:false,aP:"pointer",cS:true,cK:{a:[{b:"747",p:3,z:false}]},j:"absolute",x:"visible",cL:"53",k:"div",dB:"button",z:9,cM:true,bX:false,cV:[],bY:1,a:0,bZ:180,b:274},"755":{k:"div",x:"visible",c:1200,d:667,z:6,a:0,j:"absolute",bS:383,b:0},"761":{h:"690",p:"no-repeat",x:"visible",a:730,q:"100% 100%",b:111,j:"absolute",dB:"img",z:13,k:"div",bF:"755",d:154,c:321,r:"inline",e:0},"727":{h:"715",p:"no-repeat",x:"visible",a:0,q:"100% 100%",b:0,j:"absolute",dB:"img",z:19,k:"div",bF:"46",d:84,c:84,r:"inline",cM:true},"758":{G:"#FFFFFF",aU:8,c:327,d:32,aV:8,r:"inline",e:0,s:"robotobold",t:20,Z:"break-word",w:"Slide<br>",bF:"755",j:"absolute",x:"visible",k:"div",y:"preserve",z:1,aS:8,aT:8,a:428,F:"center",b:-5},"764":{h:"693",p:"no-repeat",x:"visible",a:478,q:"100% 100%",b:416,j:"absolute",dB:"img",z:14,k:"div",bF:"755",d:129,c:359,r:"inline",e:0},"756":{h:"685",p:"no-repeat",x:"visible",a:150,q:"100% 100%",b:119,j:"absolute",dB:"img",z:10,k:"div",bF:"755",d:30,c:30,r:"inline",e:0,f:180},"762":{c:570,d:77,I:"None",J:"None",K:"None",g:"#48D8CE",L:"None",M:0,w:"",aI:10,A:"#D8DDE4",N:0,x:"visible",O:0,aJ:10,j:"absolute",C:"#D8DDE4",z:1,k:"div",D:"#D8DDE4",aK:10,B:"#D8DDE4",bF:"755",P:0,a:315,aL:10,b:-94},"728":{b:0,z:30,K:"None",c:38,L:"None",d:38,aS:6,M:0,bD:"none",cQ:1,N:0,aT:6,dB:"button",O:0,cR:1,aU:6,P:0,h:"713",bF:"490",aV:6,j:"absolute",aI:4,k:"div",aJ:4,aK:4,aL:4,A:"#A0A0A0",p:"no-repeat",q:"100% 100%",B:"#A0A0A0",aM:"738",Z:"break-word",C:"#A0A0A0",r:"inline",D:"#A0A0A0",t:13,aA:{a:[{p:4,h:"487"}]},F:"center",G:"#000000",aP:"pointer",w:"<br>",cM:true,x:"visible",I:"None",a:0,y:"preserve",J:"None"},"490":{cS:true,x:"visible",a:1144,bS:33,b:16,j:"absolute",cA:false,c:56,k:"div",z:7,cL:"490",d:40,bY:1,bX:false,bZ:180,cM:true,cV:[]},"759":{h:"688",p:"no-repeat",x:"visible",a:145,q:"100% 100%",b:111,j:"absolute",dB:"img",z:12,k:"div",bF:"755",d:153,c:321,r:"inline",e:0},"760":{h:"685",p:"no-repeat",x:"visible",a:1013,q:"100% 100%",b:119,j:"absolute",dB:"img",z:11,k:"div",bF:"755",d:30,c:30,r:"inline",e:0},"46":{c:102,aE:{a:[{d:0.59999999999999998,p:1,g:5,f:1}]},bS:339,d:84,r:"inline",cA:false,aP:"pointer",cS:true,cK:{a:[{b:"737",p:3,z:false}]},j:"absolute",x:"visible",cL:"46",k:"div",dB:"button",z:8,cM:true,bX:false,cV:[],bY:1,a:1098,bZ:180,b:274},"757":{c:927,d:497,I:"None",r:"inline",e:0,J:"None",K:"None",g:"#FFFFFF",L:"None",M:0,N:0,bF:"755",A:"#D8DDE4",x:"visible",j:"absolute",B:"#D8DDE4",k:"div",O:0,C:"#D8DDE4",z:7,P:0,D:"#D8DDE4",a:136,b:99}}},{o:"705",p:"600px",a:100,Y:1200,Z:667,b:100,cA:false,c:"#000000",L:[],bY:1,d:1200,U:{"53":{V:{"Control temporal principal":"747"},W:"747",n:"anterior"},"490":{V:{"491_hover":"738","Control temporal principal":"739"},W:"739",n:"close"}},T:{"747":{b:[],c:"53",z:0,i:"747",a:[],n:"Control temporal principal",s:"53",f:30},"739":{b:[],c:"490",z:0,i:"739",a:[],n:"Control temporal principal",s:"490",f:30},kTimelineDefaultIdentifier:{i:"kTimelineDefaultIdentifier",n:"Control temporal principal",z:1.18,b:[],a:[{f:"c",y:0,z:0.14,i:"b",e:-24,s:-94,o:"769"},{f:"c",y:0.14,z:0.04,i:"b",e:-42,s:-24,o:"769"},{f:"c",y:0.15,z:0.06,i:"e",e:1,s:0,o:"770"},{y:0.18,i:"b",s:-42,z:0,o:"769",f:"c"},{f:"c",y:0.21,z:0.08,i:"cR",e:1.0800000000000001,s:0.59999999999999998,o:"771"},{f:"c",y:0.21,z:0.08,i:"cQ",e:1.0800000000000001,s:0.59999999999999998,o:"771"},{f:"c",y:0.21,z:0.08,i:"e",e:1,s:0,o:"771"},{y:0.21,i:"e",s:1,z:0,o:"770",f:"c"},{f:"c",y:0.29,z:0.02,i:"cQ",e:1,s:1.0800000000000001,o:"771"},{f:"c",y:0.29,z:0.02,i:"cR",e:1,s:1.0800000000000001,o:"771"},{y:0.29,i:"e",s:1,z:0,o:"771",f:"c"},{y:1.01,i:"cQ",s:1,z:0,o:"771",f:"c"},{y:1.01,i:"cR",s:1,z:0,o:"771",f:"c"},{f:"c",y:1.01,z:0.12,i:"e",e:0.65000000000000002,s:0,o:"766"},{f:"c",y:1.05,z:0.11,i:"e",e:1,s:0,o:"768"},{f:"c",y:1.13,z:0.05,i:"e",e:1,s:0,o:"767"},{y:1.13,i:"e",s:0.65000000000000002,z:0,o:"766",f:"c"},{y:1.16,i:"e",s:1,z:0,o:"768",f:"c"},{y:1.18,i:"e",s:1,z:0,o:"767",f:"c"}],f:30},"738":{b:[],c:"490",z:1,i:"738",a:[{f:"c",y:0,z:1,i:"h",e:"713",s:"713",o:"728"},{y:1,i:"h",s:"713",z:0,o:"728",f:"c"}],n:"491_hover",s:"490",f:30}},bZ:180,O:["769","770","765","728","490","766","771","53","746","767","768"],n:"Dise\u00f1o sin t\u00edtulo","_":4,v:{"746":{w:"",h:"714",p:"no-repeat",x:"visible",a:16,q:"100% 100%",b:0,j:"absolute",dB:"img",z:21,k:"div",bF:"53",d:84,c:84,r:"inline",cM:true,f:0},"765":{k:"div",x:"visible",c:1200,d:667,z:6,a:0,j:"absolute",bS:383,b:0},"768":{h:"711",p:"no-repeat",x:"visible",a:297,q:"100% 100%",b:375,j:"absolute",dB:"img",z:11,k:"div",bF:"765",d:64,c:164,r:"inline",e:0},"771":{h:"725",p:"no-repeat",x:"visible",a:136,q:"100% 100%",b:100,j:"absolute",dB:"img",z:3,k:"div",bF:"765",d:495,c:927,cQ:0.59999999999999998,e:0,r:"inline",cR:0.59999999999999998},"53":{c:96,aE:{a:[{d:0.59999999999999998,p:1,g:4,f:2}]},bS:342,d:84,r:"inline",cA:false,aP:"pointer",cS:true,cK:{a:[{b:"747",p:3,z:false}]},j:"absolute",x:"visible",cL:"53",k:"div",dB:"button",z:9,cM:true,bX:false,cV:[],bY:1,a:0,bZ:180,b:274},"767":{h:"709",p:"no-repeat",x:"visible",a:292,q:"100% 100%",b:377,j:"absolute",dB:"img",z:12,k:"div",bF:"765",d:138,c:296,r:"inline",e:0},"770":{G:"#FFFFFF",aU:8,c:327,d:32,aV:8,r:"inline",e:0,s:"robotobold",t:20,Z:"break-word",w:"Ejercicio",bF:"765",j:"absolute",x:"visible",k:"div",y:"preserve",z:2,aS:8,aT:8,a:428,F:"center",b:-5},"728":{b:0,z:30,K:"None",c:38,L:"None",d:38,aS:6,M:0,bD:"none",cQ:1,N:0,aT:6,dB:"button",O:0,cR:1,aU:6,P:0,h:"713",bF:"490",aV:6,j:"absolute",aI:4,k:"div",aJ:4,aK:4,aL:4,A:"#A0A0A0",p:"no-repeat",q:"100% 100%",B:"#A0A0A0",aM:"738",Z:"break-word",C:"#A0A0A0",r:"inline",D:"#A0A0A0",t:13,aA:{a:[{p:4,h:"487"}]},F:"center",G:"#000000",aP:"pointer",w:"<br>",cM:true,x:"visible",I:"None",a:0,y:"preserve",J:"None"},"490":{cS:true,x:"visible",a:1144,bS:33,b:16,j:"absolute",cA:false,c:56,k:"div",z:7,cL:"490",d:40,bY:1,bX:false,bZ:180,cM:true,cV:[]},"766":{c:927,d:495,I:"None",r:"inline",e:-0.0000000000,J:"None",K:"None",g:"#FFFFFF",L:"None",M:0,N:0,bF:"765",A:"#D8DDE4",x:"visible",j:"absolute",B:"#D8DDE4",k:"div",O:0,C:"#D8DDE4",z:10,P:0,D:"#D8DDE4",a:136,b:100},"769":{c:570,d:77,I:"None",J:"None",K:"None",g:"#48D8CE",L:"None",M:0,w:"",aI:10,A:"#D8DDE4",N:0,x:"visible",O:0,aJ:10,j:"absolute",C:"#D8DDE4",z:1,k:"div",D:"#D8DDE4",aK:10,B:"#D8DDE4",bF:"765",P:0,a:315,aL:10,b:-94}}}],{"490":["728"],"53":["746"],"46":["727"]},g,{},null,false,true,-1,true,true,false,true);f[c]=a.API;document.getElementById(e).setAttribute("HYP_dn",
c);a.z_o(this.body)})();})();
