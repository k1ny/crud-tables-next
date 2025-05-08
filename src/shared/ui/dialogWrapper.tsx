import { ReactNode } from "react";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

type dialogWrapper = {
  triggerName: string;
  title: string;
  children: ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DialogWrapper = ({
  triggerName,
  title,
  children,
  open,
  setOpen,
}: dialogWrapper) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          {triggerName}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
