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

contextBridge.exposeInMainWorld("devtronIPC", {
  getLogs: () => ipcLog,
  sendPing: () => ipcRenderer.send("ping", { msg: "Hello Main!" }),
});
