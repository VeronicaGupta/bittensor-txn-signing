# Python Substrate Interface Library
#
# Copyright 2018-2023 Stichting Polkascan (Polkascan Foundation).
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from substrateinterface import SubstrateInterface, Keypair, KeypairType
from substrateinterface.exceptions import SubstrateRequestException
from scalecodec.base import ScaleBytes
import ed25519_zebra
import binascii

# import logging
# logging.basicConfig(level=logging.DEBUG)

substrate = SubstrateInterface(url="wss://westend-rpc.polkadot.io")
keypair = Keypair.create_from_uri('spread sword village control response joke phrase share merit miss door canoe setup surge remind tiger increase sphere busy hand scrap diesel hair bomb', 42, KeypairType.ED25519)
print("address :", keypair.ss58_address)
print("secret key :", binascii.hexlify(keypair.private_key).decode())
print("public key :", binascii.hexlify(keypair.public_key).decode())

call = substrate.compose_call(
    call_module='Balances',
    call_function='transfer_keep_alive',
    call_params={
        'dest': '5CSbZ7wG456oty4WoiX6a1J88VUbrCXLhrKVJ9q95BsYH4TZ',
        'value': 12345
    }
)
print(call.data.to_hex())
nonce = substrate.get_account_nonce(keypair.ss58_address) or 0

print("nonce :", nonce, type(nonce))

data = substrate.generate_signature_payload(
                call=call, nonce=nonce, tip=0, tip_asset_id=0
            )

data_before = data

if type(data) is ScaleBytes:
    data = bytes(data.data)
    print("imp scale")
elif data[0:2] == '0x':
    data = bytes.fromhex(data[2:])
    print("imp 0x")
elif type(data) is str:
    data = data.encode()
    print("imp str")
    
data_after = binascii.hexlify(data).decode()

# if data.data == data_after:
#     print("data same after encoding: ", data_after)
# else:
print("unsigned txn:", data_before, data_after)

# manual
signature = ed25519_zebra.ed_sign(keypair.private_key, data)
print("sig manual :", binascii.hexlify(signature).decode())
            
# func
signature = keypair.sign(data)
print("sig func :", binascii.hexlify(signature).decode())

extrinsic = substrate.create_signed_extrinsic(
    call=call,
    keypair=keypair,
    nonce=nonce,
    signature=f'0x00{signature.hex()}'
)

try:
    receipt = substrate.submit_extrinsic(extrinsic, wait_for_inclusion=True)

    print('Extrinsic "{}" included in block "{}"'.format(
        receipt.extrinsic_hash, receipt.block_hash
    ))

    if receipt.is_success:

        print('✅ Success, triggered events:')
        for event in receipt.triggered_events:
            print(f'* {event.value}')

    else:
        print('⚠️ Extrinsic Failed: ', receipt.error_message)


except SubstrateRequestException as e:
    print("Failed to send: {}".format(e))
