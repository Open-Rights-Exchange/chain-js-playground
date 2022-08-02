import { Chain, Models, Transaction } from "@open-rights-exchange/chain-js";

export enum ETHTxnTypes {
    TokenTransfer = "tokentransfer",
    Erc721TransferFrom_raw = "erc721transferfrom_raw",
    Erc721TransferFrom_template = "erc721transferfrom_template",
    SetGasPriceInTransaction_Builder = "setgaspriceintransaction"
}

export enum EOSTxnTypes {
    TokenTransfer = "tokentransfer"
}

export enum AlgorandTxnTypes {
    TokenTransfer = "tokentransfer"
}

export type TransactionBuilderResponse = {
    transaction: Transaction, 
    action: any
}

export interface ITransactionBuilder {
    build(chain: Chain, options: IOptionBag, txnType: ETHTxnTypes|EOSTxnTypes|AlgorandTxnTypes): Promise<TransactionBuilderResponse>
}

export type IOptionBag = {
    chainType: any,
    endpoints: Models.ChainEndpoint[],
    chainSettings: any
    fromAccountName: any
    fromAccountName_MSIG: any
    toAccountName: any
    symbol: any
    permission: any
    privateKey_singleSign: any
    privateKeys_MSIG: any
    transferAmount: any
    precision: any
}
