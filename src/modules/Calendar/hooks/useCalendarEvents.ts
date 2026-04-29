import { useEffect, useState } from "react";
import initialEvents from "../data/events.json";
import { type CalendarEvent } from "../types/event";
import type { EventInput } from "@fullcalendar/core/index.js";

export const useCalendarEvents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [editEvent, setEditEvent] = useState<CalendarEvent | null>(null);
  const [events, setEvents] = useState<EventInput[]>(() => {
    const saved = localStorage.getItem("calendar-events");
    return saved ? JSON.parse(saved) : initialEvents;
  });
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [modalKey, setModalKey] = useState(0);

  useEffect(() => {
    localStorage.setItem("calendar-events", JSON.stringify(events));
  }, [events]);

  const handleSave = (event: CalendarEvent) => {
    setEvents((prev) => {
      const exists = prev.find((e) => e.id === event.id);
      if (exists) {
        return prev.map((e) =>
          e.id === event.id
            ? {
                ...e,
                title: event.title,
                start: `${event.date}T${event.time}`,
                backgroundColor: event.color,
                borderColor: event.color,
                notes: event.notes,
              }
            : e,
        );
      }
      return [
        ...prev,
        {
          id: event.id,
          title: event.title,
          start: `${event.date}T${event.time}`,
          backgroundColor: event.color,
          borderColor: event.color,
          notes: event.notes,
        },
      ];
    });
  };

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return {
    events,
    isModalOpen,
    setIsModalOpen,
    selectedDate,
    setSelectedDate,
    editEvent,
    setEditEvent,
    modalPosition,
    setModalPosition,
    modalKey,
    setModalKey,
    handleSave,
    handleDelete,
    setEvents
  };
};
