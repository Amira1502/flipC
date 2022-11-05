import { NearBindgen, near, call, view, UnorderedMap } from 'near-sdk-js';
type Side = 'heads' | 'tails'

// function that return heads or tails 
function generateRandomeNb(): Side{
   // randomSeed creates a random string, learn more about it in the README
   const randomString: string = near.randomSeed();

   // If the last charCode is even we choose heads, otherwise tails
   return randomString.charCodeAt(0) % 2 ? 'heads' : 'tails';
}

@NearBindgen({}) 
class coinFlip {
  points: UnorderedMap = new UnorderedMap("points");
   
  @call({}) 
  flipCoin({ guess_coin } : {guess_coin : Side}) : Side {
     // Check who called the methode 
     const player = near.predecessorAccountId();

     near.log(`${player} chose ${guess_coin}`);
     // Simulate coin flip
     const outcome = generateRandomeNb();

     // Get the current player points
     let player_points: number = (this.points.get(player) || 0) as number

     // Check if this guess was right & modify the points accordignly
     if( guess_coin == outcome){
      near.log(`The result was ${outcome}, you get a point!`);
      player_points += 1;
     }else {
      near.log(`The result was ${outcome}, you lost a point`);
      player_points = player_points? player_points - 1 : 0;
    }

     // Store the new points
     this.points.set(player, player_points)

     return outcome
    }
    // rerturn how many point the player has 
  @view({}) 
  viewPoints({ player } : {player : string}) : number{
   const points = (this.points.get(player) || 0) as number
   near.log(`Points for ${player} : ${points}`)
   return points
  }
  
}