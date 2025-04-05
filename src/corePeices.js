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
    //create back  rows
    whitePeices[peice] = peices[peice]("white");
    whitePeices[peice].position.z = 0;
    whitePeices[peice].position.x = 1.5 * Object.keys(whitePeices).length - 1.5;

    blackPeices[peice] = peices[peice]("black");
    blackPeices[peice].rotation.y = Math.PI;
    blackPeices[peice].position.z = 1.5 * 7;
    blackPeices[peice].position.x = 1.5 * Object.keys(blackPeices).length - 1.5;

    scene.add(whitePeices[peice]);
    scene.add(blackPeices[peice]);
  }
  for (let i = 0; i < 8; i++) {
    // create pawn rows
    const whitePawn = createPawn("white");
    const blackPawn = createPawn("black");
    whitePawn.position.x = 1.5 * i;
    whitePawn.position.z = 1.5;
    blackPawn.position.x = 1.5 * i;
    blackPawn.position.z = 1.5 * 6;
    scene.add(whitePawn, blackPawn);
  }

  return { whitePeices, blackPeices };
}
