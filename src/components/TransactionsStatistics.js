import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsStatistics = ({ selectedMonth }) => {
    const [statistics, setStatistics] = useState({ totalSale: 0, soldItems: 0, notSoldItems: 0 });

    useEffect(() => {
        fetchStatistics();
    }, [selectedMonth]);

    const fetchStatistics = async () => {
        try {
            const response = await axios.get('http://localhost:5888/api/statistics', {
                params: { month: selectedMonth },
            });
            setStatistics(response.data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    return (
        <div className="statistics">
            <div>Total Sale: ${statistics.totalSale}</div>
            <div>Sold Items: {statistics.soldItems}</div>
            <div>Not Sold Items: {statistics.notSoldItems}</div>
        </div>
    );
};

export default TransactionsStatistics;
