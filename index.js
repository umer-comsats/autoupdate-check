const {app, BrowserWindow} = require('electron');
const {autoUpdater} = require('electron-updater');
const log = require('electron-log');

log.info("Application version"+app.getVersion());
let win;

function createWindow() {
    win = new BrowserWindow({width: 800, height: 600});
    win.loadURL(`file://${__dirname}/index.html`);
}

app.on('ready', () => {
    createWindow();

    autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on('update-available', () => {
    log.info('update-available');
    autoUpdater.downloadUpdate();
});

autoUpdater.on('checking-for-update', () => {
    log.info('checking-for-update');
});

autoUpdater.on('download-progress', (progress) => {
    log.info('download-progress');
    log.info(progress);
})

autoUpdater.on('error', (message) => {
    log.info('error');
    log.info(typeof message);
    log.info(message);
})

autoUpdater.on('update-downloaded', () => {
    log.info('update-downloaded');
})