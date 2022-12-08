import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createServer, Model } from 'miragejs';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'dev',
          amount: 600,
          createdAt: new Date('2022-11-27')
        },
        {
          id: 2,
          title: 'Pagamento de alguel',
          type: 'withdraw',
          category: 'aluguel',
          amount: 1100,
          createdAt: new Date('2022-10-14')
        },
        {
          id: 3,
          title: 'Freelance de backend',
          type: 'deposit',
          category: 'dev',
          amount: 1800,
          createdAt: new Date('2022-11-15')
        },
      ]
    });
  },

  routes() {
    this.namespace = 'api';
    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', data);
    });
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
