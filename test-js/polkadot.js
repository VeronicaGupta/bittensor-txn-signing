import { waitReady } from '@polkadot/wasm-crypto';
import Keyring from "@polkadot/keyring";

const run = async () => {
    // first wait until the WASM has been loaded (async init)
    await waitReady();

    // known mnemonic, well, now it is - don't use it for funds
    const MNEMONIC = 'spread sword village control response joke phrase share merit miss door canoe setup surge remind tiger increase sphere busy hand scrap diesel hair bomb';

    // type: sr25519, ssFormat: 42
    const keyring = new Keyring();
    const pair = keyring.createFromUri(MNEMONIC, {name: 'temp'}, 'sr25519');
    console.log(keyring.addFromPair(pair))
    // 5FLiLdaQQiW7qm7tdZjdonfSV8HAcjLxFVcqv9WDbceTmBXA
    console.log('Substrate generic', pair.address);
    console.log('Substrate generic', pair.derive());
}

run();