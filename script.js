import data from "./data.js";

let cardContainer = document.getElementById("card-container"); 
let cardHtml;
for (let i in data.data){
    cardHtml =`<div class="card">
                    <img src=${data.data[i].img} alt="" />
                    <h4 class="type">${data.data[i].type}</h4>
                    <h2>${data.data[i].name}</h2>
                    <h4>${data.data[i].serving}</h4>
                    <p><i class="fa-regular fa-dollar-sign"></i> ${data.data[i].price}</p>
                    <div class="btndiv">
                        <button class="addToCart" id=${i}>Add to cart</button>
                    </div>
                </div>`
    cardContainer.innerHTML+=cardHtml;
}

const cartBtn = document.querySelectorAll("button.addToCart");
const costIcon = document.getElementById("cost");
const items = document.getElementById("items");
const cart = document.querySelector("table");
const bill = document.querySelector(".totalBill");
let cost = 0;
let cartList = [];
cartBtn.forEach(btn=>{
    btn.addEventListener("click",function(){
        if(cartList.length === 0){
            const tr0 = document.createElement("tr");
            const th1 = document.createElement("th");
            const th2 = document.createElement("th");
            const th3 = document.createElement("th");
            th1.innerText = "Item Name";
            th2.innerText = "Quantity";
            th3.innerText = "Price";
            tr0.append(th1);
            tr0.append(th2);
            tr0.append(th3);
            cart.append(tr0);
            th1.style, th2.style,th3.style = "padding-inline:15px";
            items.style = "display:none"
        }
        if(!cartList.includes(data.data[btn.id].name)){
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            td1.innerHTML = data.data[btn.id].name;
            td2.innerHTML = 1;
            td2.setAttribute("id",`${data.data[btn.id].name}`)
            td3.innerHTML = data.data[btn.id].price;
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            cart.append(tr);
            cost+=data.data[btn.id].price;
            costIcon.innerHTML = `<i class="fa-regular fa-dollar-sign"></i> ${cost}`;
            cartList.push(data.data[btn.id].name)
            bill.innerHTML = `Your total bill is <i class="fa-regular fa-dollar-sign"></i> ${cost}`
        }else{
            let quantity = parseInt(document.getElementById(data.data[btn.id].name).innerHTML);
             quantity+=1;
             document.getElementById(data.data[btn.id].name).innerHTML = quantity;
             cost+=data.data[btn.id].price;
             costIcon.innerHTML = `<i class="fa-regular fa-dollar-sign"></i> ${cost}`;
             bill.innerHTML = `Your total bill is <i class="fa-regular fa-dollar-sign"></i> ${cost}`
        }
        
    })
})

document.querySelector(".resetBtn").addEventListener("click",function(){
    cost=0;
    costIcon.innerHTML = `<i class="fa-regular fa-dollar-sign"></i> ${cost}`;
    cartList = [];
    cart.innerHTML = "";
    items.style.display = "block"
    bill.innerHTML = "";
})

document.querySelector(".buyBtn").addEventListener("click",function(){
    if(cost !== 0){
        alert(`Your Bill is $ ${cost}`);
        cost=0;
        costIcon.innerHTML = `<i class="fa-regular fa-dollar-sign"></i> ${cost}`;
        cartList = [];
        cart.innerHTML = "";
        items.style = "display:block"
        bill.innerHTML = "";
    }else{
        alert("There are no items in your cart!")
    }
})