


document.querySelector('#btn').addEventListener('click', async () =>{

    console.log('clicked');

    const reply = await window.electron.btnClicked("hello from browser");
    console.log(reply);

});

const getCabins = async () => {
    console.log("getcABINS ")

    const cabins = await window.electron.getCabins()

    cabins.forEach(element => {
        document.querySelector('#cabins').innerHTML += `<div>${element.address}</div>`;
    });
}