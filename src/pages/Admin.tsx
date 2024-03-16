import { CreateRoomModal } from "@/components/CreateRoomModal";
import LogoutButton from "@/components/LogoutButton";
import { UpdateRoomModal } from "@/components/UpdateRoomModal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { axiosBase } from "@/services/axiosInstance";
import { fetcher } from "@/services/fetcher";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Admin = () => {
  const { isPending, data, error, isError } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => fetcher("/listrooms"),
  });
  const queryClient = useQueryClient();
  const { toast } = useToast();

  console.log(data);

  const handleDelete = async (id: number) => {
    try {
      await axiosBase.delete(`/room/${id}`);
      toast({
        title: "Room deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to delete room",
      });
    }
  };

  return (
    <div className="text-center px-8">
      <LogoutButton />
      <div className="my-8">
        <CreateRoomModal>
          <Button>Create Room</Button>
        </CreateRoomModal>
      </div>
      <div>
        <h1 className="text-xl font-semibold">Rooms Lists</h1>
        <div className="my-4 flex flex-wrap justify-center items-center gap-6">
          {isPending && <p className="text-slate-800 ">Loading...</p>}
          {isError && (
            <p className="text-red-600 font-semibold">Error: {error.message}</p>
          )}
          {data?.length === 0 && (
            <p className="text-red-600 font-semibold">
              No rooms available for the selected date and time
            </p>
          )}
          {data?.map((room: any) => (
            <div
              key={room.id}
              className="border border-slate-600 w-72 py-6 rounded-md"
            >
              <p>
                <span className="font-semibold">Room Name: </span>
                {room.name}
              </p>
              <p className="my-6">
                <span className="font-semibold">Max Occupancy: </span>
                {room.max_occupancy}
              </p>
              <div className="mt-10">
                <UpdateRoomModal id={room.id}>
                  <Button variant="secondary" className="text-xs mr-2">
                    Edit
                  </Button>
                </UpdateRoomModal>
                <Button
                  variant="destructive"
                  className="text-xs w-12 h-8"
                  onClick={() => handleDelete(room.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
