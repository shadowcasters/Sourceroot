
/**
 * This is main point of visual definition. A widget gets it's appeariance from this
 * object. When a widgets constructor loads the UIThemeLoader it will assemble the user interface
 * based on the instructions set forth in the widgets theme entry. If you wish to alter the 
 * visual aspects of an object, this is the place to do it. 
 * 
 * If you wish to alter the behaviour of a widget you would define that in .. I
 * havnt decided yet
 *
 * TODO: define a serialized method for loading images to their assigned canvas. We'll call it widget config.
 * It will define a widget's behaviour as well as it's data bindings.
 *
 */

var theme = {
/**
 *schmas are color combinations used to for UI components.
 */
schema:{
  dark:{ base:"5A5A5A", contrast:"777777", font:"ffffff", alt:"primary", divide:{inner:"f6f4f2",outer:"cbc1b7"} },
  light:{ base:"fffdfa", contrast:"7b7b7b", font:"383838", alt:"dark", divide:{inner:"f6f4f2",outer:"cbc1b7"} },
  primary:{ base:"e9e3dd", contrast:"efebe7", font:"383838", alt:"dark", divide:{inner:"fefdfd",outer:"cbc1b7"} }
},

// fonts will assume color attributes of their schema by default, this defines the base font family and size of the font
fonts:{
    primary:{
        family:"Gill, Arial, Helvetica, sans-serif",
        size:12,
        color:"383838"
    },
    light:{
        family:"Gill, Arial, Helvetica, sans-serif",
        size:12,
        color:"ffffff"
    },
    small:{
        family:"Arial, Gill, Helvetica, sans-serif",
        size:10,
        color:"383838"
    }

},

panel:{
    imageGroup:"arch",
    defaultImageSet:"bevel",
    defaultSchema:"primary"
},
///////////// Button \\\\\\\\\\\\\\\\\\
button:{
    imageGroup:"button",
    defaultSchema:"primary"
},

menuBar:{
    defaultSchema:"primary",
    font:{
        size:12
    }
},

toolBar:{
    defaultSchema:"primary",
    font:{
        size:10
    }
},

menuItem:{
    defaultSchema:"primary"
},

menuPanel:{
    defaultSchema:"primary",
    imageGroup:"arch",
    defaultImageSet:"bevel"
},

dockingBar:{
    defaultSchema:"primary",
    
    dragCursor:"move",
    resizeCursor:"col-resize"
},

/////////////// Comment Bubble \\\\\\\\\\\\\\\\\\
//commentBubble:{
//
//    defaultSchema:"primary",
//
//    font:{
//        size:16
//    }
//
//    },

///////////// TextField \\\\\\\\\\\\\\\\\\
tabPanel:{
    defaultSchema:"primary",
    imageGroup:"tabPanel"
    },

///////////// TextField \\\\\\\\\\\\\\\\\\
textField:{
    imageGroup:"textBox",
    defaultSchema:"light"
},

///////////// TextPanel \\\\\\\\\\\\\\\\\\
textPanel:{
    imageGroup:"arch",
    defaultImageSet:"bevel",
    defaultSchema:"light"
},

///////////// BrowserPanel \\\\\\\\\\\\\\\\\\
BrowserPanel:{
    imageGroup:"arch",
    defaultImageSet:"bevel",
    defaultSchema:"light"
},


///////////// list box \\\\\\\\\\\\\\\\\\
listBox:{
    defaultSchema:"light"
 },

////////////// select Box \\\\\\\\\\\\\\\\
selectBox:{
    defaultSchema:"light"
},

////////////// select Box \\\\\\\\\\\\\\\\
selectTree:{
    defaultSchema:"light",
    imageGroup:"arch",
    defaultImageSet:"bevel"
},

checkBox:{

},
radioSelect:{

},

groupPanel:{
    imageGroup:"arch",
    defaultImageSet:"bevel",
    defaultSchema:"primary",
    font:{
        size:10
     }
  
},

///////////// Window \\\\\\\\\\\\\\\\\\
window: {
    imageGroup:"window",
    defaultSchema:"primary",
    dragCursor:"move",
    titleBar:{
        font:{color:"ffffff"}
    },
    mainPanel:{
        schema:"primary"
    },
    statusBar:{
        font:{
            color:"383838",
            size:10
        }
    }
}
/////////////// Button \\\\\\\\\\\\\\\


}

