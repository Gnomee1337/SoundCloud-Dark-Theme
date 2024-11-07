let isDarkThemeEnabled = false;

const injectDarkThemeCSS = () => {
  console.log("Injecting dark theme");
  const darkThemeCSS = document.createElement("link");
  darkThemeCSS.rel = "stylesheet";
  darkThemeCSS.href = chrome.runtime.getURL("css/dark-theme.css");
  darkThemeCSS.id = "dark-theme-stylesheet";
  document.head.appendChild(darkThemeCSS);
  console.log("Injected dark theme CSS");
};

const removeDarkThemeCSS = () => {
  const darkThemeCSS = document.getElementById("dark-theme-stylesheet");
  if (darkThemeCSS) {
    console.log("Removing dark theme");
    document.head.removeChild(darkThemeCSS);
  }
};

const applyDarkTheme = () => {
  if (isDarkThemeEnabled) {
    if (!document.getElementById("dark-theme-stylesheet")) {
      console.log("Lets inject dark theme");
      injectDarkThemeCSS();
    }
  } else {
    console.log("Let's remove dark theme");
    removeDarkThemeCSS();
  }
};

// Retrieve the dark theme status from chrome storage
chrome.storage.local.get("darkThemeEnabled", (data) => {
  isDarkThemeEnabled = data.darkThemeEnabled === true;
  applyDarkTheme();
});

// Listen for any changes to dark theme settings from the popup
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "toggle-dark-theme") {
    // Toggle dark theme logic here
    isDarkThemeEnabled = !isDarkThemeEnabled;
    chrome.storage.local.set({ darkThemeEnabled: isDarkThemeEnabled });
    applyDarkTheme();
  }
});
