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


# import logging
# logging.basicConfig(level=logging.DEBUG)

substrate = SubstrateInterface(url="wss://westend-rpc.polkadot.io")
keypair = Keypair.create_from_uri('spread sword village control response joke phrase share merit miss door canoe setup surge remind tiger increase sphere busy hand scrap diesel hair bomb', ss58_format=substrate.ss58_format)
print(keypair.ss58_address)

call = substrate.compose_call(
    call_module='Balances',
    call_function='transfer_keep_alive',
    call_params={
        'dest': '5CSbZ7wG456oty4WoiX6a1J88VUbrCXLhrKVJ9q95BsYH4TZ',
        'value': 12345
    }
)

print(call.data.to_hex())

data = substrate.generate_signature_payload(
                call=call, era=64, nonce=2, tip=0, tip_asset_id=0
            )

print("data before :", data)

# Set Signature version to crypto type of keypair
signature_version = keypair.crypto_type

if type(data) is ScaleBytes:
    data = bytes(data.data)
elif data[0:2] == '0x':
    data = bytes.fromhex(data[2:])
elif type(data) is str:
    data = data.encode()
    
print("data after :", data)

crypto_type = KeypairType.ED25519
signature = ed25519_zebra.ed_sign(keypair.private_key, data)

print("sig manual :", data)
            
# Sign payload
signature = keypair.sign(data)

print("sig func :", data)

extrinsic = substrate.create_signed_extrinsic(
    call=call,
    keypair=keypair,
    era={'period': 64}
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
