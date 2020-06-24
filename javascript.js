
let budgetData = (function () {

    // function Budget(id,desc,value){
    //     this.id = id;
    //     this.desc = desc;
    //     this.value = value;
    // };
    
    // object, which stores all the data in client side.
    let x,data;

    data = {
        eachBudget : {
            description : [],
            budget : []
        },
        // order number to be displayed on the page for income and expenses.
        Id : {
            inc : 0,
            exp : 0
        },
        per : null,
        total : new Array(0,0,0)
    }
    // shortform for accessing eachBudget everytime in data;
    x = data.eachBudget;
    return {
        
        
        // this function is called whenever new data need to be added (stored inside data object).
        storeData : function(id, desc, value){
            // making value positive so that if user enters negative value, it iincome doesnt go to expense.
            value = Math.abs(value);
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
            
            }
            return data;
            // checking while debugging.
            // console.log(x.description[x.description.length-1]);
            // console.log(x.budget[x.budget.length-1]);
        },
        storeTopBudget : function(){
            let y = data.eachBudget.budget.length - 1;
          
            if(data.eachBudget.budget[y]>0){
                
                data.total[0] = data.total[0] + data.eachBudget.budget[y];
            
            }
            else
            data.total[1] += data.eachBudget.budget[y];  
            data.total[2] += data.eachBudget.budget[y];   
     
            data.per = Math.round(((Math.abs(data.total[1]))/(data.total[0])) * 100)+ "%";
        },  
        // this function is used just to return the required data for the top.
        // we only want to return the neccessory information ( not the whole data ).
        returnStoreTopBudget : function (){
            return {
                total : data.total[2],
                income : data.total[0],
                expense : data.total[1],
                per : data.per
            };
        },
        testing : function(){
            console.log(data);
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
                     html : "html",
                     hcontainer : ".container"   };

    // returning an  object 
    return {
        // method which returns an object of input values.
        getInput : function(){
           return { type : document.querySelector(DOMstrings.hType).value ,
                    desc : document.querySelector(DOMstrings.hDesc).value,
                    value : parseInt(document.querySelector(DOMstrings.hValue).value)};
        },
        printBudget : function(data) {
            let temp = data.eachBudget.budget.length - 1;
            let y = data.eachBudget.budget[temp];
            let z = data.eachBudget.description[temp];
            let x;
            if (y > 0){
                
                x = '<div class="item clearfix" id="income-' + data.Id.inc +
                '"><div class="item_description">' + z +'</div><div class="right clearfix">' + 
                '<div class="item_value">' + y + '</div><div class="item_delete"><button class="item_delete--btn">' +
                '<i class="ion-ios-close-outline"></i></button></div></div></div>' ;
                document.querySelector(".income_list").insertAdjacentHTML("beforeend", x) ;
            }
            else {
                x = '<div class="item clearfix" id="expense-' + data.Id.exp +
                '"><div class="item_description">' + z + '</div><div class="right clearfix"><div class="item_value">' + 
                (-y) + '</div><div class="item_percentage">' + '21%' + '</div><div class="item_delete"><button class="item_delete--btn">' +
                '<i class="ion-ios-close-outline"></i></button></div></div></div>' ;
                document.querySelector(".expenses_list").insertAdjacentHTML("beforeend",x) ;
            }
            // here replace() can also be used as placeholders instead of adding data.Inc.inc, y, z directly.
            
        },

        // returning DOMstrings to use globally.
        DOMstrings : DOMstrings,
        clearInput : function(){

            // can be done directly using querySelector. (better done like this when there r few selectors)
            // for clearing multiple outputs we use querySelectorAll().
            let clearArray = document.querySelectorAll(DOMstrings.hDesc + "," + DOMstrings.hType + "," + DOMstrings.hValue);
            clearArray = Array.prototype.slice.call(clearArray);

            // forEach method is used to iterate the entire array and give a function.
            // current has current array element, index has index, array is the entire array.
            // to access these three objects, they must be declarred inside the function.(in the same order)
            // if not used dont declare them like below.
            clearArray.forEach(function(current, index, array){
                current.value = "";
            });
            // this moves the blinking bar back to description after the process.
            clearArray[0].focus();
        },
        printTopBudget : function(budget){
            if(budget.total > 0)
            document.querySelector(".budget_value").innerHTML = "+" + budget.total;
            else 
            document.querySelector(".budget_value").innerHTML = budget.total;
            document.querySelector(".budget_income--value").innerHTML = budget.income;
            document.querySelector(".budget_expenses--value").innerHTML = budget.expense;
            document.querySelector(".budget_expenses--percentage").innerHTML = budget.per;
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
    //   everything is written in collectAmount to avoid more code in both event listeners.
    document.querySelector(DOMstrings.hbtn).addEventListener("click", collectAmount);
    document.querySelector("html").addEventListener("keypress", function(event){
        if(event.keyCode === 13)
        collectAmount();
    });
    document.querySelector(DOMstrings.hcontainer).addEventListener("click",function(){
    //  i cannot pass this function thro event listener without invoking it
    //  cause i have to send a parameter
        deleteBudget(event);
    });
    }
    
    // collecting input data;
    function collectAmount(){
        let inp = UI.getInput();
        if (isNaN(inp.value) || inp.value == 0){
            alert("please enter a valid input.");
            return;
        }
        else if (inp.desc == "" || inp.type == "" || inp.value == ""){
            alert("please fill all the details");
            return ;
        }
        else{
            inp = budgetData.storeData(inp.type, inp.desc, inp.value);
            UI.printBudget(inp);
            UI.clearInput();
            budgetData.storeTopBudget();
            inp = budgetData.returnStoreTopBudget();
            UI.printTopBudget(inp);
        }
    }
    function deleteBudget(event){
        let budget;
        budget = event.target.parentNode.parentNode.parentNode.parentNode.id;
        budget = budget.split("-");
        type = budget[0];
        Id = budget[1];
        if(!isNaN(Id)){
            // delete the item from budget displayed in the bottom
            
            // update our budget data 
            // update the top budget
            
        }
        
        
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

