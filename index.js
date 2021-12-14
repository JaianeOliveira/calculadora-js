/*
Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
As regras são:
X Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
diretamente;
X O input deve iniciar com valor zero; 
X Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
X Deve haver 4 botões para as operações principais: soma (+), subtração(-),
multiplicação(x) e divisão(÷);
X Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
que irá limpar o input, deixando-o com valor 0;
X A cada número pressionado, o input deve atualizar concatenando cada valor
digitado, como em uma calculadora real;
X Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
operação no input. Se o último caractere no input já for um símbolo de alguma
operação, esse caractere deve ser substituído pelo último pressionado.
Exemplo:
X Se o input tem os valores: "1+2+", e for pressionado o botão de
multiplicação (x), então no input deve aparecer "1+2x".
X Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
input;
X Ao pressionar o botão "CE", o input deve ficar zerado.
*/


(function () {
    'use strict';

    let $input = document.querySelector('[data-js="resultado"]');
    let $button = document.querySelectorAll('.btnNumber');
    let $btnClear = document.querySelector('[data-js="clear"]');
    let $btnOperator = document.querySelectorAll('[class="operator"]');
    let $btnEqual = document.querySelector('[data-js="equal"]');

    function btnClick() {
        if ($input.value[$input.value.length - 1].match(/[\/*\+-]/g) && this.value.match(/[\/*\+-]/g)) {
            let arr = $input.value;
            arr = arr.substring(0, arr.length - 1).concat(this.value);
            $input.value = arr;
        }
        else if ($input.value === '0' && !this.value.match(/[\/*\+-]/g)) {
            $input.value = this.value;
        }
        else {
            $input.value += this.value;
        }
    }

    function result() {
        let num = $input.value.match(/(\d+)/g).map(function (item) {
            return +item;
        });
        let op = $input.value.match(/[\/*\+-]/g);
        let res = num.reduce(function (acc, item, index) {
            switch (op[index - 1]) {
                case '+':
                    return acc + item;
                case '-':
                    return acc - item;
                case '*':
                    return acc * item;
                case '/':
                    return acc / item;
                default:
                    return acc;
            }
        })
        $input.value = res;
    }

    $btnEqual.addEventListener('click', result, false);

    $btnClear.addEventListener('click', function () {
        $input.value = 0;
    });
    Array.prototype.forEach.call($btnOperator, function (button) {
        button.addEventListener('click', btnClick, false);
    })
    Array.prototype.forEach.call($button, function (button) {
        button.addEventListener('click', btnClick, false);
    });


})();