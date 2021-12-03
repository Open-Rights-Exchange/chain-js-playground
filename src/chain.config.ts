import { ChainEntityNameBrand } from '../../chain-js/src/models';
import {checkEnvVaraible} from './helpers'
import { Errors } from '@open-rights-exchange/chainjs'

/*
-- To us the current chain-js design (without plugins), uncomment the below 
-- Note that HelpersEos, HelpersEthereum, ModelsEthereum is loaded from chain-js - this needs to be loaded from the plugin when using the plugin model.
*/
//import { Models, HelpersEos, HelpersEthereum, ModelsEthereum, Crypto  } from '@open-rights-exchange/chainjs'

/*
-- Uncomment the below two lines to use the plugin model
-- Note that the 1st parameter passed to PluginChainFactory is an array of plugins loaded by the user. 
*/
import { Models, CryptoHelpers, Helpers } from '@open-rights-exchange/chainjs'
import { HelpersEos } from '@open-rights-exchange/chainjs-plugin-eos'
import { HelpersEthereum, ModelsEthereum } from '@open-rights-exchange/chainjs-plugin-ethereum'
import { HelpersAlgorand } from '@open-rights-exchange/chainjs-plugin-algorand'

export interface IChainSettings {
    chainType : Models.ChainType,
    endpoints : [Models.ChainEndpoint]
    chainSettings : ModelsEthereum.EthereumChainForkType|any,
    fromAccountName : string,
    toAccountName : string,
    symbol: string,
    permission: ChainEntityNameBrand|null,
    privateKeys: [string],
    transferAmount: string,
    precision: number
}

export interface IAllChainSettings {
    [chainId: string] : 
        {
            [subId: string] : IChainSettings
    }
}

export function validateSettings(chainId: string, networkId: string, settings: IChainSettings) : boolean {
    let settingPath = chainId+"."+networkId
    var errorCount = 0;

    switch(settingPath) { 
        case "eos.jungle": {             
            errorCount += checkEnvVaraible("eos_jungle_fromAccountName");
            errorCount += checkEnvVaraible("eos_jungle_toAccountName");
            errorCount += checkEnvVaraible("eos_jungle_privateKey");
            break; 
        } 
        case "algorand.testnet": {             
            errorCount += checkEnvVaraible("algorand_testnet_fromAccountName");
            errorCount += checkEnvVaraible("algorand_testnet_toAccountName");
            errorCount += checkEnvVaraible("algorand_testnet_privateKey");
            errorCount += checkEnvVaraible("algorand_testnet_apiKey");
            break; 
        } 
        case "eth.ropsten": {             
            errorCount += checkEnvVaraible("eth_ropsten_fromAccountName");
            errorCount += checkEnvVaraible("eth_ropsten_toAccountName");
            errorCount += checkEnvVaraible("eth_ropsten_privateKey");
            break; 
        }         
        default: { 
           console.warn("No setting validation was done for " + settingPath)
           return true;
           break; 
        } 
     } 
     if(errorCount > 0)
        Errors.throwNewError("Please set the correct environment variables")
}


var settingObj : IAllChainSettings = {
    "eos" : 
    {
        "jungle" :
        {
            chainType: Models.ChainType.EosV2,
            endpoints:  [{url : "https://jungle3.cryptolions.io:443"}],          
            fromAccountName : process.env.eos_jungle_fromAccountName,
            toAccountName: process.env.eos_jungle_toAccountName,
            chainSettings: {},
            symbol:  "EOS",
            permission: HelpersEos.toEosEntityName('active'),
            privateKeys: [process.env.eos_jungle_privateKey],
            transferAmount: '0.0001',
            precision: 4 // Check if this is used. 
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
                        headers: [{ 'x-api-key': process.env.ALGORAND_API_KEY }] 
                    },
            }],                
            fromAccountName : Helpers.toChainEntityName("HUWP46SR64FBSQRM6DII2GBOFW65YLKVB4RTTEFL6SIV6L5MKXWCWONVA4"),
            toAccountName: Helpers.toChainEntityName("LVUMGAGW5WIAUQI6W365MAD2OYZXGCJMRCH623OIZIWH7DXLL2CRJBAJZU"),
            chainSettings: {},
            symbol:  "microalgo",
            permission: null,
            privateKeys: [HelpersAlgorand.toAlgorandPrivateKey(process.env.ALGORAND_KEY ?? '')], //toAlgorandPrivateKey
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
            fromAccountName : HelpersEthereum.toEthereumAddress("0x60d5DA4FC785Dd1dA9c2dAF084B2D5ba478c8f8b"),
            toAccountName: HelpersEthereum.toEthereumAddress("0x9F0E93C9A61036Ce864cE43654440d7bA2a7d8Ca"),
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
            privateKeys: [process.env.ROPSTEN_KEY ?? ''],
            transferAmount: '10001',
            precision: 18
        }
    }
    

}
export default settingObj;

