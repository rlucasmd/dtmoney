import { useContext } from "react";
import { TransactionsContext } from "../../hooks/useTransaction";
import { Container } from "./styles"

function Transactions() {

  const { transactions } = useContext(TransactionsContext);


  function moneyFormat(number: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(number);
  }

  function dateFormat(date: string) {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
  }


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