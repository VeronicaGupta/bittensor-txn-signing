import bittensor
# Bittensor's wallet maintenance class.
wallet = bittensor.wallet() 
# Access the hotkey
wallet.hotkey 
# Access the coldkey
wallet.coldkey

# Sign data with the keypair.
wallet.coldkey.sign())
