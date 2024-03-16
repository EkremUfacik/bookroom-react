import DatePicker from "react-datepicker";

type DateSectionProps = {
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date;
  setEndDate: (date: Date) => void;
  startTime: Date;
  setStartTime: (date: Date) => void;
  endTime: Date;
  setEndTime: (date: Date) => void;
};

const DateSection = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}: DateSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <p className="w-28 font-medium">Start Date:</p>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          selectsStart
          minDate={new Date()}
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd MMMM"
          className="w-40 border border-black rounded-md text-lg p-1"
        />
        <DatePicker
          selected={startTime}
          onChange={(date: Date) => setStartTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          dateFormat="HH:mm"
          timeFormat="HH:mm"
          placeholderText="09:00"
          className="w-20 border border-black rounded-md text-lg p-1"
        />
      </div>
      <div className="flex items-center">
        <p className="w-28 font-medium">End Date:</p>
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          selectsEnd
          minDate={startDate}
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd MMMM"
          className="w-40 border border-black rounded-md text-lg p-1"
        />
        <DatePicker
          selected={endTime}
          onChange={(date: Date) => setEndTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          dateFormat="HH:mm"
          timeFormat="HH:mm"
          placeholderText="10:00"
          className="w-20 border border-black rounded-md text-lg p-1"
        />
      </div>
    </div>
  );
};

export default DateSection;
