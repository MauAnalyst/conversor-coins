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
    
    //digitando no input
    valorInput.addEventListener("input", function(event) {
        const regex = /^[0-9.,]*$/;
        if (!event.data.match(regex)){
            return valorInput.value = '0,00';
            //console.log('caiu aq?')
        };

        let valorDigitado = valorInput.value.trim().replace(/[^0-9]/g, "");

        if (valorDigitado.startsWith("000", 0) || valorDigitado.length == 1) {
            digitoAnterior = event.data;
            return valorInput.value = "0,0" + event.data;

        } else if (valorDigitado.startsWith("00", 0)) {
            return valorInput.value = "0," + digitoAnterior + event.data; 
            
        } else {
            if (valorDigitado.length > 2) {
                valorDigitado = valorDigitado.replace(/^0+/, '');
            };
            
            let parteInteira = valorDigitado.slice(0, -2) || "0";
            let parteDecimal = valorDigitado.slice(-2);

            parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');  

            if (parteInteira.length < 2) {
                parteInteira = "" + parteInteira;
            };
            
            valorInput.value = parteInteira + "," + parteDecimal;
        };

        
    });

    //deletando input
    valorInput.addEventListener('keydown', function(e){
        //sconsole.log('asd')
        if (e.key === 'Delete') {
            valorInput.value = '0,00'
        } else if (e.key === 'Backspace') {
            let valorDigitado = valorInput.value.trim().replace(/[^0-9]/g, "");
            let ValorDigitadoAjuste = +valorDigitado;
            //console.log(ValorDigitadoAjuste.toString().slice(0,-1));

            if (valorDigitado.length === 3){
                valorInput.value = "0,0" + ValorDigitadoAjuste.toString().slice(0,-1);
            } else if(valorDigitado.length === 2){
                valorInput.value = "0," + ValorDigitadoAjuste.toString();
            };

        };
    });
    
};
