import { StyleOptions } from './types';

export function generateMiniMessage(text: string, options: StyleOptions): string {
    let output = "";

    // Ensure colors exist
    const colors = options.colors || ["#ffffff"];

    // Open tags
    // 1. Color / Gradient
    if (colors.length > 1) {
        // Multi-color gradient
        output += `<gradient:${colors.join(':')}>`;
    } else if (colors.length === 1) {
        // Single color
        output += `<${colors[0]}>`;
    } else {
        // Fallback
        output += "<white>";
    }

    // 2. Decorations
    if (options.isBold) output += "<bold>";
    if (options.isItalic) output += "<italic>";
    if (options.isUnderlined) output += "<underlined>";
    if (options.isStrikethrough) output += "<strikethrough>";
    if (options.isObfuscated) output += "<obfuscated>";

    // Content
    output += text;

    // Closing tags
    
    if (options.isObfuscated) output += "</obfuscated>";
    if (options.isStrikethrough) output += "</strikethrough>";
    if (options.isUnderlined) output += "</underlined>";
    if (options.isItalic) output += "</italic>";
    if (options.isBold) output += "</bold>";

    if (colors.length > 1) {
        output += "</gradient>";
    }
    
    return output;
}

// Function to generate preview HTML (since browsers don't understand MiniMessage)
export function generatePreviewHTML(text: string, options: StyleOptions): string {
    const colors = options.colors || ["#ffffff"];

    // Single color
    if (colors.length <= 1) {
        const color = colors[0] || "#ffffff";
        let style = `color: ${color};`;
        if (options.isBold) style += "font-weight: bold;";
        if (options.isItalic) style += "font-style: italic;";
        
        let decor = "";
        if (options.isUnderlined) decor += " underline";
        if (options.isStrikethrough) decor += " line-through";
        if (decor) style += `text-decoration:${decor};`;
        if (options.isObfuscated) style += "filter: blur(2px);";
        
        return `<span style="${style}">${text}</span>`;
    } else {
        // Gradient
        let html = "";
        const len = text.length;
        // Parse all colors
        const rgbColors = colors.map(c => hex2rgb(c) || [255, 255, 255]);
        
        if (len === 1) {
             const c = rgbColors[0];
             let style = `color: rgb(${c[0]},${c[1]},${c[2]});`;
             if (options.isBold) style += "font-weight: bold;";
             if (options.isItalic) style += "font-style: italic;";
             let decor = "";
             if (options.isUnderlined) decor += " underline";
             if (options.isStrikethrough) decor += " line-through";
             if (decor) style += `text-decoration:${decor};`;
             if (options.isObfuscated) style += "filter: blur(2px);";
             return `<span style="${style}">${text}</span>`;
        }

        for (let i = 0; i < len; i++) {
            // Calculate progress 0..1 for the whole string
            const t = i / (len - 1);
            
            // Map t to segment index
            const totalSegments = rgbColors.length - 1;
            const pos = t * totalSegments;
            
            let index = Math.floor(pos);
            if (index >= totalSegments) index = totalSegments - 1;
            
            const segmentT = pos - index; // 0..1 within the segment
            
            const c1 = rgbColors[index];
            const c2 = rgbColors[index + 1];
            
            const r = Math.round(c1[0] + (c2[0] - c1[0]) * segmentT);
            const g = Math.round(c1[1] + (c2[1] - c1[1]) * segmentT);
            const b = Math.round(c1[2] + (c2[2] - c1[2]) * segmentT);
            
            let style = `color: rgb(${r},${g},${b});`;
            if (options.isBold) style += "font-weight: bold;";
            if (options.isItalic) style += "font-style: italic;";
             let decor = "";
            if (options.isUnderlined) decor += " underline";
            if (options.isStrikethrough) decor += " line-through";
            if (decor) style += `text-decoration:${decor};`;
            if (options.isObfuscated) style += "filter: blur(2px);";

            html += `<span style="${style}">${text[i]}</span>`;
        }
        return html;
    }
}


function hex2rgb(hex: string): [number, number, number] | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}
