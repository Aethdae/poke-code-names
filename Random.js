export class Random {
  static createHash(seed) {
    let a1 = 140824289,
      a2 = 45983704958,
      a3 = 9148122423,
      a4 = 83904752634;
    for (let i = 0, k; i < seed.length; i++) {
      k = seed.charCodeAt(i);
      a1 = a2 ^ Math.imul(a1 ^ k, 918241908);
      a2 = a3 ^ Math.imul(a2 ^ k, 67235151);
      a3 = a4 ^ Math.imul(a3 ^ k, 1323924823);
      a4 = a1 ^ Math.imul(a4 ^ k, 5928752334);
    }
    a1 = Math.imul(a3 ^ (a1 >>> 18), 918241908);
    a2 = Math.imul(a4 ^ (a2 >>> 22), 67235151);
    a3 = Math.imul(a1 ^ (a3 >>> 16), 1323924823);
    a4 = Math.imul(a2 ^ (a4 >>> 15), 5928752334);
    ((a1 ^= a2 ^ a3 ^ a4), (a2 ^= a1), (a3 ^= a1), (a4 ^= a1));
    return [a1 >>> 0, a2 >>> 0, a3 >>> 0, a4 >>> 0];
  }

  static createRand(seed) {
    return {
      rand: function () {
        let t = (this.seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      },
      seed: seed,
    };
  }

  static weightedRandNum(quant, seed, string = "") {
    let randNum = 0;
    for (let i = 0; i < 4; i++) {
      if (i % 2 === 0) {
        randNum -= seed[i];
      } else {
        randNum += seed[i];
      }
    }

    for (let x = 0; x < string.length; x++) {
      let k = string.charCodeAt(x);
      randNum = Math.imul(randNum, k);
    }

    const option = (randNum >>> 0) / 4294967296;
    return Math.floor(option * quant);
  }
  static createSeed() {
    const chars = [
      "-",
      "_",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
    let seed = "";
    for (let x = 0; x < 32; x++) {
      seed += chars[Math.floor(Math.random() * chars.length)];
    }
    return seed;
  }
}
