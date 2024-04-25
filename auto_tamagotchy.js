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

const cache = {};
const cacheDuration = 300000;
const TAMAGOTCHY_PROGRAM = new PublicKey('tamaePALUFK3hfwTkWrkHY2aDrPqkrHHq1w6JGP1hPT');
const TAMAGOTCHY_ADMIN = new PublicKey('adTJ5xniDsxZqJVRE5WKfx8btNR9wPgv5SUJZiS7fuN');
const SIGNER = Keypair.fromSecretKey(new Uint8Array(JSON.parse(process.env.USER_PK)))
const SIGNER_PK = SIGNER.publicKey;
const connection = new Connection(process.env.RPC_URL);

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

async function generateTx(data, mint, retry = 0) {
  if (retry === 5) {
    console.log("Max retries, couldn't interact");
    return;
  }

  const [tamaNft] = PublicKey.findProgramAddressSync([
    Buffer.from('nft_tamagotchi'), mint.toBuffer()
  ], TAMAGOTCHY_PROGRAM);

  const nft_ata = getAssociatedTokenAddressSync(mint, SIGNER_PK);
  let msg;

  const {blockhash} = await connection.getLatestBlockhash();
  msg = new TransactionMessage({
    payerKey: SIGNER_PK, recentBlockhash: blockhash,
    instructions: [
      ComputeBudgetProgram.setComputeUnitLimit({units: 30_000}),
      ComputeBudgetProgram.setComputeUnitPrice({microLamports: 100_000}),
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
  try {
    return await connection.sendTransaction(tx);
    // const simulate = await connection.simulateTransaction(tx,);
    // if (simulate.value.err !== null) {
    //   console.log(simulate.value.logs);
    //   console.log(simulate.value.err);
    // } else {
    //   return connection.sendTransaction(tx);
    // }
  } catch (err) {
    console.log(err);
    if (err.toString().includes("0x1770")) {
      console.log("Already interacted waiting 1s ...");
      await sleep(1000);
    }

    await generateTx(data, mint, retry + 1);
  }
}

async function shower(mint) {
  console.log(`Showering pet ${mint} ${await generateTx('56c3d2775ab9841f00', new PublicKey(mint))}`);
}

async function feed(mint) {
  console.log(`Feeding pet ${mint} ${await generateTx('56c3d2775ab9841f01', new PublicKey(mint))}`);
}

async function love(mint) {
  console.log(`Loving pet ${mint} ${await generateTx('56c3d2775ab9841f02', new PublicKey(mint))}`);
}

(async () => {
  const pets = await getPets(SIGNER_PK.toBase58());
  const petsMint = pets.result["token_accounts"].filter(acc => acc.delegate === tamaUser.toBase58()).map(acc => acc.mint);

  // Define intervals in milliseconds
  const feedInterval = 12 * 60 * 60 * 1000; // every 12 hours
  const showerInterval = 24 * 60 * 60 * 1000; // every 24 hours
  const loveInterval = 8 * 60 * 60 * 1000; // every 8 hours

  // for (const mint of petsMint) {
  //   await shower(mint);
  //   await sleep(1000);
  //   await feed(mint);
  //   await sleep(1000);
  //   await love(mint);
  //   await sleep(1000);
  // }

  setInterval(async () => {
    console.log("Start interval shower");
    for (const mint of petsMint) {
      await shower(mint);
      await sleep(1000);
    }
  }, showerInterval);

  setInterval(async () => {
    console.log("Start interval feed");
    for (const mint of petsMint) {
      await feed(mint);
      await sleep(1000);
    }
  }, feedInterval);

  setInterval(async () => {
    console.log("Start interval love");
    for (const mint of petsMint) {
      await love(mint);
      await sleep(1000);
    }
  }, loveInterval);
})();