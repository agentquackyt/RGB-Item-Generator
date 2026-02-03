# Item Creator

A modern, TypeScript-based MiniMessage generator for Minecraft text formatting. Create beautiful, gradient-styled text with real-time preview.

## Features

### Advanced Text Styling
Create stunning Minecraft text with full MiniMessage format support. Apply color gradients, bold, italic, underline, strikethrough, and obfuscated effects to any text segment. Mix and match multiple colors in smooth gradients to create unique designs for your server items.

### Live Preview & Editing
See exactly how your text will look in real-time as you create it. The intuitive segment-based editor lets you break text into parts, each with independent styling. Manage multiple lines effortlessly, allowing you to design complex item lore with precise control over every detail.

### Save Gradient Presets
Save your favorite gradient combinations and reuse them instantly across projects. Import gradient presets from popular tools like RGB Birdflop, or create your own custom collections to use later.

### Seamless Integration
Export your creations in multiple formats: copy as MiniMessage text, save complete projects as JSON, or generate shareable URLs. 


## Getting Started

### Prerequisites (for using the hosted version)

A modern web browser (Chrome, Firefox, Edge, Safari) is recommended for the best experience.

**(Optional):** To use the generated MiniMessage text in Minecraft, you will need to have the RGB Item Generator Paper Plugin, which can be downloaded below. It works with any Paper-based Minecraft server tested with version 1.21.8+ 
### Hosted Version
You can access the hosted version of the Item Creator [here](https://agentquackyt.github.io/RGB-Item-Generator/).
> You might want to use gradients from the [RGB Birdflop](https://www.birdflop.com/resources/rgb/presets/) page, another awesome tool for creating gradients. Copy the JSON for each preset and paste it into the saved gradients import feature. 

### Using the Paper Plugin
Download the [RGB Item Generator Paper Plugin](https://github.com/agentquackyt/RGB-Item-Generator/raw/refs/heads/main/itemmeta-1.0-SNAPSHOT.jar) to use the generated MiniMessage text for your Minecraft items directly in-game. 

Use the `/jitem getLoreFromURL <url>` command to apply the generated text as item lore (description) to the item you are holding. My plugin will decode the URL and set the item's lore accordingly.

In addition to that, my plugin contains many other features for customizing items in Minecraft. Best to play around with it

## Development Setup
### Tech Stack

- **Runtime**: Bun
- **Language**: TypeScript / HTML / CSS
- **UI**: Vanilla TypeScript with custom CSS

### Prerequisites (for building locally)

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

