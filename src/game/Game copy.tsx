import { Box, Divider, Slider, Stack, TextField } from '@mui/material';
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

export const Game_V1: React.FC<any> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [{ width, height }, setCanvasConfig] = useState<any>({
    width: 800,
    height: 300,
  });

  const [square, setSquare] = useState<Record<string, number>>({
    width: 100,
    height: 50,
    x: 55,
    y: 25,
  });

  const [defeats, setDefeats] = useState(0);

  const draw = (
    ctx: CanvasRenderingContext2D | null,
    x: number,
    y: number = 50
  ) => {
    if (ctx === null) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#000000';
    //ctx.rotate(60 * Math.PI / 180);
    ctx.fillRect(x, 200, 50, 100);
    ctx.fillRect(x + 100, 0, 50, 120);
    ctx.fillRect(x + 200, 0, 50, 140);

    if ((x === 50 && y < 140)) {
      console.log('collision 1')
      setDefeats(defeats + 1)
      return
    }

    ctx.fillStyle = '#dbdbdb';
    ctx.fillRect(50, y, 50, 50);
  };

  const [counter, setCounter] = useState(300);
  const [player, setPlayer] = useState(120);

  useEffect(() => {
    //console.log('player', player)

    if (player > 300) {
      setPlayer(0);
      //alert('the end')

      //window.location.reload();
    }
  }, [player]);

  useEffect(() => {
    const id: any = setInterval(() => {
      //setPlayer((y) => y + 0.25)
      setCounter((frame) => {
        if (frame === -900) {
          return 300;
        }

        return frame - 1;
      });
    }, 10);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const cvs = canvasRef.current;

    if (!cvs) return;

    let id: any = undefined;

    const render = () => {
      draw(cvs.getContext('2d'), counter, player);

      id = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(id);
    };
  }, [draw, counter, player]);

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <TextField value={counter} label="X" disabled />
        <TextField value={player} label="Player" disabled />
      </Stack>
      <canvas
        style={{ border: '1px solid rgba(250,250,250,0.2)', marginTop: 20 }}
        ref={canvasRef}
        width={width}
        height={height}
        onClick={() => {
          setPlayer((y) => y - 10);
        }}
        onContextMenu={(ev) => {
          ev.preventDefault();
          setPlayer((y) => y + 10);
        }}
      />
      <Stack direction="row" spacing={2}>
        {new Array(defeats).fill(null).map((_, i) => {
          return (
            <Box
              key={i}
              sx={{ width: 20, height: 20, backgroundColor: '#b2102f' }}
            />
          );
        })}
      </Stack>
    </div>
  );
};
