import * as path from "path";
import * as url from "url";
import { app, BrowserWindow, screen, Menu, dialog } from "electron";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win : BrowserWindow;

const production: boolean = (process.env.NODE_ENV || "production") === "production";

if (!production) {
	require("electron-reload")(__dirname);
}

function launch() {

	const { width, height } = screen.getPrimaryDisplay().workAreaSize;

	win = new BrowserWindow({
		width: width,
		height: height,
		minWidth: 600,
		backgroundColor: "white",
		titleBarStyle: "hidden",
		webPreferences: {
			nodeIntegration: true,
		},
	});

	win.loadURL(
		url.format({
			pathname: path.join(__dirname, "../index.html"),
			protocol: "file:",
			slashes: true,
		})
	);

	win.on("closed", function () {
		win = null;
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", launch);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		launch();
	}
});


 
const menu = Menu.buildFromTemplate([
	{
	   label: 'File',
	   submenu: [
			{
				label: 'Add folder root',
				accelerator: 'CmdOrCtrl+O',
				click() {
					dialog.showOpenDialog(win,
						{
							title: "Abrir carpeta",
							properties: ["openDirectory"],
						})
						.then(function(result) {
							if (result.canceled) { return; }
							win.webContents.send('folderPath', result.filePaths)
						}).catch(function(e) {
							console.log(e);
						})
				}
			},
			{
				role: 'quit'
			},
	   ]
	},
	
	{
	   label: 'View',
	   submenu: [
			{
				role: 'reload'
			},
			{
				role: 'toggleDevTools'
			},
			{
				type: 'separator'
			},
			{
				role: 'togglefullscreen'
			}
	   ]
	},
	
	{
	   role: 'help',
	   submenu: [
			{
				label: 'Learn More'
			}
	   ]
	}
])


Menu.setApplicationMenu(menu)