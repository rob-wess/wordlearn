const { app, BrowserWindow, screen } = require('electron');
var os = require ('os');

function createWindow (width, height) {
  const win = new BrowserWindow({
    width: width,
    height: height,
    transparent: true,
    frame: false,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
      enableRemoteModule: true
    }
  })

  win.loadFile('src/index.html')
  win.show()
  //win.webContents.openDevTools()
  win.setMenu(null)

  win.on('close', function() { //   <---- Catch close event

      // The dialog box below will open, instead of your app closing.
      require('dialog').showMessageBox({
          message: "Close button has been pressed!",
          buttons: ["OK"]
      });
  });


}

if (process.platform === 'linux') {
    app.commandLine.appendSwitch('enable-transparent-visuals');
    app.commandLine.appendSwitch('disable-gpu');
}


app.whenReady().then(() => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  console.log(width + "x" + height);
  createWindow(width, height);
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
