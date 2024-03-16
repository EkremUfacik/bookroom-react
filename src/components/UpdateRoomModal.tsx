import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axiosBase } from "@/services/axiosInstance";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/services/fetcher";

type UpdateRoomModalProps = {
  id: number;
  children: React.ReactNode;
};

export function UpdateRoomModal({ id, children }: UpdateRoomModalProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data, refetch } = useQuery({
    queryKey: ["room", id],
    queryFn: () => fetcher(`/room/${id}`),
    enabled: open,
  });

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axiosBase.put(`/room/${data.id}/`, {
        name: e.currentTarget.roomname.value,
        max_occupancy: e.currentTarget.capacity.value,
      });
      console.log(res.data);
      toast({
        title: "Room updated successfully",
      });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      refetch();
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to update room",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Room</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpdate}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="roomname" className="text-right">
                Name
              </Label>
              <Input
                id="roomname"
                name="roomname"
                defaultValue={data?.name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="capacity" className="text-right">
                Capacity
              </Label>
              <Input
                id="capacity"
                type="number"
                name="capacity"
                defaultValue={data?.max_occupancy}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
