// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentVerification {
    // Mapping to store document hashes and their upload status
    mapping(string => bool) private documentHashes;

    // Event to log document addition
    event DocumentAdded(string hash);

    /**
     * @dev Stores the document hash in the blockchain
     * @param _hash SHA-256 hash of the document
     */
    function addDocument(string memory _hash) public {
        require(!documentHashes[_hash], "Document hash already exists");
        documentHashes[_hash] = true;
        emit DocumentAdded(_hash);
    }

    /**
     * @dev Verifies if a document hash exists on the blockchain
     * @param _hash SHA-256 hash of the document to verify
     * @return bool True if hash exists, false otherwise
     */
    function verifyDocument(string memory _hash) public view returns (bool) {
        return documentHashes[_hash];
    }
}
