import { Button, Dialog } from "@material-tailwind/react";
import React from "react";

const FileExtInfoDialog = ({ open, setOpen }) => {
  return (
    <Dialog
      open={!!open}
      handler={() => setOpen(null)}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="xs"
      className="!bg-white opacity-100 px-6 py-4 shadow !shadow-pm border-[1px] border-pm"
    >
      <div className="bg-white pb-4">
        <p className="text-black font-medium leading-[18px] text-sm text-center">
          {open}
        </p>
      </div>
      <div className="flex items-center justify-end">
        <Button
          type="button"
          size="sm"
          onClick={() => setOpen(null)}
          className="bg-red-600 hover:bg-red-700 text-white rounded"
        >
          <span>Cancel</span>
        </Button>
      </div>
    </Dialog>
  );
};

export default FileExtInfoDialog;
