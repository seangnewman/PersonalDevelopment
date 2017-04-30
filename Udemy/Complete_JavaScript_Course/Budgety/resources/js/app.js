

// Budget Controller
var budgetController = (function(){

  // Some Code

  var Expense = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totalIncome){
    if(totalIncome > 0 ){
      this.percentage = Math.round( (this.value / totalIncome) * 100);
    }else{
      this.percentage = -1;
    }

  };

  Expense.prototype.getPercentage = function(){
    return this.percentage;
  };

  var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type){
    var sum = 0;

    data.allItems[type].forEach(function(cur){
      sum += cur.value;
    });

    data.totals[type] = sum;
  };



  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals:{
      exp: 0,
      inc:0
    },
    budget:0,
    percentage: -1

  };

  return{
    addItem: function(type, des, val){
      var newItem;
      var ID;

     // Create new ID
     console.log(data);

     if( data.allItems[type].length > 0 ){
       ID = data.allItems[type][data.allItems[type].length-1].id + 1;
     }else{
       ID = 0;
     }


      //Create new item based on type
      if(type === 'exp'){
          newItem = new Expense( ID, des, val);
      }else if(type === 'inc'){
        newItem = new Income( ID, des, val);
      }

      //Push to data structure
      data.allItems[type].push(newItem);

      // Return the new element
      return newItem;
    },

    deleteItem: function(type, id){
      var ids;
      var index;

      ids = data.allItems[type].map(function(current){
          return current.id;
      });

      index = ids.indexOf(id);

      if(index !== -1){
        data.allItems[type].splice(index, 1);
      }
    },

    calculateBudget : function(){
      // calculate total income and expenses__list
      calculateTotal('exp');
      calculateTotal('inc');
      // calculate the budget (income - expenses)
      data.budget = data.totals.inc - data.totals.exp;
      //calculate the percentage f income that was spent
      if (data.totals.inc > 0){
          data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      }else {
          data.percentage = -1;
      }
    },

    calculatePercentages : function(){
      data.allItems.exp.forEach(function(cur){
        cur.calcPercentage(data.totals.inc);
      })

    },
    getPercentages : function(){
      var allPerc = data.allItems.exp.map(function(cur){
        return cur.getPercentage();
      });
      return allPerc;
    },
    getBudget: function(){
      return{
        budget: data.budget,
        totalIncome: data.totals.inc,
        totalExpenses : data.totals.exp,
        percentage : data.percentage

      }

    },

    testing: function(){
      console.log(data);
    }


  }
})();



// UI Controller
var UIController = (function(){
  // Some Code

  var DOMStrings = {
    inputType : '.add__type',
    inputDescription : '.add__description',
    inputValue : '.add__value',
    inputButton : '.add__btn',
    incomeContainer : '.income__list',
    expensesContainer : '.expenses__list',
    budgetLabel : '.budget__value',
    incomeLabel :'.budget__income--value',
    expensesLabel :'.budget__expenses--value',
    percentageLabel : '.budget__expenses--percentage',
    container: '.container',
    expensesPctLabel : '.item__percentage',
    dateLabel: '.budget__title--month'

  };

  var formatNumber = function(num, type){
    var numSplit;
    var int;
    var dec;
    var sign;
    // +/- before number

    // 2 decimal points

    //3 Comma separating numbers

    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit = num.split('.');

    int = numSplit[0];
    dec = numSplit[1];

    if(int.length > 3){
      var tempSize = int.substr(0,int.length-3).length;
      console.log('the temp size is ' + tempSize);
      console.log('the array size  is ' + int.length);
      int = int.substr(0,tempSize) + ',' + int.substring(tempSize ,int.length);
    }

    if( type === 'exp'){
      sign = '-';
    }else {
      sign = '+';
    }


    return (sign  + int + '.' + dec);

  };

  var nodeListForEach = function(list, callback){
    for(var i = 0; i < list.length; i++){
      callback(list[i], i);
    }

  };



      return { getinput: function(){
        return {
          type : document.querySelector(DOMStrings.inputType).value,  // Will return either "inc" or "exp"
          description : document.querySelector(DOMStrings.inputDescription).value,
          value : parseFloat(document.querySelector(DOMStrings.inputValue).value)
        };
      },
      addListItem : function(obj, type){

        var html;
        var newHTML;
        var element;
        //Create html string with placeholder text

        if(type === 'inc'){
          element = DOMStrings.incomeContainer;
         html = '<div class="item clearfix" id="inc-%id%">' +
                                '<div class="item__description">%description%</div>' +
                                    '<div class="right clearfix">' +
                                        '<div class="item__value">%value%</div>' +
                                        '<div class="item__delete">' +
                                            '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';
        }else if (type === 'exp'){
          element = DOMStrings.expensesContainer;
          html =  '<div class="item clearfix" id="exp-%id%">' +
                                    '<div class="item__description">%description%</div>' +
                                    '<div class="right clearfix">' +
                                        '<div class="item__value">%value%</div>' +
                                        '<div class="item__percentage">21%</div>' +
                                        '<div class="item__delete">' +
                                            '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>'
                              }


        //Replace the placeholder text with actual data
        newHTML = html.replace('%id%', obj.id);
        newHTML = newHTML.replace('%description%', obj.description);
        newHTML = newHTML.replace('%value%', formatNumber(obj.value, type));


        //Insert the html inot the DOM
        document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);



      },

      deletteListItem: function(selectorID){

          var el = document.getElementById(selectorID);

          el.parentNode.removeChild(el);

      },

      clearFields: function(){
         var fields;
         var fieldsArr;
         fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue);

         //querySelectorAll returns a list, need to convert it to an array
         fieldsArr = Array.prototype.slice.call(fields);

         fieldsArr.forEach(function(current, index, array){
           current.value = '';


         });
         fieldsArr[0].focus();
      },

      displayBudget : function(obj){
        var type;

        obj.budget >= 0 ? type = 'inc' : type = 'exp';

        document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
        document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalIncome, 'inc');
        document.querySelector(DOMStrings.expensesLabel).textContent = formatNumber(obj.totalExpenses,'exp');


        if(obj.percentage > 0){
          document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
        }else{
          document.querySelector(DOMStrings.percentageLabel).textContent = '---';
        }
      },
      displayPercentages: function(percentages){

        var fields = document.querySelectorAll(DOMStrings.expensesPctLabel);


        nodeListForEach(fields, function(current, index){
           // do stuff
           if(percentages[index] > 0){
             current.textContent = percentages[index] + '%';
           }else{
              current.textContent = '---';
           }


        });

      },

      displayMonth: function(){
        var now;
        var  year;
        var  month;
        var  date;
        var months;
        months = ['January', 'February','March','April','May','June','July','August','September','October','November','December'];
        var now = new Date();
        month = now.getMonth();
        year = now.getFullYear();
        document.querySelector(DOMStrings.dateLabel).textContent = months[month] + " " + year;


      },

      changedType : function(){
        var fields = document.querySelectorAll(DOMStrings.inputType + ',' + DOMStrings.inputDescription + ',' + DOMStrings.inputValue);

        nodeListForEach(fields, function(cur){
            cur.classList.toggle('red-focus');
        });
        document.querySelector(DOMStrings.inputButton).classList.toggle('red');
      },


      getDOMStrings: function(){
        return DOMStrings;
      }
  };
})();


// Global App Controller
var controller =(function(budgetCtrl, UICtrl){

  var setupEventListeners = function(){
    var DOM = UIController.getDOMStrings();

    document.querySelector(DOM.inputButton).addEventListener('click',ctrlAddItem);

    document.addEventListener('keypress',function(event){
       if(event.keycode === 13  || event.which === 13){
          ctrlAddItem();
       }
    });
    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    document.querySelector(DOM.inputType).addEventListener('change', UIController.changedType);





  };

 var updateBudget = function(){
   //1. Calculate the budget
   budgetController.calculateBudget();

   //2. return the budget
   var budget = budgetController.getBudget();

   //3. Display the budget on the UI
  UIController.displayBudget(budget);
 };

 var updatePercentages = function(){
   // 1. Calculate the percentages
   budgetController.calculatePercentages();
   //2. Read percentages from budget Controller
   var percentages = budgetController.getPercentages();

   //3. Update the UI with the new percentages
   UICtrl.displayPercentages(percentages);

 }



  var ctrlAddItem = function(){

    var input;
    var newItem;

    //1. Get the field input data
    input = UIController.getinput();

    if(input.description !== '' && !isNaN(input.value) && input.value > 0){

      //2. Add the item to the budget Controller
      newItem = budgetController.addItem(input.type, input.description, input.value);

      //3. Add the new item to the UI

      UIController.addListItem(newItem, input.type);
      //4. Clear the fields

      UIController.clearFields();

      // Calculate and update Budget
      updateBudget();


      //6. Calculate and update percentages
      updatePercentages();
    }

  };

  var ctrlDeleteItem = function(event){

    var itemID;
    var splitID;
    var type;
    var ID;
    itemID = event.target.parentNode.parentNode.parentNode.id;
    if(itemID){
        //inc-1
        splitID = itemID.split('-');
        type = splitID[0];
        ID = parseInt(splitID[1]);

        // 1. Delete item from data structure
        budgetController.deleteItem(type, ID);

        // 2. Delete item from UI
        UIController.deletteListItem(itemID);

        //3. Update and show the new budget
        updateBudget();

        //4. Calculate and update percentages
        updatePercentages();
    }
  };


  return {
    init: function(){
      console.log('Application has started');

      UIController.displayMonth();
      UIController.displayBudget({
      budget: 0,
      totalIncome: 0,
      totalExpenses : 0,
      percentage : -1
    });
      setupEventListeners();
    }
  };


})(budgetController, UIController);

controller.init();
