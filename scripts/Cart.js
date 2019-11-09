
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
  
  WriteProducts(storedNames, CheckIfDiscountAmountFulfilled(storedNames))
}



function CheckIfDiscountAmountFulfilled(products)
{
  let allreadyChecked = [];
  let differentItems = [];
  const discountedItems = [];
  products.forEach(function(element)
  {
    if(!allreadyChecked.includes(element.Name))
    {
      differentItems.push(products.filter(item => item.Name.includes(element.Name)))
      allreadyChecked.push(element.Name)
     
    }
  })
  differentItems.forEach(function(element)
  {
    if(Number(element[0].Discount)!==0)
    {
    let numbersOfDiscountedItems = element.length/Number(element[0].Discount)
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
    let thisCount = 0;
    let TotalDiscount = 0;
    products.forEach(function(element) {
      
      Text += "<br><br>Name: " +element.Name + " Price: " +element.Price +
      " Discount: "+element.Discount+ " Color: " + element.Color +" Weight:" +element.Weight
      "<br><br>";

    // Discount Calculation
    TotalPrice += Number(element.Price);
    /*if(element.Discount === 10)
    {
      thisCount++;
      if(thisCount == 3)
      {
        thisCount =0;
        TotalPrice -= Number(element.Price); // Buy 3 Get 1 free
        TotalDiscount += Number(element.Price);
      }
    }
    else
    {
      console.log("NoDISC")
      
    }*/
    
    });
    discountedItems.forEach(function(element){
      TotalPrice -= Number(element.Price);
      TotalDiscount += Number(element.Price);
    })
    Text += "<br><br>Total: " +TotalPrice +"<br>Discount: " +TotalDiscount ;
    document.getElementById("Products").innerHTML=Text;
  }
  else
  {
    document.getElementById("Products").innerHTML="Go buy some pigs!";
  }
}