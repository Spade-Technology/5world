// User => Etch
// User => Etch => uint


// Etches themselves
contract Etches is ERC721, IEtch {

    uint public totalEtches;
    mapping(uint256 => address) owners;
    mapping(uint256 => Etch) etches;

    mapping(address => uint256[]) etchesByOwner; // can easily get grabbed by the backed

    function owner(uint256 etch) view {
       return delegatedOwnership(owners[etch]);
    }

    function delegatedOwnership (address owner) view {
        // is _owner a Team contract ? if yes the team contract owner, if the team contract is an organisation, the organisation owner
        // return the highest level of ownership
    }

    function createEtch(address owner, string IpfsCid) {
        totalEtches++;

        Etch etch = Etch({
            owner: delegatedOwnership(owner),
            IpfsCid: IpfsCid,
            messages: new message[](0)
        });

        owners[totalEtches] = owner;
        etches[totalEtches] = etch;
        etchesByOwner[owner].push(totalEtches);
    }
}


// Managing Permissions
contract Team is AccessControl, ITeam, verifySignature {

    public address owner; // can be organisation
    public address billingAccount; // can be organisation for owner
    public mapping(address => Permission) members; 

    // extend the Etch Interface as Proxy
    callEtchAsTeam(uint256 etch) {
        // if it's a write operation we cna check if the team has the permission to do it (Permission === 2)
        // check if msg.sender has the permission to do action on the etch
    }

    

}

// Managing Teams not required
contract Organisation is AccessControl, verifySignature {
    
    public address owner;
    public address[] teams;

    // extend the Etch Interface as Proxy
    

    // Logic to manage teams (interface aswell)
}

contact verifySignature {}

interface IEtch {

    struct message {
        address from;
        string IpfsCid;
    }

    struct Etch {
        address owner 
        string IpfsCid 
        message[] message
    }
}

interface ITeam {
    enum Permission {
        None // 0
        Read // 1
        Write // 2
    }
}