import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Title);

const CACHE_KEY = 'proposals_cache';
const CACHE_EXPIRATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

// 將公曆日期轉換為民國紀年
const convertToMinguoDate = (date) => {
  const [year, month, day] = date.split('-');
  return `${parseInt(year, 10) - 1911}${month}${day}`;
};

const ProposalAnalysis = () => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const fetchProposalsFromAPI = async () => {
      const today = new Date().toISOString().slice(0, 10);
      const minguoToday = convertToMinguoDate(today);
      try {
        const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://www.ly.gov.tw/WebAPI/LegislativeBill.aspx?from=1130211&to=${minguoToday}&proposer=%E7%BF%81%E6%9B%89%E7%8E%B2&mode=json`);
        const proposalsData = response.data;

        // 緩存數據和時間戳
        localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: proposalsData }));
        setProposals(proposalsData);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      }
    };

    const fetchProposals = async () => {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { timestamp, data } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_EXPIRATION) {
          setProposals(data);
          return;
        }
      }

      await fetchProposalsFromAPI();
    };

    fetchProposals();
  }, []);

  // 提案的月份分布
  const proposalsByMonth = proposals.reduce((acc, proposal) => {
    const month = proposal.date.substring(0, 5);
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  // 提案的狀態分布
  const proposalsByStatus = proposals.reduce((acc, proposal) => {
    const status = proposal.billStatus || '未指定狀態';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  // 提案的類型分布
  const proposalsByType = proposals.reduce((acc, proposal) => {
    const type = proposal.billName.split('第')[0];
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const monthData = {
    labels: Object.keys(proposalsByMonth),
    datasets: [
      {
        label: '提案數量',
        data: Object.values(proposalsByMonth),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const statusData = {
    labels: Object.keys(proposalsByStatus),
    datasets: [
      {
        label: '提案數量',
        data: Object.values(proposalsByStatus),
        backgroundColor: Object.keys(proposalsByStatus).map((_, index) => `rgba(${index * 30}, 99, 132, 0.6)`),
        borderColor: Object.keys(proposalsByStatus).map((_, index) => `rgba(${index * 30}, 99, 132, 1)`),
        borderWidth: 1,
      },
    ],
  };

  const typeData = {
    labels: Object.keys(proposalsByType),
    datasets: [
      {
        label: '提案數量',
        data: Object.values(proposalsByType),
        backgroundColor: Object.keys(proposalsByType).map((_, index) => `rgba(${index * 30}, 99, 132, 0.6)`),
        borderColor: Object.keys(proposalsByType).map((_, index) => `rgba(${index * 30}, 99, 132, 1)`),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">草案分析</h1>

      <div className="mb-12 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">提案月份分布</h2>
        <Bar data={monthData} />
      </div>

      <div className="mb-12 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">提案狀態分布</h2>
        <Doughnut data={statusData} />
      </div>

      <div className="mb-12 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">提案類型分布</h2>
        <Doughnut data={typeData} />
      </div>
    </div>
  );
};

export default ProposalAnalysis;
