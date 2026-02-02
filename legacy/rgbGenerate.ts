const rgb2hex = (r,g,b) => {
    if(r<16) {r="0"+r.toString(16)} else {r=r.toString(16)}
    if(g<16) {g="0"+g.toString(16)} else {g=g.toString(16)}
    if(b<16) {b="0"+b.toString(16)} else {b=b.toString(16)} 

    var hex = "#"+r+g+b;
    return hex;
};

const split = (str, index) => {
  const result = [str.slice(0, index), str.slice(index)];

  return result;
}

const hex2rgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
};
const lore = document.getElementById("lore");
const display = (r,g,b,c) => {
    if(isBold && isItalic) {
        lore.innerHTML += "<span style='color:rgb("+r+", "+g+", "+b+");font-style: italic; font-weight: bold;'>"+c+"</span>";
    } else if(isBold) {
        lore.innerHTML += "<span style='color:rgb("+r+", "+g+", "+b+");font-weight: bold;'>"+c+"</span>";
    } else if(isItalic) {
        lore.innerHTML += "<span style='color:rgb("+r+", "+g+", "+b+");font-style: italic;'>"+c+"</span>";
    } else {
        lore.innerHTML += "<span style='color:rgb("+r+", "+g+", "+b+")'>"+c+"</span>";
    }
    
};

const generateDiffrence = (color1,color2,length) => {
    if(color1[0]>color2[0]) {
        lowerR = false;
        rDiff = Math.round((color1[0]-color2[0])/length); 
    } else {
        lowerR = true;
        rDiff = Math.round((color2[0]-color1[0])/length);
    }
    
    if(color1[2]>color2[2]) {
        lowerB = false;
        bDiff = Math.round((color1[2]-color2[2])/length); 
    } else {
        lowerB = true;
        bDiff = Math.round((color2[2]-color1[2])/length);
    }
    if(color1[1]>color2[1]) {
        lowerG = false;
        gDiff = Math.round((color1[1]-color2[1])/length); 
    } else {
        lowerG = true;
        gDiff = Math.round((color2[1]-color1[1])/length);
    }

    console.log(gDiff+","+bDiff+","+rDiff)
};

const generateGradient = (string, color1,color2) => {
    var gradient = "";
    var length = string.length;

    generateDiffrence(color1,color2,length);
    var r = color1[0],g = color1[1],b = color1[2];

    for (const c of string) {
        gradient += ("&"+rgb2hex(r,g,b));
        if(isBold) gradient += "&l";
        if(isItalic) gradient += "&o";
        gradient += c;

        display(r,g,b,c)
        
        lowerR == false ? r -= rDiff :  r += rDiff;
        lowerG == false ? g -= gDiff :  g += gDiff;
        lowerB == false ? b -= bDiff :  b += bDiff;

        
    }

    return gradient;
};

/*
** Returns the caret (cursor) position of the specified text field (oField).
** Return value range is 0-oField.value.length.
*/
function getCaretPosition (oField) {

    // Initialize
    var iCaretPos = 0;
  
    // IE Support
    if (document.selection) {
  
      // Set focus on the element
      oField.focus();
  
      // To get cursor position, get empty selection range
      var oSel = document.selection.createRange();
  
      // Move selection start to 0 position
      oSel.moveStart('character', -oField.value.length);
  
      // The caret position is selection length
      iCaretPos = oSel.text.length;
    }
  
    // Firefox support
    else if (oField.selectionStart || oField.selectionStart == '0')
      iCaretPos = oField.selectionDirection=='backward' ? oField.selectionStart : oField.selectionEnd;
  
    // Return results
    return iCaretPos;
  }