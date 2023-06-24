import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../../atoms/user';
import styles from './othello.module.css';

// const turns = ['', '黒のターン', '白のターン', 'ゲーム終了'];
const Home = () => {
  const [user] = useAtom(userAtom);
  const [board, setBoard] = useState<number[][]>();
  // const [count, setCount] = useState<number[]>();
  // const [turn, setTurn] = useState<number>();
  // const [passCount, setPassCount] = useState<number>();
  const fetchBoard = async () => {
    const res = await apiClient.rooms.$get().catch(returnNull);
    if (res === null) {
      const newRoom = await apiClient.rooms.$post();
      setBoard(newRoom.board);
    } else {
      setBoard(res.board);
    }
    // const fetchArounds = async () => {
    //   const count = await apiClient.rooms.$get().catch(returnNull);
    //   const turn = await apiClient.rooms.$get().catch(returnNull);
    //   const passCount = await apiClient.rooms.$get().catch(returnNull);
    // if (count !== null) setCount(count.count);
    // if (turn !== null) setTurn(turn.turn);
    // if (passCount !== null) setPassCount(passCount.passCount);
  };
  const clickCell = async (x: number, y: number) => {
    console.log(apiClient);
    await apiClient.rooms.board.$post({ body: { x, y } });
    await fetchBoard();
  };

  useEffect(() => {
    const cancelId = setInterval(fetchBoard, 500);
    return () => {
      clearInterval(cancelId);
    };
  }, []);

  // useEffect(() => {
  //   const cancelId = setInterval(fetchArounds, 500);
  //   return () => {
  //     clearInterval(cancelId);
  //   };
  // }, []);
  // const nulls = [user, board, count, turn];
  //const bool = (board:Board|null,...):asserts board is Boolean =>{return nulls.some((n)=>!n)}
  if (
    !user ||
    !board
    // nulls.some((n) => !n)
  ) {
    return <Loading visible />;
  }

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        {/* <div>{`あなたの色は${turns[turn]}`}</div> */}
        <div className={styles.board}>
          {board.map((row: number[], y) =>
            row.map((color, x) => (
              <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickCell(x, y)}>
                <div className={`${styles.stone} ${styles[`color-${color}`]}`} />
              </div>
            ))
          )}
        </div>
        {/* <h1>{`${turns[turn]}`}</h1> */}
        {/* <h1>{`白：${count[0]}個 / 黒：${count[1]}個`}</h1> */}
        {/* {(turn - 3) * passCount !== 0 && (
          <h1>{`${turns[3 - turn]}が${passCount}回パスされました`}</h1>
        )} */}
        {/* <div className={styles.button} onClick={() => click}>
          <button>リセット</button>
        </div> */}
      </div>
    </>
  );
};

export default Home;
