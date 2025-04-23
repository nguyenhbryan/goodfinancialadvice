import { updateCoins } from "@/actions/updateCoins";

const payout = 0;

function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }
  
  function combinations(n, k) {
    if (k > n) return 0;
  
    // Use the more efficient multiplicative formula
    let result = 1;
    for (let i = 1; i <= k; i++) {
      result *= (n - i + 1) / i;
    }
    return result;
  }  
 export function calculateMultiplier(totalTiles, numMines, picks, houseEdge = 0.1) {
    const safeTiles = totalTiles - numMines;
    if (picks > safeTiles) return 0;
  
    const fairMultiplier = combinations(totalTiles, picks) / combinations(safeTiles, picks);
    const adjustedMultiplier = Math.pow(fairMultiplier, 0.65); // or 0.6, 0.5, etc.

    return adjustedMultiplier * (1 - houseEdge);
  }

