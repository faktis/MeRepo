
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


  
  
  console.log(store.admin)
let product = [];
function addToCart(name, price, color, weight, discount)
{
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
  console.log("empty LS")
}
function GetData()
{
    let storedNames = localStorage.getItem("products");
  storedNames = JSON.parse(storedNames);
  console.log('From LS ', storedNames);
  
  WriteProducts(storedNames)
}

function WriteProducts(products)
{
  if(products!=null)
  {
    let Text="";
    products.forEach(function(element) {
      console.log(element);
      Text += "Name: " +element.Name + "Price: " +element.Price +"<br>";
    });
    document.getElementById("Products").innerHTML=Text;
  }
  else
  {
    document.getElementById("Products").innerHTML="Go buy some pigs!";
  }
}