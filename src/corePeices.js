import { createQueen } from "./peices/queen.js";
import { createPawn } from "./peices/pawn.js";
import { createKing } from "./peices/king.js";
import { createRook } from "./peices/rook.js";
import { createKnight } from "./peices/knight.js";
import { createBishop } from "./peices/bishop.js";

const peices = {
  rook: (color) => createRook(color),
  knight: (color) => createKnight(color),
  bishop: (color) => createBishop(color),
  queen: (color) => createQueen(color),
  king: (color) => createKing(color),
  bishop2: (color) => createBishop(color),
  knight2: (color) => createKnight(color),
  rook2: (color) => createRook(color),
};

export function createPeices(board, scene) {
  let blackPeices = {};
  let whitePeices = {};
  for (let peice in peices) {
    whitePeices[peice] = peices[peice]("white");
    whitePeices[peice].position.z = board.children[0].position.z;
    whitePeices[peice].position.x =
      board.children[Object.keys(whitePeices).length - 1].position.x;

    blackPeices[peice] = peices[peice]("black");
    blackPeices[peice].rotation.y = Math.PI;
    blackPeices[peice].position.z = board.children[63].position.z;
    blackPeices[peice].position.x =
      board.children[Object.keys(blackPeices).length - 1].position.x;
    console.log(Object.keys(blackPeices).length);

    scene.add(whitePeices[peice]);
    scene.add(blackPeices[peice]);

    console.log({ peice });
  }
  console.log(whitePeices);

  return { whitePeices, blackPeices };
}
