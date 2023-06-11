import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../../atoms/user';
import styles from './othelo.module.css';

const turns = ['', '黒のターン', '白のターン', 'ゲーム終了'];
const Home = () => {
  const [user] = useAtom(userAtom);
  const [board, setBoard] = useState<number[][]>();
  const [count, setCount] = useState<number[]>();
  const [turn, setTurn] = useState<number>();
  const fetchBoard = async () => {
    const board = await apiClient.board.$get().catch(returnNull);
    if (board !== null) setBoard(board.board);
  };
  const fetchArounds = async () => {
    const count = await apiClient.board.$get().catch(returnNull);
    const turn = await apiClient.board.$get().catch(returnNull);
    if (count !== null) setCount(count.count);
    if (turn !== null) setTurn(turn.turn);
  };
  const clickCell = async (x: number, y: number) => {
    await apiClient.board.$post({ body: { x, y } });

    await fetchBoard();
  };
  useEffect(() => {
    const cancelId = setInterval(fetchBoard, 500);
    return () => {
      clearInterval(cancelId);
    };
  }, []);

  useEffect(() => {
    const cancelId = setInterval(fetchArounds, 500);
    return () => {
      clearInterval(cancelId);
    };
  }, []);
  if (!user || !board || !count || !turn) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        <div className={styles.board}>
          {board.map((row: number[], y) =>
            row.map((color, x) => (
              <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickCell(x, y)}>
                <div className={`${styles.stone} ${styles[`color-${color}`]}`} />
              </div>
            ))
          )}
        </div>
        {/* {
          <h1>
            {`${turnColor === 1 ? '黒' : '白'}` +
              `の番：置けま` +
              `${
                board.some((row: number[]) => row.includes(3))
                  ? 'す'
                  : 'せん。(画面をクリックしてパス)'
              }`}
          </h1>
        } */}
        <h1>{`${turns[turn]}`}</h1>
        <h1>{`白：${count[0]}個 / 黒：${count[1]}個`}</h1>
        {/* <div className={styles.button} onClick={() => click}>
          <button>リセット</button>
        </div> */}
      </div>
    </>
  );
};

export default Home;
