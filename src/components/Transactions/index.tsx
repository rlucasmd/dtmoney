import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Container } from "./styles"

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface TransactionsResponse {
  transactions: Array<Transaction>;
}

function Transactions() {

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  function moneyFormat(number: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(number);
  }

  function dateFormat(date: string) {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
  }

  useEffect(() => {
    api.get<TransactionsResponse>('/transactions')
      .then(response => {
        // console.log(response.data);
        setTransactions(response.data.transactions);
      });
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>
                  {moneyFormat(transaction.amount)}
                </td>
                <td>{transaction.category}</td>
                <td>{dateFormat(transaction.createdAt)}</td>
              </tr>
            ))
          }


        </tbody>
      </table>
    </Container>
  );
}

export { Transactions }