let storeData = (function () {

    function Expense(id,desc,value){
        

    }

    return {
    data : {

        eachRevenue : {
            expenditure : 0,
            income : 0
        },
        total_income :  0,
        total_expenditure : 0,
        total :0
    }};
    

})();

// all the operations related to UI is done here
let UI = (function () {

    // creating an Object DOMstrings to not use many strings.
    // lets keep all the DOMstrings at one place and return them (globally)
    // dont forget to add . before string.
    let DOMstrings = {hType : ".add_type",
                     hDesc : ".add_description",
                     hValue : ".add_value",
                     hbtn : ".add_btn",
                     html : "html"};

    // returning an  object 
    return {
        // method which returns an object of input values.
        getInput : function(){
           return { type : document.querySelector(DOMstrings.hType).value ,
                    desc : document.querySelector(DOMstrings.hDesc).value,
                    value : document.querySelector(DOMstrings.hValue).value};
        },
        // returning DOMstrings to use globally.
        DOMstrings : DOMstrings
    };

})();

// controller controls everything
let controller = (function (){

    //getting the DOMstrings
    let DOMstrings = UI.DOMstrings;

    let eventListeners = function(){

    //   if button clicked or enter is press collectAmount is called.
    //   event object stores the key pressed and some methods.
    //   collectAmount need not be called. event listner will call for us.

    document.querySelector(DOMstrings.hbtn).addEventListener("click", collectAmount);
    document.querySelector(DOMstrings.html).addEventListener("keypress", function(event){
        if(event.keyCode === 13)
        collectAmount();
    });
    }

    // collecting input data;
    function collectAmount(){

        //  console.log("worked");
        //  always test functions if it worked like this.
        let inp = UI.getInput();
        console.log(inp);
    }
    return {
        init : function(){
            eventListeners();
        }
    }
    
    
})();

controller.init();