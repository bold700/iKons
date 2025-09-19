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
    const { iconName, size, weight, fill, color, style } = message.data;
    addIconToCanvas(iconName, size, weight, fill, color, style);
  }
});

// Function to add icon to canvas
function addIconToCanvas(iconName, size, weight, fill, color, style) {
  try {
    console.log(`Attempting to add icon: ${iconName} with fill: ${fill}, style: ${style}, weight: ${weight}`);
    
    // Use text-based approach with CSS styling
    // Create a text shape with the icon
    const textShape = penpot.createText(iconName);
    
    if (!textShape) {
      console.error('Failed to create text shape');
      return;
    }
    
    // Set basic text properties
    textShape.fontSize = size.toString();
    textShape.fills = [{ fillColor: color, fillOpacity: 1 }];
    
    // Use older Material Icons fonts that have separate filled/outlined variants
    let fontFamily;
    
    if (fill === 1) {
      // For filled icons, use the base Material Icons font (which is filled by default)
      if (style === 'rounded') {
        fontFamily = 'Material Icons Round';
      } else if (style === 'sharp') {
        fontFamily = 'Material Icons Sharp';
      } else {
        fontFamily = 'Material Icons'; // Base Material Icons is filled
      }
    } else {
      // For outlined icons, use the outlined variants
      if (style === 'rounded') {
        fontFamily = 'Material Icons Round';
      } else if (style === 'sharp') {
        fontFamily = 'Material Icons Sharp';
      } else {
        fontFamily = 'Material Icons Outlined';
      }
    }
    
    textShape.fontFamily = fontFamily;
    
    console.log(`Using font family: ${fontFamily} for fill: ${fill}, style: ${style}`);
    
    // Debug: Log available properties
    logTextShapeProperties(textShape);
    
    // Try to apply font variation settings using different methods
    console.log(`Applying font variation settings for fill: ${fill}, weight: ${weight}`);
    
    // With older Material Icons fonts, we don't need font variation settings
    // The fill is controlled by using different font families
    console.log(`Using older Material Icons approach - no font variation settings needed`);
    
    // Try to set font weight if available (though it may not work with older fonts)
    try {
      if (textShape.fontWeight !== undefined) {
        textShape.fontWeight = weight.toString();
        console.log(`Set fontWeight to: ${weight}`);
      }
    } catch (weightError) {
      console.log(`Could not set fontWeight:`, weightError.message);
    }
    
    // Position the text in the center of the viewport
    try {
      const viewport = penpot.viewport;
      textShape.x = viewport.center.x - size / 2;
      textShape.y = viewport.center.y - size / 2;
    } catch (positionError) {
      console.warn('Could not position text:', positionError);
      textShape.x = 100;
      textShape.y = 100;
    }
    
    // Select the newly created shape
    penpot.selection = [textShape];
    
    console.log(`Successfully added icon: ${iconName} as text with font family: ${fontFamily}`);
    
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

// Fallback function for text-based approach
function addIconAsText(iconName, size, weight, fill, color, style) {
  try {
    console.log(`Fallback: Adding icon as text: ${iconName}`);
    
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
    const fontFamily = style === 'rounded' ? 'Material Symbols Rounded' : 
                      style === 'sharp' ? 'Material Symbols Sharp' : 
                      'Material Symbols Outlined';
    textShape.fontFamily = fontFamily;
    
    // Position the text in the center of the viewport
    try {
      const viewport = penpot.viewport;
      textShape.x = viewport.center.x - size / 2;
      textShape.y = viewport.center.y - size / 2;
    } catch (positionError) {
      console.warn('Could not position text:', positionError);
      textShape.x = 100;
      textShape.y = 100;
    }
    
    // Select the newly created shape
    penpot.selection = [textShape];
    
    console.log(`Successfully added icon as text: ${iconName}`);
    
    // Send success message back to UI
    penpot.ui.sendMessage({
      type: 'icon-added',
      data: { iconName, success: true }
    });
    
  } catch (error) {
    console.error('Error adding icon as text:', error);
    
    // Send error message back to UI
                penpot.ui.sendMessage({
      type: 'icon-added',
      data: { iconName, success: false, error: String(error) }
    });
  }
}

// Function to log available textShape properties for debugging
function logTextShapeProperties(textShape) {
  console.log('Available textShape properties:', Object.getOwnPropertyNames(textShape));
  console.log('textShape prototype:', Object.getOwnPropertyNames(Object.getPrototypeOf(textShape)));
}

// Send initial message to UI when plugin loads
penpot.ui.sendMessage({
  type: 'plugin-ready'
});