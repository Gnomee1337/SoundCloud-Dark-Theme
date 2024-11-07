chrome.runtime.onInstalled.addListener(() => {
  // Ensure the dark theme is enabled by default
  chrome.storage.local.set({ darkThemeEnabled: true }); // Default is true
});
