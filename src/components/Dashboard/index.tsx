import { Summary } from "../Summary";
import { Transactions } from "../Transactions";
import { Container } from "./styles";

function Dashboard() {
  return (
    <Container>
      <Summary />
      <Transactions />
    </Container>
  );
}

export { Dashboard };