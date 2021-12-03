import {IAllChainSettings} from './chain.config'

export function checkEnvVaraible(variableName: string) : number {
    let envVar = process.env[variableName] ?? '' 
    if(envVar == "") {
        console.warn("Environment Variable \"" + variableName + "\" was not not found of empty")
        return 1
    } else {
        return 0
    }
}


