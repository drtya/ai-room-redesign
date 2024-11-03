import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center mt-10 gap-4">
      <Image src="/roomImage.png" alt='room Image' width={200} height={200} />
      <h2 className="font-medium text-xl text-gray-500">
        Create new AI interior design for your room
      </h2>
      <Link href="/dashboard/create-new">
        <Button>Redesign Room</Button>
      </Link>
    </div>
  );
}

export default EmptyState;
