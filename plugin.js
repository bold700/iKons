// Material Symbols Plugin for Penpot
console.log('Plugin loaded');

// Initialize the plugin UI
penpot.ui.open("Material Symbols Plugin", "", {
  width: 500,
  height: 600,
});

// Listen for messages from the UI
penpot.ui.onMessage((message) => {
  console.log('Received message:', message);
  if (message.type === 'add-icon') {
    const { iconName, size, weight, fill, color, style } = message.data;
    addIconToCanvas(iconName, size, weight, fill, color, style);
  }
});

// Function to add icon to canvas
function addIconToCanvas(iconName, size, weight, fill, color, style) {
  try {
    console.log(`Adding icon: ${iconName}, size: ${size}, style: ${style}`);
    
    // Get current page
    const currentPage = penpot.currentPage;
    if (!currentPage) {
      console.error('No current page found');
      return;
    }
    
    // Create a simple text element
    const textShape = penpot.createText(iconName);
    if (!textShape) {
      console.error('Failed to create text shape');
      return;
    }
    
    console.log('Text shape created successfully');
    
    // Set basic properties
    textShape.fontSize = size;
    textShape.fills = [{ fillColor: color, fillOpacity: 1 }];
    
    // Set font family based on style
    let fontFamily;
    switch (style) {
      case 'rounded':
        fontFamily = 'Material Symbols Rounded';
        break;
      case 'sharp':
        fontFamily = 'Material Symbols Sharp';
        break;
      default:
        fontFamily = 'Material Symbols Outlined';
    }
    
    textShape.fontFamily = fontFamily;
    console.log(`Set font family to: ${fontFamily}`);
    
    // Position at center of viewport
    textShape.x = 100;
    textShape.y = 100;
    
    // Send success message back to UI
    penpot.ui.sendMessage({
      type: 'icon-added',
      data: { iconName, success: true }
    });
    
    console.log(`Successfully added icon: ${iconName}`);
    
  } catch (error) {
    console.error('Error adding icon to canvas:', error);
    
    // Send error message back to UI
    penpot.ui.sendMessage({
      type: 'icon-added',
      data: { iconName, success: false, error: String(error) }
    });
  }
}