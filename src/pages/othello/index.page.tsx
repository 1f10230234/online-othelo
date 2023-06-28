import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../../atoms/user';
import styles from './othello.module.css';

const turns = ['', '黒のターン', '白のターン', 'ゲーム終了'];

const styleDicts = [
  {
    backgroundColor: '#0000',
  },
  {
    backgroundColor: '#000',
    width: '90%',
    height: '90%',
  },
  {
    backgroundColor: '#fff',
    width: '90%',
    height: '90%',
  },

  {
    backgroundColor: '#f80',
    width: '20%',
    height: '20%',
  },
];

const Home = () => {
  const [user] = useAtom(userAtom);
  const [board, setBoard] = useState<number[][]>();
  const [around, setAround] = useState<{
    exCount: number[];
    exTurn: number;
    exPassCount: number;
  } | null>();
  const fetchBoard = async () => {
    const res1 = await apiClient.rooms.$get().catch(returnNull);
    if (res1 === null) {
      const newRoom = await apiClient.rooms.$post();
      setBoard(newRoom.board);
    } else {
      setBoard(res1.board);
      const res2 = await apiClient.rooms.board.$get().catch(returnNull);
      setAround(res2);
    }
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
  if (!user || !board) {
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
                <div className={styles.stone} style={styleDicts[color]} />
              </div>
            ))
          )}
        </div>
        {around && (
          <>
            <h1>{`${turns[around.exTurn]}`}</h1>
            <h1>{`白：${around.exCount[0]}個 / 黒：${around.exCount[1]}個`}</h1>
            {(around.exTurn - 3) * around.exPassCount !== 0 && (
              <h1>{`${turns[3 - around.exTurn]}が${around.exPassCount}回パスされました`}</h1>
            )}
          </>
        )}
        {/* <div className={styles.button} onClick={() => click}>
      <button>リセット</button>
    </div> */}
      </div>
    </>
  );
};

export default Home;
