import { redirect } from 'next/navigation'
import Listing from './_components/listing'

function Dashboard() {
  return (
    <div>
      <Listing/>
    </div>
  )
}

export default Dashboard