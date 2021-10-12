import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';
import './App.css';
import abi from './utils/WavePortal.json';

function App() {
  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [waveCount, setWaveCount] = useState<number>(0);
  const [myWaveCount, setMyWaveCount] = useState<number>(0);
  const contractAddress = '0x509455c03Ba59f00ce4dcAD964C615A4f0A053e5';
  const contractABI = abi.abi;

  async function checkIfWalletIsConnected() {
    try {
      const {ethereum} = window;

      if (!ethereum) {
        console.log('Make sure you have MetaMask!');
        return;
      } else {
        console.log('We have the Ethereum object', ethereum);
      }

      const accounts = await ethereum.request!({
        method: 'eth_accounts',
      });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log('Found an authorized account: ', account);
        setCurrentAccount(account!);
      } else {
        console.log('No authorized account found');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function connectWallet() {
    try {
      const {ethereum} = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      const accounts = await ethereum.request!({
        method: 'eth_requestAccounts',
      });
      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async function wave() {
    try {
      const {ethereum} = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const signerAddress = await signer.getAddress();

        let count = await wavePortalContract.getTotalWaves();
        let myCount = await wavePortalContract.getWaveCount(signerAddress);
        setWaveCount(count.toNumber());
        setMyWaveCount(myCount.toNumber());
        console.log('Retrieved total wave count...', count.toNumber());

        const waveTxn = await wavePortalContract.wave();
        console.log('Mining...', waveTxn.hash);

        await waveTxn.wait();
        console.log('Mined --', waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        myCount = await wavePortalContract.getWaveCount(signerAddress);
        setWaveCount(count.toNumber());
        setMyWaveCount(myCount.toNumber());
        console.log('Retrieved total wave count...', count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">👋 Hey there!</div>

        <div className="bio">
          I am Jonathan and I worked in data science before becoming a
          full-stack engineer at Caper! Connect your Ethereum wallet and wave at
          me!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>

        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

        <div>Total waves: {waveCount}</div>
        <div>Waves by me: {myWaveCount}</div>
      </div>
    </div>
  );
}

export default App;
