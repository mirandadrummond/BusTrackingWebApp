import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AdminLogin(props) {

    return (
        <div>
            {
                props.loggedIn ? <LogOut setAdmin={props.setAdmin}/> : <Login setAdmin={props.setAdmin} />
            }
        </div>
    );
}

function Login(props) {
    const [open, setOpen] = useState(false);
    const [username, setUser] = useState('');
    const [pwd, updatePwd] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogin = () => {
        if (username === "admin" && pwd === "root") {
            props.setAdmin(true);
            setOpen(false);
        }
    };

    const updateUsername = (event) => {
        setUser(event.target.value)
    }

    const updatePassword = (event) => {
        updatePwd(event.target.value)
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Admin Login
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Admin Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter admin credentials to update the routing system.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="admin-username"
                        label="Username"
                        type="text"
                        variant="standard"
                        onChange={updateUsername}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="admin-password"
                        label="Password"
                        type="password"
                        variant="standard"
                        onChange={updatePassword}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleLogin}>Login</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

function LogOut(props) {

    const handleLogOut = () => {
        props.setAdmin(false);
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleLogOut}>
                Log Out
            </Button>
        </div>
    )
}