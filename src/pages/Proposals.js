import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import axios from 'axios';

const CACHE_KEY = 'proposals_cache';
const CACHE_EXPIRATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

// 將公曆日期轉換為民國紀年
const convertToMinguoDate = (date) => {
  const [year, month, day] = date.split('-');
  return `${parseInt(year, 10) - 1911}${month}${day}`;
};

const Proposals = () => {
  const [proposals, setProposals] = useState([]);

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

  useEffect(() => {
    fetchProposals();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">提案草案</h1>
      <div className="space-y-12">
        {proposals.map((proposal) => (
          <div key={proposal.date + proposal.billName} className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-24 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-light-blue to-light-purple text-white shadow-md">
                  <Calendar size={32} />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-500">{proposal.date}</p>
              </div>
              <div className="ml-8 flex-grow">
                <div className="h-full border-l-2 border-light-blue pl-8 pb-12">
                  <h3 className="text-2xl font-semibold mb-3 text-gray-800">{proposal.billName}</h3>
                  <div className="mb-2 text-gray-600">
                    <p>提案者: {proposal.billProposer}</p>
                    <p>連署者: {proposal.billCosignatory}</p>
                  </div>
                  <Link to={`/proposal-detail/${proposal.date + proposal.billName}`} className="inline-flex items-center text-light-blue hover:text-light-purple transition-colors duration-300">
                    了解更多 <ArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Proposals;
