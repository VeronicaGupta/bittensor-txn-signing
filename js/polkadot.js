import { waitReady } from '@polkadot/wasm-crypto';
import Keyring, { setSS58Format } from "@polkadot/keyring";
import { stringToU8a, u8aToHex } from '@polkadot/util';

// https://polkadot.js.org/docs/keyring/start/ss58
const run = async () => {
    // first wait until the WASM has been loaded (async init)
    await waitReady();

    // known mnemonic, well, now it is - don't use it for funds
    var MNEMONIC = 'spread sword village control response joke phrase share merit miss door canoe setup surge remind tiger increase sphere busy hand scrap diesel hair bomb';

    MNEMONIC = 'coral range elite raw century ignore nominee oven sock right obey shove';
    MNEMONIC = 'sample split bamboo west visual approve brain fox arch impact relief smile';

    var curve = 'sr25519'; // supported by bittensor
    pairInfo(MNEMONIC, curve);
    curve = 'ecdsa';       // supported by bittensor
    pairInfo(MNEMONIC, curve);
    curve = 'ethereum';  
    pairInfo(MNEMONIC, curve);
    curve = 'ed25519';     // supported by bittensor
    pairInfo(MNEMONIC, curve);
}

const pairInfo = async (MNEMONIC, curve) => {
    const keyring = new Keyring();

    var pair = keyring.createFromUri(MNEMONIC, {curve: curve}, curve);

    // console.log('Keyring ack', ack.isLocked);
    // console.log('Substrate addressRaw', pair.addressRaw);

    // use the default as setup on init
    // 5FLiLdaQQiW7qm7tdZjdonfSV8HAcjLxFVcqv9WDbceTmBXA 
    console.log('\nSubstrate', pair.meta); // default/generic
    var address_prefix = 42
    printAddr(pair, keyring, address_prefix);
    signAndVerify(keyring, MNEMONIC);
    
    // adjust the default ss58Format for Kusama
    // CxDDSH8gS7jecsxaRL9Txf8H5kqesLXAEAEgp76Yz632J9M
    console.log('\nKusama', pair.meta);
    var address_prefix = 2;
    printAddr(pair, keyring, address_prefix);
    signAndVerify(keyring, MNEMONIC);

    // adjust the default ss58Format for Polkadot
    // 1NthTCKurNHLW52mMa6iA8Gz7UFYW5UnM3yTSpVdGu4Th7h
    console.log('\nPolkadot', pair.meta);
    var address_prefix = 0;
    printAddr(pair, keyring, address_prefix);
    signAndVerify(keyring, MNEMONIC);
}

const printAddr = async (pair, keyring, address_prefix) => {
    // Polkadot addresses always start with the number 1.
    // Kusama addresses always start with a capital letter, such as C, D, F, G, H, J.
    // Generic Substrate addresses always start with the number 5.
    
    keyring.setSS58Format(address_prefix);

    console.log("public key : ", u8aToHex(pair.publicKey));
    decodeAddr(pair, keyring, pair.address);

    const isValid = isValidAddressPolkadotAddress(pair.address);
    console.log("address    : ", pair.address, isValid);
    encodeAddr(pair, keyring, address_prefix);
}

const decodeAddr = async (pair, keyring, address) => {
    console.log("decode addr: ", u8aToHex(keyring.decodeAddress(address)));
}

const encodeAddr = async (pair, keyring, address_idx) => {
    console.log("encode addr: ", keyring.encodeAddress(pair.publicKey, address_idx));
}

const signAndVerify = async (keyring, MNEMONIC) => {
    // create Alice based on the development seed
    const path = ""
	const alice = keyring.addFromUri(MNEMONIC+path, { name: 'Alice default' });

    // create the message, actual signature and verify
    const message = stringToU8a('this is our message');
    const signature =  alice.sign(message)
    const isValid   = alice.verify(message, signature, alice.publicKey);

    // output the result
    console.log(`signature  :  ${u8aToHex(signature)} is ${isValid ? 'valid' : 'invalid'}`);
    console.log(`alice Key  :  ${u8aToHex(alice.publicKey)}`);

}

import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { hexToU8a, isHex } from '@polkadot/util';

const isValidAddressPolkadotAddress = async (address) => {
  try {
    encodeAddress(
      isHex(address)
        ? hexToU8a(address)
        : decodeAddress(address)
    );

    return true;
  } catch (error) {
    return false;
  }
};

run();