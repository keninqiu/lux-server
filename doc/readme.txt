9|index  | post_data1= { app_id: '4403a3ef7ef8373d',
9|index  |   charset: 'UTF-8',
9|index  |   description: 'Order number:60d5acbce3b61e566315772d',
9|index  |   format: 'JSON',
9|index  |   merchant_no: '902000042260',
9|index  |   method: 'pay.h5pay',
9|index  |   effective_minutes: 60,
9|index  |   notify_url: 'https://miri.io/notification',
9|index  |   out_order_no: '60d5acbce3b61e566315772d_5378',
9|index  |   payment_method: 'ALIPAY',
9|index  |   return_url: 'https://miri.io/notification',
9|index  |   sign: '5bd27a9c339efc4be1cb3d21cb7f1ef0',
9|index  |   sign_type: 'MD5',
9|index  |   timestamp: '2021-06-25 10:16:50',
9|index  |   trans_amount: 11.41,
9|index  |   trans_currency: 'CAD',
9|index  |   version: '1.0' }



0|index  | post_data_sign11111= { app_id: '4403a3ef7ef8373d',
0|index  |   charset: 'UTF-8',
0|index  |   description: '订单号:60d5af1bdccfd0564d4de8be',
0|index  |   format: 'JSON',
0|index  |   merchant_no: '902000042260',
0|index  |   method: 'pay.h5pay',
0|index  |   effective_minutes: 60,
0|index  |   notify_url: 'https://miri.io:1947/api/public/qrcode/notify',
0|index  |   out_order_no: '60d5af1bdccfd0564d4de8be_8641',
0|index  |   payment_method: 'WECHATPAY',
0|index  |   return_url: 'https://miri.io:1947/api/public/qrcode/notify',
0|index  |   sign: '00d35f08316759d7b31bc1c93215debe',
0|index  |   sign_type: 'MD5',
0|index  |   timestamp: '2021-06-25 10:25:31',
0|index  |   trans_amount: 0.02,
0|index  |   trans_currency: 'CAD',
0|index  |   version: '1.0' }



9|index  | json== { code: 'SYS001',
9|index  |   data: [],
9|index  |   msg: 'system error',
9|index  |   psn: '06251016509547726070',
9|index  |   total: 0 }
9|index  | code== []


https://jevelin.shufflehound.com/startup/

https://colorlib.com/preview/#miniblog
https://colorlib.com/wp/template/miniblog/


https://api.flaswap.com/api/exchange-pair/pairsummary/0x06da0fd433c1a5d7a4faa01111c044910a184553

{"success":true,"data":{"_id":"5febd51158a83b26e1444f99","id":"0x06da0fd433c1a5d7a4faa01111c044910a184553","sequence":99,"exchange":{"_id":"5fe96591b704c67e4e2f821d","name":"SushiSwap","factoryAddress":"0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac","routerAddress":"0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F","logo":"https://sushiswapclassic.org/static/media/chef.ec78e8e8.png","desc":"A platform that allows anyone to provide liquidity. In return, the person gets rewarded with token(s) and SUSHI tokens. ","api":"https://api.thegraph.com/subgraphs/name/zippoxer/sushiswap-subgraph-fork","__v":0},"pair":{"_id":"5febd51158a83b26e1444f98","token0":{"_id":"5febd51158a83b26e1444f52","decimals":18,"id":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","name":"Wrapped Ether","symbol":"WETH","__v":0},"token1":{"_id":"5febd51158a83b26e1444f8c","decimals":6,"id":"0xdac17f958d2ee523a2206206994597c13d831ec7","name":"Tether USD","symbol":"USDT","__v":0},"name":"WETH-USDT","__v":0},"liquidityChangeUSD":-5.588184119435706,"oneDayVolumeUSD":-256861611.78962994,"oneDayVolumeUntracked":-256861611.78962994,"oneWeekVolumeUSD":2008611835.912146,"reserve0":61480.46284226176,"reserve1":84302960.470479,"reserveETH":122960.92568452352,"reserveUSD":151153691.34697405,"token0Price":0.0008180620229541407,"token1Price":1222.4012017925668,"token1PriceChange":-9.185499180468666,"totalSupply":1.778781487182792,"trackedReserveETH":123637.4825936571,"txCount":126911,"untrackedVolumeUSD":2008611835.912146,"volumeChangeUSD":-710.7054386664914,"volumeChangeUntracked":2008611835.912146,"volumeUSD":2008611835.912146}}


post:

https://defiprime.com/exchanges

https://api.thegraph.com/subgraphs/name/zippoxer/sushiswap-subgraph-fork


{"operationName":null,"variables":{"allPairs":["0xceff51756c56ceffca006cd410b03ffc46dd3a58"]},"query":"query ($allPairs: [Bytes]!) {\n  mints(first: 20, where: {pair_in: $allPairs}, orderBy: timestamp, orderDirection: desc) {\n    transaction {\n      id\n      timestamp\n      __typename\n    }\n    pair {\n      token0 {\n        id\n        symbol\n        __typename\n      }\n      token1 {\n        id\n        symbol\n        __typename\n      }\n      __typename\n    }\n    to\n    liquidity\n    amount0\n    amount1\n    amountUSD\n    __typename\n  }\n  burns(first: 20, where: {pair_in: $allPairs}, orderBy: timestamp, orderDirection: desc) {\n    transaction {\n      id\n      timestamp\n      __typename\n    }\n    pair {\n      token0 {\n        id\n        symbol\n        __typename\n      }\n      token1 {\n        id\n        symbol\n        __typename\n      }\n      __typename\n    }\n    sender\n    liquidity\n    amount0\n    amount1\n    amountUSD\n    __typename\n  }\n  swaps(first: 30, where: {pair_in: $allPairs}, orderBy: timestamp, orderDirection: desc) {\n    transaction {\n      id\n      timestamp\n      __typename\n    }\n    id\n    pair {\n      token0 {\n        id\n        symbol\n        __typename\n      }\n      token1 {\n        id\n        symbol\n        __typename\n      }\n      __typename\n    }\n    amount0In\n    amount0Out\n    amount1In\n    amount1Out\n    amountUSD\n    to\n    __typename\n  }\n}\n"}















https://medium.com/javascript-in-plain-english/creating-a-rest-api-with-jwt-authentication-and-role-based-authorization-using-typescript-fbfa3cab22a4