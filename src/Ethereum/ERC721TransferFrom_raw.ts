import { Chain, Transaction } from "@open-rights-exchange/chain-js";
import { HelpersEthereum } from "@open-rights-exchange/chain-js-plugin-ethereum";
import { ETHTxnTypes, IOptionBag, ITransactionBuilder, TransactionBuilderResponse } from "src/models";

        const erc721Abi: any[] = [
            {
              constant: true,
              inputs: [{ name: '_interfaceId', type: 'bytes4' }],
              name: 'supportsInterface',
              outputs: [{ name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'name',
              outputs: [{ name: '', type: 'string' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [{ name: '_tokenId', type: 'uint256' }],
              name: 'getApproved',
              outputs: [{ name: '', type: 'address' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [
                { name: '_to', type: 'address' },
                { name: '_tokenId', type: 'uint256' },
              ],
              name: 'approve',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'totalSupply',
              outputs: [{ name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'InterfaceId_ERC165',
              outputs: [{ name: '', type: 'bytes4' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [
                { name: '_from', type: 'address' },
                { name: '_to', type: 'address' },
                { name: '_tokenId', type: 'uint256' },
              ],
              name: 'transferFrom',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [
                { name: '_owner', type: 'address' },
                { name: '_index', type: 'uint256' },
              ],
              name: 'tokenOfOwnerByIndex',
              outputs: [{ name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [
                { name: '_from', type: 'address' },
                { name: '_to', type: 'address' },
                { name: '_tokenId', type: 'uint256' },
              ],
              name: 'safeTransferFrom',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [{ name: '_tokenId', type: 'uint256' }],
              name: 'exists',
              outputs: [{ name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [{ name: '_index', type: 'uint256' }],
              name: 'tokenByIndex',
              outputs: [{ name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [{ name: '_tokenId', type: 'uint256' }],
              name: 'ownerOf',
              outputs: [{ name: '', type: 'address' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [{ name: '_owner', type: 'address' }],
              name: 'balanceOf',
              outputs: [{ name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'symbol',
              outputs: [{ name: '', type: 'string' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [
                { name: '_to', type: 'address' },
                { name: '_approved', type: 'bool' },
              ],
              name: 'setApprovalForAll',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: false,
              inputs: [
                { name: '_from', type: 'address' },
                { name: '_to', type: 'address' },
                { name: '_tokenId', type: 'uint256' },
                { name: '_data', type: 'bytes' },
              ],
              name: 'safeTransferFrom',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [{ name: '_tokenId', type: 'uint256' }],
              name: 'tokenURI',
              outputs: [{ name: '', type: 'string' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [
                { name: '_owner', type: 'address' },
                { name: '_operator', type: 'address' },
              ],
              name: 'isApprovedForAll',
              outputs: [{ name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                { name: '_name', type: 'string' },
                { name: '_symbol', type: 'string' },
              ],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'constructor',
            },
            {
              anonymous: false,
              inputs: [
                { indexed: true, name: '_from', type: 'address' },
                { indexed: true, name: '_to', type: 'address' },
                { indexed: true, name: '_tokenId', type: 'uint256' },
              ],
              name: 'Transfer',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                { indexed: true, name: '_owner', type: 'address' },
                { indexed: true, name: '_approved', type: 'address' },
                { indexed: true, name: '_tokenId', type: 'uint256' },
              ],
              name: 'Approval',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                { indexed: true, name: '_owner', type: 'address' },
                { indexed: true, name: '_operator', type: 'address' },
                { indexed: false, name: '_approved', type: 'bool' },
              ],
              name: 'ApprovalForAll',
              type: 'event',
            },
            {
              constant: false,
              inputs: [
                { name: '_to', type: 'address' },
                { name: '_tokenId', type: 'uint256' },
                { name: '_tokenURI', type: 'string' },
              ],
              name: 'mintUniqueTokenTo',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
          ]
          


        // var Erc20ValueTransfer : ModelsEthereum.Erc20TransferParams = {
        //     from: HelpersEthereum.toEthereumEntityName(fromAccountName),
        //     to: HelpersEthereum.toEthereumEntityName("0x9F0E93C9A61036Ce864cE43654440d7bA2a7d8Ca"),
        //     contractAddress: HelpersEthereum.toEthereumAddress("0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0"),
        //     value: transferAmount,
        //     precision,
        // }

        // contractAddress: EthereumAddress
        // from?: EthereumAddress
        // transferFrom: EthereumAddress
        // to: EthereumAddress
        // tokenId: number
        // gasPrice?: string
        // gasLimit?: string
        // nonce?: string

        // var Erc721TransferFrom : ModelsEthereum.Erc721TransferFromParams = {
        //     transferFrom: HelpersEthereum.toEthereumEntityName(fromAccountName),
        //     to: HelpersEthereum.toEthereumEntityName("0x9F0E93C9A61036Ce864cE43654440d7bA2a7d8Ca"),
        //     contractAddress: HelpersEthereum.toEthereumAddress("0x4C770455fb18BE4c3c9C1258E769De5Ab6C864b7"),
        //     tokenId: 7
        // }


        export class ERC721TransferFrom_raw_Builder implements ITransactionBuilder {
            async build(chain: Chain, options: IOptionBag, txnType: ETHTxnTypes): Promise<TransactionBuilderResponse> {

                var transaction : Transaction = await chain.new.Transaction()
                const action = {
                        to: HelpersEthereum.toEthereumAddress("0x4C770455fb18BE4c3c9C1258E769De5Ab6C864b7"),
                        contract: {
                        abi: erc721Abi,
                        parameters: [HelpersEthereum.toEthereumEntityName(options.fromAccountName), HelpersEthereum.toEthereumEntityName("0x9F0E93C9A61036Ce864cE43654440d7bA2a7d8Ca"), 6],
                        method: 'transferFrom',
                    }
                }
                return {transaction, action}
            }
        }