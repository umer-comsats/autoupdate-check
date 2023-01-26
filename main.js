const { app, BrowserWindow, ipcMain } = require('electron')

let mainWindow;

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
    createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  ipcMain.on("app:getVersion", () => {
    mainWindow.webContents.send("app:setVersion", app.getVersion());
  });