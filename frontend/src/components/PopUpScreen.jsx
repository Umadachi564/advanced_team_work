import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

// テレフォンのボタンを押すと表示されるポップアップ画面
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const PopUpScreen = ({open, handleClose, text, mainText, loading}) => {
    const dialogTitle = text;
    const dialogMainText = mainText;
    console.log(loading);
    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    {dialogTitle}
                </DialogTitle>
                <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
                >
                    <CloseIcon />
                </IconButton>
                {loading ? (
                    <div className="spinner">
                        <CircularProgress color="secondary"/>
                    </div>
                ) : (
                    <>
                        <DialogContent dividers>
                        <Typography gutterBottom>
                            返答結果
                        </Typography>
                        <Typography gutterBottom>
                            {dialogMainText}
                        </Typography>
                        </DialogContent>
                        <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            閉じる
                        </Button>
                        </DialogActions>
                    </>
                    )}
            </BootstrapDialog>
        </>
    );
}