// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract TreeRegistry is AccessControl {
    
    using EnumerableSet for EnumerableSet.UintSet;

    // Define roles for access control
    bytes32 public constant PLANTER_ROLE = keccak256("PLANTER_ROLE"); // Role for planters
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE"); // Role for admins

    // Struct to store tree data
    struct TreeRecord {
        uint256 userId; // userid from psql who planted the tree
        uint256 treeId; 
        string plantationDate; // Timestam
        string latitude; 
        string longitude; 
    }

   
    mapping(uint256 => TreeRecord) private _treeRecords;

    // Set to store all tree IDs
    EnumerableSet.UintSet private _treeIds;

    // event on tree addition
    event TreeAdded(uint256 indexed treeId, uint256 indexed userId, string plantationDate);

  
    constructor() {
        _grantRole(ADMIN_ROLE, msg.sender); // Grant admin role
        _setRoleAdmin(PLANTER_ROLE, ADMIN_ROLE); 
    }

    modifier onlyPlanter() {
        require(hasRole(PLANTER_ROLE, msg.sender), "TreeRegistry: Caller is not a planter");
        _;
    }

  
    modifier onlyAdmin() {
        require(hasRole(ADMIN_ROLE, msg.sender), "TreeRegistry: Caller is not an admin");
        _;
    }

    function addTreeRecord(
        uint256 userId,
        uint256 treeId,
        string memory plantationDate,
        string memory latitude,
        string memory longitude
    ) external onlyPlanter {
        require(_treeRecords[treeId].treeId == 0, "TreeRegistry: Tree ID already exists");

        // Create a new TreeRecord
        _treeRecords[treeId] = TreeRecord({
            userId: userId,
            treeId: treeId,
            plantationDate: plantationDate,
            latitude: latitude,
            longitude: longitude
        });

        
        _treeIds.add(treeId);

        // Emit an event for the new tree
        emit TreeAdded(treeId, userId, plantationDate);
    }

    // Function to get tree data by treeId
    function getTreeRecord(uint256 treeId) external view returns (
        uint256 userId,
        string memory plantationDate,
        string memory latitude,
        string memory longitude
    ) {
        require(_treeRecords[treeId].treeId != 0, "TreeRegistry: Tree ID does not exist");

        TreeRecord memory record = _treeRecords[treeId];
        return (
            record.userId,
            record.plantationDate,
            record.latitude,
            record.longitude
        );
    }

    function getAllTreeIds() external view returns (uint256[] memory) {
        return _treeIds.values();
    }

  
    function getTreeCount() external view returns (uint256) {
        return _treeIds.length();
    }

    // grant planter role
    function grantPlanterRole(address account) external onlyAdmin {
        grantRole(PLANTER_ROLE, account);
    }

    // revoke planter role
    function revokePlanterRole(address account) external onlyAdmin {
        revokeRole(PLANTER_ROLE, account);
    }
}