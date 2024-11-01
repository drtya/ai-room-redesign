import { redirect } from 'next/navigation';
import { Button } from '../components/ui/button';

export default function Home() {
  // return (
  //   <div>
  //     <Button>sdsd</Button>
  //   </div>
  // );
  return redirect('/dashboard');
}
