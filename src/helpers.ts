import {IAllChainSettings} from './chain.config'
import { Errors } from '@open-rights-exchange/chain-js'
require('dotenv').config()

export function checkEnvVaraible(variableName: string) : number {
    let envVar = process.env[variableName] ?? '' 
    if(envVar == "") {
        console.warn("Environment Variable \"" + variableName + "\" was not not found of empty")
        return 1
    } else {
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
                Errors.throwNewError("Have not tested MSIG on ropsten yet + have not updated .env example ... contact warrick@aikon.com")
                errorCount += checkEnvVaraible("eth_ropsten_fromAccountName_MSIG");
                errorCount += checkEnvVaraible("eth_ropsten_msig_1_privateKey");
                errorCount += checkEnvVaraible("eth_ropsten_msig_2_privateKey");
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
