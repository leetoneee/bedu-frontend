'use client';

import { useNextCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import '@schedule-x/theme-default/dist/index.css';
import { useEffect } from 'react';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { EventProps } from '@/types';

type Props = {
  events: EventProps[];
};
function Schedule({ events }: Props) {
  console.log("🚀 ~ Schedule ~ events:", events)
  // const eventsService = useState(() => createEventsServicePlugin())[0];
  const plugins = [createEventModalPlugin(), createEventsServicePlugin()];

  const calendar = useNextCalendarApp(
    {
      views: [
        createViewDay(),
        createViewWeek(),
        createViewMonthGrid(),
        createViewMonthAgenda()
      ],
      events: events
    },
    plugins
  );

  useEffect(() => {
    // Fetch all events
    if (calendar && calendar.events) calendar.events.getAll();
  }, []);

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default Schedule;
