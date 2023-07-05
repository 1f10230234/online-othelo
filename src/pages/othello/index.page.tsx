import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnDefaultNumber, returnDefaultNumbers } from 'src/utils/returnDefault';
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
  const [count, setCount] = useState<number[]>([2, 2]);
  const [turn, setTurn] = useState<number>(1);
  const [pass, setPass] = useState<number>(0);
  const fetchBoard = async () => {
    const res1 = await apiClient.rooms.$get().catch(returnNull);
    if (res1 === null) {
      const newRoom = await apiClient.rooms.$post(); //最初の一回
      setBoard(newRoom.board);
    } else {
      setBoard(res1.board);
      setTurn(returnDefaultNumber(1, res1.turn));
      setPass(returnDefaultNumber(0, res1.passCount));
      const res2 = await apiClient.rooms.board.$get();
      setCount(returnDefaultNumbers([2, 2], res2));
    }
  };
  const clickCell = async (x: number, y: number) => {
    console.log(111);
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
  const isNull = (): boolean => [count, turn, pass].some((i) => i === null);
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
        {isNull() && (
          <>
            <h1>{`${turns[turn]}`}</h1>
            <h1>{`白：${count[0]}個 / 黒：${count[1]}個`}</h1>
            {(turn - 3) * pass !== 0 && <h1>{`${turns[3 - turn]}が${pass}回パスされました`}</h1>}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
