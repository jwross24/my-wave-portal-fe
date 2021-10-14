import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import LoadingButton, {LoadingButtonProps} from '@mui/lab/LoadingButton';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import {MessageInput} from './MessageInput';
import {WavesTable} from './WavesTable';
import theme from '../styles/theme';
import abi from '../utils/WavePortal.json';
import {CleanedWave, getAllWaves} from '../utils/wavePortal';

const StyledLoadingButton = styled(LoadingButton)<LoadingButtonProps>(
  ({theme}) => ({
    cursor: 'pointer',
    mt: theme.spacing(2),
    padding: theme.spacing(1),
  })
);

function HomePage() {
  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [waveCount, setWaveCount] = useState<number>(0);
  const [myWaveCount, setMyWaveCount] = useState<number>(0);
  const [allWaves, setAllWaves] = useState<CleanedWave[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState('');

  const contractAddress = '0xFb7e7098fB41D83D4DB8A85e0f995e16bAd4E0EC';
  const contractABI = abi.abi;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMessage(event.target.value);
  }

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
        setCurrentAccount(account);
        const allWaves = await getAllWaves();
        setAllWaves(allWaves);
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

      setIsLoading(true);
      const accounts = await ethereum.request!({
        method: 'eth_requestAccounts',
      });
      console.log('Connected', accounts[0]);
      setIsLoading(false);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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

        setIsLoading(true);
        const waveTxn = await wavePortalContract.wave(message);
        console.log('Mining...', waveTxn.hash);

        await waveTxn.wait();
        console.log('Mined --', waveTxn.hash);
        setIsLoading(false);

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
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        background: 'linear-gradient(to right bottom, #430089, #82ffa1)',
        minHeight: '100vh',
        borderRadius: 0,
      }}
    >
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Card
            sx={{
              mt: theme.spacing(8),
              pt: theme.spacing(4),
              maxWidth: 600,
              maxHeight: 400,
            }}
          >
            <Typography variant="h3" sx={{textAlign: 'center'}}>
              👋 Nice to meet you!
            </Typography>

            <CardContent
              sx={{
                display: 'flex-column',
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="body1"
                color={theme.palette.text.secondary}
                sx={{
                  textAlign: 'center',
                  mt: theme.spacing(2),
                }}
              >
                I am Jonathan and I worked in data science before becoming a
                full-stack engineer at Caper! Connect your Ethereum wallet and
                wave at me!
              </Typography>

              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{mt: theme.spacing(1.5)}}
              >
                {currentAccount && (
                  <Grid item xs={12}>
                    <StyledLoadingButton
                      size="large"
                      loading={isLoading}
                      disabled={!currentAccount}
                      variant="contained"
                      onClick={wave}
                    >
                      Wave at Me
                    </StyledLoadingButton>
                  </Grid>
                )}

                {!currentAccount && (
                  <Grid item xs={12}>
                    <StyledLoadingButton
                      size="large"
                      variant="contained"
                      onClick={connectWallet}
                    >
                      Connect Wallet
                    </StyledLoadingButton>
                  </Grid>
                )}

                {currentAccount && (
                  <Grid item xs={6}>
                    <MessageInput value={message} handleChange={handleChange} />
                  </Grid>
                )}
              </Grid>
              <Grid container sx={{mt: theme.spacing(8)}}>
                <Grid item xs={6}>
                  <Typography variant="h5">Total waves:</Typography>{' '}
                  <Typography variant="body1">{waveCount}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h5">Waves by me:</Typography>{' '}
                  <Typography variant="body1">{myWaveCount}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <WavesTable allWaves={allWaves} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default HomePage;
