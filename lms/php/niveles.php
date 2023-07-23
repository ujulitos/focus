<?php
    $files = glob("../niveles/*.*");    
    $html = "";
    for ($i=0; $i<count($files); $i++) {
        $image = $files[$i];    
        $imgName= explode("/", $image)[2];
        $dir = "niveles/".$imgName;
        $html .= '<a href="#"><img onclick="setActiveNivel(this)"  class="nivall" src="'.$dir.'" style="margin:10px;width:50px !important; height: 50px !important;"/> </a>';
    }    
    echo $html;
?>
