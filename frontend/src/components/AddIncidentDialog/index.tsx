import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import AddIncidentForm from "../AddIncidentForm";
import { useCallback } from "react";

interface AddIncidentDialogProps {
  open: boolean;
  handleClose: () => void;
}

const AddIncidentDialog = (props: AddIncidentDialogProps) => {
  const { handleClose, open } = props;

  const submitCallback = useCallback(() => {
    handleClose();
  }, [handleClose]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Add Incident
        <IconButton
          aria-label="close"
          onClick={props.handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <AddIncidentForm submitCallback={submitCallback} />
      </DialogContent>
    </Dialog>
  );
};

export default AddIncidentDialog;
