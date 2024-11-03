'use client';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';

function AiOutputDialog({
  openDialog,
  closeDialog,
  orgImageUrl,
  aiImageUrl,
}: {
  openDialog: boolean;
  closeDialog: Dispatch<SetStateAction<boolean>>;
  orgImageUrl: string;
  aiImageUrl: string;
}) {
  return (
    <AlertDialog open={openDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Result</AlertDialogTitle>
          <ReactBeforeSliderComponent
            firstImage={{ imageUrl: orgImageUrl }}
            secondImage={{ imageUrl: aiImageUrl }}
          />
        </AlertDialogHeader>
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            closeDialog(false);
          }}
        >
          Close
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AiOutputDialog;
