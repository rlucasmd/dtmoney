import { useEffect } from "react";
import { api } from "../../services/api";
import { Container } from "./styles"

function Transactions() {

  useEffect(() => {
    api.get('/transactions')
      .then(res => console.log(res.data));
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
          <tr>
            <td>Desenvolvimento de site</td>
            <td className="deposit">R$ 16.000,00</td>
            <td>Venda</td>
            <td>16/02/2021</td>
          </tr>
          <tr>
            <td>Aluguel do apartamento</td>
            <td className="withdraw">R$ 1.000,00</td>
            <td>Aluguel</td>
            <td>16/03/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}

export { Transactions }