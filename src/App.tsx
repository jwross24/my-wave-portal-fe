import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';
import './App.css';

function App() {
  const [currentAccount, setCurrentAccount] = useState<string>('');

  async function checkIfWalletIsConnected() {
    try {
      const {ethereum} = window;

      if (!ethereum) {
        console.log('Make sure you have MetaMask!');
        return;
      } else {
        console.log('We have the Ethereum object', ethereum);
      }

      const accounts = await ethereum.request<string[]>({
        method: 'eth_accounts',
      });

      if (accounts && accounts.length !== 0) {
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

      const accounts = await ethereum.request<string[]>({
        method: 'eth_requestAccounts',
      });

      if (accounts && accounts.length !== 0) {
        console.log('Connected', accounts[0]);
        setCurrentAccount(accounts[0] || '');
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

        <button className="waveButton" onClick={() => {}}>
          Wave at Me
        </button>

        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
