import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    //let income = 0
    //let outcome = 0

    //TODO
    const income = this.transactions.reduce((totalIncome, transaction) => {

      if(transaction.type === 'income'){
        totalIncome += transaction.value
      }

      return totalIncome

    }, 0)

    const outcome = this.transactions.reduce((totalOutcome, transaction) => {

      if(transaction.type === 'outcome'){
        totalOutcome += transaction.value
      }

      return totalOutcome

    }, 0)

    const total = income - outcome

    return { income, outcome, total}
  }

  public create({ title, value, type }:CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type })

    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionsRepository;
