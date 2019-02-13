
var Base64 = function(){
var keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
this.encode = function(input) {
    	if (/([^\u0000-\u00ff])/.test(input)){
            throw new Error("Can't base64 encode non-ASCII characters.");
        }
        var output = new StringMaker();
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;

	while (i < input.length) {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}

		output.append(keys.charAt(enc1) + keys.charAt(enc2) + keys.charAt(enc3) + keys.charAt(enc4));
        }

   return output.toString();
}

 this.decode = function(input) {
	var output = new StringMaker();
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;

	// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	while (i < input.length) {
		enc1 = keys.indexOf(input.charAt(i++));
		enc2 = keys.indexOf(input.charAt(i++));
		enc3 = keys.indexOf(input.charAt(i++));
		enc4 = keys.indexOf(input.charAt(i++));

		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;

		output.append(String.fromCharCode(chr1));

		if (enc3 != 64) {
			output.append(String.fromCharCode(chr2));
		}
		if (enc4 != 64) {
			output.append(String.fromCharCode(chr3));
		}
	}

	return output.toString();
    }
}();


/* 
 * A week Javascript implementation of LZ7, which will compress / decompress
 * data thats stored on the stack.
 */
var TCompression = function(){
function compress(str)
	{
		var dsArr = new Array();
		for (var i = 0; i < 256; i++)
		{
			dsArr[i] = str.charCodeAt(i);
		}
		
		var res = "";
		var txt2encode = str;
		var splitStr = txt2encode.split("");
		var len = splitStr.length;
		var nbChar = 256+skipnum;
		var buffer = "";
		for (i = 0; i <= len; i++)
		{
			var current = splitStr[i];
			if (dsArr[buffer + current] !== undefined)
			{
				buffer += current;
			}
			else
			{
				res += String.fromCharCode(dsArr[buffer]);
				dsArr[buffer + current] = nbChar;
				nbChar++;
				buffer = current;
			}
		}
		return res;
	}

	function decompress(str)
	{
		var dico = new Array();
		
		for (var i = 0; i < 256; i++)
		{
			var c = String.fromCharCode(i);
			dico[i] = c;
		}
		
		var txt2encode = str;
		var splitStr = txt2encode.split("");
		var length = splitStr.length;
		var buffer = "";
		var chaine = "";
		var result = "";
		for (i = 0; i < length; i++)
		{
			var code = txt2encode.charCodeAt(i);
			var current = dico[code];
			if (buffer == "")
			{
				buffer = current;
				result += current;
			}
			else
			{
				if (code <= 255)
				{
					result += current;
					chaine = buffer + current;
					dico[nbChar] = chaine;
					nbChar++;
					buffer = current;
				}
				else
				{
					chaine = dico[code];
					if (!chaine) chaine = buffer + buffer.slice(0,1);
					result += chaine;
					dico[nbChar] = buffer + chaine.slice(0, 1);
					nbChar++;
					buffer = chaine;

				}
			}
		}
		return result;
	}

}