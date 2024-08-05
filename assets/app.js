SearchData().then(dados => {
    let array = JSON.stringify(Object.keys(dados))
    let array2 = JSON.parse(JSON.stringify(Object.entries(dados)))

    //console.log(JSON.parse(array))
   
    const ScreenCotacaoUSDBRL = document.querySelector('.container-cotacao .cx-cotacao .value-usdbrl');
    const ScreenCotacaoEURBRL = document.querySelector('.container-cotacao .cx-cotacao .value-eurbrl');
    const ScreenCotacaoGBPBRL = document.querySelector('.container-cotacao .cx-cotacao .value-gbpbrl');
    const ScreenCotacaoBTCBRL = document.querySelector('.container-cotacao .cx-cotacao .value-btcbrl');


    ScreenCotacaoUSDBRL.textContent = FormataValor(+dados.USDBRL.ask);
    ScreenCotacaoEURBRL.textContent = FormataValor(+dados.EURBRL.ask);
    ScreenCotacaoGBPBRL.textContent = FormataValor(+dados.GBPBRL.ask);
    ScreenCotacaoBTCBRL.textContent = FormataValor(+dados.BTCBRL.ask);


});

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
            SearchOption.style.border = '';
            //ListaMoedas();
        }
    });

    SearchOption.addEventListener('input', function(event){ //pesquisando a moeda
        const inputValue = event.target.value;
        if(SearchOption.value === ''){
            OptionsCoinG.innerHTML = '';
            return ListaMoedas();
        }

        SearchOption.style.border = '';
        //SearchOption.style.borderRadius = '15px 15px 0 0';
        SearchCoin(removerAcentos(inputValue.toUpperCase()));
        SelectCoin();
        
    });

    buttoAdd.addEventListener('click', function(){
        IncluiCoin();
        //SearchOption.style.borderRadius = '15px';
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            IncluiCoin();
            OptionsCoinG.style.display = 'none';
            //SearchOption.style.borderRadius = '15px';
        }
    });
    


    //---------- FUNCTIONS PARA O INPUT SEARCH
    function ListaMoedas(){
        dados.forEach(element => { 
             OptionsCoinG.innerHTML += `<li>${element[0]} - ${element[1]}</li>`;
             return SelectCoin();
        });
    };

    function SelectCoin(){
        let OptionCoinG = document.querySelectorAll('.section-search .search .input-search ul li');
        OptionCoinG.forEach(element => {
            element.addEventListener('click', function(){
                SearchOption.value = element.textContent;
                OptionCoinG.textContent = element.textContent;
                OptionsCoinG.style.display = 'none';
                
            });
        });
    };

    function SearchCoin(value){
        OptionsCoinG.innerHTML = '';
        OptionsCoinG.style.display = 'block';

        switch (value.length) {
            case 1:
                dados.forEach(element => {
                    if(element[0].startsWith(value,0) || removerAcentos(element[1]).toUpperCase().startsWith(value,0)){
                        //console.log(element)
                        return OptionsCoinG.innerHTML += `<li>${element[0]} - ${element[1]}</li>`;
                    }
                });
                break;
            
            case 2:
                dados.forEach(element => {
                    //console.log(removerAcentos(element[1]))
                    let check = `${element[0]} - ${element[1]}`
                    console.log(check.toUpperCase().includes(value));
                    if(element[0].startsWith(value,0) || removerAcentos(element[1]).toUpperCase().startsWith(value,0) || check.toUpperCase().includes(value)){
                        
                        return OptionsCoinG.innerHTML += `<li>${element[0]} - ${element[1]}</li>`;
                    }  
                });
                break;
                
            default:
                dados.forEach(element => {
                    let check = `${element[0]} - ${element[1]}`
                    if(element[0].startsWith(value,0) || removerAcentos(element[1]).toUpperCase().startsWith(value,0) || check.toUpperCase().includes(value)){
                        //console.log(element[0])
                        return OptionsCoinG.innerHTML += `<li>${element[0]} - ${element[1]}</li>`;
                    }
                });
                break;
        };

        if(OptionsCoinG.innerHTML === ''){
            return OptionsCoinG.innerHTML = `<li>Não encontrado</li>`;
        };
    };

    //function seleciona e valida a moeda
    function IncluiCoin(){
        let OptionCoinG = document.querySelectorAll('.section-search .search .input-search ul li');
        
        if(SearchOption.value === '' || OptionsCoinG.textContent === 'Não encontrado'){
            //console.log(SearchOption.value.length, OptionCoinG.length)
            SearchOption.style.border = '2px solid red';
            SearchOption.value = '';

        } else {     
            if(SearchOption.value.length < 2 && OptionCoinG.length !== 1){
                CoinSelected.textContent = OptionCoinG[0].textContent;
                SearchOption.value = '';
            }
            else if(OptionCoinG.length > 1){
                OptionCoinG.forEach(element => {
                    let inputValue = SearchOption.value;
                    let checkOptions = removerAcentos(element.textContent).toUpperCase().split(" ");
                    //console.log(checkOptions)

                    for (let index = 0; index < checkOptions.length; index++) {
                        const elem = checkOptions[index];
                        if(elem == inputValue.toUpperCase()){
                            CoinSelected.textContent = element.textContent;
                            SearchOption.value = '';
                        }
                    };            

                    if(element.textContent === inputValue){
                        CoinSelected.textContent = element.textContent;
                        SearchOption.value = '';

                    } else {
                        CoinSelected.textContent = OptionCoinG[0].textContent;
                        SearchOption.value = '';
                        //console.log(OptionCoinG[0].textContent)
                    }
                });

            } else {
                OptionCoinG.forEach(element => {
                    CoinSelected.textContent = element.textContent;
                    SearchOption.value = '';

                });
                
            };
            
            
        };

        ListaMoedas(); //lista as moedas após incluir a moeda
    };
    
});

// tratando o input
const inputValueCoin = document.querySelectorAll('.container-converter .cx-input .tag-input input[type="text"]');

inputValueCoin.forEach(element => {
    element.value = '0,00';
    UpInputNumber(element);
});
