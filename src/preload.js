const { ipcRenderer, contextBridge} = require('electron')

contextBridge.exposeInMainWorld("electron", {
    btnClicked: async (data) => {
        console.log('click reqistered in pre.js')
        return await ipcRenderer.invoke('btn-handler', data)
    },
    getCabins: async (data) =>{
        console.log("pre")
        return await ipcRenderer.invoke("get-cabins-handler", data)
    }
})