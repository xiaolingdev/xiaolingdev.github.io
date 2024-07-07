import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { create } from 'ipfs-http-client';

// IPFS 客户端设置
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

// 智能合约 ABI 和地址（这是示例，您需要部署自己的合约并更新这些值）
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_ipfsHash",
        "type": "string"
      }
    ],
    "name": "storeHash",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getHash",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // 替换为您部署的合约地址

function IPFSUpload() {
  const [file, setFile] = useState(null);
  const [fileHash, setFileHash] = useState('');
  const [retrievedFile, setRetrievedFile] = useState('');
  const [error, setError] = useState('');
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          // 请求用户授权
          await window.ethereum.enable();
          setWeb3(web3Instance);
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
          const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
          setContract(contractInstance);
        } catch (error) {
          setError('无法连接到钱包，请确保已安装 MetaMask 并授权访问。');
        }
      } else {
        setError('请安装 MetaMask!');
      }
    };
    initWeb3();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('请先选择一个文件');
      return;
    }

    try {
      const added = await ipfs.add(file);
      const ipfsHash = added.path;
      setFileHash(ipfsHash);

      // 将 IPFS 哈希存储到区块链
      await contract.methods.storeHash(ipfsHash).send({ from: account });

      setError('');
      alert('文件成功上传到 IPFS 并存储到区块链: ' + ipfsHash);
    } catch (error) {
      console.error('上传文件时出错: ', error);
      setError('上传失败：' + error.message);
    }
  };

  const handleRetrieve = async () => {
    try {
      // 从区块链获取 IPFS 哈希
      const ipfsHash = await contract.methods.getHash().call({ from: account });
      setFileHash(ipfsHash);

      if (!ipfsHash) {
        setError('没有找到存储的文件哈希');
        return;
      }

      // 从 IPFS 检索文件
      const stream = ipfs.cat(ipfsHash);
      let data = '';
      for await (const chunk of stream) {
        data += new TextDecoder().decode(chunk);
      }
      setRetrievedFile(data);
      setError('');
    } catch (error) {
      console.error('检索文件时出错: ', error);
      setError('检索失败：' + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">IPFS 上传与检索范例 (Polygon Network)</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <input type="file" onChange={handleFileChange} className="border p-2" />
      </div>
      <div className="mb-4">
        <button onClick={handleUpload} className="bg-blue-500 text-white p-2 rounded">上传到 IPFS 和区块链</button>
      </div>
      {fileHash && (
        <div className="mb-4">
          <p>文件哈希: {fileHash}</p>
        </div>
      )}
      <div className="mb-4">
        <button onClick={handleRetrieve} className="bg-green-500 text-white p-2 rounded">从区块链和 IPFS 检索</button>
      </div>
      {retrievedFile && (
        <div className="mb-4">
          <h2 className="text-xl font-bold">检索到的文件内容:</h2>
          <p className="border p-2">{retrievedFile}</p>
        </div>
      )}
    </div>
  );
}

export default IPFSUpload;