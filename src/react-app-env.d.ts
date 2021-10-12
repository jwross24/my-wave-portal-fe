/// <reference types="react-scripts" />

// eslint-disable-next-line node/no-unpublished-import
import {MetaMaskInpageProvider} from '@metamask/providers';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}
