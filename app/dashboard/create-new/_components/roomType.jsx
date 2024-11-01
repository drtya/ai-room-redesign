import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function RoomType({ selectedRoomType }) {
  return (
    <div>
      <label htmlFor="" className="text-gray-500">
        Select Room Type *
      </label>
      <Select onValueChange={(value) => selectedRoomType(value)}>
        <SelectTrigger className="w-full mt-3">
          <SelectValue placeholder="Room Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Living Room">Living Room</SelectItem>
          <SelectItem value="Badroom">Badroom</SelectItem>
          <SelectItem value="Kitchan">Kitchan</SelectItem>
          <SelectItem value="Office">Office</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default RoomType;
