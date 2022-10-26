/* When I rent a car I should see the customer data
And the car selected
And the final price which will be R$ 244,40
And DueDate which will be printed in Brazilian Portuguese format "10 de Novembro de 2020" */

class Transaction {
  constructor({ customer, car, finalPrice, dueDate }) {
    this.customer = customer;
    this.car = car;
    this.finalPrice = finalPrice;
    this.dueDate = dueDate;
  }
}

module.exports = Transaction;
