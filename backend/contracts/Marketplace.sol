// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _nftsSold;
    Counters.Counter private _nftCount;
    uint256 public LISTING_FEE = 0.0001 ether;
    address payable private _marketOwner;
    mapping(uint256 => NFT) private _idToNFT;

    string public prompt = "outerspace cowboy";
    // public time of 0.001 day
    uint256 public time = 1 days;
    uint256 public currentTime = block.timestamp;

    struct NFT {
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        bool listed;
        uint256 voteCount;
    }
    event NFTListed(
        address nftContract,
        uint256 tokenId,
        address seller,
        address owner,
        uint256 voteCount
    );

    constructor() {
        _marketOwner = payable(msg.sender);
    }

    function voteNFT(uint256 _tokenId) public payable {
        //  increment vote count for NFT
        _idToNFT[_tokenId].voteCount++;
    }

    function getVoteCount(uint256 _tokenId) public view returns (uint256) {
        return _idToNFT[_tokenId].voteCount;
    }

    function getPrompt() public view returns (string memory) {
        return prompt;
    }

    function getTimeLeft() public view returns (uint256) {
        // do the math to find the time between the current time and the time
        uint256 timeLeft = time - (block.timestamp - currentTime);
        return timeLeft;
    }

    // List the NFT on the marketplace
    function listNft(address _nftContract, uint256 _tokenId)
        public
        payable
        nonReentrant
    {
        require(msg.value == LISTING_FEE, "Not enough ether for listing fee");
        // require that there is time remaining
        require(getTimeLeft() > 0, "Time has expired");

        IERC721(_nftContract).transferFrom(msg.sender, address(this), _tokenId);

        _nftCount.increment();

        _idToNFT[_tokenId] = NFT(
            _nftContract,
            _tokenId,
            payable(msg.sender),
            payable(address(this)),
            true,
            0
        );

        emit NFTListed(_nftContract, _tokenId, msg.sender, address(this), 0);
    }
}
