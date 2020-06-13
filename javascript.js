

let budgetData = (function () {

    // function Budget(id,desc,value){
    //     this.id = id;
    //     this.desc = desc;
    //     this.value = value;
    // };
    
    // object, which stores all the data in client side.
    let data = {
        eachBudget : {
            description : [],
            budget : []
        },
        total : 0,
        // order number to be displayed on the page for income and expenses.
        Id : {
            inc : 0,
            exp : 0
        }
    }
    // shortform for accessing eachBudget everytime in data;
    let x = data.eachBudget;
    return {
        
        // this function is called whenever new data need to be added (stored inside data object).
        storeData : function(id, desc, value){
            x.description.push(desc);
            if(id === "inc"){
                data.Id.inc++ ;
                updateData(value);
            }
            else{
                data.Id.exp++ ;
                updateData(-value);                
            }       
            function updateData(value){
                // updating Id, budget, total.
                x.budget.push(value);
                data.total +=  value;
                console.log(data.Id);
            }
            return data;
            // checking while debugging.
            // console.log(x.description[x.description.length-1]);
            // console.log(x.budget[x.budget.length-1]);
        }
    };
    

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
        printBudget : function(data) {
            let temp = data.eachBudget.budget.length - 1;
            let y = data.eachBudget.budget[temp];
            let z = data.eachBudget.description[temp];
            let x;
            if (y > 0){
                
                x = '<div class="item clearfix" id="income-' + data.Id.inc + '"' +
                '><div class="item_description">' + z +'</div><div class="right clearfix">' + 
                '<div class="item_value">' + y + '</div><div class="item_delete"><button class="item_delete--btn">' +
                '<i class="ion-ios-close-outline"></i></button></div></div></div>' ;
                document.querySelector(".income_list").innerHTML+= x ;
                
            }
            else {
                x = '<div class="item clearfix" id="expense-' + data.Id.exp +
                '"><div class="item_description">' + z + '</div><div class="right clearfix"><div class="item_value">' + 
                y + '</div><div class="item_percentage">' + '21%' + '</div><div class="item_delete"><button class="item_delete--btn">' +
                '<i class="ion-ios-close-outline"></i></button></div></div></div>' ;
                document.querySelector(".expenses_list").innerHTML+= x ;
            }
                        
            
        },

        // returning DOMstrings to use globally.
        DOMstrings : DOMstrings,
        clearInput : function(){
            document.querySelector(DOMstrings.hDesc).value = "";
            document.querySelector(DOMstrings.hValue).value = "";
        }

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

        let inp = UI.getInput();
        inp = budgetData.storeData(inp.type, inp.desc, inp.value);
        UI.printBudget(inp);
        UI.clearInput();
        
    }
    return {
        init : function(){
            eventListeners();
        }
    }
    
    
})();

controller.init();

//  console.log("worked");
//  always test this inside functions if they r working properly.
//  anything that needs to be returned should always be in the form of function.