import { Chain, Transaction, Models } from "@open-rights-exchange/chain-js";
import { HelpersEthereum, ModelsEthereum } from "@open-rights-exchange/chain-js-plugin-ethereum";
import { ETHTxnTypes, IOptionBag, ITransactionBuilder, TransactionBuilderResponse } from "src/models";

export class SetGasPriceInTransaction_Builder implements ITransactionBuilder {
    async build(chain: Chain, options: IOptionBag, txnType: ETHTxnTypes): Promise<TransactionBuilderResponse> {

        var transaction : Transaction = await chain.new.Transaction()

        // var Erc721TransferFrom : Models.ValueTransferParams = {
        //   fromAccountName: HelpersEthereum.toEthereumEntityName(options.fromAccountName),
        //   toAccountName: HelpersEthereum.toEthereumEntityName(options.toAccountName),
        //   amount: options.transferAmount,
        // }

        // var action = await chain.composeAction(ModelsEthereum.EthereumChainActionType.ERC20Transfer, Erc721TransferFrom);

        var genericValueTransfer = {
          fromAccountName: options.fromAccountName,
          toAccountName: options.toAccountName,
          amount: options.transferAmount,
          symbol: options.symbol,
          memo: 'Test',
          permission: options.permission,
          precision: options.precision,
          gasLimit: "0x62D4", //25300 (25200 is default)
          gasPrice: "0x3B9ACA0A", //1000000010 (1000000000 is default)'
          // nonce: "0x1"
        }

        var action = await chain.composeAction(Models.ChainActionType.ValueTransfer, genericValueTransfer);

        return {transaction, action}
    }
}