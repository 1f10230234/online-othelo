import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../../atoms/user';
import styles from './othelo.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [board, setBoard] = useState<number[][]>();
  const fetchBoard = async () => {
    const board = await apiClient.board.$get().catch(returnNull);
    if (board !== null) setBoard(board.board);
  };
  const clickMasu = async (x: number, y: number) => {
    await apiClient.board.$post({ body: { x, y } });

    await fetchBoard();
  };

  useEffect(() => {
    const cancelId = setInterval(fetchBoard, 500);
    return () => {
      clearInterval(cancelId);
    };
  }, []);

  if (!user || !board) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        <div className={styles.board}>
          {board.map((row: number[], y) =>
            row.map((masu, x) => (
              <div className={styles.masu} key={`${x}-${y}`} onClick={() => clickMasu(x, y)}>
                {masu !== 0 && (
                  <div
                    className={styles.ishi}
                    style={{
                      background: masu === 1 ? '#000' : masu === 2 ? '#fff' : '#ff6a00',
                      width: masu === 3 ? '20%' : '87.5%',
                      height: masu === 3 ? '20%' : '87.5%',
                    }}
                  />
                )}
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
        {/* <h1>{`白：` + `${count[0]}` + `個` + ` / ` + `黒：` + `${count[1]}` + `個`}</h1> */}
        {/* <div className={styles.button} onClick={() => click}>
          <button>リセット</button>
        </div> */}
      </div>
    </>
  );
};

export default Home;
