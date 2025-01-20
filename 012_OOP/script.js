    // Encapsulation: Private Class Fields and Methods

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// STATIC version of these 4

class Account {
    locale = navigator.language;
    bank = 'Bankist';
    #movements = [];
    #pin;
  
    constructor(owner, currency, pin) {
      this.owner = owner;
      this.currency = currency;
      this.#pin = pin;
  
      // this.movements = [];
      // this.locale = navigator.language;
  
      console.log(`Thanks for opening an account, ${owner}`);
    }
  
    // Public interface (API)
    getMovements() {
      return this.#movements;
      // Not chaninable
    }
  
    deposit(val) {
      this.#movements.push(val);
      return this;
    }
  
    withdraw(val) {
      this.deposit(-val);
      return this;
    }
  
    #approveLoan(val) {
      // Fake method
      return true;
    }
  
    requestLoan(val) {
      if (this.#approveLoan(val)) {
        this.deposit(val);
        console.log(`Loan approved`);
      }
      return this;
    }
  }
  
  const acc1 = new Account('Jonas', 'EUR', 1111);
  // acc1.deposit(300);
  // acc1.withdraw(100);
  const movements = acc1
    .deposit(300)
    .withdraw(100)
    .withdraw(50)
    .requestLoan(25000)
    .withdraw(4000)
    .getMovements();
  
  console.log(acc1);
  // console.log(acc1.#movements);
  // Account.#test();
  console.log(movements);
  