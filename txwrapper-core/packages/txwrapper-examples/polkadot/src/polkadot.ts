/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * @ignore Don't show this file in documentation.
 */

import {
	construct,
	// decode,
	deriveAddress,
	getRegistry,
	methods,
	PolkadotSS58Format,
 	createMetadata, 
	OptionsWithMeta 
} from '@substrate/txwrapper-polkadot';


// Import
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';

const convertToJson = (data: any) => JSON.parse(JSON.stringify(data));

async function main(): Promise<void> {
	// Construct
	const wsProvider = new WsProvider('wss://westend-rpc.polkadot.io');
	const api = await ApiPromise.create({ provider: wsProvider });

	const dest = '5CSbZ7wG456oty4WoiX6a1J88VUbrCXLhrKVJ9q95BsYH4TZ';
	const amount = 123; // WND

	const blockNumber:number = convertToJson(await api.rpc.chain.getBlock()).block.header.number;
	const blockHash = (await api.rpc.chain.getBlockHash(blockNumber)).toHex();
	const genesisHash = api.genesisHash.toHex()
	const metadataRpc:any = convertToJson(await api.rpc("state_getMetadata"));
	const { specVersion, transactionVersion, specName }:any = await api.rpc.state.getRuntimeVersion();

	// Retrieve the chain & node information via rpc calls
	const [chain, nodeName, nodeVersion] = await Promise.all([
		api.rpc.system.chain(),
		api.rpc.system.name(),
		api.rpc.system.version()
	]);

	// console.log({blockNumber});
	// console.log({blockHash});
	// console.log({genesisHash});
	console.log({metadataRpc});
	console.log({specName});
	console.log({specVersion});
	console.log(chain.toString());
	console.log(nodeName.toString());
	console.log(nodeVersion.toString());
	
	// console.log("Substring in:", metadataRpc.indexOf("00171efe"));

	// metadataRpc.magicNumber = 0x6174656d;

	const registry = getRegistry({
		chainName: chain.toString(),
		specName: specName,
		specVersion: specVersion,
		metadataRpc: metadataRpc
	});

	
	// console.log({registry});

	// Get address
	const keyring = new Keyring();
	// // const pair = keyring.addFromUri('sample splitBob bamboo west visual approve brain fox arch impact relief smile', { name: 'mnemonic' }, 'ed25519');
	const pair = keyring.addFromUri('spread sword village control response joke phrase share merit miss door canoe setup surge remind tiger increase sphere busy hand scrap diesel hair bomb', { name: 'mnemonic' }, 'ed25519');
	const publicKey = Buffer.from(pair.publicKey).toString('hex');
	console.log(`\nPublic Key expected: ${publicKey}`);
	const addressBit = deriveAddress(pair.publicKey, PolkadotSS58Format.substrate);
	console.log(`\nAddress expected: ${addressBit}`);

	const nonce:number = await api.call.accountNonceApi.accountNonce(addressBit);
	console.log({nonce});

	// Retrieve the last timestamp, nonce and data.free balance
	// const now = await api.query.timestamp.now();
	// const state = await api.query.system.account(addressBit);
	// console.log(`${now}: balance and nonce:`, {state});

	// const nonce = await api.rpc.system.accountNextIndex(addressBit).toNumber()
	// console.log({nonce});

	// Construct unsigned payload
	const unsigned = methods.balances.transferKeepAlive(
		{
			value: amount,
			dest: { id: dest },
		},
		{
			address: addressBit,
			blockHash,
			blockNumber,
			eraPeriod: 4,
			genesisHash,
			metadataRpc,
			nonce,
			specVersion,
			tip: 0,
			transactionVersion,
		},
		{
			metadataRpc,
			registry,
		},
	);	

	console.log({unsigned});

	// Decode an unsigned transaction.
	// const decodedUnsigned = decode(unsigned, {
	//   metadataRpc,
	//   registry,
	// });
	// console.log(
	//   `\nDecoded Transaction\n  To: ${
	// 	(decodedUnsigned.method.args.dest)
	//   }\n  Amount: ${decodedUnsigned.method.args.value}`,
	// );
	
	// Important! The registry needs to be updated with latest metadata, so make
	// sure to run `registry.setMetadata(metadata)` before signing.
	registry.setMetadata(createMetadata(registry, metadataRpc));
  
	// Construct the signing payload from an unsigned transaction.
	const signingPayload = construct.signingPayload(unsigned, { registry });
	console.log(`\nPayload to Sign: ${signingPayload}`);
  
	// // Decode the information from a signing payload.
	// const payloadInfo = decode(signingPayload, {
	//   metadataRpc,
	//   registry,
	// });
	// console.log(
	//   `\nDecoded Transaction\n  To: ${
	// 	(payloadInfo.method.args.address as { id: string }).id
	//   }\n  Amount: ${payloadInfo.method.args.value}`,
	// );
  
	// Signature verify
	const signature = signWith(pair, signingPayload, {
		metadataRpc,
		registry,
	});
	console.log(`\nSignature expected: ${signature}`);

	console.log(`\nDestination address: ${dest}`);
	console.log(`\nAmount: ${amount}`);

	// Expected Serialize a signed transaction.
	const tx = construct.signedTx(unsigned, signature, {
		metadataRpc,
		registry,
	});
	console.log(`\nTransaction to Expected Submit: ${tx}`);

	// // Derive the tx hash of a signed transaction offline and through rpc
	const expectedTxHash = construct.txHash(tx);
	console.log(`\nTx Hash expected: ${expectedTxHash}`);
	const actualTxHashdevice = await api.rpc.author.submitExtrinsic(tx);
	console.log(`Tx Hash actual device: ${actualTxHashdevice}`);

	// // Decode a signed payload.
	// const txInfo = decode(tx, {
	// 	metadataRpc,
	// 	registry,
	// });
	// console.log(
	// 	`\nDecoded Transaction\n  To: ${
	// 		(txInfo.method.args.dest as { id: string }).id
	// 	}\n  Amount: ${txInfo.method.args.value}\n`,
	// );


	// // Create a extrinsic, transferring 12345 units to Bob
	// const transfer = api.tx.balances.transferKeepAlive("5CSbZ7wG456oty4WoiX6a1J88VUbrCXLhrKVJ9q95BsYH4TZ", 12*10**12);
	// // Sign and send the transaction using our account
	// const hash = await transfer.signAndSend(addressBit, signature);  
	// console.log('Transfer sent with hash', hash.toHex());
}

import { KeyringPair } from '@polkadot/keyring/types';
import { 
  EXTRINSIC_VERSION } from '@polkadot/types/extrinsic/v4/Extrinsic';

function signWith(
	pair: KeyringPair,
	signingPayload: string,
	options: OptionsWithMeta,
  ): `0x${string}` {
	const { registry } = options;
  
	const { signature } = registry
	  .createType('ExtrinsicPayload', signingPayload, {
		version: EXTRINSIC_VERSION,
	  })
	  .sign(pair);
  
	return signature as unknown as `0x${string}`;
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
