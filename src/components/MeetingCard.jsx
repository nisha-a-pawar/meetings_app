import { useState, useEffect } from "react";
import { getDatabase, ref,update } from "firebase/database";




const MeetingCard = ({ id ,title, date, desc, img }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [bookmarked, setBookmarked] =useState(false);


  const handleImportantMeeting = () => {
     const newBookmarkedState = !bookmarked;
     console.log(newBookmarkedState);
    setBookmarked(newBookmarkedState);
        const db =getDatabase();
    // Update the isBookmarked flag in Firebase
    const meetingRef = ref(db, `meetingsdb/${id}`);
    update(meetingRef, {
      isBookmarked: newBookmarkedState,
    }).catch((error) => {
      console.error("Error updating bookmark status in Firebase:", error);
      // Optionally revert the local state on error
      setBookmarked(!newBookmarkedState);
    });
  };

 

  useEffect(() => {
    const fetchImage = async () => {
      const keyword = encodeURIComponent(img);
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${keyword}&client_id=Ze9JQaYPsJgFz1A6NkY0kVMb2objmxscltICXRBTLLo`
      );
      const data = await response.json();
      const firstImage = data.results[0]?.urls?.small;
      setImageUrl(firstImage || "https://via.placeholder.com/400x300");
    };

    fetchImage();
  }, [img]);

  return (
    <div className="meeting-card">
      <img src={imageUrl} alt={title || "Meeting"} className="meeting-img" />
      <h3>{date || "No Date Provided"}</h3>
      <div className="flex">
        <h1>{title || "No Title Provided"}</h1>
        <i className="bookmark" onClick={handleImportantMeeting}>
          {bookmarked === true ? (
             
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 50 50"
                  >
                    <path d="M 37 48 C 36.824219 48 36.652344 47.953125 36.496094 47.863281 L 25 41.15625 L 13.503906 47.863281 C 13.195313 48.042969 12.8125 48.046875 12.503906 47.867188 C 12.191406 47.6875 12 47.359375 12 47 L 12 3 C 12 2.449219 12.449219 2 13 2 L 37 2 C 37.554688 2 38 2.449219 38 3 L 38 47 C 38 47.359375 37.808594 47.6875 37.496094 47.867188 C 37.34375 47.957031 37.171875 48 37 48 Z" />
                  </svg>
         
          ) : (
      
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 32 32"
          >
            <path d="M 7 5 L 7 28 L 8.59375 26.8125 L 16 21.25 L 23.40625 26.8125 L 25 28 L 25 5 Z M 9 7 L 23 7 L 23 24 L 16.59375 19.1875 L 16 18.75 L 15.40625 19.1875 L 9 24 Z" />
          </svg>
          )}
        </i>
      </div>

      <p>{desc || "No Description Available"}</p>
    </div>
  );
};

export default MeetingCard;
