import {ethers} from 'ethers';

import abi from './WavePortal.json';

export const contractAddress = '0x4039fF1892eefc77a217Da83702813f430Dad08e';
export const contractABI = abi.abi;

export interface CleanedWave {
  address: string;
  message: string;
  timestamp: Date;
}

export interface Wave {
  waver: string;
  message: string;
  blockNumber: ethers.BigNumber;
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
        const block = await provider.getBlock(wave.blockNumber.toNumber());

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
    console.error(error);
    return [];
  }
}
