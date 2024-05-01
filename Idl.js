export const IDL =  {
  version: "0.1.0",
  name: "tamagotchy_program",
  instructions: [{
    name: "createConfigAccount",
    accounts: [{
      name: "configProgramAccount",
      isMut: true,
      isSigner: false
    }, {
      name: "admin",
      isMut: true,
      isSigner: true
    }, {
      name: "systemProgram",
      isMut: false,
      isSigner: false
    }, {
      name: "rent",
      isMut: false,
      isSigner: false
    }],
    args: []
  }, {
    name: "editConfigAccount",
    accounts: [{
      name: "configProgramAccount",
      isMut: true,
      isSigner: false
    }, {
      name: "admin",
      isMut: true,
      isSigner: true
    }, {
      name: "systemProgram",
      isMut: false,
      isSigner: false
    }],
    args: [{
      name: "options",
      type: {
        defined: "ConfigOption"
      }
    }]
  }, {
    name: "createNftAccount",
    accounts: [{
      name: "nftProgramAccount",
      isMut: true,
      isSigner: false
    }, {
      name: "user",
      isMut: true,
      isSigner: true
    }, {
      name: "nftMint",
      isMut: true,
      isSigner: false
    }, {
      name: "nftMetadata",
      isMut: true,
      isSigner: false
    }, {
      name: "systemProgram",
      isMut: false,
      isSigner: false
    }, {
      name: "rent",
      isMut: false,
      isSigner: false
    }],
    args: []
  }, {
    name: "createUserAccount",
    accounts: [{
      name: "userProgramAccount",
      isMut: true,
      isSigner: false
    }, {
      name: "user",
      isMut: true,
      isSigner: true
    }, {
      name: "systemProgram",
      isMut: false,
      isSigner: false
    }, {
      name: "rent",
      isMut: false,
      isSigner: false
    }],
    args: []
  }, {
    name: "lock",
    accounts: [{
      name: "lockAccounts",
      accounts: [{
        name: "nftProgramAccount",
        isMut: true,
        isSigner: false
      }, {
        name: "userProgramAccount",
        isMut: true,
        isSigner: false
      }, {
        name: "user",
        isMut: true,
        isSigner: true
      }, {
        name: "nftTokenAccount",
        isMut: true,
        isSigner: false
      }, {
        name: "nft",
        isMut: true,
        isSigner: false
      }, {
        name: "nftMetadata",
        isMut: true,
        isSigner: false
      }, {
        name: "nftEdition",
        isMut: true,
        isSigner: false
      }, {
        name: "delegateRecord",
        isMut: true,
        isSigner: false
      }, {
        name: "authorizationRules",
        isMut: true,
        isSigner: false
      }, {
        name: "tokenRecord",
        isMut: true,
        isSigner: false
      }, {
        name: "sysvarInstructions",
        isMut: false,
        isSigner: false
      }, {
        name: "authorizationRulesProgram",
        isMut: false,
        isSigner: false
      }, {
        name: "systemProgram",
        isMut: false,
        isSigner: false
      }, {
        name: "tokenProgram",
        isMut: false,
        isSigner: false
      }, {
        name: "metadataProgram",
        isMut: false,
        isSigner: false
      }]
    }],
    args: []
  }, {
    name: "unlock",
    accounts: [{
      name: "userThiiAta",
      isMut: true,
      isSigner: false
    }, {
      name: "configThiiAta",
      isMut: true,
      isSigner: false
    }, {
      name: "unlockAccounts",
      accounts: [{
        name: "nftProgramAccount",
        isMut: true,
        isSigner: false
      }, {
        name: "userProgramAccount",
        isMut: true,
        isSigner: false
      }, {
        name: "user",
        isMut: true,
        isSigner: true
      }, {
        name: "nftTokenAccount",
        isMut: true,
        isSigner: false
      }, {
        name: "nft",
        isMut: true,
        isSigner: false
      }, {
        name: "nftMetadata",
        isMut: true,
        isSigner: false
      }, {
        name: "nftEdition",
        isMut: true,
        isSigner: false
      }, {
        name: "delegateRecord",
        isMut: true,
        isSigner: false
      }, {
        name: "authorizationRules",
        isMut: true,
        isSigner: false
      }, {
        name: "tokenRecord",
        isMut: true,
        isSigner: false
      }, {
        name: "sysvarInstructions",
        isMut: false,
        isSigner: false
      }, {
        name: "authorizationRulesProgram",
        isMut: false,
        isSigner: false
      }, {
        name: "systemProgram",
        isMut: false,
        isSigner: false
      }, {
        name: "tokenProgram",
        isMut: false,
        isSigner: false
      }, {
        name: "metadataProgram",
        isMut: false,
        isSigner: false
      }]
    }],
    args: []
  }, {
    name: "interact",
    accounts: [{
      name: "nftProgramAccount",
      isMut: true,
      isSigner: false
    }, {
      name: "configProgramAccount",
      isMut: true,
      isSigner: false
    }, {
      name: "userProgramAccount",
      isMut: true,
      isSigner: false
    }, {
      name: "nftMint",
      isMut: false,
      isSigner: false
    }, {
      name: "user",
      isMut: true,
      isSigner: true
    }, {
      name: "nftAta",
      isMut: true,
      isSigner: false
    }, {
      name: "systemProgram",
      isMut: false,
      isSigner: false
    }],
    args: [{
      name: "interactionType",
      type: {
        defined: "InteractionType"
      }
    }]
  }, {
    name: "swapCoinsForThii",
    accounts: [{
      name: "configProgramAccount",
      isMut: true,
      isSigner: false
    }, {
      name: "userProgramAccount",
      isMut: true,
      isSigner: false
    }, {
      name: "user",
      isMut: true,
      isSigner: true
    }, {
      name: "userThiiAta",
      isMut: true,
      isSigner: false
    }, {
      name: "configThiiAta",
      isMut: true,
      isSigner: false
    }, {
      name: "adminPubkey",
      isMut: true,
      isSigner: false
    }, {
      name: "systemProgram",
      isMut: false,
      isSigner: false
    }, {
      name: "tokenProgram",
      isMut: false,
      isSigner: false
    }],
    args: [{
      name: "swapTypeAmount",
      type: {
        defined: "SwapCoinsThii"
      }
    }]
  }, {
    name: "swapThiiForSol",
    accounts: [{
      name: "configProgramAccount",
      isMut: true,
      isSigner: false
    }, {
      name: "userProgramAccount",
      isMut: true,
      isSigner: false
    }, {
      name: "user",
      isMut: true,
      isSigner: true
    }, {
      name: "userThiiAta",
      isMut: true,
      isSigner: false
    }, {
      name: "configThiiAta",
      isMut: true,
      isSigner: false
    }, {
      name: "adminPubkey",
      isMut: true,
      isSigner: false
    }, {
      name: "systemProgram",
      isMut: false,
      isSigner: false
    }, {
      name: "tokenProgram",
      isMut: false,
      isSigner: false
    }],
    args: [{
      name: "swapTypeAmount",
      type: {
        defined: "SwapThiiSol"
      }
    }]
  }],
  accounts: [{
    name: "config",
    type: {
      kind: "struct",
      fields: [{
        name: "minTimeToFeed",
        type: "u64"
      }, {
        name: "minTimeToShower",
        type: "u64"
      }, {
        name: "minTimeToLove",
        type: "u64"
      }, {
        name: "experiencePerEachFeed",
        type: "f64"
      }, {
        name: "experiencePerEachShower",
        type: "f64"
      }, {
        name: "experiencePerEachLove",
        type: "f64"
      }, {
        name: "happinessPerEachLove",
        type: "f64"
      }, {
        name: "happinessPerEachFeed",
        type: "f64"
      }, {
        name: "happinessPerEachShower",
        type: "f64"
      }, {
        name: "amountOfCoinsPerEachFeed",
        type: "f64"
      }, {
        name: "amountOfCoinsPerEachShower",
        type: "f64"
      }, {
        name: "amountOfCoinsPerEachLove",
        type: "f64"
      }, {
        name: "amountOfThiiPerCoin",
        type: "f64"
      }, {
        name: "amountOfSolPerThii",
        type: "f64"
      }, {
        name: "feePerTx",
        type: "f64"
      }]
    }
  }, {
    name: "nft",
    type: {
      kind: "struct",
      fields: [{
        name: "lastFeedTime",
        type: "u64"
      }, {
        name: "lastLoveTime",
        type: "u64"
      }, {
        name: "lastShowerTime",
        type: "u64"
      }, {
        name: "experience",
        type: "f64"
      }, {
        name: "happiness",
        type: "f64"
      }, {
        name: "isLock",
        type: "bool"
      }]
    }
  }, {
    name: "user",
    type: {
      kind: "struct",
      fields: [{
        name: "coins",
        type: "f64"
      }]
    }
  }],
  types: [{
    name: "ConfigOption",
    type: {
      kind: "enum",
      variants: [{
        name: "MinTimeToFeed",
        fields: [{
          name: "val",
          type: "u64"
        }]
      }, {
        name: "MinTimeToShower",
        fields: [{
          name: "val",
          type: "u64"
        }]
      }, {
        name: "MinTimeToLove",
        fields: [{
          name: "val",
          type: "u64"
        }]
      }, {
        name: "ExperiencePerEachFeed",
        fields: [{
          name: "val",
          type: "f64"
        }]
      }, {
        name: "ExperiencePerEachLove",
        fields: [{
          name: "val",
          type: "f64"
        }]
      }, {
        name: "ExperiencePerEachShower",
        fields: [{
          name: "val",
          type: "f64"
        }]
      }, {
        name: "HappinessPerEachFeed",
        fields: [{
          name: "val",
          type: "f64"
        }]
      }, {
        name: "HappinessPerEachLove",
        fields: [{
          name: "val",
          type: "f64"
        }]
      }, {
        name: "HappinessPerEachShower",
        fields: [{
          name: "val",
          type: "f64"
        }]
      }, {
        name: "AmountOfCoinsPerEachFeed",
        fields: [{
          name: "val",
          type: "f64"
        }]
      }, {
        name: "AmountOfCoinsPerEachShower",
        fields: [{
          name: "val",
          type: "f64"
        }]
      }, {
        name: "AmountOfCoinsPerEachLove",
        fields: [{
          name: "val",
          type: "f64"
        }]
      }, {
        name: "AmountOfThiiPerCoin",
        fields: [{
          name: "val",
          type: "f64"
        }]
      }, {
        name: "AmountOfSolPerThii",
        fields: [{
          name: "val",
          type: "f64"
        }]
      }, {
        name: "FeePerTx",
        fields: [{
          name: "val",
          type: "f64"
        }]
      }]
    }
  }, {
    name: "InteractionType",
    type: {
      kind: "enum",
      variants: [{
        name: "Shower"
      }, {
        name: "Feed"
      }, {
        name: "Love"
      }]
    }
  }, {
    name: "SwapCoinsThii",
    type: {
      kind: "enum",
      variants: [{
        name: "AmountOfCoins",
        fields: [{
          name: "val",
          type: "f64"
        }]
      }, {
        name: "AmountOfThii",
        fields: [{
          name: "val",
          type: "f64"
        }]
      }]
    }
  }, {
    name: "SwapThiiSol",
    type: {
      kind: "enum",
      variants: [{
        name: "AmountOfSol",
        fields: [{
          name: "val",
          type: "f64"
        }]
      }, {
        name: "AmountOfThii",
        fields: [{
          name: "val",
          type: "f64"
        }]
      }]
    }
  }],
  errors: [{
    code: 6e3,
    name: "TimeError",
    msg: "The time to interact has not elapsed yet."
  }, {
    code: 6001,
    name: "UnstakeTimeError",
    msg: "The time to unstake has not elapsed yet."
  }, {
    code: 6002,
    name: "CreatorError",
    msg: "This creator address is not valid."
  }, {
    code: 6003,
    name: "InvalidMint",
    msg: "This mint is not valid."
  }, {
    code: 6004,
    name: "InvalidAdmin",
    msg: "Invalid administrator of the config."
  }, {
    code: 6005,
    name: "InvalidOwner",
    msg: "Invalid owner of the Associated Account."
  }, {
    code: 6006,
    name: "InvalidState",
    msg: "Nft must be lock."
  }, {
    code: 6007,
    name: "InvalidAmount",
    msg: "Invalid amount to swap."
  }, {
    code: 6008,
    name: "InvalidPoolAmount",
    msg: "Pool is not funded yet."
  }]
}
