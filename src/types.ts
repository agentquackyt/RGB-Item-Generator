export interface StyleOptions {
    colors: string[]; // Array of hex codes
    isBold?: boolean;
    isItalic?: boolean;
    isUnderlined?: boolean;
    isStrikethrough?: boolean;
    isObfuscated?: boolean;
}

export interface Segment {
    id: string;
    text: string;
    style: StyleOptions;
}

export interface Line {
    id: string;
    segments: Segment[];
}

export interface Project {
    lines: Line[];
    version: number;
}
