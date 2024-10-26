document.addEventListener('DOMContentLoaded', () => {
    populateCurrencyOptions();
});

async function populateCurrencyOptions() {
    const currencySelects = [document.getElementById('fromCurrency'), document.getElementById('toCurrency')];
    const currencies = await getCurrencies();

    currencies.forEach(currency => {
        currencySelects.forEach(select => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            select.appendChild(option);
        });
    });
}

async function getCurrencies() {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    console.log(data);
    return Object.keys(data.rates);
}

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const result = document.getElementById('result');

    const rate = await getExchangeRate(fromCurrency, toCurrency);
    const convertedAmount = amount * rate;

    result.textContent = `${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(2)} ${toCurrency}`;
}

async function getExchangeRate(fromCurrency, toCurrency) {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
    return data.rates[toCurrency];
}