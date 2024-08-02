SearchData().then(dados => {
    console.log(dados)
    
    const ScreenCotacaoUSDBRL = document.querySelector('.container-cotacao .cx-cotacao .value-usdbrl');
    const ScreenCotacaoEURBRL = document.querySelector('.container-cotacao .cx-cotacao .value-eurbrl');
    const ScreenCotacaoBTCBRL = document.querySelector('.container-cotacao .cx-cotacao .value-btcbrl');

    ScreenCotacaoUSDBRL.textContent = FormataValor(+dados.USDBRL.ask);
    ScreenCotacaoEURBRL.textContent = FormataValor(+dados.EURBRL.ask);
    ScreenCotacaoBTCBRL.textContent = FormataValor(+dados.BTCBRL.ask);
})

// tratando o input
const inputValueCoin = document.querySelectorAll('.container-converter .cx-input .tag-input input[type="text"]');

inputValueCoin.forEach(element => {
    element.value = '0,00';
    UpInputNumber(element);
});
