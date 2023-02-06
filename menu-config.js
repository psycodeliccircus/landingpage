const { app, ipcMain, shell } = require('electron');

module.exports = [
    {
        label: 'Menu',
        submenu: [
            {
                label: 'Home',
                click: () => { require('./main')("home") }
            },
            {
                label: 'Sobre',
                click: () => { require('./main')("sobre") }
            },
            {
                label: "Sair",
                click: () => app.quit()
            },
        ]
    },
    {
        label: 'Atualização',
        submenu: [
            {
                label: 'Verificar atualizações',
                click: () => {
                    autoUpdater.checkForUpdates()
                },
                id: 'update-available',
            },
            {
                label: 'Você já esta usando a versão ' + app.getVersion() + ' que e mais atualizada.',
                id: 'menu-texto',
                enabled: false,
            }
        ]
    },
]