document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle-dark-theme");

  // Check if Dark Theme is enabled in Chrome storage
  chrome.storage.local.get("darkThemeEnabled", (data) => {
    const isDarkThemeEnabled = data.darkThemeEnabled === true;
    toggleButton.textContent = isDarkThemeEnabled
      ? "Disable Dark Theme"
      : "Enable Dark Theme";
  });

  toggleButton.addEventListener("click", () => {
    chrome.storage.local.get("darkThemeEnabled", (data) => {
      const newStatus = !(data.darkThemeEnabled === true);
      chrome.storage.local.set({ darkThemeEnabled: newStatus });

      toggleButton.textContent = newStatus
        ? "Disable Dark Theme"
        : "Enable Dark Theme";

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // Use chrome.scripting.executeScript to send the message to content.js
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: () => {
            // Send the message to toggle dark theme in the content script
            chrome.runtime.sendMessage({ type: "toggle-dark-theme" });
          },
        });
      });
    });
  });
});
