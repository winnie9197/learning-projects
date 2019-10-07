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
			const currentBock = this.chain[i];
			const prevBlock = this.chain[i-1];

			if (currentBlock.hash != currentBlock.calculateHash()) {
				return false;
			}
		}
	}

}

//create instance for testing
let savjeeCoin = new Blockchain();
savjeeCoin.addBlock(new Block(1, '02/01/2019', {amount: 4}));
savjeeCoin.addBlock(new Block(2, '03/01/2019', {amount: 10}));

console.log(JSON.stringify(savjeeCoin, null, 4));

