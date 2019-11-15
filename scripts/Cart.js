
let store;

try {

 store = JSON.parse(localStorage.store);

}

catch(e){

 store = {};

}


store.save = function(){

  localStorage.store = JSON.stringify(this);

};


  
  

let product = [];
function addToCart(name, price, color, weight, discount)
{
  console.log(name);
  let product = {
    Name: name,
    Price: price,
    Color: color,
    Weight: weight,
    Discount: discount
  };
    if(!store.cart){

        console.log('Creating Cart');
        store.cart = {
            products: [],
            shipping: 100,
            totalPrice: 0
        };  
        store.save(); 
    }
    console.log({product});
    store.cart.products.push(product);
    store.save();
    
    localStorage.setItem("products", JSON.stringify(store.cart.products)) 
}
function Clear()
{
  localStorage.clear();
  alert("Thank You for your purchase!")
        localStorage.clear();
        window.location.href = '';
}

function ChangeCart(cartNumber)
{
  console.log(cartNumber)
  document.getElementById("CartNumber").innerHTML=cartNumber

}
function GetData()
{
  let storedNames = localStorage.getItem("products");
  storedNames = JSON.parse(storedNames);
  console.log('From LS ', storedNames);
  if(storedNames!=null)
  {
    WriteProducts(storedNames, CheckIfDiscountAmountFulfilled(storedNames))
  }
  else{

    document.getElementById("Products").innerHTML="Go buy some pigs!";
  }
}

function SeparateTheDifferentItems(products)
{
  let allreadyChecked = [];
  let differentItems = [];
  products.forEach(function(element)
  {
    if(!allreadyChecked.includes(element.Name))
    {
      differentItems.push(products.filter(item => item.Name.includes(element.Name)))
      allreadyChecked.push(element.Name)
     
    }
  })
  return differentItems;
}

function CheckIfDiscountAmountFulfilled(products)
{
  let differentItems = SeparateTheDifferentItems(products);
  let discountedItems = [];

  differentItems.forEach(function(element)
  {
    if(Number(element[0].Discount)!==0)
    {
    let numbersOfDiscountedItems = parseInt(element.length/Number(element[0].Discount))
    for(let i = 0; i < numbersOfDiscountedItems; i++)
    {
      discountedItems.push(element[0])
    }
  }
  })
  console.log(discountedItems);
  return discountedItems;
}


function WriteProducts(products, discountedItems)
{
  if(products!=null)
  {
    let Text="";
    let TotalPrice = 0;
    let TotalTax = 0;
    let Shipment = 1000;
    let TotalDiscount = 0;
    let differentItems = SeparateTheDifferentItems(products);
   
    differentItems.forEach(function(element){
      Text += 
      "<div class=\"container float-left\">" + 
        "<div class=\"row mb-1 bg-dark text-light\">" + 
          "<div class=\"col-sm-4 col-xs-1 col-md-3\">Name: " + element[0].Name + "<\/div>" + 
          "<div class=\"col-sm-3 col-xs-1 col-md-3\">Price Per Product: " + element[0].Price + "£<\/div>" + 
          "<div class=\"col-sm-2 col-xs-1 col-md-2\"> Amount: " + element.length + "<\/div>" + 
          "<div class=\"col-sm-3 col-xs-1 col-md-3\"> Sum added to total: " + element.length * element[0].Price + "£<\/div>" +
        "<\/div>" + 
      "<\/div>";
      TotalPrice += (Number(element[0].Price)*element.length)
    })
    console.log(TotalPrice)
    let RemovedFromTotalPrice = SeparateTheDifferentItems(discountedItems);

    RemovedFromTotalPrice.forEach(function(element){
      TotalDiscount += Number(element[0].Price)*element.length;
      Text +=  
      "<div class=\"container float-left\">" + "Discounted wares" +
        "<div class=\"row mb-1 bg-danger text-light\">" + 
          "<div class=\"col-sm-4 col-xs-1 col-md-3\">Name: " + element[0].Name + "<\/div>" + 
          "<div class=\"col-sm-3 col-xs-1 col-md-3\">Price Per Product: " + element[0].Price + "£<\/div>" + 
          "<div class=\"col-sm-2 col-xs-1 col-md-2\"> Amount: " + element.length + "<\/div>" + 
          "<div class=\"col-sm-3 col-xs-1 col-md-3\"> Sum removed from total: " + element.length * element[0].Price + "£<\/div>" +
        "<\/div>" + 
      "<\/div>";
    })
    if(TotalPrice>6000)
      {
        Shipment = 0;
      }
      
      TotalPrice -= TotalDiscount;
      TotalTax = TotalPrice/4;
      console.log("after discount" +TotalPrice)
      console.log("after discount" +TotalPrice)
      console.log("Hello I am Tax:"+TotalTax)
      console.log("minus tax: "+(Number(TotalPrice) - Number(TotalTax)));
      TotalPrice += Shipment;
    Text += 
    "<div class=\"container float-left\">" + "Summation" +
      "<div class=\"row mb-1 bg-info text-light\">" + 
      "<div class=\"col-sm-4 col-xs-1 col-md-3\">Products: " +((Number(TotalPrice)- Number(TotalTax)) + Number(TotalDiscount) - Number(Shipment)) + "£<\/div>" +
      "<div class=\"col-sm-4 col-xs-1 col-md-3\">Discount: " +TotalDiscount + "£<\/div>" +
        "<div class=\"col-sm-4 col-xs-1 col-md-2\">Tax: " +TotalTax + "£<\/div>" +
        "<div class=\"col-sm-4 col-xs-1 col-md-3\">Shipping: " +Shipment + "£<\/div>" +
        "<div class=\"col-sm-4 col-xs-1 col-md-3\">Total: " +TotalPrice + "£<\/div>" +
      "<\/div>" + 
    "<\/div>";
    Text +=
    "<div class=\"container float-left\">" +
      "<div class=\"row mb-1 bg-white text-light\">" + 
        "<button type=\"button\" class=\"btn btn-primary\" onClick=\"Clear()\">Buy All items</button>" +
      "<\/div>" +
    "<\/div>";
    
    console.log(TotalTax);
    document.getElementById("Products").innerHTML=Text;
  }
}