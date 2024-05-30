export default function ConsoleLogAPI() {
  const consoleLog = (...arg) => {
    if (chrome && chrome.runtime) {
      chrome.runtime.sendMessage(arg);
    } else {
      console.log(...arg);
    }
  };

  return {
    consoleLog,
  };
}
