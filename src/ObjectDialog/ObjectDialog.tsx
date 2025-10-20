import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';

interface ObjectDialogProps {
    open: boolean;
    onClose: () => void;
    date: {
        coord: {
            lat: string;
            lng: string;
        };
        address: string;
    }
}

const ObjectDialog: React.FC<ObjectDialogProps> = ({ open, onClose, date }) => {
    const { coord, address } = date;
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Объект выбран</DialogTitle>
            <DialogContent>
                <Typography key={coord.lat} gutterBottom children={`${coord.lat} : ${coord.lng}`} />
                <Typography children={address} />
            </DialogContent>
        </Dialog>
    );
};

export default ObjectDialog;