btcli wallet new_coldkey --wallet.name my_coldkey

btcli wallet new_hotkey --wallet.name my_1st_hotkey

tree ~/.bittensor

/home/parnika/.bittensor
└── wallets
    ├── my_2nd_hotkey
    ├── my_coldkey
    │   ├── coldkey
    │   └── coldkeypub.txt
    ├── my_first_hotkey
    │   └── hotkeys
    │       └── my_1st_hotkey
    └── my_second_hotkey
        └── hotkeys
            └── my_2nd_hotkey

btcli wallet update

Do you want to update all legacy wallets? [y/n]: y

=====  wallet(my_first_hotkey, default, ~/.bittensor/wallets/)  =====
Keyfile does not exist. /home/parnika/.bittensor/wallets/my_first_hotkey/coldkey

=====  wallet(my_coldkey, default, ~/.bittensor/wallets/)  =====

✅ Keyfile is updated. 
🔑 Keyfile (NaCl encrypted, /home/parnika/.bittensor/wallets/my_coldkey/coldkey)>

=====  wallet(my_2nd_hotkey, default, ~/.bittensor/wallets/)  =====
Keyfile does not exist. /home/parnika/.bittensor/wallets/my_2nd_hotkey/coldkey

=====  wallet(my_second_hotkey, default, ~/.bittensor/wallets/)  =====
Keyfile does not exist. /home/parnika/.bittensor/wallets/my_second_hotkey/coldkey

btcli wallet list
Wallets
├── 
│   my_first_hotkey (?)
│   └── my_1st_hotkey (5Ehwo91fx1GZhJqBRPd8rStLoYuDJtTW3kLVYypuBdByxHzi)
├── 
│   my_coldkey (5GzoQHKQmw6sfiU9tvCzGfohvCVNws7HwCbmModRwzmGjoCn)
├── 
│   my_2nd_hotkey (?)
└── 
    my_second_hotkey (?)
    └── my_2nd_hotkey (5GCWL6yd8pyHoGBQ7totkHiJKcoycbHG8xeHV1CtypdxYZD9)