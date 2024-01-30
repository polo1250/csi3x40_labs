function createGame(n) {
  let game = [];
  for (let i = 0; i < n; i++) {
    game.push(".");
  }

  // Place "C"
  game[Math.floor(Math.random() * n)] = "C";

  // Place "^"
  while (true) {
    let ghost = Math.floor(Math.random() * n);
    if (game[ghost] === ".") {
      game[ghost] = "^";
      break;
    }
  }

  // Place "^" and "@"
  while (true) {
    let fruit = Math.floor(Math.random() * n);
    if (game[fruit] === ".") {
      game[fruit] = "@";
      break;
    }
  }

  return game;
}
