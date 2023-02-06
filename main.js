const { app, BrowserWindow, nativeTheme, ipcMain, dialog, shell, clipboard, Menu, Tray, Notification } = require('electron');
const { download } = require("electron-dl");
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
const isUserDeveloper = require('electron-is-dev');
const path = require('path');
const { setupTitlebar, attachTitlebarToWindow } = require('custom-electron-titlebar/main');
const MainMenuapp = require('./menu-config')
const appConfig = require('./config');

setupTitlebar();

let mainWindow
let updateMenuItem = null;
let updateMenu = null;

// Menu
let mainMenu = Menu.buildFromTemplate(MainMenuapp)

function createWindow() {
  mainWindow = new BrowserWindow({
    width: appConfig['width'],
    height: appConfig['height'],
    minWidth: appConfig['minWidth'],
    minHeight: appConfig['minHeight'],
    titleBarStyle: 'hidden',
    frame: false,
    icon: path.join(__dirname, '/public/assets/images', '/logo.png'),
    webPreferences: {
      sandbox: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  Menu.setApplicationMenu(mainMenu)

  loadWebContent()

  attachTitlebarToWindow(mainWindow);

  updateMenuItem = mainMenu.getMenuItemById('update-available');
  updateMenu = mainMenu.getMenuItemById('menu-texto');

  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('file://')) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  mainWindow.webContents.once('dom-ready', () => {
    autoUpdater.checkForUpdates()
  })
};

app.whenReady().then(createWindow)

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

function loadWebContent() {
  //Loading spalsh screen
  mainWindow.loadFile(path.join(__dirname, 'public/index.html'))

  //create webContants
  let wc = mainWindow.webContents

  //suessfull loding page afer dom created
  wc.once('did-finish-load', () => {
    mainWindow.loadFile(path.join(__dirname, 'public/index.html'))
  })
}

//Load menuItem local pages (About, Home page, etc)
module.exports = (pageId) => {
  if (pageId === 'home') {
    loadWebContent()
  } else {
    mainWindow.loadFile(path.join(__dirname, `public/${pageId}.html`))
  }
}

//update
autoUpdater.on('checking-for-update', () => {
  log.log("Checking for updates.")
})

autoUpdater.on('update-available', info => {
  log.log("Update available.")
  updateMenuItem.visible = true;
  updateMenu.visible = false;
})

autoUpdater.on('download-progress', progressObj => {
  log.log(`Downloading update. DL: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}%`)
  mainWindow.webContents.executeJavaScript(`Swal.fire({
        title: 'Baixando atualização',
        html: 'Speed: ${progressObj.bytesPerSecond} - ${~~progressObj.percent}% [${progressObj.transferred}/${progressObj.total}',
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        }
    });`)
})

autoUpdater.on('error', err => {
  log.log(`Update check failed: ${err.toString()}`)
})

autoUpdater.on('update-not-available', info => {
  log.log("Update not available.")
  updateMenuItem.visible = false;
  updateMenu.visible = true;
  mainWindow.webContents.executeJavaScript(`Swal.fire({
        title: 'Atualizações',
        html: 'Não há atualizações disponíveis.',
        icon: 'error'
    });`)
})

autoUpdater.on('update-downloaded', info => {
  mainWindow.webContents.executeJavaScript(`Swal.fire({
        title: 'Reiniciando o aplicativo',
        html: 'Aguente firme, reiniciando o aplicativo para atualização!',
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        }
    });`)
  autoUpdater.quitAndInstall();
})

//Protocol
app.setAsDefaultProtocolClient('ballebot')