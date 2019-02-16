
@theme("hyperDark");
@widget("Grid");
@widget("MenuPanel");
@widget("Sprite");
@widget("MenuBar");
@widget("Window");
@widget("TextField");
@widget("LabelTextField");
@widget("DockingBar");
@widget("CommentBubble");
@widget("TextArea");
@widget("TextPanel");
@widget("SelectBox");
@widget("SelectTree");
@widget("ToggleIcon");
@widget("ToggleLabel");
@widget("CheckBox");
@widget("RadioSelect");
@widget("GroupPanel");
@widget("BrowserPanel");

// options:
// ------------
// dev: Tell the system to track errors and halt the app on error.
// pro: Tell the system to fail silently and, optionaly upload an errorLog to a specified url.
var JSMode = "dev";

/**
 * Widget settings allow you to alter the default properties of any widget in your
 * toolbox. All you need to do is specify the widget's name as the key and create an object
 * that hold the setting key:value pairs.
 *
 * Example
 * ----------------
 * var WidgetSettings=new Object({
 *   listBox:{
 *          seperatorSize:1,
 *          highlightSchema:"dark"
 *      }
 *   });
 *
 */

var WidgetSettings = new Object({
    listBox:{
       seperatorSize:0
       //highlightSchema:"dark"
    },
    selectBox:{
       seperatorSize:0
    },
    autoHint:{
        schema:"light"
    },
    radioSelect:{
      
    }
});




