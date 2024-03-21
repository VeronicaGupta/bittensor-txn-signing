import bittensor

#finney network with endpoint wss://entrypoint-finney.opentensor.ai:443
#local network with endpoint ws://127.0.0.1:9946
#test
#archive

subtensor = bittensor.subtensor(network="local", chain_endpoint="ws://127.0.0.1:9946")
# subtensor.chain_endpoint = "ws://127.0.0.1:9946"
# subtensor.get_current_block()

wallet = bittensor.wallet(name="owner")

address = wallet.coldkey.ss58_address

print("wallet address: ", address)
print("current balance: ", subtensor.get_balance(address))