//https://github.com/wbobeirne/eth-balance-checker
export const BalanceCheckerABI = [
    {
     "payable": true,
     "stateMutability": "payable",
     "type": "fallback"
    },
    {
     "constant": true,
     "inputs": [
      {
       "name": "user",
       "type": "address"
      },
      {
       "name": "token",
       "type": "address"
      }
     ],
     "name": "tokenBalance",
     "outputs": [
      {
       "name": "",
       "type": "uint256"
      }
     ],
     "payable": false,
     "stateMutability": "view",
     "type": "function"
    },
    {
     "constant": true,
     "inputs": [
      {
       "name": "users",
       "type": "address[]"
      },
      {
       "name": "tokens",
       "type": "address[]"
      }
     ],
     "name": "balances",
     "outputs": [
      {
       "name": "",
       "type": "uint256[]"
      }
     ],
     "payable": false,
     "stateMutability": "view",
     "type": "function"
    }
   ]
   
               /*
            mainnet: 0xb1f8e55c7f64d203c1400b9d8555d050f94adf39
            ropsten: 0x8D9708f3F514206486D7E988533f770a16d074a7
            rinkeby: 0x3183B673f4816C94BeF53958BaF93C671B7F8Cf2
            kovan: 0x55ABBa8d669D60A10c104CC493ec5ef389EC92bb
            binance smart chain mainnet: 0xB12aeC3A7e0B8CFbA307203a33c88a3BBC0D9622
            binance smart chain testnet: 0x5E6F706c8Ca87c5FCbdBbfa74d69999dCDa46B24
            */