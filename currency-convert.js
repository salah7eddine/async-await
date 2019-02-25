// USD, CAD, 20
// 20 USD is worth 26 CAD. You can spend these in the following countries: Canada 

// http://data.fixer.io/api/latest?access_key=9960e5e62da5a441a49701650f337007

const axios = require('axios');

// const getExchangeRate = (from, to) => {
//   return axios.get('http://data.fixer.io/api/latest?access_key=9960e5e62da5a441a49701650f337007').then((response) => {
//     const euro = 1 / response.data.rates[from];
//     const rate = euro * response.data.rates[to];
//     return rate;
//   });
// };


const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=9960e5e62da5a441a49701650f337007');
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];

    if (isNaN(rate)) {
      throw new Error();
    } 

    return rate;
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
  }
};

// const getCountries = (currencyCode) => {
//   return axios.get('https://restcountries.eu/rest/v2/currency/'+currencyCode).then((response) => {
//     return response.data.map((country) =>  country.name);
//   }); 
// };

const getCountries = async (currencyCode) => {
  //currencyCode = 'QQQ';
  try {
    const response = await axios.get('https://restcountries.eu/rest/v2/currency/'+currencyCode);
    return response.data.map((country) =>  country.name);
  } catch (e) {
    throw new Error(`Unable to get countries that use ${currencyCode}.`)
  }
};

// const convertCurrency = (from, to, amount) => {
//   let convertedAmount;
//   return getExchangeRate(from, to).then((rate) => {
//     convertedAmount = (amount * rate).toFixed(2);
//     return getCountries(to);
//   }).then((countries) => {
//     return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend these in the following countries: ${countries.join(', ')}`;
//   });
// };


// getExchangeRate('USD', 'CAD').then((rate) => {
//   console.log(rate);
// });

// getCountries('CAD').then((countries) => {
//   console.log(countries);
// });

const convertCurrency = async (from, to, amount) => {
  const rate = await getExchangeRate(from, to);
  const countries = await getCountries(to);
  const convertedAmount = (amount * rate).toFixed(2);
  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend these in the following countries: ${countries.join(', ')}`;
}

convertCurrency('USD', 'CAD', 20).then((message) => {
  console.log(message);
}).catch((e) => {
  console.log(e.message);
});

// const add = async (a, b) => a + b +c; 


// const doWork = async () => {
//   try {
//     const result = await add(12, 13);
//     return result;
//   } catch (e) {
//     return 10;
//   }
// };

// doWork().then((data) => {
//   console.log(data);
// }).catch((e) => {
//   console.log('Something went wrong');
// });