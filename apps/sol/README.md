# V-DAO

This github repo contains the hardhat smart contracts project for **V Dao**.

![alt text](https://github.com/regen005/5W-DAO/blob/main/logo.png?raw=true)


### A top-level contracts layout

    .
    ├── GrantRounds                   # Contracts for deploying grants rounds and quadratic funding (delegation not allowed)
    │   ├── RoundFactory.sol 
    │   ├── RoundImplementation.sol 
    │   └── RoundInterfaces.sol 
    ├── OperationProposals            # Contracts for creating/ voting on operation proposals (supports delegation) 
    │   ├── VDAOImplementation.sol 
    │   ├── VDAOInterfaces.sol 
    │   └── VDAOProxy.sol 
    ├── interfaces                    # Interfaces 
    ├── proxy                         # Proxy for upgradable contracts
    ├── test                          # Mock contracts for unit test cases
    ├── utils                         # structs used by project
    ├── DonationSBT.sol               # contracts to mint and upgrade Donation SBTs
    ├── Timelock.sol                  # timelock contracts for buffer
    ├── TokenDistributor.sol          # contract to distribute initial tokens to contributors
    ├── Treasury.sol                  # Treasury contract to store funds and accept donations
    ├── VDaoToken.sol                 # V token contract to vote on operation proposals and quadratic funding rounds
    └── VTokenNFT.sol                 # V NFT contract 

### To compile the contracts
```
npm install
npx hardhat compile 
```
### Run test
```
npx hardhat test
```
