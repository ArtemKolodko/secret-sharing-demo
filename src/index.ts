import Web3 from 'web3'
import { Crypto } from './utils/crypto'
import {curve} from "./utils/curve";

const crypto = new Crypto()
const web3 = new Web3()

const run = () => {
  const { privateKey } = crypto.generateKeyPair()

  // Step 1: create private key
  const privateKeyHex = curve.keyFromPrivate(privateKey).getPrivate('hex')
  console.log('Private key:', privateKeyHex)

  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  console.log('Account address:', account.address)

  // Step 2: split private key to 3 pieces
  const splitKeys = crypto.splitPrivateKey(privateKey, 3, 5)

  // Step 3: restore private key from 3 random parts
  const restoredPrivateKey = crypto.restorePrivateKey([splitKeys[0], splitKeys[2], splitKeys[3]])
  console.log('Restored private key:', curve.keyFromPrivate(restoredPrivateKey).getPrivate('hex'))
}

run()
