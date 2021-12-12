import {IAllChainSettings} from './chain.config'
import { Errors } from '@open-rights-exchange/chainjs'

export function checkEnvVaraible(variableName: string) : number {
    let envVar = process.env[variableName] ?? '' 
    if(envVar == "") {
        console.warn("Environment Variable \"" + variableName + "\" was not not found of empty")
        return 1
    } else {
        return 0
    }
}


export function validateSettings(chainId: string, networkId: string) : boolean {
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
