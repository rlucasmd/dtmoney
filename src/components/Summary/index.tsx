import { Container } from "./styles";
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransaction } from "../../hooks/useTransaction";

function Summary() {
  const { transactions } = useTransaction();

  const summary = transactions.reduce((accumulator, transaction) => {
    if (transaction.type === 'deposit') {
      accumulator.deposits += transaction.amount;
      accumulator.total += transaction.amount;
    } else {
      accumulator.withdraws += transaction.amount;
      accumulator.total -= transaction.amount;
    }

    return accumulator;
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0,
  });

  function moneyFormat(number: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(number);
  }


  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>

          <img src={incomeImg} alt="Entradas" />

        </header>
        <strong>{moneyFormat(summary.deposits)}</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>

          <img src={outcomeImg} alt="Saídas" />

        </header>
        <strong>-{moneyFormat(summary.withdraws)}</strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>

          <img src={totalImg} alt="Total" />
        </header>
        <strong>{moneyFormat(summary.total)}</strong>
      </div>
    </Container>

  );

}

export { Summary }