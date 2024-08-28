chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, {action: "toggleSidebar"}).catch(error => {
      console.error("Error sending message:", error);
      // If the content script hasn't loaded yet, inject it
      if (error.message.includes("Could not establish connection")) {
        chrome.scripting.executeScript({
          target: {tabId: tab.id},
          files: ['content.js']
        }).then(() => {
          // Retry sending the message after injecting the script
          chrome.tabs.sendMessage(tab.id, {action: "toggleSidebar"});
        }).catch(injectionError => {
          console.error("Error injecting script:", injectionError);
        });
      }
    });
  });