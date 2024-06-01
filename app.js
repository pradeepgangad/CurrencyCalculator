const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const inputAmount = document.querySelector("#amount"); 
const fromCurrency = document.querySelector("#from");
const toCurrency = document.querySelector("#to");
const msg = document.querySelector(".msg p");
const reverseCurr = document.querySelector(".reverse-exchange i")

window.addEventListener("load", () => {
  updateExchangeRate();
})


for(let select of dropdowns){
  for(let currCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.id === "from" && currCode === "USD"){
      newOption.selected = "selected";
    }else if(select.id === "to" && currCode === "INR"){
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (event)=> {
    updateFlag(event.target);
  })
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  let img = element.parentElement.querySelector('img');
  img.src = newSrc;
}

btn.addEventListener("click",  (event) => {
  event.preventDefault();
  updateExchangeRate();  
})

const updateExchangeRate = async() => {
  let amountValue = inputAmount.value;
  if(amountValue === "" || amountValue < 1){
    msg.innerText = "Please enter a valid amount";
    /*alert("Please enter a valid amount");*/
  }    
  else{
  const URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}.json`
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
  
  let finalExchange = (amountValue * rate).toFixed(3);
 
  msg.innerText = `${amountValue} ${fromCurrency.value} = ${finalExchange} ${toCurrency.value}`; 
  }
} 

reverseCurr.addEventListener("click", (event) => {
  let x = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = x;
  console.log(fromCurrency.value);
  updateExchangeRate();
  updateFlag(fromCurrency);
  updateFlag(toCurrency);
})