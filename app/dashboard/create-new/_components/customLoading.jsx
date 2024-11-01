import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Image from 'next/image';

function CustomLoading({loading}) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="p-0 overflow-hidden">
          <Image className='w-full h-full'
            src={'/loaderbox.gif'}
            alt="loading..."
            width={300}
            height={200}
          />
          <p className='absolute left-1/2 -translate-x-1/2 bottom-8 text-nowrap'>Redesigning your room ... Do not refresh</p>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomLoading;
