import bittensor
wallet = bittensor.wallet()
wallet.create_new_coldkey()
wallet.create_new_hotkey()
print (wallet)

'''
python wallet.py 

IMPORTANT: Store this mnemonic in a secure (preferable offline place), as anyone who has possession of this mnemonic can use it to regenerate the key and access your tokens. 

The mnemonic to the new coldkey is:

coral range elite raw century ignore nominee oven sock right obey shove

You can use the mnemonic to recreate the key in case it gets lost. The command to use to regenerate the key using this mnemonic is:
btcli w regen_coldkey --mnemonic coral range elite raw century ignore nominee oven sock right obey shove

Specify password for key encryption: 
Retype your password: 

IMPORTANT: Store this mnemonic in a secure (preferable offline place), as anyone who has possession of this mnemonic can use it to regenerate the key and access your tokens. 

The mnemonic to the new hotkey is:

antique attend right expand napkin champion tilt real fan chuckle cliff shoulder

You can use the mnemonic to recreate the key in case it gets lost. The command to use to regenerate the key using this mnemonic is:
btcli w regen_hotkey --mnemonic antique attend right expand napkin champion tilt real fan chuckle cliff shoulder

wallet(default, default, ~/.bittensor/wallets/)
'''