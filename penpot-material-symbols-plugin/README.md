# Material Symbols Plugin for Penpot

A comprehensive Penpot plugin that provides access to Google's Material Symbols icon library directly within your design workflow.

## Features

- **Comprehensive Icon Library**: Access to 200+ popular Material Symbols icons
- **Three Icon Styles**: Choose between Outlined, Rounded, and Sharp variants
- **Customizable Properties**: Adjust fill, weight, size, and optical size
- **Search Functionality**: Quickly find icons with real-time search
- **Easy Integration**: One-click insertion into your Penpot designs
- **Responsive Interface**: Clean, modern UI that fits seamlessly into Penpot

## Installation

### Method 1: Local Development
1. Clone or download this plugin folder
2. Open Penpot in your browser
3. Go to the Plugins section
4. Click "Install from folder" and select the `penpot-material-symbols-plugin` directory

### Method 2: Plugin Store (when available)
1. Open Penpot
2. Navigate to Plugins → Browse Plugins
3. Search for "Material Symbols"
4. Click Install

## Usage

1. **Open the Plugin**: 
   - Go to Plugins menu in Penpot
   - Select "Material Symbols"

2. **Browse Icons**:
   - Browse through the icon grid
   - Use the search bar to find specific icons
   - Icons are organized by categories

3. **Customize Style**:
   - Choose between Outlined, Rounded, or Sharp styles
   - Adjust fill level (0-1)
   - Select font weight (Thin to Bold)
   - Set icon size (16-48px)

4. **Add to Canvas**:
   - Click on any icon to select it
   - Click the "+" button to add it to your canvas
   - Icons are added as text elements with Material Symbols font

## Icon Categories

The plugin includes icons from these categories:
- Navigation & Actions
- Communication & Social  
- Media & Content
- Files & Documents
- Shopping & Commerce
- Technology & Devices
- Transportation
- Places & Travel
- Time & Calendar
- People & Social
- Security & Privacy
- Settings & Tools
- Health & Fitness
- Weather & Nature
- Business & Finance
- Education & Learning
- Gaming & Entertainment

## Technical Details

### Font Loading
The plugin uses Google Fonts to load Material Symbols fonts:
- Material Symbols Outlined
- Material Symbols Rounded  
- Material Symbols Sharp

### Variable Font Features
Icons support these variable font axes:
- **FILL**: Controls fill level (0-1)
- **wght**: Font weight (100-700)
- **GRAD**: Grade adjustment (-50 to 200)
- **opsz**: Optical size (20-48)

### Penpot Integration
Icons are inserted as text elements using the Penpot Plugin API, allowing them to be:
- Edited like regular text
- Styled with colors and effects
- Converted to paths if needed
- Resized and transformed

## Development

### File Structure
```
penpot-material-symbols-plugin/
├── manifest.json      # Plugin metadata
├── index.html        # Plugin UI
├── plugin.js         # Main plugin logic
├── icon.svg          # Plugin icon
└── README.md         # Documentation
```

### Local Testing
1. Ensure all files are in the plugin directory
2. Load the plugin in Penpot's development mode
3. Test icon insertion and customization features

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This plugin uses Google's Material Symbols, which are available under the Apache License 2.0.

## Support

For issues or feature requests, please contact the plugin developer or submit an issue in the project repository.

## Version History

### v1.0.0
- Initial release
- 200+ Material Symbols icons
- Three style variants (Outlined, Rounded, Sharp)
- Variable font support
- Search functionality
- Customizable icon properties
