import Ember from 'ember';

var Constants = {};

Constants.RATE = {
	USD: 1.00,
	EUR: 0.86,
  RUB: 70.86
};

export default Ember.Component.extend({

  inputValue: 0.00,
  selectedOption: null,
  currencyFrom:null,
  currencyTo:null,

  getRate: function(currencyUnit) {

    var result = 0.00;
    switch (currencyUnit) {
      case 'USD':
        result = Constants.RATE.USD;
        break;
      case 'EUR':
        result = Constants.RATE.EUR;
        break;
      case 'RUB':
        result = Constants.RATE.RUB;
        break;
      default:
        result = 0.00;
    }
    return result;
  },

  actions: {
    setSelectionFrom: function (selected) {
    
      this.set('currencyFrom', selected);
    },
    
    setSelectionTo: function (selected) {
      this.set('currencyTo', selected);
    },

    change: function (val) {
      this.set('inputValue', val);
    },

    convert: function () {
      if (this.currencyFrom == null || this.currencyTo == null || this.currencyTo == "" || this.currencyFrom == "")
      {
        alert("Please input currency.");
        window.location.reload();
        return;
      }
      var moneyCurrency = Money.create  ({  amountFrom: this.inputValue, 
                                            currencyFrom:this.currencyFrom,
                                            toRate: this.getRate(this.currencyTo),
                                            fromRate: this.getRate(this.currencyFrom)
                                        });

      var finalValue            = document.querySelector(".finalValue");
      finalAmount.style.display = "block";
      finalValue.innerHTML      = moneyCurrency.converTo(this.currencyTo) + this.currencyTo;
    },
    resetVal: function () {
      window.location.reload();
      document.getElementsByClassName("finalValue").innerHTML = "";
    },
  },
});

// definition of Money Class
var Money = Ember.Object.extend({

  amountFrom: 0.00,
  amountTo: 0.00,
  currencyFrom: null,
  currencyTo: null,
  toRate:0.00,
  fromRate:0.00,
  converTo: function(pCurrencyTo) {
    this.currencyTo = pCurrencyTo;
    return ((this.toRate / this.fromRate) * this.amountFrom).toFixed(2);
  }
});

