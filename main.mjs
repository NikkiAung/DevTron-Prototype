import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  // mainWindow.loadURL("http://localhost:5174/");
  mainWindow.loadFile(path.join(__dirname, "dist/index.html"));
}

app.whenReady().then(() => {
  createWindow();
  ipcMain.on("ping", (event, args) => {
    console.log("Received ping:", args);
    event.reply("pong", { msg: "Hey Renderer!" });
  });

  ipcMain.on("OK LAR", (event, args) => {
    console.log("Received ping:", args);
    event.reply("OK TAL", { msg: "OK TAL Renderer!" });
  });
});
