/* eslint-disable global-require */
const dotenv = require('dotenv');
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');

const isMac = process.platform === 'darwin';
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

function buildMenu() {
  // See: https://www.electronjs.org/docs/latest/api/menu for details
  const menuTemplate = [
    {
      label: 'File',
      submenu: [
        isMac ? { role: 'close' } : { role: 'quit' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            // eslint-disable-next-line global-require
            const { shell } = require('electron');
            await shell.openExternal('https://github.com/stheisen/tyzen9-electron-react');
          },
        },
        { type: 'separator' },
        { role: 'toggleDevTools' },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
}

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

  // Build the custom menu to display
  buildMenu(mainWindow);

  // Automatically open the DevTools in development mode.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }

  // Confirm that the user wants to close the application
  mainWindow.on('close', function (e) {
    logger.verbose('Prompt the user if they are sure they want to exit.');
    const choice = require('electron').dialog.showMessageBox(
      this,
      {
        type: 'question',
        buttons: ['Yes', 'No'],
        title: 'Confirm',
        message: 'Are you sure you want to quit?',
      },
    );
    if (choice === 1) {
      e.preventDefault();
    }
  });
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
