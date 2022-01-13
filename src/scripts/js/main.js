"use strict";
console.log('Test technique front-end Ubilab');
//# sourceMappingURL=main.js.map
var menu = document.getElementById("menu");
var liens = menu.getElementsByClassName("lien");
for (var i = 0; i < liens.length; i++) {
    liens[i].addEventListener("click", function(e) {
    e.preventDefault();
     var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}