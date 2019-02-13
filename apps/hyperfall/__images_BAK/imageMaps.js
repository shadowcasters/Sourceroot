var spriteMap = "images.png";
var vTile = "vTile.png";
var hTile = "hTile.png";

var _SRAppImageMaps = [
    ["nike",["0 -558px",24,17]],
    ["ford",["-25px -562px",32,17]],
    ["tesla",["-58px -563px",32,17]],
    ["GM",["-36px -582px",32,17]],

]

var _SRSpriteMaps = [
    ["spinner",[
        ["map",["-0px -1380px",128,64]],
        ["frameSize",[16,16]],
        ["fps",[35]]
    ]]

]

var _SRIconMaps = [
    ["Richard",["0 -1778px",90,75]],
    ["medium",[
        ["openfile",["-19px -214px",22,22]],
        ["id", ["0 -1690px", 24,20]],
        ["windowsearch",["-47px -326px",32,32]],
        ["network",[
            ["transmit",["-18px -235px",22,22]],
            ["error",["-18px -259px",22,22]],
            ["clientServer",["-18px -283px",28,22]],
            ["offline",["-16px -404px",22,22]],
            ["online",["-18px -379px",22,22]],
            ["cycle",["-18px -355px",22,22]],
            ["connected",["-14px -448px",14,14]],
            ["disconnected",["-0px -448px",14,14]]

        ]]
      ]
    ],
  

    ["chat",[
        ["bubble",["-0px -431px",16,16]],
        ["group",[" -48px -213px", 32,32]],
        ["node",["-50px -246px",24,24]],
        ["welcome",["-52px -274px",48,48]]

    ]],
    ["netconfig", ["0 -1662px", 30,27]],
    ["globe", ["-20px -430px", 16,16]],
    ["calc", ["0 -134px", 21,24]],
    ["gear",["0 -97px",31,31]],
    ["greenLight",["-8px -422px",8,8]],
    ["redLight",["-0px -422px",8,8]],

    ["groupChat16",["-0px -431px",16,16]],
    ["groupChat22",["-0px -431px",16,16]],
    ["globalSettings",["0 -401px",16,16]],
    ["options",["0 -65px",31,31]],
    ["fruit",[
        ["apple",["0 -716px",16,16]],
        ["grape",["0 -740px",16,16]],
        ["lemon",["0 -761px",16,16]],
        ["bannana",["0 -784px",16,16]],
        ["mellon",["0 -806px", 16,16]],
        ["orange",["0 -832px",16,16]]
        ]
    ],
    ["calculator",[" 0 -235px",16,16]],
    ["face",[
        ["devilish",["0 -254px",16,16]],
        ["glasses",["0 -275px",16,16]],
        ["grin",["0 -296px",16,16]],
        ["monkey",["0 -317px",16,16]],
        ["smile",["0 -338px",16,16]],
        ["wink",[" 0 -359px",16,16]]
        ]
    ],
    ["menu",[
        ["contract",[" -20px -1600px",16,16]],
        ["expand",[" -20px -1610px", 16,16]],
        ["plus",[" 0 -852px",16,16]],
        ["minus",[" 0 -869px",16,16]]
    ]],
    ["checkbox",[
        ["unchecked",[" 0 -197px", 12,12]],
        ["checked",[" -14px -197px", 12,12]]
    ]],
    ["radio",[
        ["ticked",[" -33px -197px", 12,12]],
        ["unticked",[" -48px -197px", 12,12]]
    ]],
    ["system",[
        ["help",[" 0 -216px",16,16]],
        ["folder",[" 0 -382px", 16,16]],
        ["exit",[" 0 -1292px", 16,16]],
        ["new",[" 0 -1312px", 16,16]],
        ["open",[" 0 -1327px", 16,16]],
        ["search",[" 0 -965px",16,16]],
        ["import",[" 0 -1346px", 16,16]],
        ["windows",[" 0 -669px", 16,16]],
        ["tools",[" 0 -690px", 16,16]],
        ["trash",[" 0 -1061px", 16,16]],
        ["window",[" 0 -1082px", 16,16]],
        ["tab",[" 0 -986px",16,16]]
    ]],
    ["arrow",[
        ["right",[" 0 -585px",16,16]],
        ["down",[" -14px -584px",16,16]]
    ]],
    ["media",[
        ["stop",[" 0 -606px", 16,16]],
        ["backward",[" 0 -627px", 16,16]],
        ["forward",[" 0 -648px", 16,16]]
    ]],
   
    ["blank",["-35px -1px",1,1]]
]

/// compponent, set, theme, image
var _SRImageMapArray=[
    ["arch",[
       ["bevel",[
           ["primary",[
                    ["top",[
                        ["left",["0 -1971px",4,4]],
                        ["right",["-4px -1971px",4,4]]
                    ]],
                    ["bottom",[
                        ["left",["0 -1975px",4,4]],
                        ["right",["-4px -1975px",4,4]]
                    ]],
                    ["hTile",[
                        ["top",["0 -311px",1,4]],
                        ["bottom",["0 -327px",1,4]]
                    ]],
                    ["vTile",[
                        ["left",["-52px 0",4,1]],
                        ["right",["-48px 0",4,1]]
                    ]]
                ]],
             ["light",[
                    ["top",[
                        ["left",["-30px -1972px",4,4]],
                        ["right",["-34px -1972px",4,4]]
                    ]],
                    ["bottom",[
                        ["left",["-30px -1976px",4,4]],
                        ["right",["-34px -1976px",4,4]]
                    ]],
                    ["hTile",[
                        ["top",["0 -333px",1,4]],
                        ["bottom",["0 -349px",1,4]]
                    ]],
                    ["vTile",[
                        ["left",["-85px 0",4,1]],
                        ["right",["-98px 0",4,1]]
                    ]]
                ]],
             ["dark",[
                    ["top",[
                        ["left",["0 -1971px",4,4]],
                        ["right",["-4px -1971px",4,4]]
                    ]],
                    ["bottom",[
                        ["left",["0 -1975px",4,4]],
                        ["right",["-4px -1975px",4,4]]
                    ]],
                    ["hTile",[
                        ["top",["0 -311px",1,4]],
                        ["bottom",["0 -327px",1,4]]
                    ]],
                    ["vTile",[
                        ["left",["-52px 0",4,1]],
                        ["right",["-48px 0",4,1]]
                    ]]
           ]]
       ]],
       ["small",[
           ["primary",[
                    ["top",[
                        ["left",["0 -1957px",6,6]],
                        ["right",["-6px -1957px",6,6]]
                    ]],
                    ["bottom",[
                        ["left",["0 -1963px",6,6]],
                        ["right",["-6px -1963px",6,6]]                        
                    ]],
                    ["hTile",[
                        ["top",["0 -311px",1,6]],
                        ["bottom",["0 -325px",1,6]]
                    ]],
                    ["vTile",[
                        ["left",["-52px 0",6,1]],
                        ["right",["-46px 0",6,1]]
                    ]]
                ]],
           ["light",[
                    ["top",[
                        ["left",["-41px -1904px",6,6]],
                        ["right",["-47px -1904px",6,6]]
                    ]],
                    ["bottom",[
                        ["left",["-41px -1910px",6,6]],
                        ["right",["-47px -1910px",6,6]]
                    ]],
                    ["hTile",[
                        ["top",["0 -333px",1,6]],
                        ["bottom",["0 -347px",1,6]]
                    ]],
                    ["vTile",[
                        ["left",["-85px 0",6,1]],
                        ["right",["-96px 0",6,1]]
                    ]]
                ]],
           ["dark",[
                    ["top",[
                        ["left",["-58px -1958px",6,6]],
                        ["right",["-64px -1958px",6,6]]
                    ]],
                    ["bottom",[
                        ["left",["-58px -1964px",6,6]],
                        ["right",["-64px -1964px",6,6]]
                    ]],
                    ["hTile",[
                        ["top",["0 -354px",1,6]],
                        ["bottom",["0 -368px",1,6]]
                    ]],
                    ["vTile",[
                        ["left",["-69px 0",6,1]],
                        ["right",["-79px 0",6,1]]
                    ]]
           ]]
       ]],
       ["medium",[
                 ["primary",[
                    ["top",[
                        ["left",["0 -1934px",10,10]],
                        ["right",["-10px -1934px",10,10]]
                    ]],
                    ["bottom",[
                        ["left",["0 -1944px",10,10]],
                        ["right",["-10px -1944px",10,10]]
                    ]],
                    ["hTile",[
                        ["top",["0 -311px",1,10]],
                        ["bottom",["0 -321px",1,10]]
                    ]],
                    ["vTile",[
                        ["left",["-52px 0",10,1]],
                        ["right",["-42px 0",10,1]]
                    ]]
                ]],
                ["light",[
                    ["top",[
                        ["left",["-33px -1919px",10,10]],
                        ["right",["-43px -1919px",10,10]]
                    ]],
                    ["bottom",[
                        ["left",["-33px -1929px",10,10]],
                        ["right",["-43px -1929px",10,10]]
                    ]],
                    ["hTile",[
                        ["top",["0 -333px",1,10]],
                        ["bottom",["0 -343px",1,10]]
                    ]],
                    ["vTile",[
                        ["left",["-85px 0",10,1]],
                        ["right",["-92px 0",10,1]]
                    ]]
                ]],
                ["dark",[
                    ["top",[
                        ["left",["-58px -1958px",6,6]],
                        ["right",["-64px -1958px",6,6]]
                    ]],
                    ["bottom",[
                        ["left",["-58px -1964px",6,6]],
                        ["right",["-64px -1964px",6,6]]
                    ]],
                    ["hTile",[
                        ["top",["0 -354px",1,6]],
                        ["bottom",["0 -368px",1,6]]
                    ]],
                    ["vTile",[
                        ["left",["-69px 0",6,1]],
                        ["right",["-79px 0",6,1]]
                    ]]
                ]]

       ]],
       ["large",[
                 ["primary",[
                    ["top",[
                        ["left",["0 -1903px",15,15]],
                        ["right",["-15px -1903px",15,15]]
                    ]],
                    ["bottom",[
                        ["left",["0 -1918px",15,15]],
                        ["right",["-15px -1918px",15,15]]
                    ]],
                    ["hTile",[
                        ["top",["0 -311px",1,15]],
                        ["bottom",["0 -316px",1,15]]
                    ]],
                    ["vTile",[
                        ["left",["-52px 0",15,1]],
                        ["right",["-37px 0",15,1]]
                    ]]
                ]],
                ["light",[
                    ["top",[
                        ["left",[" -23px -1940px",15,15]],
                        ["right",["-38px -1940px",15,15]]
                    ]],
                    ["bottom",[
                        ["left",[" -23px -1955px",6,6]],
                        ["right",["-38px -1955px",6,6]]
                    ]],
                    ["hTile",[
                        ["top",["0 -333px",1,15]],
                        ["bottom",["0 -338px",1,15]]
                    ]],
                    ["vTile",[
                        ["left",["-85px 0",15,1]],
                        ["right",["-87px 0",15,1]]
                    ]]
                ]],
                ["dark",[
                    ["top",[
                        ["left",["-58px -1904px",15,15]],
                        ["right",["-73px -1904px",15,15]]
                    ]],
                    ["bottom",[
                        ["left",["-58px -1919px",15,15]],
                        ["right",["-73px -1919px",15,15]]
                    ]],
                    ["hTile",[
                        ["top",["0 -354px",1,15]],
                        ["bottom",["0 -359px",1,15]]
                    ]],
                    ["vTile",[
                        ["left",["-69px 0",15,1]],
                        ["right",["-70px 0",15,1]]
                    ]]
                ]]
       ]]
    ]],

//////// ToolBar
/**
 * button_black_dark_left :{ cssPosition:" 0 0px", size:{width:5,height:30} },
    button_black_dark_right :{ cssPosition:" 0 -35px", size:{width:5,height:30} },

    toolBar_main_menu_left :{ cssPosition:" 0 -1578px", size:{width:9, height:40} },
    toolBar_main_menu_right :{ cssPosition:" 0 -1622px", size:{width:4, height:40} },
    toolBar_main_menu_controlPanel :{ cssPosition:" -10px -1578px", size:{width:10, height:40} },

    toolBar_menu_background:{ cssPosition:"0 -256px",size:{width:1,height:40}},
    button_dark_background:{cssPosition:"0 0",size:{width:1,height:30}},

 */
    ["dockingBar",[
        ["left",[
            ["standard",["0 -1578px",9 ,40]],
            ["expandable",["0 -1578px",21 ,40]]
        ]],
        
        ["hTile",["background",["0 -256px",1,40]]],
        ["right",[ 
               ["standard",[" -5px -1622px",4,40]],
               ["resizable",[" 0 -1622px",9,40]]
        ]],
        ["buttons",[
               ["contract",["0 -1559px",13,13]],
               ["expand",["-13px -1559px",13,13]],
               ["subMenu",["-26px -1559px",13,13]]
        ]],
        ["highlight",["-27px -1580px",36,36]],
       
    ]],

    ["menuItem",[
        ["subMenu",[" -11px -32px",14,23]]
    ]],

    ["toolBar",[
        ["hTile",["highlight",["0 -401px",2,36]]],
        ["highlight",[
               ["left",["0 -26px",5,36]],
               ["right",[" -5px -26px",5,36]]
        ]]
    ]],
    ["textBox",[
        ["hTile",["background",["0 -439px",2,21]]],
        ["left",[" -8px -0px",3,21]],
        ["right",[" -13px -0px",3,21]]
    ]],
    ["button",[
        ["left",["0 0",3,25]],
        ["hTile",["background",["0 0",2,25]]],
        ["right",[" -4px 0",3,25]]
    ]],

    ["groupPanel",[
        ["labelLeft",["-0 -1879px",7,14]],
        ["labelRight",["-9px -1879px",7,14]]
    ]],

    ["tabPanel",[
         ["hTile",[
                 ["background",["0 -375px",2,25]]
         ]],
         ["tabLeft",["-5px -930px",2,25]],
         ["tabRight",["-9px -930px",2,25]]
    ]],

    ["radioSelect",[
        ["ticked",[" -33px -197px", 12,12]],
        ["unticked",[" -48px -197px", 12,12]]
    ]],

    ["selectTree",[
        ["expand",[" 0 -852px",10,16]],
        ["contract",[" 0 -869px",10,16]]
    ]],



    ["window",[
        ["titleBar",[
            ["left",[ " -7px -1193px",5,27]],
            ["right",[" 0 -1193px",5,27]]
        ]],
        ["controls",[
            ["close",[ " 0 -1100px",20,27]],
            ["min",[" -21px -1100px",20,27]],
            ["max",[" -44px -1100px",20,27]]
        ]],
        ["statusBar",[
            ["left",[ "0 -1267px",5,22]],
            ["right",[" 0 -1244px",5,22]],
            ["resize",[" 0 -1153px",14,13]]
        ]],
        
        ["hTile",[
            ["statusBar",["0 -212px",1,22]],
            ["titleBar",[" 0 -159px",1,27]]
        ]],
        ["vTile",[
            ["left",["-5px 0",5,2]],
            ["right",["0 0",5,2]]
        ]]
        
    ]],

]
