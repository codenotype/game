import { VisibilityOff, Visibility } from '@mui/icons-material';
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import '@fontsource/roboto/700.css';
import { Game } from '../../game/Game';
import { Background } from '../../game/Background';

export const AuthPage: React.FC<any> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [started, setStarted] = useState(true);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        gap: 10,
      }}
    >
      {!started && (
        <>
          <Typography variant="h1">GREAT COLLECTION</Typography>
          <Typography variant="h1">9999 in 1</Typography>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              width: 400,
              marginTop: 20,
            }}
          >
            <TextField
              id="outlined-basic"
              label="Login"
              variant="outlined"
              placeholder="Enter your login here"
            />
            <TextField
              id="outlined-adornment-password"
              placeholder="Enter your password here"
              label="Password"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((sp) => !sp)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              onClick={() => setStarted(true)}
              variant="contained"
              color="success"
            >
              Start
            </Button>
          </div>
        </>
      )}
      {started && <Game />}
    </div>
  );
};
