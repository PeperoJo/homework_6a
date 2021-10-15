// //GLOBAL CART WHILE HTML IS OPEN
// var cartArray = [];
// localStorage.setItem("cartArray", JSON.stringify(cartArray));
// localStorage.setItem("cartArray",[]); //console.log(localStorage.getItem("cartArray"));




// FOOD ITEM OBJ
function foodItem(category, amount, options, price, imgsrc){
    this.category=category;
    this.amount=amount;
    this.options=options;
    this.price=price;
    this.imgsrc = imgsrc;
}



// CART
function updateCartLabel(){
  cartArray = JSON.parse(localStorage.getItem("cartArray") || "[]");
  var cartSize = cartArray.length;
  // console.log("This much in cart: "+cartSize);
  if (cartSize > 0){
    $('#cartNavItem').text("Cart ("+cartSize+")");
  } else {
    $('#cartNavItem').text("Cart");
  }
}
updateCartLabel();




// DROP DOWN UPDATE PICTURE
$('#glz').change(function(){
  if(this.value == 0){
    $('.food-img')[0].src = "img/product-page/pumpkinspice.png";
  } else {
    $('.food-img')[0].src = "img/product-page/pumpkinspice-"+this.value+".png";
  }
});



// DROP DOWN UPDATE PRICE
$('#amt').change(function(){
  // console.log(this.value);
  if(this.value == "1"){
    $('.price').text("$3.99");
  } else if (this.value == "3") {
    $('.price').text("$10.99");
  } else if (this.value == "6") {
    $('.price').text("$20.99");
  } else if (this.value == "12") {
    $('.price').text("$40.99");
  }
});



// ADD TO CART ACTION
$('.cart-btn').click(function(){
  var cinnaroll = new foodItem(
    "Pumkin Spice Cinnamon Roll",
    $('#amt').val(),
    $('#glz').val(),
    $('.price').text(),
    $('.food-img').attr('src')
  );

  cartArray = JSON.parse(localStorage.getItem("cartArray") || "[]");
  cartArray.push(cinnaroll);
  localStorage.setItem("cartArray", JSON.stringify(cartArray));

  updateCartLabel();


  moveBanner();
});


// ADD TO CART ANIMATION
function generateBanner(){
  $('body').append(`
    <div id="banner">
      <div id="bannertext">
        Item has been added to cart!
      </div>
    </div>
    `);
}
generateBanner();
function moveBanner(){
  $('#banner').animate({
        right: "+=325px",
      }, 300);
  $('#banner').delay(1000).animate({
        right: "-=325px",
      }, 300);
}
// function deleteBanner(){
//   $('#banner').delay(3000).remove();
// }


function clearCart(){
  localStorage.setItem("cartArray", JSON.stringify([]));
  cartTotal();
}



function displayItems(){
  cartArray = JSON.parse(localStorage.getItem("cartArray") || "[]");
  var cartSize = cartArray.length;

  $('.cart-items').text("");

  for (let i = 0; i < cartSize; ++i) {
    // console.log(t(cartArray[i].category));
    $('.cart-items').append(`
      <div class="added-item">
        <div class="image-cropper">
          <img class="added-img" src="`+ (cartArray[i].imgsrc) +`" alt="Pumpkin Spice Cinnamon Roll">
        </div>
        <div class="added-information">
          <div class="added-title">`+
            (cartArray[i].category)+`
          </div>
          <div class="added-misc">`+
            "x"+(cartArray[i].amount)+", "+(cartArray[i].options)+`
          </div>
          <div class="added-controls">
            <a href="#" onclick=removeItem(`+i+`)>Remove</a>
            <a href="#">Duplicate</a>
            <a href="#">Save for Later</a>
          </div>
        </div>
        <div class="added-price">`+
          (cartArray[i].price)+`
        </div>
      </div>
      `);
  }
  if (cartSize == 0){
    $('.cart-items').append(`
      <span class="empty-info">
      Your cart is empty!
      </span>
      `);
  }
}
displayItems();


function removeItem(index){ //remove element from food cart
  console.log("Removing index "+index);
  cartArray = JSON.parse(localStorage.getItem("cartArray") || "[]");
  // var removed = cartArray.splice(index); //remove one element starting from given index
  //for some reason splice doesn't work, so i rewrote the cartArray
  var cartSize = cartArray.length;
  var newArray = [];
  for (let i = 0; i < cartSize; ++i) {
    if(index != i){
      newArray.push(cartArray[i])
    }
  }

  localStorage.setItem("cartArray", JSON.stringify(newArray));
  updateCartLabel();
  displayItems();
  cartTotal();

}


function cartTotal(){
  cartArray = JSON.parse(localStorage.getItem("cartArray") || "[]");
  var cartSize = cartArray.length;

  var sum = 0;
  console.log(sum);
  $('.added-price').each(function(){
      currency = $(this).text();
      number = Number(currency.replace(/[^0-9.-]+/g,""));
      sum += number;  // Or this.innerHTML, this.innerText
  });
  $('.cart-total').text("$"+round(sum,2))
  $('#cart-count').text(cartSize)
  // console.log(sum);
}
cartTotal();



// rounding function taken from https://www.jacklmoore.com/notes/rounding-in-javascript/
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
