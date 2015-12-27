// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import {
    app, BrowserWindow, globalShortcut
}
from 'electron';
import devHelper from './vendor/electron_boilerplate/dev_helper';
import windowStateKeeper from './vendor/electron_boilerplate/window_state';
const electron = require('electron');
const globalShortcut = electron.globalShortcut;
const ipcMain = require('electron').ipcMain;
// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

var mainWindow;

// Preserver of the window size and position between app launches.
var mainWindowState = windowStateKeeper('main', {
    width: 500,
    height: 350
});
app.on('ready', function() {

    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        'title-bar-style': 'hidden',
        'title': 'Pic.cm'
    });

    if (mainWindowState.isMaximized) {
        mainWindow.maximize();
    }

    if (env.name === 'test') {
        mainWindow.loadURL('file://' + __dirname + '/spec.html');
    } else {
        mainWindow.loadURL('file://' + __dirname + '/app.html');
    }

    if (env.name !== 'production') {
        devHelper.setDevMenu();
        mainWindow.openDevTools();
    }
    var settingsWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false
    });
    ipcMain.on('openSettings', function(event) {
        if (settingsWindow == null) {
            var settingsWindow = new BrowserWindow({
                width: 800,
                height: 600,
                show: false,
                'title-bar-style': 'hidden',
                //'frame': false,
                'title': 'Settings'
            });
        }
        //settingsWindow.loadUrl('file://' + __dirname + '/scripts/settings/settings.html');
        settingsWindow.loadURL('file://' + __dirname + '/scripts/settings/settings.html');
        settingsWindow.show();
        settingsWindow.openDevTools();
        //mainWindow.hide();

    });
    mainWindow.on('close', function() {
        mainWindowState.saveState(mainWindow);
    });

    settingsWindow.on('close', function() {
        mainWindowState.saveState(settingsWindow)
    });
    var ret = globalShortcut.register('f8', function() {
        app.quit();
    });
});

app.on('window-all-closed', function() {
    app.quit();
});
