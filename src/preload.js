const { ipcRenderer, contextBridge} = require('electron')

contextBridge.exposeInMainWorld("electron", {
    btnClicked: async (data) => {
        
        return await ipcRenderer.invoke('btn-handler', data)
    },
    getCabins: async (data) =>{
        
        return await ipcRenderer.invoke("get-cabins-handler", data)
    },
    getOrders: async (data) =>{
        
        return await ipcRenderer.invoke("get-orders-handler", data)
    },
    getServices: async (data) =>{
        
        return await ipcRenderer.invoke("get-services-handler", data)
    }
})