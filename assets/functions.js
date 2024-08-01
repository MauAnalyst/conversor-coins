//busca dados da api
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

//deixa o input melhor
function UpInputNumber(valorInput){
    valorInput.addEventListener("input", function(event) {
        var valorDigitado = valorInput.value.trim().replace(/[^0-9]/g, "");

        console.log(`0,0${valorDigitado}`)

        if (valorDigitado.length == 1 && valorDigitado == '0,0') {
            valorInput.value = "0,0" + valorDigitado;
            
        } else if (valorDigitado.length == 2 && valorDigitado == '0,') {
            valorInput.value = "0," + valorDigitado; 
            
        } else {
            if (valorDigitado.length > 2) {
                valorDigitado = valorDigitado.replace(/^0+/, '');
            }
            
            let parteInteira = valorDigitado.slice(0, -2) || "0";
            let parteDecimal = valorDigitado.slice(-2);

            parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');  

            if (parteInteira.length < 2) {
                parteInteira = "" + parteInteira;
            }
            
            valorInput.value = parteInteira + "," + parteDecimal;

            if( valorInput.value === '0,00'){
                valorInput.value = '';
            }
        }
    });
}