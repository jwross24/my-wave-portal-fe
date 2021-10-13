import {ethers} from 'ethers';

import abi from './WavePortal.json';

const contractAddress = '0xFb7e7098fB41D83D4DB8A85e0f995e16bAd4E0EC';
const contractABI = abi.abi;

export interface CleanedWave {
  address: string;
  message: string;
  timestamp: Date;
}

export interface Wave {
  waver: string;
  message: string;
  timestamp: ethers.BigNumber;
}

export async function getAllWaves() {
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

      const waves: Wave[] = await wavePortalContract.getAllWaves();

      const promises = waves.map(async wave => {
        const block = await provider.getBlock(wave.timestamp.toNumber());

        return {
          address: wave.waver,
          message: wave.message,
          timestamp: new Date(block.timestamp * 1000),
        };
      });
      return Promise.all(promises);
    } else {
      console.log("Ethereum object doesn't exist!");
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}
