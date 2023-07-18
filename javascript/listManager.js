const editList = document.getElementById("editList");
const outputList = document.getElementById("outputList");

let list = {
    displayname: {
        display: ["&#084cfbt&#3f84fce&#76bbfcs&#adf3fdt", " ", "&#084cfbt&#3f84fce&#76bbfcs&#adf3fdt"],
        data: [
            {colors: ["#000", "#000"], text: "", bold: false, italic: false},
            {colors: ["#000", "#000"], text: "", bold: false, italic: false},
            {colors: ["#000", "#000"], text: "", bold: false, italic: false}
        ]
    },    
    lore: [
    ],
    data: [

    ]
}

function newLine() {
    list.lore.push(["", "", ""]);
    list.data.push([{colors: ["#000", "#000"], text: "", bold: false, italic: false},{colors: ["#000", "#000"], text: "", bold: false, italic: false},{colors: ["#000", "#000"], text: "", bold: false, italic: false}]);
    editList.innerHTML = editList.innerHTML + "<li class='buttonsList'>"+"<button class='menue-button' onclick='editLore("+(list.lore.length-1)+", 0)'>Edit lore "+(list.lore.length-1)+", before</button>"+"<button class='menue-button' onclick='editLore("+(list.lore.length-1)+", 1)'>Edit lore "+(list.lore.length-1)+"</button>"+"<button class='menue-button' onclick='editLore("+(list.lore.length-1)+", 2)'>Edit lore "+(list.lore.length-1)+", after</button>"+"</li><br>";
    outputList.innerHTML = outputList.innerHTML + "<li class='resultList'><span id='text_"+(list.lore.length-1)+"_0'></span><span id='text_"+(list.lore.length-1)+"_1'></span><span id='text_"+(list.lore.length-1)+"_2'></span></li>";
    console.log(list)
}


function base64EncodeUnicode(str) {
    // First we escape the string using encodeURIComponent to get the UTF-8 encoding of the characters, 
    // then we convert the percent encodings into raw bytes, and finally feed it to btoa() function.
    utf8Bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
    });
    return btoa(utf8Bytes);
}

function saveToJSON() {
  var dataJSON = JSON.stringify(list, null, "\t");

  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(dataJSON));
  element.setAttribute('download', "item_meta.json");

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}                         

function saveToCommandFile() {
    let exportText = "";
    for (let i = 0; i < list.displayname.display.length; i++) {
        const item = list.displayname.display;
        if (item[i].length < 256-14) 
        {
            exportText = exportText + "/jitem setdisplayname " + item[i]
        } else {
            exportText = exportText + "/jitem addtodisplayname " + item[i].slice(0, 256-20);
            exportText = exportText + "/jitem addtodisplayname " + item[i].slice(256-21);
        };
    }

    for (let i = 0; i < list.lore.length; i++) {
        const item = list.lore[i];
        if (item[0].length < 256-14) 
        {
            exportText = exportText + "/jitem addlore " + item[0] + " \r\n"
        } else {
            exportText = exportText + "/jitem addlore " +item[0].slice(0, 256-20) + " \r\n"
            exportText = exportText + "/jitem addlore " +item[0].slice(256-21) + " \r\n"
        };

        if (item[1].length < 256-14) 
        {
            exportText = exportText + "/jitem addtolore " + i + " " +item[1] + " \r\n"
        } else {
            exportText = exportText + "/jitem addtolore " + i + " " +item[1].slice(0, 256-20) + " \r\n"
            exportText = exportText + "/jitem addtolore " + i + " " +item[1].slice(256-21) + " \r\n"
        };

        if (item[1].length < 256-14) 
        {
            exportText = exportText + "/jitem addtolore " + i + " " + item[2] + " \r\n"
        } else {
            exportText = exportText + "/jitem addtolore " + i + " " + item[2].slice(0, 256-20) + " \r\n"
            exportText = exportText + "/jitem addtolore " + i + " " + item[2].slice(256-21) + " \r\n"
        };
    }

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(exportText));
    element.setAttribute('download', "item_command.txt");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }         

function saveToHB() {                         
    var displayname = list.displayname[0] + list.displayname[1] + list.displayname[2];                         
    var loreList = list.lore;                         
    var lore = [];                         

    for (let i = 0; i < loreList.length; i++) {                         
        let temp = loreList[i];                         
        lore.push(temp[0]+temp[1]+temp[2]);                         
    }                         

    var obj = {};                         
    obj["displayname"] = displayname;                         
    obj["lore"] = lore;                         
    var myJSON = JSON.stringify(obj);                         
    
    window.open("https://tool.horstblocks.de/uquery.php?data=" + base64EncodeUnicode(myJSON), 'myWindow');                         
}   

async function saveLoreToJSON() {                                           
    var loreList = list.lore;                         
    var lore = [];                         

    for (let i = 0; i < loreList.length; i++) {                         
        let temp = loreList[i];                         
        lore.push(temp[0]+temp[1]+temp[2]);                         
    }                         
    var jsonOutput = JSON.stringify(lore, null, 2);
    
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonOutput));
    element.setAttribute('download', "item_lore.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
} 


async function saveLoreToCloud() {                                           
    var loreList = list.lore;                         
    var lore = [];                         

    for (let i = 0; i < loreList.length; i++) {                         
        let temp = loreList[i];                         
        lore.push(temp[0]+temp[1]+temp[2]);                         
    }                         
    var jsonOutput = JSON.stringify(lore, null, 2);

    const response = await fetch('https://jsonblob.com/api/jsonBlob', {
      method: 'POST',
      body: jsonOutput
    });

      const  parsedURL = await response.headers.get('location');
      console.log(parsedURL);
      navigator.clipboard.writeText(parsedURL);

      window.alert("Copy URL: "+parsedURL);       
} 

// edit function                         
const color1 = document.getElementById("color1");                         
const color2 = document.getElementById("color2");                         

const textInput = document.getElementById("textInput");                         
const textOutput = document.getElementById("lore");                         
const textInfo = document.getElementById("info");                         

const italic = document.getElementById("italic");                         
const bold = document.getElementById("bold");                         

//zwischen 
let indexOfText, lineNrOfText;

function editLore(lineNR, index) {
    // preload previous data
    let data = list.data[lineNR][index];
    color1.value = data.colors[0];
    color2.value = data.colors[1];
    textInput.value = data.text;
    italic.checked = data.italic;
    bold.checked = data.bold;

    textOutput.innerText = "";

    lineNrOfText= lineNR;
    indexOfText = index;

    textInfo.innerText = "Now editing line " + lineNR + ", part " + index;
    update();
}

const setPersistentColor = (color_index) => {
    color1.value = document.getElementById("color_per_"+color_index+"_1").value;
    color2.value = document.getElementById("color_per_"+color_index+"_2").value;
    update();
};

let copyText = "";

const update = () => {
    textOutput.innerHTML = "";
    console.log("line: " + lineNrOfText + " index: "+ indexOfText)
    let data = list.data[lineNrOfText][indexOfText];
    console.log(data)
    var colors1 = hex2rgb(color1.value);
    var colors2 = hex2rgb(color2.value);
    data.colors[0] = color1.value;
    data.colors[1] = color2.value;

    data.text = textInput.value;
    data.italic = italic.checked;
    data.bold = bold.checked;


    isBold = bold.checked;
    isItalic = italic.checked;
    
    var text = textInput.value;
    const [first, second] = split(text, text.length/2);
    var gradient1 = generateGradient(first, colors1,colors2);
    var gradient2 = generateGradient(second, colors2,colors1);
    copyText = gradient1+gradient2;
    document.getElementById("text_"+lineNrOfText+"_"+indexOfText).innerHTML =  textOutput.innerHTML;

    list.lore[lineNrOfText][indexOfText] = gradient1+gradient2;
};

const copy = () => {
    // Copy the text inside the text field
  navigator.clipboard.writeText(copyText);
};

textInput.addEventListener("change", (e) => {
    update();
})

color1.addEventListener("change", (e) => {
    update();
})

color2.addEventListener("change", (e) => {
    update();
})

italic.addEventListener("change", (e) => {
    update();
})

bold.addEventListener("change", (e) => {
    update();
})


function addIcon(icon) {
    let pos = getCaretPosition(textInput);
    console.log(pos +" icon:" +icon)
    textInput.value = textInput.value + icon;
    console.log(textInput.value)
    update()
}
