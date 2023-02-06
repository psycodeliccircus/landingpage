// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { Titlebar, Color } = require('custom-electron-titlebar');
const path = require('path');

let titlebar;

window.addEventListener('DOMContentLoaded', () => {
  titlebar = new Titlebar({
    backgroundColor: Color.fromHex("#2F2325"),
    //itemBackgroundColor: Color.fromHex("#ffffff"),
    //svgColor: Color.WHITE,
    icon: path.join(__dirname, '/public/assets/images', '/logo.svg'),
    menuPosition: 'left',
    //menu: null // = do not automatically use Menu.applicationMenu
    menuTransparent: 60,
  })
})
