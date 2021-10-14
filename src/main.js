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
  
  ipcMain.handle('btn-handler', async(event, data) => {
    try{
          const options = {      
          method: "POST",
                headers:{
            "Content-type":"application/json"
          },
          body:JSON.stringify({
            "email": "Janne@doe.com",
            "password": "Password1234"
            
          }),
          
        }
        const response = await fetch ('https://limitless-atoll-37666.herokuapp.com/users/login',options)
        const data = await response.json()
        console.log(data.JSON.stringify)
        
    }catch(error){console.log("atte e en fet hora!! (ERROR)",error.message)}
        
  })

  ipcMain.handle('get-cabins-handler', async(event, data) => {
    try{
      console.log("cabins-handler")
      const resp = await fetch('https://limitless-atoll-37666.herokuapp.com/cabins/owned', {
    
      headers: {'Authorization': 'Bearer ' + process.env.JWT },
      timeout: 6000 })

    cabins = await resp.json()
    
    return cabins
  }catch(error){
      console.log("atte e en fet hora!! (ERROR)")
    }
    
    
    
})
  
  


  app.on('ready' ,createWindow)
  

