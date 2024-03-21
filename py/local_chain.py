import bittensor as bt
meta = bt.subtensor('archive').metagraph(netuid=0, block=145)
print(meta)

# Creating a default chain connection to remote finney instance.
sub = bt.subtensor()

# Parsing --subtensor.network and --subtensor.chain_endpoint from the command line
sub = bt.subtensor( config = bt.subtensor.config() )

# Connecting subtensor's default local entrypoint "ws://127.0.0.1:9944"
sub = bt.subtensor( network = 'local' )

# Connecting to a specific endpoint
sub = bt.subtensor( chain_endpoint = "ws://127.0.0.1:9944" )

# Turn on debug logs
bt.debug()

# Turn on trace logs
bt.trace()

# Turn off debug logs
bt.set_debug(False)

# Turn off trace logs
bt.set_trace(False)

# Turn on logging from class definition
bt.logging( set_debug = True )

# Instantiate logging from command line args
bt.logging( bt.logging.config() )

# Turn on logging to file
bt.logging( record_log = True, logging_dir = './logs' )

# Log
bt.logging.info(message)
bt.logging.debug(message)
bt.logging.trace(message)
bt.logging.success(message)
bt.logging.critical(message)
bt.logging.error(message)

obj = bt.subtensor( config, network, chain_endpoint )