import bittensor as bt

# Creating metagraph and sync state from a netuid parameter, defaults to connecting to network `finney`
metagraph = bt.metagraph( netuid = 1 )

# Create metagraph and sync with lite = False to sync weights and bonds matrices.
metagraph = bt.metagraph( netuid = 1, lite = False)

# Create metagraph and sync state from local entrypoint, assuming a subtensor chain is currently running.
metagraph = bt.metagraph( netuid = 1, network = 'local' )

# Create an empty metagraph object with no state syncing.
metagraph = bt.metagraph( netuid = 1, sync = False )

# Sync the metagraph at a particular block
metagraph.sync( block = 100000 )

# Save the metagraph to ~/.bittensor/metagraphs/network-$NETWORK_NAME/netuid-#NETUID/block-$BLOCK.pt
metagraph.save()

# Load the latest metagraph by block.
metagraph.load()