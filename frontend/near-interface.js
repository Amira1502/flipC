/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */
import 'regenerator-runtime/runtime';

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
export class HelloNEAR {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;    
  }

  async getGreeting(player) {
    let points =  await this.wallet.viewMethod({ contractId: this.contractId, method: 'viewPoints', args: {player}});
    console.log(points)
    return (points)
  }

  async setGreeting(Side) {
    let outcome =  await this.wallet.callMethod({ contractId: this.contractId, method: 'flipCoin', args: { guess_coin: Side } });
    console.log(outcome)
    return outcome;
  }
}
