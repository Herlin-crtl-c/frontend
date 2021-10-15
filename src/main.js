require('dotenv').config()
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fetch = require('electron-fetch').default

function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences:{
          preload: path.join(__dirname, 'preload.js')
      },
      autoHideMenuBar: true //open with ALT
    })
  
    win.loadFile(path.join(__dirname, 'index.html'))

    win.webContents.openDevTools()
    
  }
  
  ipcMain.handle('get-cabins-handler', async(event, data) => {
    try{
      
      const resp = await fetch('https://limitless-atoll-37666.herokuapp.com/cabins/owned', {
    
      headers: {'Authorization': 'Bearer ' + process.env.JWT },
      timeout: 6000 })

    cabins = await resp.json()
    
    return cabins
  }catch(error){
      console.log(error.message)
    }
    
})
ipcMain.handle('get-orders-handler', async(event, data) => {
  try{
 
    const response = await fetch('https://secret-shelf-13108.herokuapp.com/orders', {
  
    headers: {'Authorization': 'Bearer ' + process.env.JWT}, 
    timeout: 6000 })
    
    orders = await response.json()
    console.log(orders)
    return orders
  }catch(error){
    console.log(error.message)
  }
  
})
ipcMain.handle('get-services-handler', async(event, data) => {
  try{
    
    const response = await fetch('https://secret-shelf-13108.herokuapp.com/services', {
  
    headers: {'Authorization': 'Bearer ' + process.env.JWT}, 
    timeout: 6000 })
    
  services = await response.json()
  console.log(services)
  return services
}catch(error){
    console.log(error.message)
  }
  
})
  
  app.on('ready' ,createWindow)
  

