import Board, { tile } from "./Components/Board.tsx";

export type Board = (tile | null)[][];
let isIntialized = false;
let board: Board;
let Tiles: tile[] = [];
let id = 0;
let isLost: boolean = false;
let score: number = 0;

/*const generateTile = (x: number, y: number) => {
  board[x][y] = { number: 2, id: id++, position: { x: x, y: y } };
  Tiles.push(board[x][y]);
};*/
export const getIsLost = () => isLost;
export const getScore = () => score;
export const getIsWon = () : boolean => {
  Tiles.forEach(tile => { 
    if ( tile.number == 2048 || true)
       return true})
      return false;
}
const generateRandomTile = () => {
  const RandomPos = () => {
    let positions: { x: number; y: number }[] = [];
    board.forEach((col, x) =>
      col.forEach((tile, y) => {
        if (!tile) positions.push({ x, y });
      })
    );
    if (positions.length > 0) {
      let index: number = Math.floor(Math.random() * positions.length);
      return positions[index];
    } else {
      isLost = checkLost();

      return null;
    }
  };
  let t = RandomPos();
  if (t) {
    board[t!.x][t!.y] = { number: 2, id: id++, position: { x: t!.x, y: t!.y } };
    Tiles.push(board[t!.x][t!.y]!);
  }
};
const checkLost = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] && board[i][j + 1] && board[i + 1][j]) {
        if (
          board[i][j]!.number == board[i][j + 1]!.number ||
          board[i][j]!.number == board[i + 1][j]!.number ||
          board[i + 1][j]!.number == board[i + 1][j + 1]!.number
        ) {
          return false;
        }
      } else return false;
    }
  }
  return true;
};
export const initializeBoard = () => {
  Tiles = [];
  score = 0;
  board = Array.from({ length: 4 }, (_) =>
    Array.from({ length: 4 }, (_) => null)
  );
  generateRandomTile();
  generateRandomTile();
  isIntialized = true;
};

export const gameReset = () => {
  initializeBoard();
  isLost = false;
};
export const GetTiles = () => {
  if (!isIntialized) {
    isIntialized = true;
    initializeBoard();
  }
  return Tiles;
};
export const MoveLeft = () => {
  let newBoard: Board = Array.from({ length: 4 }, () =>
    Array.from({ length: 4 }, () => null)
  );
  let newTiles: tile[] = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[j][i]) {
        let k = j;
        while (k > 0 && newBoard[k - 1][i] == null) {
          k--;
        }
        if (
          k > 0 &&
          newBoard[k - 1][i] &&
          newBoard[k - 1][i]!.number == board[j][i]!.number &&
          !newBoard[k - 1][i]!.isMerged
        ) {
          let x = {
            number: board[j][i]!.number * 2,
            id: board[j][i]!.id,
            position: { x: k - 1, y: i },
            isMerged: true,
          };
          newTiles.push({ ...x, isMerged: true });
          newBoard[k - 1][i] = x;
          score += x.number;
        } else {
          newBoard[k][i] = {
            ...board[j][i]!,
            position: { x: k, y: i },
            isMerged: false,
          };
          newTiles.push(newBoard[k][i]!);
        }
      }
    }
  }
  Tiles = newTiles;
  board = newBoard;
  generateRandomTile();
};
export const MoveRight = () => {
  let newBoard: Board = Array.from({ length: 4 }, (_,) =>
    Array.from({ length: 4 }, () => null)
  );
  let newTiles: tile[] = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 3; j >= 0; j--) {
      if (board[j][i]) {
        let k = j;
        while (k < 3 && newBoard[k + 1][i] == null) {
          k++;
        }
        if (
          k < 3 &&
          newBoard[k + 1][i] &&
          newBoard[k + 1][i]!.number == board[j][i]!.number &&
          !newBoard[k + 1][i]!.isMerged
        ) {
          let x = {
            number: board[j][i]!.number * 2,
            id: board[j][i]!.id,
            position: { x: k + 1, y: i },
            isMerged: true,
          };
          newTiles.push({ ...x });
          newBoard[k + 1][i] = x;
          score += x.number;
        } else {
          newBoard[k][i] = {
            ...board[j][i]!,
            position: { x: k, y: i },
            isMerged: false,
          };
          newTiles.push(newBoard[k][i]!);
        }
      }
    }
  }
  Tiles = newTiles;
  board = newBoard;
  generateRandomTile();
};
export const MoveUp = () => {
  let newBoard: Board = Array.from({ length: 4 }, (_) =>
    Array.from({ length: 4 }, () => null)
  );
  let newTiles: tile[] = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[j][i]) {
        let k = i;
        while (k > 0 && newBoard[j][k - 1] == null) {
          k--;
        }
        if (
          k > 0 &&
          newBoard[j][k - 1] &&
          newBoard[j][k - 1]!.number == board[j][i]!.number &&
          !newBoard[j][k - 1]!.isMerged
        ) {
          let x = {
            number: board[j][i]!.number * 2,
            id: board[j][i]!.id,
            position: { x: j, y: k - 1 },
            isMerged: true,
          };
          newTiles.push({ ...x });
          newBoard[j][k - 1] = x;
          score += x.number;
        } else {
          newBoard[j][k] = {
            ...board[j][i]!,
            position: { x: j, y: k },
            isMerged: false,
          };
          newTiles.push(newBoard[j][k]!);
        }
      }
    }
  }
  Tiles = newTiles;
  board = newBoard;
  generateRandomTile();
};
export const MoveDown = () => {
  let newBoard: Board = Array.from({ length: 4 }, (_) =>
    Array.from({ length: 4 }, () => null)
  );
  let newTiles: tile[] = [];

  for (let i = 3; i >= 0; i--) {
    for (let j = 0; j < 4; j++) {
      if (board[j][i]) {
        let k = i;
        while (k < 3 && newBoard[j][k + 1] == null) {
          k++;
        }
        if (
          k < 3 &&
          newBoard[j][k + 1] &&
          newBoard[j][k + 1]!.number == board[j][i]!.number &&
          !newBoard[j][k + 1]!.isMerged
        ) {
          let x = {
            number: board[j][i]!.number * 2,
            id: board[j][i]!.id,
            position: { x: j, y: k + 1 },
            isMerged: true,
          };
          newTiles.push({ ...x });
          newBoard[j][k + 1] = x;
          score += x.number;
        } else {
          newBoard[j][k] = {
            ...board[j][i]!,
            position: { x: j, y: k },
            isMerged: false,
          };
          newTiles.push(newBoard[j][k]!);
        }
      }
    }
  }
  Tiles = newTiles;
  board = newBoard;
  generateRandomTile();
};
