import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

export const TransactionsContext = createContext<TransactionContextData>({} as TransactionContextData);


export interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

export interface TransactionsResponse {
  transactions: Array<Transaction>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;


export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get<TransactionsResponse>('/transactions')
      .then(response => {
        setTransactions(response.data.transactions);
      });
  }, []);

  async function createTransaction(newTransaction: TransactionInput) {
    const response = await api.post('/transactions', {
      ...newTransaction,
      createdAt: new Date(),

    });
    const { transaction } = response.data;

    setTransactions([
      ...transactions,
      transaction
    ]);

  }
  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransaction() {
  const context = useContext(TransactionsContext);

  return context;
}