import type { Editor } from "@tiptap/react";
import type { VariantProps } from "class-variance-authority";
import type { toggleVariants } from "~/app/_components/ui/toggle";
import { useState } from "react";
import { ToolbarButton } from "../toolbar-button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "~/app/_components/ui/dialog";
import { ImageEditBlock } from "./image-edit-block";
import { Image } from "lucide-react";

interface ImageEditDialogProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

const ImageEditDialog = ({ editor, size, variant }: ImageEditDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ToolbarButton
          isActive={editor.isActive("image")}
          tooltip="Image"
          aria-label="Image"
          size={size}
          variant={variant}
        >
          <Image className="size-5" />
        </ToolbarButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Select image</DialogTitle>
          <DialogDescription className="sr-only">
            Upload an image from your computer
          </DialogDescription>
        </DialogHeader>
        <ImageEditBlock editor={editor} close={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export { ImageEditDialog };
