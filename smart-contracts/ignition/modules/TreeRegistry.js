const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const TreeRegModule = buildModule("TreeRegModule", (m) => {
    
    const TreeRegistry = m.contract("TreeRegistry");

    return { TreeRegistry };
});

module.exports = TreeRegModule;