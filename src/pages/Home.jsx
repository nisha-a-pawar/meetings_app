import React from "react";
import { useState, useEffect } from "react";
import MeetingCard from "../components/MeetingCard";
const Home = () => {
  const [meetings, setMeetings] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(true);
  
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  useEffect(() => {
    fetch("https://meetings-9a00b-default-rtdb.firebaseio.com/meetingsdb.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const tempMeetings = [];
        for (const key in data) {
          const meeting = {
            id: key,
            ...data[key],
          };
          console.log(meeting);
          tempMeetings.push(meeting);
          setMeetings(tempMeetings);
          setLoadingStatus(false);
        }
      });
  }, []);

  

  return (
    <div className="container">
      <div className={loadingStatus ? "main-loader" : "d-none"}></div>
      <div className="meeting-container">
        {meetings
          .sort((a, b) => {
            let dateA = new Date(a.date);
            let dateB = new Date(b.date);
            // compare and sort the dates
            if (dateA < dateB){
              return -1;
            } 
            else if(dateA > dateB){
              return 1;
            } 
            else{
              return 0;
            } 
          })
          .filter((meeting) => {
            let today = new Date();
            return new Date(meeting.date) > today;
          })
          .map((meeting) => {
            let datetime = new Date(meeting.date);
            let fDate = datetime.toLocaleString("en", options);
            let fTime = datetime.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" });
            let fMeetingTime = fTime + " " + fDate
            return (
              <MeetingCard
                key={meeting.id}
                id={meeting.id}
                title={meeting.title}
                date={fMeetingTime}
                desc={meeting.desc}
                img={meeting.image}
                bookmarked={meeting.isBookmarked || false}
               
                
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
