require('dotenv').config()


/*
-- To us the current chain-js design (without plugins), uncomment the below 
-- Note that HelpersEos, HelpersEthereum, ModelsEthereum is loaded from chain-js - this needs to be loaded from the plugin when using the plugin model.
*/
//import { Models, HelpersEos, HelpersEthereum, ModelsEthereum, Crypto  } from '@open-rights-exchange/chainjs'

/*
-- Uncomment the below two lines to use the plugin model
-- Note that the 1st parameter passed to PluginChainFactory is an array of plugins loaded by the user. 
*/
import { Models, CryptoHelpers, Helpers } from '@open-rights-exchange/chain-js'
import { HelpersEos } from '@open-rights-exchange/chain-js-plugin-eos'
import { HelpersEthereum, ModelsEthereum } from '@open-rights-exchange/chain-js-plugin-ethereum'
import { HelpersAlgorand } from '@open-rights-exchange/chain-js-plugin-algorand'

export interface IChainSettings {
    chainType : Models.ChainType,
    endpoints : [Models.ChainEndpoint]
    chainSettings : ModelsEthereum.EthereumChainForkType|any,
    fromAccountName_MSIG : string,
    fromAccountName : string,
    toAccountName : string,
    symbol: string,
    permission: Models.ChainEntityNameBrand|null,
    privateKey_singleSign: string,
    privateKeys_MSIG: string[],
    transferAmount: string,
    precision: number
}

export interface IAllChainSettings {
    [chainId: string] : 
        {
            [subId: string] : IChainSettings
    }
}

var settingObj : IAllChainSettings = {
    "eos" : 
    {
        "jungle" :
        {
            chainType: Models.ChainType.EosV2,
            endpoints:  [{url : "https://jungle3.cryptolions.io:443"}],     
            fromAccountName_MSIG : process.env.eos_jungle_fromAccountName_MSIG,    
            fromAccountName : process.env.eos_jungle_fromAccountName,
            toAccountName: process.env.eos_jungle_toAccountName,
            chainSettings: {},
            symbol:  "EOS",
            permission: HelpersEos.toEosEntityName('active'),
            privateKey_singleSign: process.env.eos_jungle_privateKey,
            privateKeys_MSIG: [
                process.env.eos_jungle_msig_1_privateKey,
                process.env.eos_jungle_msig_2_privateKey
            ],
            transferAmount: '0.0001',
            precision: 4 // Check if this is used. 
        },
        "kylin" :
        {
            chainType: Models.ChainType.EosV2,
            endpoints:  [{url : "https://kylin.eosn.io:443"}],
            fromAccountName_MSIG : process.env.eos_kylin_fromAccountName_MSIG,
            fromAccountName : process.env.eos_kylin_fromAccountName,
            toAccountName: process.env.eos_kylin_toAccountName,
            chainSettings: {},
            symbol:  "EOS",
            permission: HelpersEos.toEosEntityName('active'),
            privateKey_singleSign: process.env.eos_kylin_privateKey,
            privateKeys_MSIG: [process.env.eos_kylin_msig_1_privateKey, process.env.eos_kylin_msig_2_privateKey],
            transferAmount: '0.0001',
            precision: 4
        }
    },
    "algorand" : 
    {
        "testnet" :
        {
            chainType: Models.ChainType.AlgorandV1,
            endpoints:  [{
                    url: 'https://testnet-algorand.api.purestake.io/ps2',
                    options: { 
                        indexerUrl: 'https://testnet-algorand.api.purestake.io/idx2', 
                        headers: [{ 'x-api-key': process.env.algorand_testnet_apiKey }] 
                    },
            }],        
            fromAccountName_MSIG : process.env.algorand_testnet_fromAccountName_MSIG,        
            fromAccountName : process.env.algorand_testnet_fromAccountName,
            toAccountName: process.env.algorand_testnet_toAccountName,
            chainSettings: {},
            symbol:  "microalgo",
            permission: null,
            privateKey_singleSign: HelpersAlgorand.toAlgorandPrivateKey(process.env.algorand_testnet_privateKey ?? ''), //toAlgorandPrivateKey
            privateKeys_MSIG: [
                HelpersAlgorand.toAlgorandPrivateKey(process.env.algorand_testnet_privateKey ?? '')
            ],
            transferAmount: '1',
            precision: 4 // Check if this is used. 
        }
    },
    "eth" : 
    {
        "ropsten" :
        {
            chainType: Models.ChainType.EthereumV1,
            endpoints:  [
                {
                    url : "https://ropsten.infura.io/v3/b1664813d49f45c7a5bb42a395447977", 
                    // options: {
                    //     agent: "XXX",
                    //     headers: [{"XXX" : "XXX"}]
                    // }
                }
            ],
            fromAccountName_MSIG : process.env.eth_ropsten_fromAccountName_MSIG,
            fromAccountName : process.env.eth_ropsten_fromAccountName,
            toAccountName: process.env.eth_ropsten_toAccountName,
            chainSettings: {
                chainForkType : {
                    chainName: "ropsten",
                    hardFork: "istanbul"
                },
                defaultTransactionSettings: {
                    maxFeeIncreasePercentage: 20,
                    executionPriority: Models.TxExecutionPriority.Fast,
                }
            },
            symbol: "gwei",
            permission: null,
            privateKey_singleSign : process.env.eth_ropsten_privateKey ?? '',
            privateKeys_MSIG: [process.env.eth_ropsten_msig_1_privateKey],
            transferAmount: '10001',
            precision: 18
        }
    },
    "matic" : 
    {
        "polygon_mumbai" :
        {
            chainType: Models.ChainType.EthereumV1,
            endpoints:  [
                {
                    url : "https://polygon-mumbai.g.alchemy.com/v2/AIIX0TtJA0j2FDoo5FzRc_e5766GxIPz", 
                }
            ],
            fromAccountName_MSIG : process.env.matic_polygon_mumbai_fromAccountName_MSIG,
            fromAccountName : process.env.matic_polygon_mumbai_fromAccountName,
            toAccountName: process.env.matic_polygon_mumbai_toAccountName,
            chainSettings: {
                // "chainId": "80001",    
                chainForkType : {
                    chainName: "polygon-mumbai",
                },            
                defaultTransactionSettings: {
                    maxFeeIncreasePercentage: 20,
                    executionPriority: Models.TxExecutionPriority.Fast,
                }
            },
            symbol: "gwei",
            permission: null,
            privateKey_singleSign : process.env.matic_polygon_mumbai_privateKey ?? '',
            privateKeys_MSIG: [process.env.matic_polygon_mumbai_msig_1_privateKey],
            transferAmount: '1',
            precision: 18
        }
    }
    

}
export default settingObj;

