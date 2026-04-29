import { useEffect } from "react";
import type { CalendarEvent } from "../types/event";
import {
  eventSchema,
  type EventFormValues,
} from "../../../shared/schema/eventSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
  onDelete?: (id: string) => void;
  selectedDate: string;
  editEvent: CalendarEvent | null;
  position: { x: number; y: number };
}

const COLORS = [
  "#3b86ff",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
];

export const EventModal = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  selectedDate,
  editEvent,
  position,
}: EventModalProps) => {
  const generateId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      date: selectedDate,
      time: "",
      notes: "",
      color: COLORS[0],
    },
  });

  const selectedColor = watch("color");

  useEffect(() => {
    if (editEvent) {
      reset(editEvent);
    } else {
      reset({
        title: "",
        date: selectedDate,
        time: "",
        notes: "",
        color: COLORS[0],
      });
    }
  }, [editEvent, selectedDate, isOpen]);

  const handleSave = (values: EventFormValues) => {
    onSave({ id: editEvent?.id || generateId, ...values });
    onClose();
  };

  return (
    <Popover open={isOpen} onOpenChange={onClose}>
      <PopoverAnchor
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          width: 0,
          height: 0,
        }}
      />
      <PopoverContent
        className="p-0 border border-gray-200 rounded-2xl overflow-hidden shadow-lg w-[320px]"
        side="bottom"
        align="start"
        onInteractOutside={onClose}
      >
        <form onSubmit={handleSubmit(handleSave)}>
          <div className="px-6 pt-6 pb-4 border-b border-gray-200">
            <input
              {...register("title")}
              placeholder="event name"
              maxLength={30}
              className="w-full text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
            {errors.title && (
              <span className="text-red-500 text-xs">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <input
              {...register("date")}
              type="date"
              className="text-sm text-gray-800 outline-none w-full"
            />
            {errors.date && (
              <span className="text-red-500 text-xs">
                {errors.date.message}
              </span>
            )}
          </div>

          <div className="px-6 py-4 flex-col border-b border-gray-200 flex items-center justify-between">
            <input
              {...register("time")}
              type="time"
              placeholder="event time"
              className="text-sm text-gray-800 outline-none w-full"
            />
            {errors.time && (
              <span className="text-red-500 text-xs">
                {errors.time.message}
              </span>
            )}
          </div>

          <div className="px-6 py-4 border-b border-gray-200">
            <input
              {...register("notes")}
              placeholder="notes"
              className="w-full text-sm text-gray-400 outline-none placeholder:text-gray-300"
            />
          </div>

          <div className="px-6 py-4 border-b border-gray-200 flex gap-3">
            {COLORS.map((c) => (
              <div
                key={c}
                onClick={() => setValue("color", c)}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  backgroundColor: c,
                  cursor: "pointer",
                  border:
                    selectedColor === c
                      ? "3px solid #000"
                      : "2px solid transparent",
                  outline: selectedColor === c ? `2px solid ${c}` : "none",
                  outlineOffset: 2,
                }}
              />
            ))}
          </div>

          <div className="px-6 py-4 flex justify-between items-center">
            <button
              type="button"
              onClick={() => {
                onDelete?.(editEvent!.id);
                onClose();
              }}
              className="text-sm font-semibold text-red-500 tracking-widest uppercase"
            >
              Discard
            </button>
            <button
              type="submit"
              className="text-sm font-semibold text-gray-700 tracking-widest uppercase"
            >
              {editEvent ? "Edit" : "Save"}
            </button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};
