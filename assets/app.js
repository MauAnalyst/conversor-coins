SearchData().then(dados => {
    console.log(dados)
})

// tratando o input
const inputValueCoin = document.querySelectorAll('.container-converter .cx-input .tag-input input[type="text"]');

inputValueCoin.forEach(element => {
    //element.value = '0,00';
    UpInputNumber(element);
});
