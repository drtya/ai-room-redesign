'use client'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';


function AiOutputDialog({ openDialog, closeDialog, orgImageUrl, aiImageUrl }) {
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
        <Button type="button" onClick={() => closeDialog(false)}>Close</Button>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AiOutputDialog;
