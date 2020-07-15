import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Omit<Transaction, 'id'>): Transaction {
    
    //TRATATIVAS / O VALOR DE OUTCOME NAO PODE SER MAIOR QUE O TOTAL DE INCOME
    if(!["income","outcome"].includes(type)){
      throw new Error("Transaction type is invalid");
    }

    const {total} = this.transactionsRepository.getBalance();
    if(type == "outcome" && total < value){
      throw new Error("You do not have enough balance");
    }
    const transaction: Transaction = this.transactionsRepository.create({title, value, type});
    return transaction;
  }
}

export default CreateTransactionService;
