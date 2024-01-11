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

// オーディエンスとテレフォンのボタンを押すと表示されるポップアップ画面
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const PopUpScreen = ({open, handleClose, text}) => {
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
                <DialogContent dividers>
                <Typography gutterBottom>
                    テスト1
                </Typography>
                <Typography gutterBottom>
                    大阪公立大学は、大阪市立大学、大阪府立大学が統合して2022年4月に新たに誕生した公立総合大学です。
                </Typography>
                <Typography gutterBottom>
                    開学にあたってのキャッチフレーズを「総合知で、超えていく大学。」としています。予測不能な社会を生きる私たちに求められるものの一つが「総合知」です。
                    複雑な社会課題を解決に導くには、個々の「専門知」を深め、しっかりと土台を築き上げ、他領域を融合し、「総合知」で挑むことが重要と考えています。
                </Typography>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    閉じる
                </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
}