import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useNavigate } from 'react-router-dom';
import { SignedIn } from "@clerk/clerk-react";
import styles from './Calendar.module.scss';

export default function Calendar() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  // Fetch events when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/getEvents', {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          // Map the fetched data into FullCalendar's event format
          const formattedEvents = data.map((event: any) => ({
            title: event.title,
            date: event.date,
          }));
          setEvents(formattedEvents);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  async function getTimeline() {
    try {
        if (!sessionStorage.getItem('token')) {
            throw new Error('no token');
        }
        const token = sessionStorage.getItem('token')  
        const res = await fetch('http://localhost:3000/generateTimeline', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({token})
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData);
        }
        const data = await res.json();
        console.log(data);
    }
    catch(error) {
        console.error(error);
    }
}

  return (
    <SignedIn>
      <div>
        <h1>Calendar</h1>
        <button onClick={() => navigate('/home')} className={styles.backToHomeButton}>
  Back to Home
</button>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={events}
        />
      </div>
      <button onClick={getTimeline}> generate timeline </button>
    </SignedIn>
  );
}


