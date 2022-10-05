import {IAllChainSettings} from './chain.config'
import { Errors } from '@open-rights-exchange/chain-js'
require('dotenv').config()

export function checkEnvVaraible(variableName: string) : number {
    let envVar = process.env[variableName] ?? '' 
    if(envVar == "") {
        console.warn("Environment Variable \"" + variableName + "\" was not not found of empty")
        return 1
    } else {
        if(variableName.includes("private")) {
            envVar = "********"
        }
        console.log(variableName + ' : ' + envVar);
        return 0
    }
}


export function validateSettings(chainId: string, networkId: string, doMSIG: boolean) : boolean {
    let settingPath = chainId+"."+networkId
    var errorCount = 0;

    switch(settingPath) { 
        case "eos.jungle": {             
            errorCount += checkEnvVaraible("eos_jungle_fromAccountName");
            errorCount += checkEnvVaraible("eos_jungle_toAccountName");
            errorCount += checkEnvVaraible("eos_jungle_privateKey");
            if(doMSIG) {
                Errors.throwNewError("Have not tested MSIG on Jungle yet + have not updated .env example ... contact warrick@aikon.com")
                errorCount += checkEnvVaraible("eos_jungle_fromAccountName_MSIG");
                errorCount += checkEnvVaraible("eos_jungle_msig_1_privateKey");
                errorCount += checkEnvVaraible("eos_jungle_msig_2_privateKey");
            }
            break; 
        } 
        case "eos.kylin": {             
            errorCount += checkEnvVaraible("eos_kylin_fromAccountName");
            errorCount += checkEnvVaraible("eos_kylin_toAccountName");
            errorCount += checkEnvVaraible("eos_kylin_privateKey");
            if(doMSIG) {
                errorCount += checkEnvVaraible("eos_kylin_fromAccountName_MSIG");
                errorCount += checkEnvVaraible("eos_kylin_msig_1_privateKey");
                errorCount += checkEnvVaraible("eos_kylin_msig_2_privateKey");
            }
            break; 
        } 
        case "algorand.testnet": {             
            errorCount += checkEnvVaraible("algorand_testnet_fromAccountName");
            errorCount += checkEnvVaraible("algorand_testnet_toAccountName");
            errorCount += checkEnvVaraible("algorand_testnet_privateKey");
            errorCount += checkEnvVaraible("algorand_testnet_apiKey");
            if(doMSIG) {
                Errors.throwNewError("Have not tested MSIG on Algorand yet + have not updated .env example ... contact warrick@aikon.com")
                errorCount += checkEnvVaraible("algorand_testnet_fromAccountName_MSIG");
                errorCount += checkEnvVaraible("algorand_testnet_msig_1_privateKey");
                errorCount += checkEnvVaraible("algorand_testnet_msig_2_privateKey");
            }
            break; 
        } 
        case "eth.ropsten": {             
            errorCount += checkEnvVaraible("eth_ropsten_fromAccountName");
            errorCount += checkEnvVaraible("eth_ropsten_toAccountName");
            errorCount += checkEnvVaraible("eth_ropsten_privateKey");
            if(doMSIG) {
                // Errors.throwNewError("Have not tested MSIG on ropsten yet + have not updated .env example ... contact warrick@aikon.com")
                errorCount += checkEnvVaraible("eth_ropsten_fromAccountName_MSIG");
                errorCount += checkEnvVaraible("eth_ropsten_msig_1_privateKey");
                errorCount += checkEnvVaraible("eth_ropsten_msig_2_privateKey");
            }
            break; 
        }     
        case "eth.rinkeby": {             
            errorCount += checkEnvVaraible("eth_rinkeby_fromAccountName");
            errorCount += checkEnvVaraible("eth_rinkeby_toAccountName");
            errorCount += checkEnvVaraible("eth_rinkeby_privateKey");
            if(doMSIG) {
                // Errors.throwNewError("Have not tested MSIG on rinkeby yet + have not updated .env example ... contact warrick@aikon.com")
                errorCount += checkEnvVaraible("eth_rinkeby_fromAccountName_MSIG");
                errorCount += checkEnvVaraible("eth_rinkeby_msig_1_privateKey");
                errorCount += checkEnvVaraible("eth_rinkeby_msig_2_privateKey");
            }
            break; 
        }
        case "eth.goerli": {             
            errorCount += checkEnvVaraible("eth_goerli_fromAccountName");
            errorCount += checkEnvVaraible("eth_goerli_toAccountName");
            errorCount += checkEnvVaraible("eth_goerli_privateKey");
            if(doMSIG) {
                // Errors.throwNewError("Have not tested MSIG on goerli yet + have not updated .env example ... contact warrick@aikon.com")
                errorCount += checkEnvVaraible("eth_goerli_fromAccountName_MSIG");
                errorCount += checkEnvVaraible("eth_goerli_msig_1_privateKey");
                errorCount += checkEnvVaraible("eth_goerli_msig_2_privateKey");
            }
            break; 
        }       
        case "matic.polygon_mumbai": {             
            errorCount += checkEnvVaraible("matic_polygon_mumbai_fromAccountName");
            errorCount += checkEnvVaraible("matic_polygon_mumbai_toAccountName");
            errorCount += checkEnvVaraible("matic_polygon_mumbai_privateKey");
            if(doMSIG) {
                Errors.throwNewError("Have not tested MSIG on matic yet + have not updated .env example ... contact warrick@aikon.com")
                errorCount += checkEnvVaraible("matic_polygon_mumbai_fromAccountName_MSIG");
                errorCount += checkEnvVaraible("matic_polygon_mumbai_msig_1_privateKey");
                errorCount += checkEnvVaraible("matic_polygon_mumbai_msig_2_privateKey");
            }
            break; 
        }  
        case "avalanche.fuji": {             
            errorCount += checkEnvVaraible("avalanche_fuji_fromAccountName");
            errorCount += checkEnvVaraible("avalanche_fuji_toAccountName");
            errorCount += checkEnvVaraible("avalanche_fuji_privateKey");
            if(doMSIG) {
                Errors.throwNewError("Have not tested MSIG on avalanche fuji yet + have not updated .env example ... contact warrick@aikon.com")
                errorCount += checkEnvVaraible("avalanche_fuji_fromAccountName_MSIG");
                errorCount += checkEnvVaraible("avalanche_fuji_msig_1_privateKey");
                errorCount += checkEnvVaraible("avalanche_fuji_mumbai_msig_2_privateKey");
            }
            break; 
        }
        case "avalanche.mainnet": {             
            errorCount += checkEnvVaraible("avalanche_mainnet_fromAccountName");
            errorCount += checkEnvVaraible("avalanche_mainnet_toAccountName");
            errorCount += checkEnvVaraible("avalanche_mainnet_privateKey");
            if(doMSIG) {
                Errors.throwNewError("Have not tested MSIG on avalanche mainnet yet + have not updated .env example ... contact warrick@aikon.com")
                errorCount += checkEnvVaraible("avalanche_mainnet_fromAccountName_MSIG");
                errorCount += checkEnvVaraible("avalanche_mainnet_msig_1_privateKey");
                errorCount += checkEnvVaraible("avalanche_mainnet_mumbai_msig_2_privateKey");
            }
            break; 
        }
        case "telosevm.testnet": {             
            errorCount += checkEnvVaraible("telosevm_testnet_fromAccountName");
            errorCount += checkEnvVaraible("telosevm_testnet_toAccountName");
            errorCount += checkEnvVaraible("telosevm_testnet_privateKey");
            if(doMSIG) {
                Errors.throwNewError("Have not tested MSIG on telosevm testnet yet + have not updated .env example ... contact warrick@aikon.com")
                errorCount += checkEnvVaraible("telosevm_testnet_fromAccountName_MSIG");
                errorCount += checkEnvVaraible("telosevm_testnet_msig_1_privateKey");
                errorCount += checkEnvVaraible("telosevm_testnet_mumbai_msig_2_privateKey");
            }
            break; 
        }        
        case "telosevm.mainnet": {             
            errorCount += checkEnvVaraible("telosevm_mainnet_fromAccountName");
            errorCount += checkEnvVaraible("telosevm_mainnet_toAccountName");
            errorCount += checkEnvVaraible("telosevm_mainnet_privateKey");
            if(doMSIG) {
                Errors.throwNewError("Have not tested MSIG on telosevm mainnet yet + have not updated .env example ... contact warrick@aikon.com")
                errorCount += checkEnvVaraible("telosevm_mainnet_fromAccountName_MSIG");
                errorCount += checkEnvVaraible("telosevm_mainnet_msig_1_privateKey");
                errorCount += checkEnvVaraible("telosevm_mainnet_mumbai_msig_2_privateKey");
            }
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
