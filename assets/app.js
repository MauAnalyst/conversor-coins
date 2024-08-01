const APIkey = 'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL';

async function SearchData(){
    try {
        const response = await fetch(APIkey);
        const data = await response.json();
        //console.log(data.value)
        return data;
    }catch (error) {
        console.error('Erro ao carregar dados:', error);
        return [];
    }
}


SearchData().then(dados => {
    console.log(dados)
})
