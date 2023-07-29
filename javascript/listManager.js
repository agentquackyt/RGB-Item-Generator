const editList = document.getElementById("editList");
const outputList = document.getElementById("outputList");

let list = { 
    lore: [],
    data: [],
    preconfig_colors: []
}

function newLine() {
    list.lore.push(["", "", ""]);
    list.data.push([{colors: ["#000", "#000"], text: "", bold: false, italic: false},{colors: ["#000", "#000"], text: "", bold: false, italic: false},{colors: ["#000", "#000"], text: "", bold: false, italic: false}]);
    editList.innerHTML = editList.innerHTML + "<li class='buttonsList'>"+"<button class='menue-button' onclick='editLore("+(list.lore.length-1)+", 0)'>Edit before</button>"+"<button class='menue-button' onclick='editLore("+(list.lore.length-1)+", 1)'>Edit lore "+(list.lore.length-1)+"</button>"+"<button class='menue-button' onclick='editLore("+(list.lore.length-1)+", 2)'>Edit after</button>"+"</li><br>";
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

const loadFromJSON = () => {
    let file = document.getElementById("project_file_upload").files[0];
    if(!file) return;
    list = { 
        lore: [],
        data: [],
        preconfig_colors: []
    };
    // read the file
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
        // get the file output
        toggleIcons('projectLoadScreen');
        document.getElementById("editList").innerHTML = "";
        document.getElementById("outputList").innerHTML = "";
        setupFromFile(JSON.parse(evt.target.result));
        return;
    }
}     
const setupFromFile = (json_string) => {
    console.log(json_string)
    console.log(json_string.data.length);
    for (let i = 0; i < json_string.data.length; i++) {
        newLine(); 
        const element = json_string.data[i];
        console.log(json_string.data[i]);
        list.data[i] = element;
        editLore(i,0);
        update();
        editLore(i,1);
        update();
        editLore(i,2);
        update();
    }
    console.log(list)
    editLore(0,1);
    
    for (let i = 1; i < json_string.preconfig_colors.length+1; i++) {
        if(i>=colorIndex) addColor();
        const element = json_string.preconfig_colors[i-1];
        console.log(element)
        document.getElementById("color_per_"+(i)+"_1").value = element[0];
        document.getElementById("color_per_"+(i)+"_2").value = element[1];
        list.preconfig_colors.push(element);
    }
    return;
}
function saveToJSON() {
  let color_config = [];
  for (let i = 1; i < colorIndex; i++) {
    const color_set = [];
    color_set.push(document.getElementById("color_per_"+(i)+"_1").value);
    color_set.push(document.getElementById("color_per_"+(i)+"_2").value);
    color_config.push(color_set);
  }
  list.preconfig_colors = color_config;
  var dataJSON = JSON.stringify(list, null, "\t");

  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(dataJSON));
  element.setAttribute('download', "item_meta.json");

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
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonOutput
    });

    const  parsedURL = await response.headers.get('location');
    const updatedURL = parsedURL.replace(/^http:\/\//i, 'https://');
    console.log(updatedURL);
    navigator.clipboard.writeText(updatedURL);
    window.alert("Copy URL: "+updatedURL);          
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
    document.getElementById("hide-to-select").style.display = "block";
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
const toggleIcons = (id) => document.getElementById(id).style.display != "none" ? document.getElementById(id).style.display = "none" : document.getElementById(id).style.display = "block";

let colorIndex = 3;
const addColor = () => {
    let wrapper = document.getElementById("colorContainer");
    let divElement = document.createElement("div");
    divElement.innerHTML = "<div><input type='color' name='color_per_1' id='color_per_"+colorIndex+"_1'><input type='color' name='color_per_2' id='color_per_"+colorIndex+"_2'><button onclick='setPersistentColor("+colorIndex+")'>Set as Colors</button></div>";
    wrapper.appendChild(divElement);
    colorIndex++;
}

const addIcon = (icon) => {
    let pos = getCaretPosition(textInput);
    console.log(pos +" icon:" +icon)
    textInput.value = textInput.value + icon;
    console.log(textInput.value)
    update()
}
