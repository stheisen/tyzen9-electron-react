const dotenv = require('dotenv');
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const port = 3000; // Hardcoded; needs to match webpack.dev.js
const selfHost = `http://localhost:${port}`;

// Determine if we are in development, or running the packaged application
let environment;
if (app.isPackaged) environment = 'pkg'; else environment = 'dev';

// Now load the proper environment variables
dotenv.config({
  path: path.resolve(__dirname, 'env/', `.env.${environment}`),
});

// we need to initialize the logger after we have set the environment
const logger = require('./logger');

logger.verbose(`Boilerplate is started in mode: ${process.env.NODE_ENV}`);
logger.verbose(`User Data Directory: ${app.getPath('userData')}`);

// Create the native browser window.
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'browser_preload.js'),
    },
    // Set the path of an additional "preload" script that can be used to
    // communicate between node-land and browser-land.
    // webPreferences: {
    //   preload: path.join(__dirname, "preload.js"),
    // },
  });

  // In production, set the initial browser path to the local webpack bundle
  // In development, set it to localhost to allow live/hot-reloading.
  const appURL = app.isPackaged
    ? url.format({
      pathname: path.join(__dirname, '../../build/index.html'),
      protocol: 'file:',
      slashes: true,
    })
    : selfHost;

  // Load the content into the created window
  mainWindow.loadURL(appURL);

  // Automatically open the DevTools in development mode.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
}

// This method will be called when Electron has finished its initialization and
// is ready to create the browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  logger.info(' -------------  Tyzen9 Boilerplate has started ------------- ');
  createWindow();
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS.
// There, it's common for applications and their menu bar to stay active until
// the user quits  explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
