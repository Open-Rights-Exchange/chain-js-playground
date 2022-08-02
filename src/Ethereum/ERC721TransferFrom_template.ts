import { Chain, Transaction } from "@open-rights-exchange/chain-js";
import { HelpersEthereum, ModelsEthereum } from "@open-rights-exchange/chain-js-plugin-ethereum";
import { ETHTxnTypes, IOptionBag, ITransactionBuilder, TransactionBuilderResponse } from "src/models";

export class ERC721TransferFrom_template_Builder implements ITransactionBuilder {
    async build(chain: Chain, options: IOptionBag, txnType: ETHTxnTypes): Promise<TransactionBuilderResponse> {

        var transaction : Transaction = await chain.new.Transaction()

        var Erc721TransferFrom : ModelsEthereum.Erc721TransferFromParams = {
          transferFrom: HelpersEthereum.toEthereumEntityName(options.fromAccountName),
          to: HelpersEthereum.toEthereumEntityName("0x9F0E93C9A61036Ce864cE43654440d7bA2a7d8Ca"),
          contractAddress: HelpersEthereum.toEthereumAddress("0x4C770455fb18BE4c3c9C1258E769De5Ab6C864b7"),
          tokenId: 7
        }

        var action = await chain.composeAction(ModelsEthereum.EthereumChainActionType.ERC721TransferFrom, Erc721TransferFrom);

        return {transaction, action}
    }
}