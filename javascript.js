let calculate = (function () {


})();

let UIcontroller = (function () {


})();

let controller = (function (){
    
    // collecting input data;
    function collectAmount(){

        //  console.log("worked");
        //  always test functions if it worked like this.
        

    }

    //   if button clicked or enter is press collectAmount is called.
    //   event object stores the key pressed and some methods.
    //   collectAmount need not be called. event listner will call for us.
    document.querySelector(".add__btn").addEventListener("click", collectAmount);
    document.querySelector("html").addEventListener("keypress", function(event){
        if(event.keyCode === 13)
        collectAmount();
    });
    

})();