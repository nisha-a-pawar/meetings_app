import React, { useState, useEffect } from 'react';
import MeetingCard from '../components/MeetingCard';
import { getDatabase, ref, query, orderByChild, equalTo, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import {firebaseConfig} from '../firebase.js';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const MyMeetings = () => {
  const [bookmarkedMeetings, setBookmarkedMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    const bookmarkedMeetingsRef = query(
      ref(db, 'meetingsdb'),
      orderByChild('isBookmarked'),
      equalTo(true)
    );

    onValue(bookmarkedMeetingsRef, (snapshot) => {
      const data = snapshot.val();
      const tempBookmarkedMeetings = [];
      if (data) {
        for (const key in data) {
          tempBookmarkedMeetings.push({ id: key, ...data[key] });
        }
      }
      setBookmarkedMeetings(tempBookmarkedMeetings);
      setLoading(false);
    });

    // Detach listener on unmount (optional but good practice)
    return () => {
      // If you need to detach the listener, you would typically store the listener function
      // and call off(listener). For simple onValue, it might not be strictly necessary
      // in basic scenarios, but be mindful of potential performance implications in larger apps.
    };
  }, []);

  if (loading) {
    return <div>Loading your important meetings...</div>;
  }

  return (
    <div className="container">
      <h1>My Important Meetings</h1>
      <div className="meeting-container">
        {bookmarkedMeetings.map((meeting) => {
          const datetime = new Date(meeting.date);
          const fDate = datetime.toLocaleString("en", options);
          const fTime = datetime.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" });
          const fMeetingTime = fTime + " " + fDate;
          return (
            <MeetingCard
              key={meeting.id}
              id={meeting.id}
              title={meeting.title}
              date={fMeetingTime}
              desc={meeting.desc}
              img={meeting.image}
              bookmarked={true} 
            />
          );
        })}
        {bookmarkedMeetings.length === 0 && (
          <p>No meetings have been bookmarked yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyMeetings;