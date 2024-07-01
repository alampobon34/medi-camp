import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import React from 'react'

const DeleteModal = ({ open, handleOpen, handleDelete }) => {
    return (
        <Dialog open={open} handler={handleOpen}>
            <DialogHeader>Delete Confirmation</DialogHeader>
            <DialogBody>
                Do you want to delete?
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="gradient"
                    color="red"
                    onClick={handleOpen}
                    className="mr-2"
                >
                    <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="black" onClick={handleDelete}>
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    )
}

export default DeleteModal