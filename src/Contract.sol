// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";  
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

import { Base64 } from "./libraries/Base64.sol";


contract CelestiaNameNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;
   
    string public collectionName;
    string public collectionSymbol;


    string baseSvg = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='purple' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    constructor() ERC721("CelestiaNameNFT", "ENFT") {
        collectionName = name();
        collectionSymbol = symbol();
    }

    function createCelestiaNameNFT(string memory name) public returns(uint256) {
        uint256 newItemId = _tokenId.current();

        string memory combinedWord = string(abi.encodePacked(name));

        string memory finalSvg = string(abi.encodePacked(baseSvg, name, "</text></svg>"));

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                    '{"name": "',
                        combinedWord,
                        '", "description": "A highly acclaimed collection Eternal Warriors", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(finalSvg)),
                    '"}'
                    )
                )
            )
        );

        string memory finalTokenURI = string(abi.encodePacked(
            "data:application/json;base64,", json
        ));
    
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, finalTokenURI);

        _tokenId.increment();

        return newItemId;
    }
}