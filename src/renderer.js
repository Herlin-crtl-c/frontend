
const getCabins = async () => {
   
    const cabins = await window.electron.getCabins()

    cabins.forEach(element => {
        document.querySelector('#cabins').innerHTML += `<div>${element.address}</div>`;
    });
}
const getOrders = async () => {
    
    const orders = await window.electron.getOrders()

    orders.forEach(element => {
        document.querySelector('#orders').innerHTML += `<div>${element.Service} + ${element.Date}</div>`;
    });
}
const getServices = async () => {
    
    const services = await window.electron.getServices()

    services.forEach(element => {
        document.querySelector('#services').innerHTML += `<div>${element.service}</div>`;
    });
}