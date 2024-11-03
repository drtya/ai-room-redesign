import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function RoomType({
  selectedRoomType,
  fieldError,
}: {
  selectedRoomType: any;
  fieldError: string[];
}) {
  return (
    <div>
      <label
        htmlFor=""
        className={`text-gray-500 ${fieldError && 'text-red-400'}`}
      >
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
      {fieldError && <p className="text-sm text-red-500 mt-3">{fieldError[0]}</p>}
    </div>
  );
}

export default RoomType;
