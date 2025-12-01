import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LoginIcon from "@mui/icons-material/Login";
import { Fragment, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function AuthButton() {
  const {
    currentUser,
    isLoggedIn,
    handleLogin,
    handleLogout,
    loginError,
    loading,
  } = useAuth();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogoutClick = () => {
    handleLogout();
    handleClose();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;

    if (email) {
      const success = await handleLogin(email);
      if (success) {
        handleClose();
      }
    }
  };

  const LoggedInDialog = () => (
    <>
      <article>
        <DialogContent>
          <Box className="p-2 text-center">
            <AccountCircleRoundedIcon
              className="mb-4"
              //responsiv design
              sx={{
                fontSize: 48,
                color: "var(--text)",
                "@media (min-width: 900px)": {
                  fontSize: 60,
                },
              }}
            />
            <Typography
              variant="h6"
              className="font-semibold mb-1"
              sx={{
                color: "var(--text)",
              }}
            >
              Welcome, {currentUser?.name}!
            </Typography>
            <DialogContentText
              className="body2"
              sx={{
                color: "var(--text)",
                borderRadius: 5,
              }}
            >
              You are logged in as: {currentUser?.email}.
            </DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: "var(--text)",
            }}
          >
            Close
          </Button>
          <Button
            onClick={handleLogoutClick}
            variant="contained"
            color="error"
            startIcon={<ExitToAppIcon />}
            sx={{
              bgcolor: "var(--bg)",
              color: "var(--text)",
            }}
          >
            Log out
          </Button>
        </DialogActions>
      </article>
    </>
  );

  const LoggedOutDialog = () => (
    <form onSubmit={handleSubmit} id="login-form">
      <DialogTitle
        id="user-auth-dialog-title"
        sx={{
          color: "var(--text)",
        }}
      >
        Log In or Register
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="user-auth-dialog-description"
          className="mb-4"
          sx={{
            color: "var(--text)",
          }}
        >
          To write ratings, you need to log in with your email or register as a
          new user.
        </DialogContentText>

        <TextField
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          fullWidth
          variant="outlined"
          error={!!loginError}
          helperText={loginError || "Eks: yourname@example.com"}
          disabled={loading}
          sx={{
            "& .MuiInputBase-input": {
              color: "#222725",
            },
            "& .MuiInputLabel-root": {
              color: "#222725",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#222725" },
              "&:hover fieldset": { borderColor: "#2E6F40" },
              "&.Mui-focused fieldset": { borderColor: "#2E6F40" },
            },
            "& .MuiFormHelperText-root": {
              color: "#222725",
            },
            ".dark &": {
              "& .MuiInputBase-input": {
                color: "#F7F7F2",
              },
              "& .MuiInputLabel-root": {
                color: "#F7F7F2",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#F7F7F2" },
                "&:hover fieldset": { borderColor: "#899878" },
                "&.Mui-focused fieldset": { borderColor: "#899878" },
              },
              "& .MuiFormHelperText-root": {
                color: "#F7F7F2",
              },
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          disabled={loading}
          sx={{
            color: "var(--text)",
            borderRadius: 5,
            padding: 1.5,
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          aria-label="submit login"
          form="login-form"
          variant="contained"
          disabled={loading}
          sx={{
            bgcolor: "var(--bg)",
            color: "var(--text)",
            borderRadius: 5,
          }}
          startIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <LoginIcon />
            )
          }
        >
          Log in / Register
        </Button>
      </DialogActions>
    </form>
  );

  return (
    <Fragment>
      <Button
        onClick={handleClickOpen}
        sx={{
          borderRadius: 5,
          color: "var(--text)",
          border: "none",
          "&:hover": {
            backgroundColor: "var(--accent-secondary)",
          },
        }}
      >
        <AccountCircleRoundedIcon className="mr-2" />
        <Typography variant="body2">
          {isLoggedIn ? currentUser?.name.split(" ")[0] : "Log in"}
        </Typography>
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="user-auth-dialog"
        aria-describedby="user-auth-dialog-description"
        slotProps={{
          paper: {
            sx: {
              bgcolor: "var(--card)",
              color: "var(--text)",
              borderRadius: 3,
              boxShadow: "0 12px 30px rgba(0,0,0,.35)",
            },
          },
          backdrop: {
            sx: { backgroundColor: "rgba(0,0,0,.4)" },
          },
        }}
      >
        {isLoggedIn ? LoggedInDialog() : LoggedOutDialog()}
      </Dialog>
    </Fragment>
  );
}
