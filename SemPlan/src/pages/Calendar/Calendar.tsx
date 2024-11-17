import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useNavigate } from 'react-router-dom';
import { SignedIn } from "@clerk/clerk-react";
import styles from './Calendar.module.scss';

export default function Calendar() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [arrayOfDates, setArrayOfDates] = useState([]);

  // Fetch the timeline and set the events array
  async function getTimeline() {
    try {
      if (!sessionStorage.getItem('token')) {
        throw new Error('no token');
      }
      const token = sessionStorage.getItem('token');
      const res = await fetch('http://localhost:3000/generateTimeline', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData);
      }

      const data = await res.json();
      let editedJSON = data.message.replace("```json", "");
      editedJSON = editedJSON.replace("```", "");
      editedJSON = JSON.parse(editedJSON);
      const assignments = editedJSON.assignments;

      // Set the arrayOfDates and map it to the event format
      setArrayOfDates(assignments);
    } catch (error) {
      console.error(error);
    }
  }

  // Set the events when arrayOfDates changes
  useEffect(() => {
    if (arrayOfDates.length > 0) {
      const mappedEvents = arrayOfDates.map((event) => ({
        title: event.assignment,
        date: event.date,
      }));
      setEvents(mappedEvents); // Set the mapped events here
    }
  }, [arrayOfDates]); // Only run when arrayOfDates changes

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
      <button onClick={getTimeline}>Generate Timeline</button>
    </SignedIn>
  );
}
