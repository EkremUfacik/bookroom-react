import DateSection from "@/components/DateSection";
import LogoutButton from "@/components/LogoutButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { formatDate, formatTime } from "@/lib/utils";
import { axiosBase } from "@/services/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

type Data = {
  formattedStartDate: string;
  formattedStartTime: string;
  formattedEndDate: string;
  formattedEndTime: string;
  attendees: number;
};

const User = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date("2024-03-16T09:00:00"));
  const [endTime, setEndTime] = useState(new Date("2024-03-16T10:00:00"));
  const [attendees, setAttendees] = useState(10);

  const { toast } = useToast();

  const formattedStartDate = formatDate(startDate);
  const formattedStartTime = formatTime(startTime);
  const formattedEndDate = formatDate(endDate);
  const formattedEndTime = formatTime(endTime);

  const mutation = useMutation({
    mutationFn: async (data: Data) => {
      try {
        const res = await axiosBase.get(
          `/avaliablerooms/?start_date=${
            data.formattedStartDate + " " + data.formattedStartTime
          }&end_date=${
            data.formattedEndDate + " " + data.formattedEndTime
          }&attendees=${data.attendees}`
        );
        console.log(res.data);
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
          throw error.response?.data;
        } else {
          console.error(error);
        }
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({
      formattedStartDate,
      formattedStartTime,
      formattedEndDate,
      formattedEndTime,
      attendees,
    });
  };

  const handleReservation = async (id: number) => {
    try {
      const res = await axiosBase.post("/bookroom/", {
        room: id,
        start_time: formattedStartDate + " " + formattedStartTime,
        end_time: formattedEndDate + " " + formattedEndTime,
        attendees,
      });
      console.log(res.data);
      toast({
        title: "Reservation Created",
        description: "Your reservation has been created successfully",
      });
      mutation.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  const { data, isPending, isError, error } = mutation;

  return (
    <div className="text-center px-8">
      <LogoutButton />
      <form
        className="flex flex-col items-center justify-center gap-8 my-12"
        onSubmit={handleSubmit}
      >
        <DateSection
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
        />
        <div className="flex items-center gap-4">
          <Label htmlFor="attendees" className="whitespace-nowrap">
            Number of Attendees:
          </Label>
          <Input
            id="attendees"
            className=" border border-black text-lg w-20"
            type="number"
            value={attendees}
            onChange={(e) => setAttendees(parseInt(e.target.value))}
          />
        </div>
        <Button disabled={isPending} className="w-28">
          List Rooms
        </Button>
      </form>

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
              className="border border-slate-600 w-72 py-6  rounded-md"
            >
              <p>
                <span className="font-semibold">Room Name: </span>
                {room.name}
              </p>
              <p className="my-6">
                <span className="font-semibold ">Max Occupancy: </span>
                {room.max_occupancy}
              </p>
              <Button
                className="mt-4"
                variant="outline"
                onClick={() => handleReservation(room.id)}
              >
                Create Reservation
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
