// $('#glz').change(function(){
//   $('.food-img')[0].src = "img/product-page/pumpkinspice-"+this.value+".png";
//   console.log(this.value);
// });
//
// console.log('your message');

var pumpkinImgArray = [
  "img/product-page/pumpkinspice.png",
  "img/product-page/pumpkinspice-sugarmilk.png",
  "img/product-page/pumpkinspice-vanilla.png",
  "img/product-page/pumpkinspice-chocolate.png"
];

// $('#glz').change(function(){
//   // var val = parseInt($('#glz').val());
//   var glazing = $('#glz').find(":selected").text();
//   console.log(glazing)
//   $('.food-img')[0].src = imagesArray[this.value];
// });

$('#glz').change(function(){
  console.log($('#glz').val());
});

console.log($('#glz option:selected').val());

console.log($('#glz').find(":selected").val());
