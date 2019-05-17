'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

const electron = require('electron')

// 退出
ipcMain.on('window-all-closed', () => {
  app.quit()
})
// 小化
ipcMain.on('hide-window', () => {
  mainWindow.minimize()
})
// 最大化
ipcMain.on('show-window', () => {
  mainWindow.maximize()
})
// 还原
ipcMain.on('orignal-window', () => {
  mainWindow.unmaximize()
})



ipcMain.on('auto_play', (event,arg) => {
  console.log(arg)
  mainWindow.webContents.send('auto_play1', arg)
})

//全局变量
/* global.sharedObject = {
  loc:''
} */


/* 隐藏菜单 */
const Menu = electron.Menu
function createWindow () {
  console.log('activate')
  /* 隐藏菜单 */
  Menu.setApplicationMenu(null)

  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 670,
    useContentSize: true,
    width: 1024,
    frame: false,
    // transparent: true,
    resizable: false
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  console.log('activate')
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
