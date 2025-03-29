const { contextBridge, ipcRenderer } = require("electron");

const ipcLog = [];

function track(channel, args, direction) {
  ipcLog.push({
    channel,
    data: JSON.stringify(args),
    direction,
    time: new Date().toISOString(),
  });
}

//IPC Custom Hooking Logic (via monkey patching ipcRenderer)
const originalSend = ipcRenderer.send;
ipcRenderer.send = function (channel, ...args) {
  track(channel, args, "sent");
  return originalSend.call(this, channel, ...args);
};

const originalOn = ipcRenderer.on;
ipcRenderer.on = function (channel, listener) {
  const wrappedListener = (event, ...args) => {
    track(channel, args, "received");
    listener(event, ...args);
  };
  return originalOn.call(this, channel, wrappedListener);
};

ipcRenderer.on("pong", (...data) => {
  // Just so we can track received 'pong' messages
  console.log("Renderer got pong:", data);
});

contextBridge.exposeInMainWorld("devtronIPC", {
  getLogs: () => ipcLog,
  clearLogs: () => ipcLog.splice(0, ipcLog.length),
  sendPing: () => ipcRenderer.send("ping", { msg: "Hello Main!" }),
});
