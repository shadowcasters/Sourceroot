
/**
 * This is main point of visual definition. A widget gets it's appeariance from this
 * object. When a widgets constructor loads the UIThemeLoader it will assemble the user interface
 * based on the instructions set forth in the widgets theme entry. If you wish to alter the 
 * visual aspects of an object, this is the place to do it. 
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
  stone:{ base:"323232", contrast:"777777", font:"red", alt:"primary", divide:{inner:"f6f4f2",outer:"cbc1b7"} },
  dark:{ base:"1b1b1b", contrast:"777777", font:"ffffff", alt:"primary", divide:{inner:"f6f4f2",outer:"cbc1b7"} },
  light:{ base:"7F7F7F", contrast:"7b7b7b", font:"black", alt:"dark", divide:{inner:"f6f4f2",outer:"cbc1b7"} },
  primary:{ base:"b8b8b8", contrast:"777777", font:"ffffff", alt:"primary", divide:{inner:"f6f4f2",outer:"cbc1b7"} }
},

// fonts will assume color attributes of their schema by default, this defines the base font family and size of the font
fonts:{
    primary:{
        family:"Gill, Arial, Helvetica, sans-serif",
        size:12,
        color:"blue"
    },
    light:{
        family:"Gill, Arial, Helvetica, sans-serif",
        size:12,
        color:"ffffff"
    },
    small:{
        family:"Arial, Gill, Helvetica, sans-serif",
        size:10,
        color:"ffffff"
    },
	stone:{
        family:"NovaMono",
        url:"fonts/NovaMono.ttf",
        size:24,
        color:"black"
    },
    
},

panel:{
    imageGroup:"arch",
    defaultImageSet:"bevel",
    defaultSchema:"primary"
},

mosaic :{
	scales:{
		imageGroup:"scalesBackground",
		tile:"",
		
			}
	
	
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

///////////// TabPanel \\\\\\\\\\\\\\\\\\
tabPanel:{
    defaultSchema:"primary",
    imageGroup:"tabPanel"
    },

///////////// TextField \\\\\\\\\\\\\\\\\\
textField:{
    imageGroup:"textField",
    defaultSchema:"primary"
},

///////////// TextPanel \\\\\\\\\\\\\\\\\\
textPanel:{
    imageGroup:"arch",
    defaultImageSet:"bevel",
    defaultSchema:"primary"
},

///////////// TextArea \\\\\\\\\\\\\\\\\\
textAreaInput:{
    imageGroup:"arch",
    defaultImageSet:"bevel",
    defaultSchema:"stone"
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

