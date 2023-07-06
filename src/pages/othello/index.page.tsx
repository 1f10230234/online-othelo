import { useAtom } from 'jotai';
import { useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnDefaultNumber, returnDefaultNumbers } from 'src/utils/returnDefault';
import { returnNull } from 'src/utils/returnNull';
import { styleDicts } from 'src/utils/styleDict';
import { userAtom } from '../../atoms/user';
import styles from './othello.module.css';

const turns = ['', '黒のターン', '白のターン', 'ゲーム終了'];

const Home = () => {
  const [user] = useAtom(userAtom);
  const [board, setBoard] = useState<number[][]>();
  const [count, setCount] = useState<number[]>([2, 2]);
  const [turn, setTurn] = useState<number>(1);
  const [pass, setPass] = useState<number>(0);

  const fetchBoard = async () => {
    console.log('apiClient.rooms.$get().catch(returnNull)');
    const res1 = await apiClient.rooms.$get().catch(returnNull);
    if (res1 === null) {
      console.log('apiClient.rooms.$post()');
      const newRoom = await apiClient.rooms.$post();
      setBoard(newRoom.board);
    } else {
      setBoard(res1.board);
      setTurn(returnDefaultNumber(1, res1.turn));
      setPass(returnDefaultNumber(0, res1.passCount));
      console.log('apiClient.rooms.board.$get()');
      const res2 = await apiClient.rooms.board.$get();
      setCount(returnDefaultNumbers([2, 2], res2));
    }
  };
  if (!board) {
    fetchBoard();
  }
  const clickCell = async (x: number, y: number) => {
    console.log('apiClient.rooms.board.$post({ body: { x, y } })');
    await apiClient.rooms.board.$post({ body: { x, y } });
    fetchBoard();
  };
  // useEffect(() => {
  //   const cancelId = setInterval(fetchBoard, 500);
  //   return () => {
  //     clearInterval(cancelId);
  //   };
  // }, []);
  if (!user || !board) {
    return <Loading visible />;
  }
  const isNotNull = (): boolean => [count, turn, pass].every((i) => i !== null);
  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container} style={{ background: '#888' }} onClick={() => fetchBoard()}>
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
        {isNotNull() && (
          <>
            <h1>{`${turns[turn]}`}</h1>
            <h1>{`白：${count[0]}個 / 黒：${count[1]}個`}</h1>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
