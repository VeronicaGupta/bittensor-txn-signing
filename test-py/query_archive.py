
import bittensor as bt
meta = bt.subtensor('archive').metagraph(netuid=0, block=145)
print(meta)
