import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsTable = ({ selectedMonth, onMonthChange }) => {
    const [transactions, setTransactions] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [perPage] = useState(10); // Default items per page

    useEffect(() => {
        fetchTransactions();
    }, [selectedMonth, page, searchText]);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('http://localhost:5888/api/transactions', {
                params: {
                    month: selectedMonth,
                    search: searchText,
                    page,
                    perPage,
                },
            });
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    return (
        <div>
            <div className="filter-section">
                <select value={selectedMonth} onChange={e => onMonthChange(e.target.value)}>
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                        .map((month, index) => (
                            <option key={index} value={month}>
                                {month}
                            </option>
                        ))}
                </select>
                <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                />
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Date of Sale</th>
                        <th>Category</th>
                        <th>Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction._id}>
                            <td>{transaction.title}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.price}</td>
                            <td>{transaction.dateOfSale}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.sold ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination-controls">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
                <button onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default TransactionsTable;
