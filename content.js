// Function to fetch color values from stylesheets
async function getColorValues() {
    const styleSheets = document.styleSheets;
    let colorValues = [];
  
    for (const styleSheet of styleSheets) {
      if (styleSheet.href) {
        try {
          const response = await fetch(styleSheet.href);
          const cssText = await response.text();
          const colors = cssText.match(/#[a-fA-F0-9]{3,6}/g);
          if (colors) {
            colorValues = [...colorValues, ...colors];
          }
        } catch (error) {
          console.error(`Error fetching external stylesheet: ${styleSheet.href}`, error);
        }
      } else {
        const rules = styleSheet.rules || styleSheet.cssRules;
        if (rules) {
          for (const rule of rules) {
            if (rule.style) {
              const ruleColors = rule.style.color.match(/#[a-fA-F0-9]{3,6}/g);
              if (ruleColors) {
                colorValues = [...colorValues, ...ruleColors];
              }
            }
          }
        }
      }
    }
  
    return colorValues;
  }
  
  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "getColorValues") {
      getColorValues().then(colors => sendResponse({ colors }));
      return true; // Required to indicate that sendResponse will be called asynchronously
    }
  });
  