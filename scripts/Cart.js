
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
function addToCart(product)
{
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
    
    localStorage.setItem("cart", store.cart.products) 
}
function Clear()
{
  localStorage.clear();
  console.log("empty LS")
}
function GetData()
{
    let storedNames = localStorage.getItem("cart");
  //  getObj("SoldItems")
  console.log(storedNames);
  WriteProducts(storedNames)
}

function WriteProducts(products)
{
    let Text="";
  Text += products + "<br>";
    document.getElementById("Products").innerHTML=Text;
}