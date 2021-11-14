'use strict'

import {
  app,
  protocol,
  BrowserWindow
} from 'electron'
import {
  createProtocol
} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {
  VUEJS_DEVTOOLS
} from 'electron-devtools-installer'

import './core'

const isDevelopment = process.env.NODE_ENV !== 'production'

let window

protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true
  }
}])

function createWindow() {
  window = new BrowserWindow({
    backgroundColor: '#fff',
    width: 800,
    height: 570,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  window.setMenuBarVisibility(false)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    window.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
  } else {
    createProtocol('app')
    window.loadURL('app://./index.html')
  }

  window.webContents.on('did-finish-load', () => {
    const {
      title,
      version
    } = require('../package.json')
    window.setTitle(`${title} :: ${version}`)

    console.log('Loaded successfully.')
  })

  window.on('closed', () => {
    window = null
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (window === null) {
    createWindow()
  }
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}