import 'dotenv/config'
import fetch from "node-fetch";
import {
  ComputeBudgetProgram,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction
} from "@solana/web3.js";
import {getAssociatedTokenAddressSync} from "@solana/spl-token";
import {AnchorProvider, Program, Wallet} from "@project-serum/anchor";
import {IDL} from "./Idl.js";


const cache = {};
const cacheDuration = 300000;
const TAMAGOTCHY_PROGRAM = new PublicKey('tamaePALUFK3hfwTkWrkHY2aDrPqkrHHq1w6JGP1hPT');
const TAMAGOTCHY_ADMIN = new PublicKey('adTJ5xniDsxZqJVRE5WKfx8btNR9wPgv5SUJZiS7fuN');
const SIGNER = Keypair.fromSecretKey(new Uint8Array(JSON.parse(process.env.USER_PK)))
const SIGNER_PK = SIGNER.publicKey;
const connection = new Connection(process.env.RPC_URL);

/*let cachedBlockhash = null;

async function updateBlockhash() {
  try {
    cachedBlockhash = await connection.getLatestBlockhash({commitment: "finalized"});
    console.log("Block data updated:", cachedBlockhash);
  } catch (error) {
    console.error("Failed to fetch block data:", error);
  }
}

function startBlockDataUpdater() {
  updateBlockhash().finally(() => setInterval(updateBlockhash, 60000));
}

async function getCachedBlockData() {
  if (!cachedBlockhash) {
    await updateBlockhash();
  }
  return cachedBlockhash;
}*/

const program = new Program(IDL, TAMAGOTCHY_PROGRAM, new AnchorProvider(connection, new Wallet(SIGNER), {}));

const [tamaUser] = PublicKey.findProgramAddressSync([
  Buffer.from('user_tamagotchi'), SIGNER_PK.toBuffer()
], TAMAGOTCHY_PROGRAM);
const [tamaConfig] = PublicKey.findProgramAddressSync([
  Buffer.from('config_tamagotchi'), TAMAGOTCHY_ADMIN.toBuffer()
], TAMAGOTCHY_PROGRAM);


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getPets(owner) {
  const currentTime = Date.now();

  if (cache[owner] && (currentTime - cache[owner].timestamp) < cacheDuration) {
    return cache[owner].data;
  }

  const url = process.env.RPC_URL;
  const body = {
    "jsonrpc": "2.0",
    "id": `nfts_${owner}`,
    "method": "getTokenAccounts",
    "params": {
      "owner": owner
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'}
    });
    const result = await response.json();

    cache[owner] = {
      data: result,
      timestamp: currentTime
    };

    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function generateTx(action, data, mint, wait = 1000, maxRetries = 100) {
  let retryCount = 0;
  const [tamaNft] = PublicKey.findProgramAddressSync([
    Buffer.from('nft_tamagotchi'), mint.toBuffer()
  ], TAMAGOTCHY_PROGRAM);

  const nft_ata = getAssociatedTokenAddressSync(mint, SIGNER_PK);
  let msg;

  while (retryCount <= maxRetries) {
    try {
      const {blockhash, lastValidBlockHeight} = await connection.getLatestBlockhash({commitment: "finalized"});
      msg = new TransactionMessage({
        payerKey: SIGNER_PK, recentBlockhash: blockhash,
        instructions: [
          ComputeBudgetProgram.setComputeUnitLimit({units: 25_000}),
          ComputeBudgetProgram.setComputeUnitPrice({microLamports: 400_000}),
          new TransactionInstruction({
            data: Buffer.from(data, 'hex'),
            keys: [
              // nft
              {isSigner: false, isWritable: true, pubkey: tamaNft},
              // config
              {isSigner: false, isWritable: true, pubkey: tamaConfig},
              // user
              {isSigner: false, isWritable: true, pubkey: tamaUser},
              // NFT mint address
              {isSigner: false, isWritable: false, pubkey: mint},
              // NFT owner
              {isSigner: true, isWritable: true, pubkey: SIGNER_PK},
              // NFT Ata
              {isSigner: false, isWritable: true, pubkey: nft_ata},
              {isSigner: false, isWritable: false, pubkey: SystemProgram.programId}
            ],
            programId: TAMAGOTCHY_PROGRAM
          })
        ]
      });
      const tx = new VersionedTransaction(msg.compileToV0Message());
      tx.sign([SIGNER]);
      const signature = await connection.sendTransaction(tx, {maxRetries: 0});
      await sleep(450);
      await connection.confirmTransaction({signature, blockhash, lastValidBlockHeight}, "processed");
      // updateState(action, mint, Date.now());
      return signature;
    } catch (err) {
      if (retryCount === maxRetries) {
        console.error("Max retries reached, couldn't interact");
        return "Max retries, couldn't interact";
      }

      if (err.toString().includes("0x1770")) {
        retryCount += 20;
        console.error(`Already interacted, retrying (${retryCount / 20})...`);
        await sleep(wait);
        wait += 10;
        continue;
      }

      console.error(`Attempt ${retryCount + 1}: Error in transaction -`, err);
      await sleep(wait);
      retryCount++;
      wait += 50; // Incremental backoff
    }
  }
}


async function shower(mint) {
  console.log(`Showering pet ${mint} ${await generateTx('shower', '56c3d2775ab9841f00', new PublicKey(mint))}`);
}

async function feed(mint) {
  console.log(`Feeding pet ${mint} ${await generateTx('feed', '56c3d2775ab9841f01', new PublicKey(mint))}`);
}

async function love(mint) {
  console.log(`Loving pet ${mint} ${await generateTx('love', '56c3d2775ab9841f02', new PublicKey(mint))}`);
}

async function fetchNftState(mint) {
  const [tamaNft] = PublicKey.findProgramAddressSync([
    Buffer.from('nft_tamagotchi'), new PublicKey(mint).toBuffer()
  ], TAMAGOTCHY_PROGRAM);

  try {
    return await program.account.nft.fetch(tamaNft);
  } catch (error) {
    console.error(`Error fetching NFT state for mint ${tamaNft}:`, error);
    return null;  // Return null if fetch fails, handle this gracefully in calling code
  }
}

async function actionWithInterval(actionFunc, actionName, mint, interval) {
  const nftState = await fetchNftState(mint);
  if (!nftState) {
    console.error(`Failed to fetch state for ${mint}, scheduling retry...`);
    setTimeout(() => actionWithInterval(actionFunc, actionName, mint), 10000); // Retry after 10 seconds
    return;
  }

  // Fetch the next action time directly from the blockchain state
  const nextActionTime = nftState[`last${actionName}Time`].toNumber() * 1000;
  const currentTime = Date.now();
  const waitTime = nextActionTime - currentTime;

  if (waitTime <= 0) {
    console.log(`Immediately executing ${actionName} for pet ${mint} because the scheduled time is now.`);
    await actionFunc(mint);
    setTimeout(() => actionWithInterval(actionFunc, actionName, mint), interval);
  } else {
    console.log(`Scheduling ${actionName} for pet ${mint} in ${waitTime} ms`);
    setTimeout(() => {
      console.log(`Executing ${actionName} for pet ${mint} at the scheduled time.`);
      actionFunc(mint).then(() => {
        setTimeout(() => actionWithInterval(actionFunc, actionName, mint), interval);
      });
    }, waitTime);
  }
}




(async () => {
  // startBlockDataUpdater();

  const pets = await getPets(SIGNER_PK.toBase58());
  const petsMint = pets.result["token_accounts"].filter(acc => acc.delegate === tamaUser.toBase58()).map(acc => acc.mint);

  const feedInterval = 12 * 60 * 60 * 1000; // every 12 hours
  const showerInterval = 24 * 60 * 60 * 1000; // every 24 hours
  const loveInterval = 8 * 60 * 60 * 1000; // every 8 hours


  for (const mint of petsMint) {
    await actionWithInterval(shower, 'Shower', mint, showerInterval);
    await sleep(1000);
    await actionWithInterval(feed, 'Feed', mint, feedInterval);
    await sleep(1000);
    await actionWithInterval(love, 'Love', mint, loveInterval);
    await sleep(1000);
  }
})();