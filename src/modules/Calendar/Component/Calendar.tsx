import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import type { EventContentArg } from "@fullcalendar/core/index.js";
import { useCalendarEvents } from "../hooks/useCalendarEvents";
import { EventModal } from "./EventModal";

export const Calendar = () => {
  const {
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
    setEvents,
  } = useCalendarEvents();

  return (
    <div className="my-calendar">
      <FullCalendar
        editable={true}
        droppable={true}
        eventOrder="start"
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          left: "today,prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        buttonText={{
          today: "Today",
          prev: "Back",
          next: "Next",
          month: "Month",
          week: "Week",
          day: "Day",
          list: "Agenda",
        }}
        eventContent={renderEventContent}
        dateClick={(info) => {
          const rect = (
            info.jsEvent.target as HTMLElement
          ).getBoundingClientRect();
          setEditEvent(null);
          setSelectedDate(info.dateStr);
          setModalPosition({ x: rect.left, y: rect.bottom });
          setIsModalOpen(false);
          requestAnimationFrame(() => {
            setModalKey((k) => k + 1); // форсуємо ремонт
            setIsModalOpen(true);
          });
        }}
        eventClick={(info) => {
          const found = events.find((e) => e.id === info.event.id);
          if (!found) return;

          const boundingRect = (
            info.jsEvent.target as HTMLElement
          ).getBoundingClientRect();
          const startStr = info.event.startStr;
          const [date, time] = startStr.split("T");

          const cleanTime = time ? time.slice(0, 5) : "";

          setModalPosition({ x: boundingRect.left, y: boundingRect.bottom });
          setEditEvent({
            id: info.event.id,
            title: info.event.title,
            date: date ?? "",
            time: cleanTime,
            notes: found.notes ?? "",
            color: info.event.backgroundColor ?? "#3b86ff",
          });
          setIsModalOpen(false);
          requestAnimationFrame(() => {
            setModalKey((k) => k + 1);
            setIsModalOpen(true);
          });
        }}
        eventDrop={(info) => {
          setEvents((prev) =>
            prev.map((e) =>
              e.id === info.event.id ? { ...e, start: info.event.startStr } : e,
            ),
          );
        }}
      />

      <EventModal
        key={modalKey}
        position={modalPosition}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditEvent(null);
        }}
        onSave={handleSave}
        onDelete={handleDelete}
        selectedDate={selectedDate}
        editEvent={editEvent}
      />
    </div>
  );
};

function renderEventContent(eventInfo: EventContentArg) {
  return (
    <div
      className="w-full h-7.5 flex items-center text-[14px] font-medium rounded-xs border-none text-white pl-2"
      style={{ backgroundColor: eventInfo.event.backgroundColor }}
    >
      <i>{eventInfo.event.title}</i>
    </div>
  );
}
