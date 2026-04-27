import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import events from "../events.json";
import type { EventContentArg } from "@fullcalendar/core/index.js";

export const Calendar = () => {
  return (
    <div className="my-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
          list: "Agenda",
        }}
        eventContent={renderEventContent}
      />
    </div>
  );
};

function renderEventContent(eventInfo: EventContentArg) {
  return (
    <div style={{ backgroundColor: eventInfo.event.backgroundColor }}>
      {/* <b>{eventInfo.timeText}</b> */}
      <i>{eventInfo.event.title}</i>
    </div>
  );
}
