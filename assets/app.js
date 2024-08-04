//adiocionando dados iniciais
SearchData().then(dados => {
    console.log(dados)
    
    const ScreenCotacaoUSDBRL = document.querySelector('.container-cotacao .cx-cotacao .value-usdbrl');
    const ScreenCotacaoEURBRL = document.querySelector('.container-cotacao .cx-cotacao .value-eurbrl');
    const ScreenCotacaoBTCBRL = document.querySelector('.container-cotacao .cx-cotacao .value-btcbrl');

    ScreenCotacaoUSDBRL.textContent = FormataValor(+dados.USDBRL.ask);
    ScreenCotacaoEURBRL.textContent = FormataValor(+dados.EURBRL.ask);
    ScreenCotacaoBTCBRL.textContent = FormataValor(+dados.BTCBRL.ask);
});

//escolhendo a moeda base
SearchNameMoedas().then(e => {
    const dados = JSON.parse(JSON.stringify(Object.entries(e)));
    const OptionsCoinG = document.querySelector('.section-search .search .input-search ul');
    const SearchOption = document.querySelector('.section-search .search .input-search input[type="search"]');
    const buttoAdd = document.querySelector('.section-search .search .material-symbols-outlined');
    const CoinSelected = document.querySelector('.section-search .search .selected-coin span');

    ListaMoedas(); //adicionando a lista

    SearchOption.addEventListener('click', function(){
        OptionsCoinG.style.display = 'block';
    });

    document.addEventListener('click', function(element){
        if(!SearchOption.contains(element.target) && !OptionsCoinG.contains(element.target)){
            OptionsCoinG.style.display = 'none';
        }
    });

    SearchOption.addEventListener('input', function(event){ //pesquisando a moeda
        const inputValue = event.target.value;
        if(SearchOption.value === ''){
            OptionsCoinG.innerHTML = '';
            return ListaMoedas();
        }

        SearchCoin(removerAcentos(inputValue.toUpperCase()))
        SelectCoin();
        
    });

    buttoAdd.addEventListener('click', function(){
        CoinSelected.textContent = SearchOption.value;
        SearchOption.value = '';
        ListaMoedas();
    });


    //---------- FUNCTIONS PARA O INPUT SEARCH
    function ListaMoedas(){
        dados.forEach(element => { 
             OptionsCoinG.innerHTML += `<li>${element[0]} - ${element[1]}</li>`;
             return SelectCoin();
        });
    };

    function SelectCoin(){
        const OptionCoinG = document.querySelectorAll('.section-search .search .input-search ul li');
        OptionCoinG.forEach(element => {
            element.addEventListener('click', function(){
                SearchOption.value = element.textContent;
                OptionsCoinG.style.display = 'none';
                
            })
        });
    };

    function SearchCoin(value){
        OptionsCoinG.innerHTML = '';

        if (value.length === 1){
            dados.forEach(element => {
                if(element[0].startsWith(value,0) || removerAcentos(element[1]).toUpperCase().startsWith(value,0)){
                    //console.log(element)
                    return OptionsCoinG.innerHTML += `<li>${element[0]} - ${element[1]}</li>`;
                }
            });
        } else  if (value.length === 2){
        
            dados.forEach(element => {
                console.log(removerAcentos(element[1]) )
                if(element[0].startsWith(value,0) || removerAcentos(element[1]).toUpperCase().startsWith(value,0)){
                    
                    return OptionsCoinG.innerHTML += `<li>${element[0]} - ${element[1]}</li>`;
                }  
            });
        } else {
            dados.forEach(element => {
                if(element[0].startsWith(value,0) || removerAcentos(element[1]).toUpperCase().startsWith(value,0)){
                    //console.log(element[0])
                    return OptionsCoinG.innerHTML += `<li>${element[0]} - ${element[1]}</li>`;
                }
            });
        }

        if(OptionsCoinG.innerHTML === ''){
            return OptionsCoinG.innerHTML = `<li>Não encontrado</li>`;
        }
    };
    
});

// tratando o input
const inputValueCoin = document.querySelectorAll('.container-converter .cx-input .tag-input input[type="text"]');

inputValueCoin.forEach(element => {
    element.value = '0,00';
    UpInputNumber(element);
});
