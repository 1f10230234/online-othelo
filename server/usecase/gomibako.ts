// const top = params.y + 1;
// const left = params.x + 1;
// const under = board.length - params.y;
// const right = board.length - params.x;
// //ANCHOR - top
// let changeTurn = 3 - turn;
// const topArr1 = board
//   .slice(0, top)
//   .flat()
//   .filter((n, i) => i % 8 === params.x);
// console.log('top1', topArr1);
// const topArr11 = topArr1.slice(
//   0,
//   (topArr1.length - 1) * Math.max(topArr1.lastIndexOf(0) + 2 - topArr1.length, 0)
// );
// console.log('top11', topArr11);
// const topArr2 = topArr11.slice(topArr11.lastIndexOf(0) + 1, topArr11.length);
// console.log('top2', topArr2);
// const topArr3 = topArr2.slice(
//   (topArr2.lastIndexOf(turn) + (topArr2.length + 1)) % (topArr2.length + 1),
//   topArr2.length
// );
// console.log('top3', topArr3);
// topArr3.slice(0, topArr3.length - 1).forEach((n, d) => {
//   board[params.y - d - 1][params.x] = turn;
//   changeTurn = turn;
// });
// //ANCHOR - topLeft
// const tlTopY = top - Math.min(top, left);
// const tlArr1 = board
//   .slice(tlTopY, top)
//   .flat()
//   .filter((n, i) => ((params.y - tlTopY) * board.length + params.x - i) % 9 === 0);
// console.log('tl1', tlArr1);
// const tlArr11 = tlArr1.slice(
//   0,
//   (topArr1.length - 1) * Math.max(tlArr1.lastIndexOf(0) + 2 - tlArr1.length, 0)
// );
// const tlArr2 = tlArr11.slice(tlArr11.lastIndexOf(0) + 1, tlArr11.length);
// const tlArr3 = tlArr2.slice(
//   (tlArr2.lastIndexOf(turn) + (tlArr2.length + 1)) % (tlArr2.length + 1),
//   tlArr2.length
// );
// tlArr3.slice(0, tlArr3.length - 1).forEach((n, d) => {
//   board[params.y - d - 1][params.x - d - 1] = turn;
//   changeTurn = turn;
// });
// //ANCHOR - left
// const lefArr1 = board[params.y].slice(0, left);
// console.log('lef1', lefArr1);
// const lefArr11 = lefArr1.slice(
//   0,
//   (lefArr1.length - 1) * Math.max(lefArr1.lastIndexOf(0) + 2 - lefArr1.length, 0)
// );
// const lefArr2 = lefArr11.slice(lefArr11.lastIndexOf(0) + 1, lefArr11.length);
// const lefArr3 = lefArr2.slice(
//   (lefArr2.lastIndexOf(turn) + (lefArr2.length + 1)) % (lefArr2.length + 1),
//   lefArr2.length
// );
// lefArr3.slice(0, lefArr3.length - 1).forEach((n, d) => {
//   board[params.y][params.x - d - 1] = turn;
//   changeTurn = turn;
// });
// //ANCHOR - underLeft
// const trUndY = under + board.length - Math.min(under, left);
// const ulArr1 = board
//   .slice(params.y, trUndY)
//   .flat()
//   .filter((n, i) => (params.x - i) % 7 === 0)
//   .reverse();
// console.log('ul1', ulArr1);
// const ulArr11 = ulArr1.slice(
//   0,
//   Math.max(
//     0,
//     Math.max(0, ulArr1.lastIndexOf(0), ulArr1.lastIndexOf(1) + 1, ulArr1.lastIndexOf(2) + 1)
//   )
// );
// const ulArr2 = ulArr11.slice(Math.max(ulArr11.lastIndexOf(0) + 1), ulArr11.length);
// const ulArr3 = ulArr2.slice(
//   (ulArr2.lastIndexOf(turn) + (ulArr2.length + 1)) % (ulArr2.length + 1),
//   ulArr2.length
// );
// ulArr3.slice(0, ulArr3.length - 1).forEach((n, d) => {
//   board[params.y + d + 1][params.x - d - 1] = turn;
//   changeTurn = turn;
// });
// //ANCHOR - under
// const undArr1 = board
//   .slice(params.y, board.length + 1)
//   .flat()
//   .filter((n, i) => i % 8 === params.x)
//   .reverse();
// console.log('und1', undArr1);
// const undArr11 = undArr1.slice(
//   0,
//   Math.max(
//     0,
//     Math.max(undArr1.lastIndexOf(0), undArr1.lastIndexOf(1) + 1, undArr1.lastIndexOf(2) + 1)
//   )
// );
// const undArr2 = undArr11.slice(undArr11.lastIndexOf(0), undArr11.length);
// const undArr3 = undArr2.slice(
//   (undArr2.lastIndexOf(turn) + (undArr2.length + 1)) % (undArr2.length + 1),
//   undArr2.length
// );
// undArr3.slice(0, undArr3.length - 1).forEach((n, d) => {
//   board[params.y + d + 1][params.x] = turn;
//   changeTurn = turn;
// });

// //ANCHOR - underRight
// const urArr1 = board
//   .slice(params.y, board.length + 1)
//   .flat()
//   .filter((n, i) => (params.x - i) % 9 === 0)
//   .slice(0, board.length - params.x)
//   .reverse();
// // .slice(params.y + 1 - params.x, params.y + 1);
// console.log('ur1', urArr1);
// const urArr11 = urArr1.slice(
//   0,
//   Math.max(
//     0,
//     Math.max(urArr1.lastIndexOf(0), urArr1.lastIndexOf(1) + 1, urArr1.lastIndexOf(2) + 1)
//   )
// );
// const urArr2 = urArr11.slice(Math.max(urArr11.lastIndexOf(0) + 1), urArr11.length);
// const urArr3 = urArr2.slice(
//   (urArr2.lastIndexOf(turn) + (urArr2.length + 1)) % (urArr2.length + 1),
//   urArr2.length
// );
// urArr3.slice(0, urArr3.length - 1).forEach((n, d) => {
//   board[params.y + d + 1][params.x + d + 1] = turn;
//   changeTurn = turn;
// });
// //ANCHOR - right
// const rigArr1 = board[params.y].slice(params.x, board.length + 1).reverse();
// console.log('rig1', rigArr1);
// const rigArr11 = rigArr1.slice(
//   0,
//   Math.max(
//     0,
//     Math.max(rigArr1.lastIndexOf(0), rigArr1.lastIndexOf(1) + 1, rigArr1.lastIndexOf(2) + 1)
//   )
// );
// const rigArr2 = rigArr11.slice(Math.max(rigArr11.lastIndexOf(0) + 1), rigArr11.length);
// const rigArr3 = rigArr2.slice(
//   (rigArr2.lastIndexOf(turn) + (rigArr2.length + 1)) % (rigArr2.length + 1),
//   rigArr2.length
// );
// rigArr3.slice(0, rigArr3.length - 1).forEach((n, d) => {
//   board[params.y][params.x + d + 1] = turn;
//   changeTurn = turn;
// });
// //ANCHOR - topRight
// const trArr1 = board
//   .slice(params.y - Math.min(params.y, board.length - 1 - params.x), params.y + 1)
//   .flat()
//   .filter(
//     (n, i) =>
//       (params.x -
//         i -
//         (params.y * 2 - Math.min(params.y, board.length - 1 - params.x)) * board.length) %
//         7 ===
//       0
//   );
// console.log('tr1', trArr1);
// const trArr11 = trArr1.slice(
//   0,
//   Math.max(
//     0,
//     Math.max(0, trArr1.lastIndexOf(0), trArr1.lastIndexOf(1) + 1, trArr1.lastIndexOf(2) + 1)
//   )
// );
// const trArr2 = trArr11.slice(Math.max(trArr11.lastIndexOf(0) + 1), trArr11.length);
// const trArr3 = trArr2.slice(
//   (trArr2.lastIndexOf(turn) + (trArr2.length + 1)) % (trArr2.length + 1),
//   trArr2.length
// );
// trArr3.slice(0, trArr3.length - 1).forEach((n, d) => {
//   board[params.y - d - 1][params.x + d + 1] = turn;
//   changeTurn = turn;
// });
