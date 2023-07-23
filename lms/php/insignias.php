<?php
    $files = glob("../insignias/*.*");    
    $html = "";
    for ($i=0; $i<count($files); $i++) {
        $image = $files[$i];    
        $imgName= explode("/", $image)[2];
        $dir = "insignias/".$imgName;
        $html .= '<a href="#"><img onclick="setActiveInsignia(this)"  class="insall" src="'.$dir.'" style="margin:10px;width:50px !important; height: 50px !important;"/> </a>';
    }    
    echo $html;
?>
