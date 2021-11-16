import { Models, HelpersEthereum, ModelsEthereum} from '@open-rights-exchange/chainjs'
import { ChainEntityNameBrand } from '../../chain-js/src/models';
import { HelpersEos } from '@open-rights-exchange/chainjs-plugin-eos'

export interface IChainSettings {
    [chainId: string] : 
        {
            [subId: string] : 
            {
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
    }
}

var settingObj : IChainSettings = {
    "eos" : 
    {
        "jungle" :
        {
            chainType: Models.ChainType.EosV2,
            endpoints:  [{url : "https://jungle3.cryptolions.io:443"}],
            //endpoints:  [{url : "https://jungle.eosn.io:443"}],            
            fromAccountName : "codeoflight1",
            toAccountName: "codeoflight2",
            chainSettings: {},
            symbol:  "EOS",
            permission: HelpersEos.toEosEntityName('active'),
            privateKeys: [process.env.JUNGLE_KEY ?? ''],
            transferAmount: '0.0001',
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
