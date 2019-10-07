const SHA256 = require('crypto-js/sha256');

class Block {
	constructor(index, timestamp, data, previousHash) {
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
	} 

	calculateHash() {
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
	}
}

class Blockchain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock() {
		return new Block(0,'01/01/2019','Genesis Block', '0');
	}

	getLatestBlock() {
		return this.chain[this.chain.length-1];
	}

	addBlock(newBlock) {
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}

	isChainValid() {
		for (let i=1; i<this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const prevBlock = this.chain[i-1];

			//error i: checks if the current block is tempered
			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			//error ii: check if the previous block is a valid link
			if (prevBlock.hash !== currentBlock.previousHash) {
				return false;
			}
		}
		return true;
	}

}

//create instance for testing
let savjeeCoin = new Blockchain();
savjeeCoin.addBlock(new Block(1, '02/01/2019', {amount: 4}));
savjeeCoin.addBlock(new Block(2, '03/01/2019', {amount: 10}));


console.log("Is blockchain valid? " + savjeeCoin.isChainValid());

//error i
savjeeCoin.chain[1].data = {amount: 3};
console.log("Is blockchain valid? " + savjeeCoin.isChainValid());
// console.log("current hash: " + savjeeCoin.chain[1].hash);
// console.log("calculated current hash: " + savjeeCoin.chain[1].calculateHash());

//error ii
savjeeCoin.chain[1].hash = savjeeCoin.chain[1].calculateHash()
console.log("Is blockchain valid? " + savjeeCoin.isChainValid()); 
// console.log("current prev hash:" + savjeeCoin.chain[2].previousHash);
// console.log("true previous hash: " + savjeeCoin.chain[1].hash);


// console.log(JSON.stringify(savjeeCoin, null, 4));
