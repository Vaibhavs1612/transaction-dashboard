import React, { useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import TransactionsStatistics from './components/TransactionsStatistics';
import TransactionsBarChart from './components/TransactionsBarChart';

const App = () => {
    const [selectedMonth, setSelectedMonth] = useState('March');

    return (
        <div className="App">
            <h1>Product Transactions Dashboard</h1>
            <TransactionsTable selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />
            <TransactionsStatistics selectedMonth={selectedMonth} />
            <TransactionsBarChart selectedMonth={selectedMonth} />
        </div>
    );
};

export default App;
