const color = "#3aa757";

chrome.runtime.onInstalled.addListener(() => {
  console.log("chrome", chrome);
  // console.log("chrome", chrome.action.getTitle());
  // chrome.storage.sync.set({ color });
  // console.log('Default background color set to %cgreen', `color: #3aa757`);
});

function onMessageListener(message) {
  if (message && typeof message[Symbol.iterator] === "function") {
    console.log(...message);
  } else {
    console.log(message);
  }
}

chrome.runtime.onMessage.addListener(onMessageListener);

async function getTabId() {
  const [TAB] = await chrome.tabs.query({ active: true, currentWindow: true });
  return TAB.id;
}

function consoleTab(...arg) {
  console.log(...arg);
}

// const [TAB] = await chrome.tabs.query({ active: true, currentWindow: true });
//

