// Material Symbols Plugin for Penpot
// Based on the working Icoonies plugin structure

// Initialize the plugin UI
penpot.ui.open("Material Symbols Plugin", "", {
  width: 500,
  height: 600,
});

// Listen for messages from the UI
penpot.ui.onMessage((message) => {
  if (message.type === 'add-icon') {
    const { iconName, size, weight, fill, color, style, lineHeight, fontSize } = message.data;
    addIconToCanvas(iconName, size, weight, fill, color, style, lineHeight, fontSize);
  }
});

// Function to add icon to canvas
function addIconToCanvas(iconName, size, weight, fill, color, style, lineHeight, fontSize) {
  try {
    console.log(`Attempting to add icon: ${iconName} with fill: ${fill}, style: ${style}, weight: ${weight}, lineHeight: ${lineHeight}`);
    
    // Check if there's a selected text element to replace
    const selection = penpot.selection;
    let textShape = null;
    let isReplacing = false;
    
    if (selection && selection.length > 0) {
      // Check if the selected element is a text element
      const selectedElement = selection[0];
      if (selectedElement && selectedElement.type === 'text') {
        console.log('Replacing existing text element');
        textShape = selectedElement;
        isReplacing = true;
        
        // Update the text content
        textShape.characters = iconName;
      }
    }
    
    // If no suitable element is selected, create a new one
    if (!textShape) {
      console.log('Creating new text element');
      textShape = penpot.createText(iconName);
      isReplacing = false;
    }
    
    if (!textShape) {
      console.error('Failed to create text shape');
      return;
    }
    
    // Set basic text properties
    textShape.fontSize = (fontSize || size).toString();
    textShape.fills = [{ fillColor: color, fillOpacity: 1 }];
    
    // Set line height to match font size for perfect square
    try {
      if (textShape.lineHeight !== undefined && lineHeight !== undefined) {
        textShape.lineHeight = lineHeight.toString();
        console.log(`Set lineHeight to: ${lineHeight}`);
      }
    } catch (lineHeightError) {
      console.log(`Could not set lineHeight:`, lineHeightError.message);
    }
    
    // Use the correct Material Symbols fonts with proper naming
    let fontFamily;
    
    if (style === 'rounded') {
      fontFamily = 'Material Symbols Rounded';
    } else if (style === 'sharp') {
      fontFamily = 'Material Symbols Sharp';
    } else {
      fontFamily = 'Material Symbols Outlined';
    }
    
    textShape.fontFamily = fontFamily;
    
    console.log(`Using font family: ${fontFamily} for fill: ${fill}, style: ${style}`);
    
    // Try to set font weight
    try {
      if (textShape.fontWeight !== undefined) {
        textShape.fontWeight = weight.toString();
        console.log(`Set fontWeight to: ${weight}`);
      }
    } catch (weightError) {
      console.log(`Could not set fontWeight:`, weightError.message);
    }
    
    // Try to apply font variation settings for Material Symbols
    try {
      // Material Symbols fonts support font-variation-settings
      const fontVariationSettings = `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${size}`;
      
      // Try different ways to set font variation settings
      if (textShape.fontVariationSettings !== undefined) {
        textShape.fontVariationSettings = fontVariationSettings;
        console.log(`Set fontVariationSettings to: ${fontVariationSettings}`);
      } else if (textShape.style !== undefined) {
        textShape.style = textShape.style || {};
        textShape.style.fontVariationSettings = fontVariationSettings;
        console.log(`Set style.fontVariationSettings to: ${fontVariationSettings}`);
      }
      
    } catch (variationError) {
      console.log(`Could not set font variation settings:`, variationError.message);
    }
    
    // Position the text (only if creating new, keep position if replacing)
    if (!isReplacing) {
      try {
        const viewport = penpot.viewport;
        textShape.x = viewport.center.x - size / 2;
        textShape.y = viewport.center.y - size / 2;
      } catch (positionError) {
        console.warn('Could not position text:', positionError);
        textShape.x = 100;
        textShape.y = 100;
      }
    }
    
    // Select the newly created shape
    penpot.selection = [textShape];
    
    const actionText = isReplacing ? 'replaced' : 'added';
    console.log(`Successfully ${actionText} icon: ${iconName} as text with font family: ${fontFamily}`);
    
    // Send success message back to UI
    penpot.ui.sendMessage({
      type: 'icon-added',
      data: { iconName, success: true, replaced: isReplacing }
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
    
    // Apply font variation settings for fill and weight
    try {
      const fontVariationSettings = `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${size}`;
      if (textShape.fontVariationSettings !== undefined) {
        textShape.fontVariationSettings = fontVariationSettings;
      } else if (textShape.style !== undefined) {
        textShape.style = textShape.style || {};
        textShape.style.fontVariationSettings = fontVariationSettings;
      }
    } catch (error) {
      console.log(`Could not set font variation settings in fallback:`, error.message);
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