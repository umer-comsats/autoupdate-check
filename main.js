const { app, BrowserWindow, ipcMain } = require('electron')
const { autoUpdater, AppUpdater } = require("electron-updater");

let mainWindow;

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true,
          contextIsolation: false,
        },
        show: true
    })
  
    mainWindow.loadFile('index.html')
  }

  app.whenReady().then(() => {
    createWindow();
    autoUpdater.checkForUpdates();
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  ipcMain.on("app:getVersion", () => {
    mainWindow.webContents.send("app:setVersion", app.getVersion());
  });

  autoUpdater.on('update-available', () => {
    mainWindow.webContents.send("app:updateAvailable");
    autoUpdater.downloadUpdate();
  });

  autoUpdater.on("update-not-available", () => {
    mainWindow.webContents.send("app:updateNotAvailable");
  })