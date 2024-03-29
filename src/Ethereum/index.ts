import { Transaction, Chain, Errors } from '@open-rights-exchange/chain-js'
import { AlgorandTxnTypes, EOSTxnTypes, ETHTxnTypes, IOptionBag, ITransactionBuilder, TransactionBuilderResponse } from '../models'
import { ERC721TransferFrom_raw_Builder } from './ERC721TransferFrom_raw'
import { ERC721TransferFrom_template_Builder } from './ERC721TransferFrom_template'
import { SetGasPriceInTransaction_Builder } from './SetGasPriceInTransaction'
import { CancelTransacton_Builder } from './CancelTransacton_template'
import { SmartContractInteraction } from './SmartContractInteraction'
import { Multisig } from './Multisig'
import { ERC20TransferFrom_raw } from './ERC20TransferFrom_raw'
import { ERC1155TransferFrom_template_Builder } from './ERC1155TransferFrom_template'
import { ERC1155SafeTransferFrom_raw_Builder } from './ERC1155SafeTransferFrom_raw'

export class EthereumTransactionBuilder implements ITransactionBuilder {

    async build(chain: Chain, options: IOptionBag, txnType: ETHTxnTypes): Promise<TransactionBuilderResponse> {
        var response : TransactionBuilderResponse = null
        switch(txnType) {
            case(ETHTxnTypes.Erc721TransferFrom_raw): {
                response = await new ERC721TransferFrom_raw_Builder().build(chain, options, txnType);
                break
            }
            case(ETHTxnTypes.Erc721TransferFrom_template): {
                response = await new ERC721TransferFrom_template_Builder().build(chain, options, txnType);
                break
            }
            case(ETHTxnTypes.SetGasPriceInTransaction_template): {
                response = await new SetGasPriceInTransaction_Builder().build(chain, options, txnType);
                break
            }    
            case(ETHTxnTypes.CancelTransacton): {
                response = await new CancelTransacton_Builder().build(chain, options, txnType);
                break
            }
            case(ETHTxnTypes.SmartContractInteraction): {
                response = await new SmartContractInteraction().build(chain, options, txnType);
                break
            }
            case(ETHTxnTypes.Multisig): {
                response = await new Multisig().build(chain, options, txnType);
                break
            }
            case(ETHTxnTypes.ERC20TransferFrom_raw): {
                response = await new ERC20TransferFrom_raw().build(chain, options, txnType);
                break
            }
            case(ETHTxnTypes.Erc1155TransferFrom_template): {
                response = await new ERC1155TransferFrom_template_Builder().build(chain, options, txnType);
                break
            }
            case(ETHTxnTypes.Erc1155SafeTransferFrom_raw): {
                response = await new ERC1155SafeTransferFrom_raw_Builder().build(chain, options, txnType);
                break
            }
            default: {
                Errors.throwNewError("txnType " + txnType.toString() + " is not yet implemented")
            }
        }
        return response
    }
}