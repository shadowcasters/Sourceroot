<?php
// loads the init file that defines the applications settings

header("content-type: text/javascript");

error_reporting(1);
echo "//  >>>  Tofui v .07 \n\n";

if(file_exists("sysConfig.json")){
  $app = $_GET["app"];
  if($app == null){
        print("You have not requested an application. try the URL with ?app=appname");
  }

  $sysConfig = file_get_contents("sysConfig.json");
  $sysConfig = json_decode($sysConfig);

echo "\n".$sysConfig."\n";

function init(){
    global $sysConfig;
    global $app;
    $appInst = explode(".", $app);
    $appIndex = file_get_contents($sysConfig->appDirectory.$appInst[0]."/init.js");
    $lArr = explode("\n",$appIndex);
    $JS = ("tofui.imageDir='./".$sysConfig->appDirectory.$appInst[0]."/images/'");
    $JS .="\n if(JSMode == 'dev') _SRDebug.init();";
    $JS .= "\n if(!rootPayne) var rootPayne = SRLayout.getDiv('100%','100%','rootPayne').setAbsolute(); document.body.appendChild(rootPayne); \n";
    $foundIndex = false;
       foreach($lArr as $J){
        //////// Parse @init annotation \\\\\\\\\\\\
            if(stristr($J, '@init("') == TRUE){
               $init = getParameter($J);
               $JS .= file_get_contents($sysConfig->appDirectory.$appInst[0]."/".$init);
               $foundIndex = true;
            }

        }
        if($initFound == false){
          echo $sysConfig->appDirectory.$appInst[0]."/index.js"."<br>";
          if(file_exists($sysConfig->appDirectory.$appInst[0]."/index.js"))
              $JS .= file_get_contents($sysConfig->appDirectory.$appInst[0]."/index.js");
           else
              echo "\n alert('No index.js was found in this applications root directory, there was no @init anotation in the init.js file.');";

        }

        annoParser($JS,$sysConfig->appDirectory.$appInst[0]."/");
}

function bootStrap(){
global $sysConfig;
global $app;
$dir = $sysConfig->tofuiDirectory;
$widgetDir = $sysConfig->widgetDirectory;
$url = $sysConfig->tofuiUrl;
$theme = file_get_contents($dir."SRUtils.js");
$loadFiles = $sysConfig->includeFiles;
foreach ($loadFiles as $f) {
    $theme .= file_get_contents($dir.$f);
}

echo "
var tofui = {
    init:function(){
      var iscript =  document.createElement(\"script\");
      iscript.src = '".$url."/tofui.php?app=".$app.".init';
      document.documentElement.appendChild(iscript);
    }
    }
";

annoParser($theme);
// load the rest of the app
  if($sysConfig->appDirectory != null){

    $appImages = file_get_contents($sysConfig->appDirectory.$app."/images/imageMaps.js");
    if($appImages != null){
      annoParser($appImages,$sysConfig->appDirectory."/images/");

    }

    $appIndex = file_get_contents($sysConfig->appDirectory.$app."/init.js");
    if($appIndex != null){
      annoParser($appIndex,$sysConfig->appDirectory.$app."/");
    }



    $theme = file_get_contents($sysConfig->appDirectory."appConfig.json");
  }else{
      print("Unable to locate application directory in config file: sysConfig.json");
  }
}

  if(stristr($app, ".init") === FALSE){
    bootStrap();
  }else{
    init();
  }

}



function annoParser($JS, $dir){

    global $sysConfig;
    global $app;
    ///// INSERT THEME CHECK \\\\\\\
    $lArr = explode("\n",$JS);
        foreach($lArr as $J){
          print "DIR--->>".$J."\n";
        //////// Parse @theme annotations \\\\\\\\\\\\
            if(stristr($J, '@variable("') == TRUE){
               parseVariable($J);
            }else
        //////// Parse @theme annotations \\\\\\\\\\\\
            if(stristr($J, '@theme("') == TRUE){
               parseTheme($J);
            }else
        /////// Parse @inject annotations \\\\\\\\\\\\
            if(stristr($J, '@inject("') == TRUE){
               if($dir == null) $dir =  $sysConfig->appDirectory.$app."/";
               parseInject($J,$dir);
            }else
        /////// loads widgets from registered widget repositories
            if(stristr($J, '@widget("') == TRUE){
               parsewidget($J);
            }else
        /////// loads controllers from registered widget repositories
            if(stristr($J, '@lib("') == TRUE){
                parseInject($J,$sysConfig->tofuiDirectory);
            }else
            {
               print($J."\n");
            }

        }
}

function parsewidget($annoStr){
    global $sysConfig;

    $widget = getParameter($annoStr);
    $f = $sysConfig->widgetDirectory.$widget.".js";

    annoParser(file_get_contents($f));
}

// @inject parser
function parseInject($annotation,$dir){

        $JsFile = getParameter($annotation);

        if(strtolower(substr($JsFile, 0, 7)) == "http://"){
             $fc = file_get_contents(urlencode($JsFile));
        }else{

            if(substr($JsFile, -3, 3) != ".js")
                $JsFile .= ".js";

            if(substr($JsFile, 0, 2) == "./" || substr($JsFile, 0, 1) != "/" )
                $fc = file_get_contents($dir.$JsFile);
            else
                $fc = file_get_contents($JsFile);
        }

        annoParser($fc,$dir);
}

// @theme parser
function parseTheme($annotation){
     global $sysConfig;
     global $appDir;

     $theme = getParameter($annotation);
     print "var themeTitle = '".$theme."';";
     print "var themeDirectory = '".$sysConfig->themeDirectory.$theme."/';";

     $themeLoader = file_get_contents($sysConfig->themeDirectory.$theme."/theme.js");
     $dir = $sysConfig->themeDirectory.$theme."/";
     annoParser($themeLoader,$dir);
     echo "theme.spriteMapUrl = \"".$dir."spriteMaps/\"; ";

}

// @variable parser, prints the variable in JS
function parseVariable($annotation){
    $arr = getParameter($annotation);
    if($arr[0]!=null && $arr[1] != null){
        if(is_int($arr[1]))
            echo "var ".$arr[0]."=".$arr[1].";";
         else
         if(is_string($arr[1])){
             echo "var ".$arr[0]."= \"".$arr[1]."\";";
          }
    }
}

function getParameter($annoStr){
   $J = substr($annoStr, strpos($annoStr, '("')+2);
   $str = str_replace('");', '',$J);

   if(stristr($str,'","') == TRUE){
       $retVal = explode('","', $str);
   }else{
       $retVal = $str;
   }

   return $retVal;
}


?>
