# Item Creator

A modern, TypeScript-based MiniMessage generator for Minecraft text formatting. Create beautiful, gradient-styled text with real-time preview.

## Features

- **MiniMessage Format Support** - Generate MiniMessage-formatted text with full styling options
- **Real-time Preview** - See your formatted text as you create it
- **Multi-line Support** - Create and manage multiple text lines
- **Segment-based Editing** - Break text into segments with individual styling
- **Gradient Support** - Apply color gradients to text segments
- **Style Presets** - Save and reuse gradient styles
- **Project Management** - Save and load entire projects as JSON
- **URL Export** - Share your creations via encoded URLs
- **Modern UI** - Clean interface built with Material Design icons

## Tech Stack

- **Runtime**: Bun
- **Language**: TypeScript
- **Styling**: @birdflop/rgbirdflop for gradient generation
- **UI**: Vanilla TypeScript with custom CSS

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed on your system

### Installation

```bash
# Clone the repository
git clone https://github.com/agentquackyt/RGB-Item-Generator
cd "Item Creator"

# Install dependencies
bun install
```

### Development

```bash
# Run development server with hot reload
bun run dev

# Build for production
bun run build
```

## Usage

1. **Add Lines** - Create multiple lines of text using the "Add Line" button
2. **Add Segments** - Break lines into segments with independent styling
3. **Style Segments** - Apply colors, gradients, and formatting (bold, italic, underline, etc.)
4. **Preview** - View real-time preview of your formatted text
5. **Export** - Copy as MiniMessage, JSON, or share via URL

### Styling Options

Each text segment supports:
- Color gradients (single or multi-color)
- Bold
- Italic
- Underline
- Strikethrough
- Obfuscated

### Project Management

- **Save Project** - Export your entire project as JSON
- **Load Project** - Import previously saved projects
- **Copy JSON** - Copy the project JSON to clipboard
- **Export URL** - Generate a shareable URL with encoded project data

## Project Structure

```
├── src/
│   ├── app.ts           # Main application logic
│   ├── minimessage.ts   # MiniMessage format generation
│   ├── icons.ts         # Material Icons data
│   ├── types.ts         # TypeScript type definitions
│   └── style.css        # Application styles
├── index.html           # Main HTML entry point
├── package.json         # Project dependencies
└── tsconfig.json        # TypeScript configuration
```

