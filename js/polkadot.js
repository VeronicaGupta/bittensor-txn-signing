import { waitReady } from '@polkadot/wasm-crypto';
import Keyring from "@polkadot/keyring";
import { stringToU8a, u8aToHex } from '@polkadot/util';


const run = async () => {
    // first wait until the WASM has been loaded (async init)
    await waitReady();

    // known mnemonic, well, now it is - don't use it for funds
    var MNEMONIC = 'spread sword village control response joke phrase share merit miss door canoe setup surge remind tiger increase sphere busy hand scrap diesel hair bomb';

    MNEMONIC = 'coral range elite raw century ignore nominee oven sock right obey shove';
    // MNEMONIC = 'sample split bamboo west visual approve brain fox arch impact relief smile';

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

    var pair = keyring.createFromUri(MNEMONIC, {name: curve}, curve);
    var ack = keyring.addFromPair(pair)

    // console.log('Keyring ack', ack.isLocked);
    console.log(pair.meta);
    // console.log('Substrate addressRaw', pair.addressRaw);

    // use the default as setup on init
    // 5CSbZ7wG456oty4WoiX6a1J88VUbrCXLhrKVJ9q95BsYH4TZ
    console.log('Substrate generic')
    var address_idx = 42
    printAddr(pair, keyring, address_idx);
    signAndVerify(keyring);
    
    // adjust the default ss58Format for Kusama
    // CxDDSH8gS7jecsxaRL9Txf8H5kqesLXAEAEgp76Yz632J9M
    console.log('Kusama');
    var address_idx = 2;
    printAddr(pair, keyring, address_idx);
    signAndVerify(keyring);

    // adjust the default ss58Format for Polkadot
    // 1NthTCKurNHLW52mMa6iA8Gz7UFYW5UnM3yTSpVdGu4Th7h
    console.log('Polkadot');
    var address_idx = 0;
    printAddr(pair, keyring, address_idx);
    signAndVerify(keyring);
}

const printAddr = async (pair, keyring, address_idx) => {
    // Polkadot addresses always start with the number 1.
    // Kusama addresses always start with a capital letter, such as C, D, F, G, H, J.
    // Generic Substrate addresses always start with the number 5.
    
    keyring.setSS58Format(address_idx);
    console.log(pair.address);
    decodeAddr(pair, keyring, pair.address)
    encodeAddr(pair, keyring, 42);
}

const decodeAddr = async (pair, keyring, address) => {
    console.log("public key: ", pair.publicKey);
    console.log("decodeAddr: ", keyring.decodeAddress(address));
}

const encodeAddr = async (pair, keyring, address_idx) => {
    console.log("encodeAddr: ", keyring.encodeAddress(pair.publicKey, address_idx));
}

const signAndVerify = async (keyring) => {
    // create Alice based on the development seed
    const alice = keyring.addFromUri('//Alice');

    // create the message, actual signature and verify
    const message = stringToU8a('this is our message');
    const signature = alice.sign(message);
    const isValid = alice.verify(message, signature, alice.publicKey);

    // output the result
    console.log(`${u8aToHex(signature)} is ${isValid ? 'valid' : 'invalid'}`);
}

run();