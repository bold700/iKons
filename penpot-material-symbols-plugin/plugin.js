// Material Symbols Plugin for Penpot
// Based on the working Icoonies plugin structure

// Initialize the plugin UI
penpot.ui.open("Material Symbols Plugin", "", {
  width: 400,
  height: 600,
});

// Listen for messages from the UI
penpot.ui.onMessage((message) => {
  if (message.type === 'add-icon') {
    const { iconName, size, weight, fill, color } = message.data;
    addIconToCanvas(iconName, size, weight, fill, color);
  }
});

// Function to add icon to canvas
function addIconToCanvas(iconName, size, weight, fill, color) {
  try {
    console.log(`Attempting to add icon: ${iconName}`);
    
    // Create a text shape with the icon
    const textShape = penpot.createText(iconName);
    
    if (!textShape) {
      console.error('Failed to create text shape');
      return;
    }
    
    // Set basic text properties
    textShape.fontSize = size.toString();
    textShape.fills = [{ fillColor: color, fillOpacity: 1 }];
    
    // Set font family to Material Symbols
    textShape.fontFamily = 'Material Symbols Outlined';
    
    // Position the text in the center of the viewport
    try {
      const viewport = penpot.viewport;
      textShape.x = viewport.center.x - size / 2;
      textShape.y = viewport.center.y - size / 2;
    } catch (positionError) {
      console.warn('Could not position text:', positionError);
      // Use default position
      textShape.x = 100;
      textShape.y = 100;
    }
    
    // Select the newly created shape
    penpot.selection = [textShape];
    
    console.log(`Successfully added icon: ${iconName} with size: ${size}`);
    
    // Send success message back to UI
    penpot.ui.sendMessage({
      type: 'icon-added',
      data: { iconName, success: true }
    });
    
  } catch (error) {
    console.error('Error adding icon to canvas:', error);
    
    // Send error message back to UI
    penpot.ui.sendMessage({
      type: 'icon-added',
      data: { iconName, success: false, error: String(error) }
    });
  }
}

// Send initial message to UI when plugin loads
penpot.ui.sendMessage({
  type: 'plugin-ready'
});