//cotação hipotetica das moedas do dia
const USD = 4.87;
const EUR = 5.32;
const GBP = 6.08;

//obtendo elementos do form
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");
//manipulando o input amount para receber somente números
//quando entrar conteúdo no input, vai executar a função

amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharactersRegex, "");
});
//capturando o evento de submit do form
form.onsubmit = (event) => {
  event.preventDefault();

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$");
      break;
    case "EUR":
      convertCurrency(amount.value, EUR, "€");
      break;
    case "GBP":
      convertCurrency(amount.value, GBP, "£");
      break;
  }
};

function convertCurrency(amount, price, symbol) {
  try {
    //exibinddo a cotação da moeda selecionada
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

    //calcula o total
    // let total = String(amount * price).replace(".", ","); uma outra forma de formatar o valor

    let total = amount * price;
    //verifica se o resultado nao é um numero
    if (isNaN(total)) {
      return alert("Por favor, digite um valor correto");
    }
    //formatar o valor total
    total = formatCurrencyBRL(total).replace("RS", "");
    // ou

    //exibir o resultado total
    result.textContent = `${total} Reais`;

    //aplica a classe que exibe o footer para mostrar o resultado
    footer.classList.add("show-result");
  } catch (error) {
    //remove a classe do footer removendo ele
    footer.classList.remove("show-result");
    console.log(error);
    alert("Não foi possível converter. Tente novamente mais tarde.");
  }
}

//formata a moeda em real brasileiro
function formatCurrencyBRL(value) {
  //primeiro converte para numero para utilizar o tolocalestring para entao formatar no padrao BRL
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
