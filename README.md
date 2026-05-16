# Blockchain Based Document Verification Web

A full-stack web application for document integrity verification using SHA-256 hashing, SQLite database, and Ethereum Blockchain.

## Features
- **Upload Document:** Generates a unique SHA-256 hash, stores it in SQLite, and writes it to the Blockchain.
- **Verify Document:** Compares the hash of an uploaded file against records on the Blockchain/SQLite.
- **Dashboard:** View the history of all uploaded documents.
- **Modern UI:** Clean, light blue-themed responsive interface.

## Project Structure
- `/frontend`: HTML, CSS, and Vanilla JS.
- `/backend`: Node.js Express server and API routes.
- `/backend/database`: SQLite database configuration.
- `/contracts`: Solidity Smart Contract.
- `/uploads`: Temporary storage for document processing.

## Prerequisites
- **Node.js:** Installed on your system.
- **Ganache:** For local blockchain development (e.g., [Ganache GUI](https://trufflesuite.com/ganache/)).

## Setup & Execution

### 1. Install Dependencies
Open your terminal in the project root (`~/Desktop/blockchain-website`) and run:
```bash
npm install
```

### 2. Smart Contract Deployment (Blockchain)
1. Open **Ganache** and start a new workspace.
2. Deploy the `contracts/DocumentVerification.sol` contract using a tool like **Remix IDE**, **Truffle**, or **Hardhat**.
   - Copy the deployed **Contract Address**.
   - Ensure the ABI matches the one in `backend/server.js` (it already does by default).

### 3. Configure Environment Variables
Create or edit the `.env` file in the root directory:
```env
PORT=3000
RPC_URL=http://127.0.0.1:7545 (Default Ganache RPC)
PRIVATE_KEY= (Your Ganache account private key)
CONTRACT_ADDRESS= (Address of the deployed contract)
```
*Note: If blockchain details are not provided, the system will fallback to the local SQLite database for verification.*

### 4. Start the Server
Run the following command:
```bash
node backend/server.js
```
The application will be live at: **http://localhost:3000**

## Usage
1. **Home:** Introduction to the system.
2. **Upload:** Select a file (PDF, Image, etc.). The system will hash it and store it.
3. **Verify:** Upload the SAME file to see "Original Document ✅". Modify the file and upload again to see "Tampered Document ❌".
4. **Dashboard:** View all previously uploaded document metadata.

## License
ISC
