## Some CLI command
- Generate new keypair
```
solana-keygen new -o /home/phong/.config/solana/wallet_bot_withdraw.json
```

- Tạo ra 1 token mới:
```
spl-token create-token --decimals 8 --config /home/phong/.config/solana/cli/config_gear_claim.yml
```

- Create 1 địa chỉ ATA cho token
```
spl-token create-account --owner <publicKey> <tokenAddress>
```
=> output sẽ có 1 địa chỉ ATA

- Mint token
```
spl-token mint --config /home/phong/.config/solana/cli/config_gear_claim.yml <token> 1 <ata>
```
