// src/minimessage.ts
function generateMiniMessage(text, options) {
  let output = "";
  const colors = options.colors || ["#ffffff"];
  if (colors.length > 1) {
    output += `<gradient:${colors.join(":")}>`;
  } else if (colors.length === 1) {
    output += `<${colors[0]}>`;
  } else {
    output += "<white>";
  }
  if (options.isBold)
    output += "<b>";
  if (options.isItalic)
    output += "<i>";
  if (options.isUnderlined)
    output += "<u>";
  if (options.isStrikethrough)
    output += "<st>";
  if (options.isObfuscated)
    output += "<obf>";
  output += text;
  if (options.isObfuscated)
    output += "</obf>";
  if (options.isStrikethrough)
    output += "</st>";
  if (options.isUnderlined)
    output += "</u>";
  if (options.isItalic)
    output += "</i>";
  if (options.isBold)
    output += "</b>";
  if (colors.length > 1) {
    output += "</gradient>";
  }
  return output;
}
function generatePreviewHTML(text, options) {
  const colors = options.colors || ["#ffffff"];
  if (colors.length <= 1) {
    const color = colors[0] || "#ffffff";
    let style = `color: ${color};`;
    if (options.isBold)
      style += "font-weight: bold;";
    if (options.isItalic)
      style += "font-style: italic;";
    let decor = "";
    if (options.isUnderlined)
      decor += " underline";
    if (options.isStrikethrough)
      decor += " line-through";
    if (decor)
      style += `text-decoration:${decor};`;
    if (options.isObfuscated)
      style += "filter: blur(2px);";
    return `<span style="${style}">${text}</span>`;
  } else {
    let html = "";
    const len = text.length;
    const rgbColors = colors.map((c) => hex2rgb(c) || [255, 255, 255]);
    if (len === 1) {
      const c = rgbColors[0] || [255, 255, 255];
      let style = `color: rgb(${c[0]},${c[1]},${c[2]});`;
      if (options.isBold)
        style += "font-weight: bold;";
      if (options.isItalic)
        style += "font-style: italic;";
      let decor = "";
      if (options.isUnderlined)
        decor += " underline";
      if (options.isStrikethrough)
        decor += " line-through";
      if (decor)
        style += `text-decoration:${decor};`;
      if (options.isObfuscated)
        style += "filter: blur(2px);";
      return `<span style="${style}">${text}</span>`;
    }
    for (let i = 0;i < len; i++) {
      const t = i / (len - 1);
      const totalSegments = rgbColors.length - 1;
      const pos = t * totalSegments;
      let index = Math.floor(pos);
      if (index >= totalSegments)
        index = totalSegments - 1;
      const segmentT = pos - index;
      const c1 = rgbColors[index] ?? [255, 255, 255];
      const c2 = rgbColors[index + 1] ?? [255, 255, 255];
      const r = Math.round(c1[0] + (c2[0] - c1[0]) * segmentT);
      const g = Math.round(c1[1] + (c2[1] - c1[1]) * segmentT);
      const b = Math.round(c1[2] + (c2[2] - c1[2]) * segmentT);
      let style = `color: rgb(${r},${g},${b});`;
      if (options.isBold)
        style += "font-weight: bold;";
      if (options.isItalic)
        style += "font-style: italic;";
      let decor = "";
      if (options.isUnderlined)
        decor += " underline";
      if (options.isStrikethrough)
        decor += " line-through";
      if (decor)
        style += `text-decoration:${decor};`;
      if (options.isObfuscated)
        style += "filter: blur(2px);";
      html += `<span style="${style}">${text[i]}</span>`;
    }
    return html;
  }
}
function hex2rgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
}

// src/icons.ts
var icons = [
  "❤",
  "❥",
  "✔",
  "✖",
  "✗",
  "✘",
  "❂",
  "⋆",
  "✢",
  "✣",
  "✤",
  "✥",
  "✦",
  "✩",
  "✪",
  "✫",
  "✬",
  "✭",
  "✮",
  "✯",
  "✰",
  "★",
  "✱",
  "✲",
  "✳",
  "✴",
  "✵",
  "✶",
  "✷",
  "✸",
  "✹",
  "✺",
  "✻",
  "✼",
  "❄",
  "❅",
  "❆",
  "❇",
  "❈",
  "❉",
  "❊",
  "❋",
  "☆",
  "✡",
  "✽",
  "✾",
  "✿",
  "❀",
  "❁",
  "❃",
  "✌",
  "♼",
  "♽",
  "✂",
  "✄",
  "✈",
  "➡",
  "⬅",
  "⬆",
  "⬇",
  "➟",
  "➢",
  "➣",
  "➤",
  "➥",
  "➦",
  "➧",
  "➨",
  "➚",
  "➘",
  "➙",
  "➛",
  "➜",
  "➝",
  "➞",
  "➸",
  "➲",
  "➳",
  "➴",
  "➵",
  "➶",
  "➷",
  "➹",
  "➺",
  "➻",
  "➼",
  "➽",
  "Ⓜ",
  "⬛",
  "⬜",
  "█",
  "▛",
  "▀",
  "▜",
  "▆",
  "▄",
  "▌",
  "☕",
  "ℹ",
  "™",
  "⚑",
  "⚐",
  "☃",
  "⚠",
  "⚔",
  "⚖",
  "⚒",
  "⚙",
  "⚜",
  "⚀",
  "⚁",
  "⚂",
  "⚃",
  "⚄",
  "⚅",
  "⚊",
  "⚋",
  "⚌",
  "⚍",
  "⚎",
  "⚏",
  "☰",
  "☱",
  "☲",
  "☳",
  "☴",
  "☵",
  "☶",
  "☷",
  "⚆",
  "⚇",
  "⚈",
  "⚉",
  "♿",
  "♩",
  "♪",
  "♫",
  "♬",
  "♭",
  "♮",
  "♯",
  "♠",
  "♡",
  "♢",
  "♣",
  "♤",
  "♥",
  "♦",
  "♧",
  "♔",
  "♕",
  "♖",
  "♗",
  "♘",
  "♙",
  "♚",
  "♛",
  "♜",
  "♝",
  "♞",
  "♟",
  "⚪",
  "⚫",
  "☯",
  "☮",
  "☣",
  "☏",
  "➀",
  "➁",
  "➂",
  "➃",
  "➄",
  "➅",
  "➆",
  "➇",
  "➈",
  "➉",
  "➊",
  "➋",
  "➌",
  "➍",
  "➎",
  "➏",
  "➐",
  "➑",
  "➒",
  "➓",
  "ⓐ",
  "ⓑ",
  "ⓒ",
  "ⓓ",
  "ⓔ",
  "ⓕ",
  "ⓖ",
  "ⓗ",
  "ⓘ",
  "ⓙ",
  "ⓚ",
  "ⓛ",
  "ⓜ",
  "ⓝ",
  "ⓞ",
  "ⓟ",
  "ⓠ",
  "ⓡ",
  "ⓢ",
  "ⓣ",
  "ⓤ",
  "ⓥ",
  "ⓦ",
  "ⓧ",
  "ⓨ",
  "ⓩ",
  "웃",
  "유",
  "♋",
  "☢",
  "☠",
  "☑",
  "▲",
  "⌚",
  "¿",
  "❣",
  "♂",
  "♀",
  "☿",
  "Ⓐ",
  "✍",
  "✉",
  "☤",
  "☒",
  "▼",
  "⌘",
  "⌛",
  "¡",
  "ღ",
  "ツ",
  "☼",
  "☁",
  "♒",
  "✎",
  "©",
  "®",
  "Σ",
  "☭",
  "✞",
  "℃",
  "℉",
  "ϟ",
  "☂",
  "¢",
  "£",
  "∞",
  "½",
  "☪",
  "☺",
  "☻",
  "☹",
  "⌇",
  "⚛",
  "⌨",
  "✆",
  "☎",
  "⌥",
  "⇧",
  "↩",
  "←",
  "→",
  "↑",
  "↓",
  "➫",
  "☜",
  "☞",
  "☝",
  "☟",
  "♺",
  "⌲",
  "⚢",
  "⚣",
  "❑",
  "❒",
  "◈",
  "◐",
  "◑",
  "«",
  "»",
  "‹",
  "›",
  "–",
  "—",
  "⁄",
  "¶",
  "‽",
  "⁂",
  "※",
  "±",
  "×",
  "≈",
  "÷",
  "≠",
  "π",
  "†",
  "‡",
  "¥",
  "€",
  "‰",
  "…",
  "·",
  "•",
  "●",
  "⊗",
  "Ω",
  "☄",
  "☾",
  "☽",
  "☀",
  "۞",
  "۩",
  "✧",
  "❦",
  "❧",
  "▢",
  "△",
  "▽",
  "◆",
  "◇",
  "○",
  "◎",
  "◯",
  "Δ",
  "◕",
  "◔",
  "ʊ",
  "回",
  "₪",
  "✓",
  "✕",
  "☥",
  "☦",
  "☧",
  "☨",
  "☩",
  "☫",
  "☬",
  "⅓",
  "⅔",
  "¼",
  "¾",
  "⅛",
  "⅜",
  "⅝",
  "⅞",
  "℅",
  "№",
  "⇨",
  "❝",
  "❞",
  "∃",
  "∧",
  "∠",
  "∨",
  "∩",
  "⊂",
  "⊃",
  "∪",
  "⊥",
  "∀",
  "Ξ",
  "Γ",
  "ɐ",
  "ə",
  "ɘ",
  "ε",
  "β",
  "ɟ",
  "ɥ",
  "ɯ",
  "ɔ",
  "и",
  "๏",
  "ɹ",
  "ʁ",
  "я",
  "ʌ",
  "ʍ",
  "λ",
  "ч",
  "Π",
  "Ⓑ",
  "Ⓒ",
  "Ⓓ",
  "Ⓔ",
  "Ⓕ",
  "Ⓖ",
  "Ⓗ",
  "Ⓘ",
  "Ⓙ",
  "Ⓚ",
  "Ⓛ",
  "Ⓝ",
  "Ⓞ",
  "Ⓟ",
  "Ⓠ",
  "Ⓡ",
  "Ⓢ",
  "Ⓣ",
  "Ⓤ",
  "Ⓥ",
  "Ⓦ",
  "Ⓧ",
  "Ⓨ",
  "Ⓩ",
  "㊀",
  "㊁",
  "㊂",
  "㊃",
  "㊄",
  "㊅",
  "㊆",
  "㊇",
  "㊈",
  "㊉",
  "㊊",
  "㊋",
  "㊌",
  "㊍",
  "㊎",
  "㊏",
  "㊐",
  "㊑",
  "㊒",
  "㊓",
  "㊔",
  "㊕",
  "㊖",
  "㊗",
  "㊘",
  "㊙",
  "㊚",
  "㊛",
  "㊜",
  "㊝",
  "㊞",
  "㊟",
  "㊠",
  "㊡",
  "㊢",
  "㊣",
  "㊤",
  "㊥",
  "㊦",
  "㊧",
  "㊨",
  "㊩",
  "㊪",
  "㊫",
  "㊬",
  "㊭",
  "㊮",
  "㊯",
  "㊰",
  "℘",
  "ℑ",
  "ℜ",
  "ℵ",
  "♏",
  "η",
  "α",
  "ℓ",
  "¨",
  "¦",
  "┅",
  "┆",
  "┈",
  "┊",
  "╱",
  "╲",
  "╳",
  "¯",
  "≡",
  "჻",
  "░",
  "▒",
  "▓",
  "▤",
  "▥",
  "▦",
  "▧",
  "▨",
  "▩",
  "▐",
  "◠",
  "◡",
  "╭",
  "╮",
  "╯",
  "╰",
  "│",
  "┤",
  "╡",
  "╢",
  "╖",
  "╕",
  "╣",
  "║",
  "╝",
  "╜",
  "╛",
  "┐",
  "└",
  "┴",
  "┬",
  "├",
  "─",
  "┼",
  "╞",
  "╟",
  "╚",
  "╔",
  "╩",
  "╦",
  "╠",
  "═",
  "╬",
  "╧",
  "╨",
  "╤",
  "╥",
  "╙",
  "╘",
  "╒",
  "╓",
  "╫",
  "╪",
  "┘",
  "┌",
  "{",
  "｡",
  "^",
  "‿",
  "}",
  "(",
  ")",
  "♱",
  "♰",
  "ї",
  "з",
  "☚",
  "☛",
  "♨",
  "๑",
  "ψ",
  "♆",
  "⊙",
  "¤",
  "◣",
  "◢",
  "◥",
  "⊿",
  "◤",
  "▴",
  "▵",
  "▶",
  "▷",
  "▸",
  "▹",
  "►",
  "▻",
  "▾",
  "▿",
  "◀",
  "◁",
  "◂",
  "◃",
  "◄",
  "◅",
  "▇",
  "■",
  "□",
  "〓",
  "╗",
  "┠",
  "┨",
  "┯",
  "┷",
  "┏",
  "┓",
  "┗",
  "┛",
  "┳",
  "﹃",
  "﹄",
  "∟",
  "「",
  "」",
  "↘",
  "↙",
  "┇",
  "﹉",
  "﹊",
  "﹍",
  "﹎",
  "*",
  "_",
  "-",
  "︵",
  "∵",
  "∴",
  "‖",
  "︳",
  "︴",
  "﹏",
  "﹋",
  "﹌",
  "↔",
  "↕",
  "▪",
  "▫",
  "▬",
  "◊",
  "◦",
  "▣",
  "ぃ",
  "◘",
  "◙",
  "の",
  "あ",
  "￡",
  "✟",
  "ஐ",
  ".",
  "~",
  "【",
  "】",
  "┱",
  "┲",
  "✚",
  "♈",
  ":",
  "ﾟ",
  "‘",
  "･",
  "ï",
  "°",
  "ิ",
  "இ",
  "∷",
  "＃",
  "ﻬ",
  "━",
  "┃",
  "┄",
  "┉",
  "┋",
  "✙",
  "✛",
  "✜",
  "✝",
  "✠",
  "✏",
  "✐",
  "✑",
  "✒",
  "☌",
  "≂",
  "≃",
  "≄",
  "≅",
  "≆",
  "≇",
  "≉",
  "≊",
  "≋",
  "≌",
  "≍",
  "≎",
  "≏",
  "≐",
  "≑",
  "≒",
  "≓",
  "≔",
  "≕",
  "≖",
  "≗",
  "≘",
  "≙",
  "≚",
  "≛",
  "≜",
  "≝",
  "≞",
  "≟",
  "≢",
  "≣",
  "≤",
  "≥",
  "≦",
  "≧",
  "≨",
  "≩",
  "␛",
  "␡",
  "␚",
  "␟",
  "␘",
  "␠",
  "␤",
  "␋",
  "␌",
  "␍",
  "␎",
  "␏",
  "␐",
  "␑",
  "␒",
  "␓",
  "␔",
  "␕",
  "␖",
  "␗",
  "␙",
  "␜",
  "␝",
  "␞",
  "┍",
  "┎",
  "┑",
  "┒",
  "┕",
  "┖",
  "┙",
  "┚",
  "┝",
  "┞",
  "┟",
  "┡",
  "┢",
  "┣",
  "┥",
  "┦",
  "┧",
  "┩",
  "┪",
  "┫",
  "┭",
  "┮",
  "┰",
  "┵",
  "┶",
  "┸",
  "┹",
  "┺",
  "┻",
  "┽",
  "┾",
  "┿",
  "╀",
  "╁",
  "╂",
  "╃",
  "╄",
  "╅",
  "╆",
  "╇",
  "╈",
  "╉",
  "╊",
  "╋",
  "╌",
  "╍",
  "╎",
  "╏",
  "♉",
  "♊",
  "♌",
  "♍",
  "♎",
  "♐",
  "♑",
  "♓",
  "▁",
  "▂",
  "▃",
  "▅",
  "▉",
  "▊",
  "▋",
  "▍",
  "▎",
  "▏",
  "▔",
  "▖",
  "▘",
  "▙",
  "▚",
  "▝",
  "▞",
  "▟",
  "▭",
  "▮",
  "▯",
  "╴",
  "╵",
  "╶",
  "╷",
  "╸",
  "╹",
  "╺",
  "╻",
  "╼",
  "╽",
  "╾",
  "╿",
  "▰",
  "▱",
  "◉",
  "◌",
  "◍",
  "◒",
  "◓",
  "◖",
  "◗",
  "◚",
  "◛",
  "◜",
  "◝",
  "◞",
  "◟",
  "◧",
  "◨",
  "◩",
  "◪",
  "◫",
  "◬",
  "◭",
  "◮",
  "◰",
  "◱",
  "◲",
  "◳",
  "◴",
  "◵",
  "◶",
  "◷",
  "◸",
  "◹",
  "◺",
  "◻",
  "◼",
  "◽",
  "◾",
  "◿",
  "☇",
  "☈",
  "☉",
  "☊",
  "☋",
  "☍",
  "☐",
  "☓",
  "☔",
  "☖",
  "☗",
  "☘",
  "☙",
  "☡",
  "☸",
  "♁",
  "♃",
  "♄",
  "♅",
  "♇",
  "‐",
  "‑",
  "‒",
  "―",
  "‗",
  "’",
  "‚",
  "‛",
  "“",
  "”",
  "„",
  "‟",
  "‣",
  "․",
  "‥",
  "‧",
  "‱",
  "′",
  "″",
  "‴",
  "‵",
  "‶",
  "‷",
  "‸",
  "‼",
  "‾",
  "⁀",
  "⁁",
  "⁃",
  "⁅",
  "⁆",
  "⁊",
  "⁋",
  "⁌",
  "⁍",
  "⁎",
  "⁏",
  "⁐",
  "⁑",
  "⁒",
  "⁓",
  "⁔",
  "⁕",
  "⁖",
  "⁗",
  "⁘",
  "⁙",
  "⁚",
  "⁛",
  "₠",
  "₡",
  "₢",
  "₣",
  "₤",
  "₥",
  "₦",
  "₧",
  "₨",
  "₩",
  "₫",
  "₭",
  "₮",
  "₯",
  "℀",
  "℁",
  "ℂ",
  "℄",
  "℆",
  "ℇ",
  "℈",
  "ℊ",
  "ℋ",
  "ℌ",
  "ℍ",
  "ℎ",
  "ℏ",
  "ℐ",
  "ℒ",
  "℔",
  "ℕ",
  "℗",
  "ℙ",
  "ℚ",
  "ℛ",
  "ℝ",
  "℞",
  "℟",
  "℠",
  "℡",
  "℣",
  "ℤ",
  "℥",
  "℧",
  "ℨ",
  "℩",
  "ℬ",
  "ℭ",
  "℮",
  "ℯ",
  "ℰ",
  "ℱ",
  "Ⅎ",
  "ℳ",
  "ℴ",
  "ℶ",
  "ℷ",
  "ℸ",
  "℺",
  "℻",
  "ℼ",
  "ℽ",
  "ℾ",
  "ℿ",
  "⅀",
  "⅁",
  "⅂",
  "⅃",
  "⅄",
  "ⅅ",
  "ⅆ",
  "ⅇ",
  "ⅈ",
  "ⅉ",
  "⅊",
  "⅋",
  "⅌",
  "⅍",
  "ⅎ",
  "⅏",
  "⅕",
  "⅖",
  "⅗",
  "⅘",
  "⅙",
  "⅚",
  "⅟",
  "⁰",
  "ⁱ",
  "⁲",
  "⁳",
  "⁴",
  "⁵",
  "⁶",
  "⁷",
  "⁸",
  "⁹",
  "⁺",
  "⁻",
  "⁼",
  "⁽",
  "⁾",
  "ⁿ",
  "₀",
  "₁",
  "₂",
  "₃",
  "₄",
  "₅",
  "₆",
  "₇",
  "₈",
  "₉",
  "₊",
  "₋",
  "₌",
  "₍",
  "₎",
  "ₐ",
  "ₑ",
  "ₒ",
  "ₓ",
  "ₔ",
  "Ⅰ",
  "Ⅱ",
  "Ⅲ",
  "Ⅳ",
  "Ⅴ",
  "Ⅵ",
  "Ⅶ",
  "Ⅷ",
  "Ⅸ",
  "Ⅹ",
  "Ⅺ",
  "Ⅻ",
  "Ⅼ",
  "Ⅽ",
  "Ⅾ",
  "Ⅿ",
  "ⅰ",
  "ⅱ",
  "ⅲ",
  "ⅳ",
  "ⅴ",
  "ⅵ",
  "ⅶ",
  "ⅷ",
  "ⅸ",
  "ⅹ",
  "ⅺ",
  "ⅻ",
  "ⅼ",
  "ⅽ",
  "ⅆ",
  "ⅿ",
  "↖",
  "↗",
  "↚",
  "↛",
  "↜",
  "↝",
  "↞",
  "↟",
  "↠",
  "↡",
  "↢",
  "↣",
  "↤",
  "↥",
  "↦",
  "↧",
  "↨",
  "↪",
  "↫",
  "↬",
  "↭",
  "↮",
  "↯",
  "↰",
  "↱",
  "↲",
  "↳",
  "↴",
  "↵",
  "↶",
  "↷",
  "↸",
  "↹",
  "↺",
  "↻",
  "↼",
  "↽",
  "↾",
  "↿",
  "⇀",
  "⇁",
  "⇂",
  "⇃",
  "⇄",
  "⇅",
  "⇆",
  "⇇",
  "⇈",
  "⇉",
  "⇊",
  "⇋",
  "⇌",
  "⇍",
  "⇎",
  "⇏",
  "⇐",
  "⇑",
  "⇒",
  "⇓",
  "⇔",
  "⇕",
  "⇖",
  "⇗",
  "⇘",
  "⇙",
  "⇚",
  "⇛",
  "⇜",
  "⇝",
  "⇞",
  "⇟",
  "⇠",
  "⇡",
  "⇢",
  "⇣",
  "⇤",
  "⇥",
  "⇦",
  "⇩",
  "⇪",
  "⇫",
  "⇬",
  "⇭",
  "⇮",
  "⇯",
  "⇰",
  "⇱",
  "⇲",
  "⇳",
  "⇴",
  "⇵",
  "⇶",
  "⇷",
  "⇸",
  "⇹",
  "⇺",
  "⇻",
  "⇼",
  "⇽",
  "⇾",
  "⇿",
  "∁",
  "∂",
  "∄",
  "∅",
  "∆",
  "∇",
  "∈",
  "∉",
  "∊",
  "∋",
  "∌",
  "∍",
  "∎",
  "∏",
  "∐",
  "∑",
  "−",
  "∓",
  "∔",
  "∕",
  "∖",
  "∗",
  "∘",
  "∙",
  "√",
  "∛",
  "∜",
  "∝",
  "∡",
  "∢",
  "∣",
  "∤",
  "∥",
  "∦",
  "∫",
  "∬",
  "∭",
  "∮",
  "∯",
  "∰",
  "∱",
  "∲",
  "∳",
  "∶",
  "∸",
  "∹",
  "∺",
  "∻",
  "∼",
  "∽",
  "∾",
  "∿",
  "≀",
  "≁",
  "≪",
  "≫",
  "≬",
  "≭",
  "≮",
  "≯",
  "≰",
  "≱",
  "≲",
  "≳",
  "≴",
  "≵",
  "≶",
  "≷",
  "≸",
  "≹",
  "prec",
  "succ",
  "preceq",
  "succeq",
  "precsim",
  "succsim",
  "nprec",
  "nsucc",
  "nsub",
  "nsup",
  "sub",
  "sup",
  "nsube",
  "nsupe",
  "sube",
  "supe",
  "sqsub",
  "sqsup",
  "sqsube",
  "sqsupe",
  "oplus",
  "ominus",
  "otimes",
  "osol",
  "odot",
  "circledcirc",
  "circleddash",
  "boxplus",
  "boxminus",
  "boxtimes",
  "boxdot",
  "vdash",
  "dashv",
  "top",
  "bot",
  "models",
  "vDash",
  "Vdash",
  "Vdash",
  "nvdash",
  "nvDash",
  "nVdash",
  "nVDash",
  "prurel",
  "scurel",
  "vartriangleleft",
  "vartriangleright",
  "trianglelefteq",
  "trianglerighteq",
  "origof",
  "imageof",
  "multimap",
  "hermit",
  "intercal",
  "veebar",
  "barwedge",
  "barvee",
  "anglearc",
  "wedge",
  "vee",
  "cap",
  "cup",
  "diamond",
  "cdot",
  "star",
  "bowtie",
  "ltimes",
  "rtimes",
  "leftthreetimes",
  "rightthreetimes",
  "curlywedge",
  "curlyvee",
  "circledast",
  "circledcirc",
  "centerdot"
];

// src/app.ts
var state = {
  project: {
    version: 1,
    lines: []
  },
  activeLineId: null,
  activeSegmentId: null,
  savedGradients: [],
  isCollapsed: false
};
var pendingImportedGradient = null;
var SAVED_GRADIENTS_STORAGE_KEY = "itemCreator.savedGradients.v1";
function showSnackbar(message) {
  const x = document.getElementById("snackbar");
  if (!x)
    return;
  x.className = "show";
  x.textContent = message;
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 2900);
  x.onclick = () => {
    x.className = x.className.replace("show", "");
  };
}
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}
function createDefaultSegment() {
  return {
    id: generateId(),
    text: "New Segment",
    style: {
      colors: ["#ffffff"],
      isBold: false,
      isItalic: false,
      isUnderlined: false,
      isStrikethrough: false,
      isObfuscated: false
    }
  };
}
function createDefaultLine() {
  return {
    id: generateId(),
    segments: [createDefaultSegment()]
  };
}
function normalizeStyleOptions(style) {
  const colors = Array.isArray(style?.colors) ? style.colors : null;
  if (!colors || colors.length === 0)
    return null;
  const hexRegex = /^#[0-9a-fA-F]{6}$/;
  const normalizedColors = colors.filter((c) => typeof c === "string").map((c) => c.trim()).map((c) => c.startsWith("#") ? c : `#${c}`).map((c) => c.toLowerCase()).filter((c) => hexRegex.test(c));
  if (normalizedColors.length === 0)
    return null;
  return {
    colors: normalizedColors,
    isBold: Boolean(style?.isBold),
    isItalic: Boolean(style?.isItalic),
    isUnderlined: Boolean(style?.isUnderlined),
    isStrikethrough: Boolean(style?.isStrikethrough),
    isObfuscated: Boolean(style?.isObfuscated)
  };
}
function jsonReplacer(key, value) {
  if (value === false && ["isBold", "isItalic", "isUnderlined", "isStrikethrough", "isObfuscated"].includes(key)) {
    return;
  }
  return value;
}
function loadSavedGradientsFromStorage() {
  try {
    const raw = localStorage.getItem(SAVED_GRADIENTS_STORAGE_KEY);
    if (!raw)
      return;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed))
      return;
    const loaded = [];
    for (const item of parsed) {
      const normalized = normalizeStyleOptions(item);
      if (normalized)
        loaded.push(normalized);
    }
    state.savedGradients = loaded;
  } catch {}
}
function persistSavedGradientsToStorage() {
  try {
    localStorage.setItem(SAVED_GRADIENTS_STORAGE_KEY, JSON.stringify(state.savedGradients, jsonReplacer));
  } catch {}
}
function renderLines() {
  const container = document.getElementById("lines-container");
  const liveOutput = document.getElementById("live-output-container");
  if (!container)
    return;
  container.innerHTML = "";
  if (state.isCollapsed) {
    if (liveOutput)
      liveOutput.style.display = "none";
    const previewEl = document.createElement("div");
    previewEl.style.width = "unset";
    previewEl.style.minHeight = "300px";
    previewEl.style.backgroundColor = "#111";
    previewEl.style.color = "#ddd";
    previewEl.style.fontFamily = "'Minecraft', monospace";
    previewEl.style.padding = "1rem";
    previewEl.style.borderRadius = "4px";
    previewEl.style.border = "1px solid #444";
    previewEl.style.overflowY = "auto";
    previewEl.style.whiteSpace = "pre-wrap";
    state.project.lines.forEach((line) => {
      const lineDiv = document.createElement("div");
      lineDiv.style.minHeight = "1.2em";
      line.segments.forEach((seg) => {
        const wrapper = document.createElement("span");
        if (!seg.style.colors)
          seg.style.colors = ["#ffffff"];
        wrapper.innerHTML = generatePreviewHTML(seg.text, seg.style);
        lineDiv.appendChild(wrapper);
      });
      previewEl.appendChild(lineDiv);
    });
    container.appendChild(previewEl);
    return;
  }
  if (liveOutput)
    liveOutput.style.display = "block";
  state.project.lines.forEach((line, index) => {
    const lineEl = document.createElement("div");
    lineEl.className = `line-item ${state.activeLineId === line.id ? "active" : ""}`;
    lineEl.onclick = (e) => {
      if (e.target === lineEl || e.target.classList.contains("line-header")) {
        setActiveLine(line.id);
      }
    };
    const header = document.createElement("div");
    header.className = "line-header";
    header.innerHTML = `<span>Line ${index + 1}</span>`;
    const actionsDiv = document.createElement("div");
    const upBtn = document.createElement("button");
    upBtn.className = "sm-btn";
    upBtn.innerHTML = '<span class="material-icons">arrow_upward</span>';
    upBtn.title = "Move Up";
    upBtn.onclick = (e) => {
      e.stopPropagation();
      moveLine(index, -1);
    };
    const downBtn = document.createElement("button");
    downBtn.className = "sm-btn";
    downBtn.innerHTML = '<span class="material-icons">arrow_downward</span>';
    downBtn.title = "Move Down";
    downBtn.onclick = (e) => {
      e.stopPropagation();
      moveLine(index, 1);
    };
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "sm-btn danger";
    deleteBtn.innerHTML = '<span class="material-icons">close</span>';
    deleteBtn.title = "Delete Line";
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      deleteLine(line.id);
    };
    if (index === 0)
      upBtn.disabled = true;
    if (index === state.project.lines.length - 1)
      downBtn.disabled = true;
    actionsDiv.appendChild(upBtn);
    actionsDiv.appendChild(downBtn);
    actionsDiv.appendChild(deleteBtn);
    header.appendChild(actionsDiv);
    lineEl.appendChild(header);
    const previewRow = document.createElement("div");
    previewRow.className = "line-preview-row";
    line.segments.forEach((seg) => {
      const span = document.createElement("span");
      span.innerHTML = generatePreviewHTML(seg.text, seg.style);
      span.className = `segment-chip ${state.activeSegmentId === seg.id ? "selected" : ""}`;
      span.onclick = (e) => {
        e.stopPropagation();
        setActiveSegment(line.id, seg.id);
      };
      previewRow.appendChild(span);
    });
    lineEl.appendChild(previewRow);
    container.appendChild(lineEl);
  });
}
function renderEditor() {
  const panel = document.getElementById("editor-panel");
  const controls = document.getElementById("editor-controls");
  const label = document.getElementById("active-segment-label");
  const addSegBtn = document.getElementById("add-segment-btn");
  const delSegBtn = document.getElementById("delete-segment-btn");
  const addColorBtn = document.getElementById("add-color-btn");
  const saveGradientBtn = document.getElementById("save-gradient-btn");
  if (!state.activeSegmentId) {
    if (controls)
      controls.classList.remove("enabled");
    if (label)
      label.textContent = "None";
    if (addSegBtn)
      addSegBtn.disabled = !state.activeLineId;
    if (delSegBtn)
      delSegBtn.disabled = true;
    if (addColorBtn)
      addColorBtn.disabled = true;
    if (saveGradientBtn)
      saveGradientBtn.disabled = true;
    return;
  }
  const line = state.project.lines.find((l) => l.id === state.activeLineId);
  if (!line)
    return;
  const segment = line.segments.find((s) => s.id === state.activeSegmentId);
  if (!segment)
    return;
  if (controls)
    controls.classList.add("enabled");
  if (label)
    label.textContent = "Active";
  if (addSegBtn)
    addSegBtn.disabled = false;
  if (delSegBtn)
    delSegBtn.disabled = false;
  if (addColorBtn)
    addColorBtn.disabled = false;
  if (saveGradientBtn)
    saveGradientBtn.disabled = false;
  setInput("text-input", segment.text);
  const colorsList = document.getElementById("colors-list");
  if (colorsList) {
    colorsList.innerHTML = "";
    segment.style.colors.forEach((color, idx) => {
      const row = document.createElement("div");
      row.className = "color-row";
      const picker = document.createElement("input");
      picker.type = "color";
      picker.value = color;
      picker.className = "color-input-picker";
      picker.oninput = (e) => {
        const val = e.target.value;
        updateSegmentColor(idx, val);
      };
      const hexInput = document.createElement("input");
      hexInput.type = "text";
      hexInput.value = color;
      hexInput.className = "color-input-text";
      hexInput.oninput = (e) => {
        const val = e.target.value;
        updateSegmentColor(idx, val);
      };
      hexInput.onchange = (e) => {
        const val = e.target.value;
        updateSegmentColor(idx, val);
      };
      const remBtn = document.createElement("button");
      remBtn.className = "sm-btn danger";
      remBtn.innerHTML = '<span class="material-icons">close</span>';
      remBtn.title = "Remove Color";
      remBtn.onclick = () => removeColor(idx);
      if (segment.style.colors.length <= 1)
        remBtn.disabled = true;
      row.appendChild(picker);
      row.appendChild(hexInput);
      row.appendChild(remBtn);
      colorsList.appendChild(row);
    });
  }
  setCheck("bold-check", segment.style.isBold || false);
  setCheck("italic-check", segment.style.isItalic || false);
  setCheck("underline-check", segment.style.isUnderlined || false);
  setCheck("strike-check", segment.style.isStrikethrough || false);
  setCheck("obfuscated-check", segment.style.isObfuscated || false);
}
function renderOutput() {
  const outputCode = document.getElementById("output-code");
  if (!outputCode)
    return;
  const result = state.project.lines.map((line) => {
    return line.segments.map((s) => {
      if (!s.style.colors)
        s.style.colors = ["#ffffff"];
      return generateMiniMessage(s.text, s.style);
    }).join("");
  });
  outputCode.textContent = JSON.stringify(result, null, 2);
}
function renderIcons() {
  const grid = document.getElementById("icons-grid");
  if (!grid)
    return;
  grid.innerHTML = "";
  Object.entries(icons).forEach(([name, char]) => {
    const btn = document.createElement("div");
    btn.className = "icon-item";
    btn.innerHTML = `<span class="icon-char">${char}</span><span class="icon-name">${name}</span>`;
    btn.onclick = () => insertIcon(char);
    grid.appendChild(btn);
  });
}
function renderSavedGradients() {
  const container = document.getElementById("saved-gradients-list");
  if (!container)
    return;
  container.innerHTML = "";
  if (state.savedGradients.length === 0) {
    container.innerHTML = '<div style="text-align: center; color: var(--text-secondary); font-size: 0.75rem; padding: 1rem;">No saved gradients</div>';
    return;
  }
  state.savedGradients.forEach((gradient, index) => {
    const item = document.createElement("div");
    item.className = "gradient-preset";
    const preview = document.createElement("div");
    preview.className = "gradient-preview";
    preview.innerHTML = generatePreviewHTML("Sample Text", gradient);
    const actions = document.createElement("div");
    actions.className = "gradient-preset-actions";
    const loadBtn = document.createElement("button");
    loadBtn.className = "sm-btn";
    loadBtn.innerHTML = '<span class="material-icons">download</span>';
    loadBtn.title = "Load Gradient";
    loadBtn.onclick = (e) => {
      e.stopPropagation();
      loadGradient(index);
    };
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "sm-btn danger";
    deleteBtn.innerHTML = '<span class="material-icons">delete</span>';
    deleteBtn.title = "Delete Gradient";
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      deleteSavedGradient(index);
    };
    actions.appendChild(loadBtn);
    actions.appendChild(deleteBtn);
    item.appendChild(preview);
    item.appendChild(actions);
    item.onclick = () => loadGradient(index);
    container.appendChild(item);
  });
}
function setActiveLine(lineId) {
  state.activeLineId = lineId;
  const line = state.project.lines.find((l) => l.id === lineId);
  state.activeSegmentId = null;
  renderLines();
  renderEditor();
}
function setActiveSegment(lineId, segmentId) {
  state.activeLineId = lineId;
  state.activeSegmentId = segmentId;
  renderLines();
  renderEditor();
}
function addLine() {
  const newLine = createDefaultLine();
  state.project.lines.push(newLine);
  setActiveLine(newLine.id);
  const firstSegment = newLine.segments[0];
  if (firstSegment) {
    setActiveSegment(newLine.id, firstSegment.id);
  }
  renderOutput();
}
function deleteLine(id) {
  state.project.lines = state.project.lines.filter((l) => l.id !== id);
  if (state.activeLineId === id) {
    state.activeLineId = null;
    state.activeSegmentId = null;
  }
  renderLines();
  renderEditor();
  renderOutput();
}
function moveLine(index, direction) {
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= state.project.lines.length)
    return;
  const line = state.project.lines[index];
  if (!line)
    return;
  state.project.lines.splice(index, 1);
  state.project.lines.splice(newIndex, 0, line);
  renderLines();
  renderOutput();
}
function addSegment() {
  if (!state.activeLineId)
    return;
  const line = state.project.lines.find((l) => l.id === state.activeLineId);
  if (!line)
    return;
  const newSeg = createDefaultSegment();
  line.segments.push(newSeg);
  setActiveSegment(line.id, newSeg.id);
  renderLines();
  renderOutput();
}
function deleteSegment() {
  if (!state.activeLineId || !state.activeSegmentId)
    return;
  const line = state.project.lines.find((l) => l.id === state.activeLineId);
  if (!line)
    return;
  if (line.segments.length <= 1) {
    alert("Cannot delete the last segment. Delete the line instead.");
    return;
  }
  line.segments = line.segments.filter((s) => s.id !== state.activeSegmentId);
  const lastSegment = line.segments[line.segments.length - 1];
  state.activeSegmentId = lastSegment ? lastSegment.id : null;
  renderLines();
  renderEditor();
  renderOutput();
}
function addColor() {
  updateActiveSegment((seg) => {
    const lastColor = seg.style.colors[seg.style.colors.length - 1] || "#ffffff";
    seg.style.colors.push(lastColor);
  });
}
function removeColor(index) {
  updateActiveSegment((seg) => {
    if (seg.style.colors.length > 1) {
      seg.style.colors.splice(index, 1);
    }
  });
}
function saveCurrentGradient() {
  if (!state.activeSegmentId)
    return;
  const line = state.project.lines.find((l) => l.id === state.activeLineId);
  const seg = line?.segments.find((s) => s.id === state.activeSegmentId);
  if (!seg)
    return;
  const gradientCopy = JSON.parse(JSON.stringify(seg.style));
  state.savedGradients.push(gradientCopy);
  persistSavedGradientsToStorage();
  renderSavedGradients();
}
function loadGradient(index) {
  if (!state.activeSegmentId || index >= state.savedGradients.length)
    return;
  const line = state.project.lines.find((l) => l.id === state.activeLineId);
  const seg = line?.segments.find((s) => s.id === state.activeSegmentId);
  if (!seg)
    return;
  seg.style = JSON.parse(JSON.stringify(state.savedGradients[index]));
  renderLines();
  renderEditor();
  renderOutput();
}
function deleteSavedGradient(index) {
  state.savedGradients.splice(index, 1);
  persistSavedGradientsToStorage();
  renderSavedGradients();
}
async function exportLine() {
  if (!state.activeLineId) {
    showSnackbar("No line selected");
    return;
  }
  const line = state.project.lines.find((l) => l.id === state.activeLineId);
  if (!line)
    return;
  const result = line.segments.map((s) => {
    if (!s.style.colors)
      s.style.colors = ["#ffffff"];
    return generateMiniMessage(s.text, s.style);
  }).join("");
  try {
    await navigator.clipboard.writeText(result);
    showSnackbar("Line exported to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
    showSnackbar("Failed to copy to clipboard");
  }
}
async function exportSegment() {
  if (!state.activeSegmentId) {
    showSnackbar("No segment selected");
    return;
  }
  const line = state.project.lines.find((l) => l.id === state.activeLineId);
  const seg = line?.segments.find((s) => s.id === state.activeSegmentId);
  if (!seg)
    return;
  const result = generateMiniMessage(seg.text, seg.style);
  try {
    await navigator.clipboard.writeText(result);
    showSnackbar("Segment exported to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
    showSnackbar("Failed to copy to clipboard");
  }
}
function parseImportedGradient(input) {
  const trimmed = input.trim();
  if (!trimmed)
    return null;
  let parsed;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    return null;
  }
  const colors = parsed?.colors;
  if (!Array.isArray(colors))
    return null;
  const normalized = colors.map((c) => ({
    hex: typeof c?.hex === "string" ? c.hex.trim() : "",
    pos: typeof c?.pos === "number" ? c.pos : Number.NaN
  })).filter((c) => c.hex.length > 0);
  const hexRegex = /^#?[0-9a-fA-F]{6}$/;
  const sorted = normalized.filter((c) => hexRegex.test(c.hex)).sort((a, b) => {
    const ap = Number.isFinite(a.pos) ? a.pos : 0;
    const bp = Number.isFinite(b.pos) ? b.pos : 0;
    return ap - bp;
  }).map((c) => (c.hex.startsWith("#") ? c.hex : `#${c.hex}`).toLowerCase());
  if (sorted.length === 0)
    return null;
  return {
    colors: sorted,
    isBold: false,
    isItalic: false,
    isUnderlined: false,
    isStrikethrough: false,
    isObfuscated: false
  };
}
function openGradientImportModal() {
  const modal = document.getElementById("gradient-import-modal");
  const textarea = document.getElementById("gradient-import-input");
  const preview = document.getElementById("gradient-import-preview");
  const error = document.getElementById("gradient-import-error");
  const confirmBtn = document.getElementById("gradient-import-confirm");
  pendingImportedGradient = null;
  if (textarea)
    textarea.value = "";
  if (preview)
    preview.innerHTML = "";
  if (error) {
    error.style.display = "none";
    error.textContent = "";
  }
  if (confirmBtn)
    confirmBtn.disabled = true;
  modal?.classList.remove("hidden");
  textarea?.focus();
}
function closeGradientImportModal() {
  const modal = document.getElementById("gradient-import-modal");
  modal?.classList.add("hidden");
  pendingImportedGradient = null;
}
function updateGradientImportPreview() {
  const textarea = document.getElementById("gradient-import-input");
  const preview = document.getElementById("gradient-import-preview");
  const error = document.getElementById("gradient-import-error");
  const confirmBtn = document.getElementById("gradient-import-confirm");
  const value = textarea?.value ?? "";
  const parsed = parseImportedGradient(value);
  pendingImportedGradient = parsed;
  if (parsed) {
    if (preview)
      preview.innerHTML = generatePreviewHTML("Sample Text", parsed);
    if (error) {
      error.style.display = "none";
      error.textContent = "";
    }
    if (confirmBtn)
      confirmBtn.disabled = false;
  } else {
    if (preview)
      preview.innerHTML = "";
    if (confirmBtn)
      confirmBtn.disabled = true;
    if (error) {
      const hasInput = value.trim().length > 0;
      error.style.display = hasInput ? "block" : "none";
      error.textContent = hasInput ? 'Invalid gradient JSON. Expected {"version":4,"colors":[{"hex":"#RRGGBB","pos":0}, ...]}' : "";
    }
  }
}
function importPendingGradient() {
  if (!pendingImportedGradient)
    return;
  state.savedGradients.push(JSON.parse(JSON.stringify(pendingImportedGradient)));
  persistSavedGradientsToStorage();
  renderSavedGradients();
  closeGradientImportModal();
  showSnackbar("Gradient imported successfully!");
}
function updateSegmentColor(index, value) {
  const s = styles();
  if (!s)
    return;
  s.colors[index] = value;
  const line = state.project.lines.find((l) => l.id === state.activeLineId);
  const seg = line?.segments.find((sg) => sg.id === state.activeSegmentId);
  if (seg) {
    seg.style.colors[index] = value;
    renderLines();
    renderOutput();
    const colorsList = document.getElementById("colors-list");
    if (colorsList && colorsList.children[index]) {
      const row = colorsList.children[index];
      const picker = row.querySelector('input[type="color"]');
      const text = row.querySelector('input[type="text"]');
      if (picker && picker.value !== value && /^#[0-9a-f]{6}$/i.test(value)) {
        picker.value = value;
      }
      if (text && text.value !== value) {
        text.value = value;
      }
    }
  }
}
function insertIcon(char) {
  const input = document.getElementById("text-input");
  if (input && state.activeSegmentId) {
    const val = input.value;
    const start = input.selectionStart || val.length;
    const end = input.selectionEnd || val.length;
    const newVal = val.substring(0, start) + char + val.substring(end);
    updateActiveSegment((s) => s.text = newVal);
    input.value = newVal;
    input.focus();
    input.setSelectionRange(start + 1, start + 1);
  }
}
function updateActiveSegment(updater) {
  if (!state.activeLineId || !state.activeSegmentId)
    return;
  const line = state.project.lines.find((l) => l.id === state.activeLineId);
  if (!line)
    return;
  const seg = line.segments.find((s) => s.id === state.activeSegmentId);
  if (!seg)
    return;
  updater(seg);
  renderLines();
  renderEditor();
  renderOutput();
}
function styles() {
  if (!state.activeLineId || !state.activeSegmentId)
    return null;
  const line = state.project.lines.find((l) => l.id === state.activeLineId);
  const seg = line?.segments.find((s) => s.id === state.activeSegmentId);
  return seg ? seg.style : null;
}
function setInput(id, value) {
  const el = document.getElementById(id);
  if (el)
    el.value = value;
}
function setCheck(id, checked) {
  const el = document.getElementById(id);
  if (el)
    el.checked = checked;
}
function initDragAndDrop() {
  document.body.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.body.classList.add("drag-over");
  });
  document.body.addEventListener("dragleave", (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.body.classList.remove("drag-over");
  });
  document.body.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.body.classList.remove("drag-over");
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        if (file.name.toLowerCase().endsWith(".json")) {
          const reader = new FileReader;
          reader.onload = (evt) => {
            try {
              const data = evt.target?.result;
              const json = JSON.parse(data);
              if (json.lines && Array.isArray(json.lines)) {
                const id = generateId();
                sessionStorage.setItem(`pending_project_${id}`, data);
                const url = new URL(window.location.href);
                url.searchParams.set("load", id);
                window.open(url.toString(), "_blank");
              }
            } catch (err) {
              console.error("Failed to parse dropped JSON", err);
              showSnackbar("Error parsing dropped JSON file.");
            }
          };
          reader.readAsText(file);
        }
      });
    }
  });
}
function checkPendingLoad() {
  const urlParams = new URLSearchParams(window.location.search);
  const loadId = urlParams.get("load");
  if (loadId) {
    const data = sessionStorage.getItem(`pending_project_${loadId}`);
    if (data) {
      try {
        const loaded = JSON.parse(data);
        if (loaded.lines && Array.isArray(loaded.lines)) {
          state.project = loaded;
          state.activeLineId = null;
          state.activeSegmentId = null;
          showSnackbar("Project loaded successfully in new tab!");
        }
      } catch (e) {
        console.error("Error loading pending project", e);
      }
      sessionStorage.removeItem(`pending_project_${loadId}`);
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }
}
function initListeners() {
  initDragAndDrop();
  document.getElementById("add-line-btn")?.addEventListener("click", addLine);
  document.getElementById("collapse-lines-btn")?.addEventListener("click", () => {
    state.isCollapsed = !state.isCollapsed;
    renderLines();
  });
  document.getElementById("clear-all-btn")?.addEventListener("click", clearAll);
  document.getElementById("add-segment-btn")?.addEventListener("click", addSegment);
  document.getElementById("delete-segment-btn")?.addEventListener("click", deleteSegment);
  document.getElementById("add-color-btn")?.addEventListener("click", addColor);
  document.getElementById("save-gradient-btn")?.addEventListener("click", saveCurrentGradient);
  document.getElementById("import-gradient-btn")?.addEventListener("click", openGradientImportModal);
  document.getElementById("export-line-btn")?.addEventListener("click", exportLine);
  document.getElementById("export-segment-btn")?.addEventListener("click", exportSegment);
  document.getElementById("gradient-import-close")?.addEventListener("click", closeGradientImportModal);
  document.getElementById("gradient-import-cancel")?.addEventListener("click", closeGradientImportModal);
  document.getElementById("gradient-import-confirm")?.addEventListener("click", importPendingGradient);
  document.getElementById("gradient-import-input")?.addEventListener("input", updateGradientImportPreview);
  document.querySelectorAll('[data-modal-close="true"]').forEach((el) => {
    el.addEventListener("click", closeGradientImportModal);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape")
      closeGradientImportModal();
  });
  document.getElementById("btn-save-project")?.addEventListener("click", () => {
    const data = JSON.stringify(state.project, jsonReplacer, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "project.json";
    a.click();
    showSnackbar("Project saved!");
  });
  document.getElementById("btn-copy-json")?.addEventListener("click", () => {
    const output = document.getElementById("output-code");
    if (output) {
      navigator.clipboard.writeText(output.textContent || "");
      showSnackbar("Copied JSON to clipboard!");
    }
  });
  document.getElementById("btn-export-url")?.addEventListener("click", async () => {
    const result = state.project.lines.map((line) => {
      return line.segments.map((s) => {
        if (!s.style.colors)
          s.style.colors = ["#ffffff"];
        return generateMiniMessage(s.text, s.style);
      }).join("");
    });
    const jsonOutput = JSON.stringify(result);
    try {
      const response = await fetch("https://api.jsonblob.com/api/jsonBlob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: jsonOutput
      });
      let parsedURL = await response.headers.get("location");
      if (!parsedURL) {
        showSnackbar("Failed to get URL from response");
        return;
      }
      if (parsedURL.startsWith("/")) {
        parsedURL = "https://api.jsonblob.com" + parsedURL;
      } else {
        parsedURL = parsedURL.replace(/^http:\/\//i, "https://");
      }
      console.log(parsedURL);
      await navigator.clipboard.writeText(parsedURL);
      showSnackbar("URL copied to clipboard!");
    } catch (error) {
      console.error("Export error:", error);
      showSnackbar("Failed to export to URL");
    }
  });
  const fileInput = document.getElementById("file-input");
  document.getElementById("btn-load-project")?.addEventListener("click", () => {
    fileInput.click();
  });
  fileInput?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file)
      return;
    const reader = new FileReader;
    reader.onload = (evt) => {
      try {
        const loaded = JSON.parse(evt.target?.result);
        if (loaded.lines && Array.isArray(loaded.lines)) {
          state.project = loaded;
          state.activeLineId = null;
          state.activeSegmentId = null;
          renderLines();
          renderEditor();
          renderOutput();
          showSnackbar("Project loaded successfully!");
        } else {
          showSnackbar("Invalid project file.");
        }
      } catch (err) {
        showSnackbar("Error parsing JSON.");
      }
    };
    reader.readAsText(file);
  });
  document.getElementById("text-input")?.addEventListener("input", (e) => {
    updateActiveSegment((s) => s.text = e.target.value);
  });
  const toggles = [
    { id: "bold", prop: "isBold" },
    { id: "italic", prop: "isItalic" },
    { id: "underline", prop: "isUnderlined" },
    { id: "strike", prop: "isStrikethrough" },
    { id: "obfuscated", prop: "isObfuscated" }
  ];
  toggles.forEach((t) => {
    document.getElementById(`${t.id}-check`)?.addEventListener("change", (e) => {
      updateActiveSegment((s) => {
        s.style[t.prop] = e.target.checked;
      });
    });
  });
}
function clearAll() {
  if (confirm("Are you sure you want to clear all lines?")) {
    state.project.lines = [];
    state.activeLineId = null;
    state.activeSegmentId = null;
    renderLines();
    renderEditor();
    renderOutput();
  }
}
window.addEventListener("DOMContentLoaded", () => {
  checkPendingLoad();
  loadSavedGradientsFromStorage();
  renderIcons();
  renderSavedGradients();
  initListeners();
  renderLines();
  renderOutput();
});
