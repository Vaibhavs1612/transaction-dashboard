import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'recharts';

const TransactionsBarChart = ({ selectedMonth }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetchBarChartData();
    }, [selectedMonth]);

    const fetchBarChartData = async () => {
        try {
            const response = await axios.get('http://localhost:5888/api/bar-chart', {
                params: { month: selectedMonth },
            });
            setChartData(response.data);
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };

    return (
        <Bar data={chartData} />
    );
};

export default TransactionsBarChart;
