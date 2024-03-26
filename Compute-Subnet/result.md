# Create a coldkey for your owner wallet.
btcli wallet new_coldkey --wallet.name owner

# Create a coldkey and hotkey for your miner wallet.
btcli wallet new_coldkey --wallet.name miner
btcli wallet new_hotkey --wallet.name miner --wallet.hotkey default

# Create a coldkey and hotkey for your validator wallet.
btcli wallet new_coldkey --wallet.name validator
btcli wallet new_hotkey --wallet.name validator --wallet.hotkey default

IMPORTANT: Store this mnemonic in a secure (preferable offline place), as anyone who has possession of this mnemonic can use it to regenerate the key and access your tokens. 

The mnemonic to the new coldkey is:

inspire celery wasp project demise utility noble comfort two arctic mystery tomato

You can use the mnemonic to recreate the key in case it gets lost. The command to use to regenerate the key using this mnemonic is:
btcli w regen_coldkey --mnemonic inspire celery wasp project demise utility noble comfort two arctic mystery tomato

Specify password for key encryption: 
Retype your password: 

IMPORTANT: Store this mnemonic in a secure (preferable offline place), as anyone who has possession of this mnemonic can use it to regenerate the key and access your tokens. 

The mnemonic to the new coldkey is:

curtain sell rubber glide lucky chalk decorate worth upon often sure frog

You can use the mnemonic to recreate the key in case it gets lost. The command to use to regenerate the key using this mnemonic is:
btcli w regen_coldkey --mnemonic curtain sell rubber glide lucky chalk decorate worth upon often sure frog

Specify password for key encryption: 
Retype your password: 

IMPORTANT: Store this mnemonic in a secure (preferable offline place), as anyone who has possession of this mnemonic can use it to regenerate the key and access your tokens. 

The mnemonic to the new hotkey is:

february build smooth gospel material dial palace vintage scan match summer useful

You can use the mnemonic to recreate the key in case it gets lost. The command to use to regenerate the key using this mnemonic is:
btcli w regen_hotkey --mnemonic february build smooth gospel material dial palace vintage scan match summer useful


IMPORTANT: Store this mnemonic in a secure (preferable offline place), as anyone who has possession of this mnemonic can use it to regenerate the key and access your tokens. 

The mnemonic to the new coldkey is:

tent time catalog brush blur love rubber emerge point gap venue capital

You can use the mnemonic to recreate the key in case it gets lost. The command to use to regenerate the key using this mnemonic is:
btcli w regen_coldkey --mnemonic tent time catalog brush blur love rubber emerge point gap venue capital

Specify password for key encryption: 
Retype your password: 

IMPORTANT: Store this mnemonic in a secure (preferable offline place), as anyone who has possession of this mnemonic can use it to regenerate the key and access your tokens. 

The mnemonic to the new hotkey is:

border illness notice quick draw upgrade world grant student cruise polar beach

You can use the mnemonic to recreate the key in case it gets lost. The command to use to regenerate the key using this mnemonic is:
btcli w regen_hotkey --mnemonic border illness notice quick draw upgrade world grant student cruise polar beach

***********************************

## Process 
// Create a coldkey for the owner role
command: btcli wallet new_coldkey --wallet.name owner

wallet name: Owner
coldkey: tragic mother palace choice item dance giggle also roof fine melt admit
ss58addr: 5DZwX5ZoK5vBPiaeuHZmJdzir7noN1jZHZcZ23bzkMASrNWt

// create subtensor local testing chain
command: https://github.com/neuralinternet/compute-subnet/blob/main/docs/running_on_staging.md

// register owner
command: btcli wallet faucet --wallet.name owner --subtensor.chain_endpoint ws://127.0.0.1:9944
output:
 coldkey:    5DZwX5ZoK5vBPiaeuHZmJdzir7noN1jZHZcZ23bzkMASrNWt
 network:    local [y/n]: y
Enter password to unlock key: 
Balance: τ300.000000000 ➡ τ400.000000000


// create miner

command: btcli wallet new_coldkey --wallet.name miner
coldkey: reunion suggest parent science base blood myself kiss rescue gift armed fiber

command: btcli wallet new_hotkey --wallet.name miner --wallet.hotkey default
hotkey: coil music admit include tomorrow always broccoli loop hurt car coyote text


// create validator

command: btcli wallet new_coldkey --wallet.name validator
coldkey: enact alarm seek hazard crunch spread army blur file brisk inch truth

command: btcli wallet new_hotkey --wallet.name validator --wallet.hotkey default
hotkey: walnut bless liar rebel soda figure fork nice wage rely ability glare

Wallets
├── 
│   validator (5DPRWV3M7qqRobSzJoGaGFhKjMLfn4Dm2Y7P5ovZBhsFfDC8)
│   └── default (5EPTn3fMyunwVGSpZZW8DXcLZd9JFs7JNJctWXyAU4mxDggk)
├── 
│   owner (5DZwX5ZoK5vBPiaeuHZmJdzir7noN1jZHZcZ23bzkMASrNWt)
└── 
    miner (5Dy64GDHuP5UhQGpxzDaG2m1V456maAFPnhFceBFeo3118Tv)
    └── default (5GmnJG6dn5aDp7vsdZtCZrCiq7KG5CbzcZ1EMnxVcpPcLTML)


// Fund Transfer
command: btcli wallet transfer --subtensor.chain_endpoint ws://127.0.0.1:9944
Enter wallet name (default): miner
Enter destination public key: (ss58 or ed2519): 5EPTn3fMyunwVGSpZZW8DXcLZd9JFs7JNJctWXyAU4mxDggk
Balance: τ300.000000000
Enter TAO amount to transfer: 20
Enter password to unlock key: 
Do you want to transfer:
  amount: τ20.000000000
  from: miner:5Dy64GDHuP5UhQGpxzDaG2m1V456maAFPnhFceBFeo3118Tv
  to: 5EPTn3fMyunwVGSpZZW8DXcLZd9JFs7JNJctWXyAU4mxDggk
  for fee: τ0.000000145 [y/n]: y
✅ Finalized
Block Hash: 0xb5c3b8576986fc3652de5447475ed013195d475a90fed07f45b7cbd0132af1de
Opentensor Explorer Link: 
https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fentrypoint-finney.opentensor.ai%3A443#/explorer/query/0xb5c3b8576986fc3652de5447475ed013195d475a90fed07f45b7cbd0132af1de
Taostats   Explorer Link: https://x.taostats.io/extrinsic/0xb5c3b8576986fc3652de5447475ed013195d475a90fed07f45b7cbd0132af1de
Balance:
  τ300.000000000 ➡ τ279.999999855


// Check wallet details
command: btcli wallet overview --wallet.name validator --subtensor.chain_endpoint ws://127.0.0.1:9944
output: 
 coldkey:    5DZwX5ZoK5vBPiaeuHZmJdzir7noN1jZHZcZ23bzkMASrNWt
 network:    local [y/n]: y
Enter password to unlock key: 
Wallet - validator:5DPRWV3M7qqRobSzJoGaGFhKjMLfn4Dm2Y7P5ovZBhsFfDC8
                      Wallet balance: τ600.0  


// Register keys of miner and validator

command: btcli subnet register --wallet.name miner --wallet.hotkey default --subtensor.chain_endpoint ws://127.0.0.1:9944

output:
Enter netuid [0/1/3] (0): 1
Your balance is: τ279.999999855
The cost to register by recycle is τ1.000000000
Do you want to continue? [y/n] (n): y
Enter password to unlock key: 
Recycle τ1.000000000 to register on subnet:1? [y/n]: y
📡 Checking Balance...
Balance:
  τ279.999999855 ➡ τ278.999999855
✅ Registered

command: btcli subnet register --wallet.name validator --wallet.hotkey default --subtensor.chain_endpoint ws://127.0.0.1:9944

output:
Enter netuid [0/1/3] (0): 1
Your balance is: τ600.000000000
The cost to register by recycle is τ1.000000000
Do you want to continue? [y/n] (n): y
Enter password to unlock key: 
Recycle τ1.000000000 to register on subnet:1? [y/n]: y
📡 Checking Balance...
Balance:
  τ600.000000000 ➡ τ599.000000000
✅ Registered


// Validate/List key registrations

btcli subnet list --subtensor.chain_endpoint ws://127.0.0.1:9944
                                              Subnets - local                                               
 NETUID   N    MAX_N   EMISSION  TEMPO  RECYCLE     POW    SUDO                                             
   0      0    64.00    0.00%     100   τ1.00000  10.00 M  5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM 
   1      2    256.00   0.00%     360   τ1.00000  10.00 M  5DZwX5ZoK5vBPiaeuHZmJdzir7noN1jZHZcZ23bzkMASrNWt 
   3      0    4.10 K   0.00%     99    τ1.00000  10.00 M  5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM 
   3     4416    


// Staking

command: btcli stake add --wallet.name validator --wallet.hotkey default --subtensor.chain_endpoint ws://127.0.0.1:9944

Stake all Tao from account: 'validator'? [y/n]: n
Enter Tao amount to stake: 123
100%|█| 1/1 [00:00<00:00, 369.41it/s]
Do you want to stake to the following keys from validator:
    - default:5EPTn3fMyunwVGSpZZW8DXcLZd9JFs7JNJctWXyAU4mxDggk: 123.0 τ
 [y/n]: y
Enter password to unlock key: 
Do you want to stake:
  amount: τ122.999999000
  to: default [y/n]: y
✅ Finalized
Balance:
  τ599.000000000 ➡ τ476.000001000
Stake:
  τ0.000000000 ➡ τ122.999999000


// Check operations details

command: btcli stake add --wallet.name minor --wallet.hotkey default --subtensor.chain_endpoint ws://127.0.0.1:9944

output:
                       Wallet - miner:5Dy64GDHuP5UhQGpxzDaG2m1V456maAFPnhFceBFeo3118Tv                                                     
Subnet: 1                                                                                                                                                               
COLDKEY  HOTKEY   UID  ACTIVE  STAKE(τ)     RANK    TRUST  CONSENSUS  INCENTIVE  DIVIDENDS  EMISSION(ρ)   VTRUST  VPERMIT  UPDATED  AXON  HOTKEY_SS58                   
miner    default  0      True   0.00000  0.00000  0.00000    0.00000    0.00000    0.00000            0  0.00000                45  none  5GmnJG6dn5aDp7vsdZtCZrCiq7KG5…
1        1        1            τ0.00000  0.00000  0.00000    0.00000    0.00000    0.00000           ρ0  0.00000                                                        
                                                                     Wallet balance: τ278.999999855 




command: btcli stake add --wallet.name validator --wallet.hotkey default --subtensor.chain_endpoint ws://127.0.0.1:9944

output:
                         Wallet - validator:5DPRWV3M7qqRobSzJoGaGFhKjMLfn4Dm2Y7P5ovZBhsFfDC8                                                   
Subnet: 1                                                                                                                                                               
COLDKEY    HOTKEY   UID  ACTIVE    STAKE(τ)     RANK    TRUST  CONSENSUS  INCENTIVE  DIVIDENDS  EMISSION(ρ)   VTRUST  VPERMIT  UPDATED  AXON  HOTKEY_SS58               
validator  default  1      True   123.00000  0.00000  0.00000    0.00000    0.00000    0.00000            0  0.00000                38  none  5EPTn3fMyunwVGSpZZW8DXcLZ…
1          1        1            τ123.00000  0.00000  0.00000    0.00000    0.00000    0.00000           ρ0  0.00000                                                    
                                                                      Wallet balance: τ476.000001  