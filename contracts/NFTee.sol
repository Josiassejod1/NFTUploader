// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTItem is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private  _tokenIds;

    constructor() ERC721("NFTItem", "ITM") {}

    mapping(uint => string) tokenURIs;

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return tokenURIs[tokenId];
    }

    function create(address player, string memory myTokenURI)
        public
        returns (uint256) {
            _tokenIds.increment();

            uint256 newItemId = _tokenIds.current();
            _mint(player, newItemId);
            tokenURIs[newItemId] = myTokenURI;

            return newItemId;
        }
}