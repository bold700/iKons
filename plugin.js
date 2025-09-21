// Material Symbols Plugin for Penpot
console.log('Material Symbols Plugin loading...');

// Wait for Penpot to be ready
if (typeof penpot !== 'undefined') {
  console.log('Penpot API detected');
  
  // Initialize the plugin UI
  penpot.ui.open("Material Symbols", `http://localhost:3001/index.html`, {
    width: 500,
    height: 600,
  });
  
  console.log('Plugin UI opened');
  
  // Listen for messages from the UI
  penpot.ui.onMessage((message) => {
    console.log('Received message from UI:', message);
    
    if (message.type === 'add-icon') {
      const { iconName, size, weight, fill, color, style } = message.data;
      addIconToCanvas(iconName, size, weight, fill, color, style);
    }
  });
  
} else {
  console.error('Penpot API not available');
}

// Function to add icon to canvas
function addIconToCanvas(iconName, size, weight, fill, color, style) {
  try {
    console.log(`Adding icon: ${iconName}, size: ${size}, style: ${style}`);
    
    // Create text shape with the icon character
    const textShape = penpot.createText(iconName);
    
    if (!textShape) {
      throw new Error('Failed to create text shape');
    }
    
    console.log('Text shape created successfully');
    
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
    
    // Apply text properties
    textShape.fontFamily = fontFamily;
    textShape.fontSize = size;
    textShape.fontWeight = weight.toString();
    
    // Set color
    if (color) {
      textShape.fills = [{ 
        fillColor: color, 
        fillOpacity: 1 
      }];
    }
    
    // Position the icon
    textShape.x = 100;
    textShape.y = 100;
    
    console.log(`Successfully added icon: ${iconName} with font: ${fontFamily}`);
    
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
      data: { iconName, success: false, error: error.message }
    });
  }
}

console.log('Material Symbols Plugin loaded successfully');