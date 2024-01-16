import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { BarChart } from '@mui/x-charts/BarChart';

// オーディエンスのボタンを押すと表示されるポップアップ画面
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const PopUpScreenAudience = ({open, handleClose, text}) => {
    const dialogTitle = text;
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
                <BarChart
                    dataset={[
                        { data: 35, label: 'A' },
                        { data: 25, label: 'B' },
                        { data: 15, label: 'C' },
                        { data: 10, label: 'D' },
                    ]}
                    height={290}
                    width={400}
                    series={[{ dataKey: 'data'}]}
                    xAxis={[{ dataKey: 'label' , scaleType: 'band' }]}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                />
                <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    閉じる
                </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
}