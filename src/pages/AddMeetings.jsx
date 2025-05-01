import React, { useRef  ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
const AddMeetings = () => {
  const [submitStatus ,setSubmitStatus] =useState(false);
  const titleInput = useRef();
  const dateInput = useRef();
  const imageInput = useRef();
  const descInput = useRef();
  const navigate= useNavigate();

   const addmeetingHandler =()=>{
    setSubmitStatus(true);
    const titleData = titleInput.current.value;
    const dateData = dateInput.current.value;
    const imageData = imageInput.current.value;
    const descData =descInput.current.value;
 
   if(titleData != "" && dateData != "" && imageData !="" && descData!="")
    {
      const tempmeeting ={
        title:titleData,
        image:imageData,
        date:dateData,
        desc:descData
       }
      fetch('https://meetings-9a00b-default-rtdb.firebaseio.com/meetingsdb.json' ,{
        method:'post',
        body: JSON.stringify(tempmeeting)
      }).then(()=>{
        setSubmitStatus(false);
        navigate("/")
      })

   }
   else{
    console.log("fill all the fields");
    setSubmitStatus(false);
   }
     
   }
  return (
    <div className='meetings-container'>
      <h1 className='heading'>New Meeting</h1>
      <p>Create a new meeting with J&J Team !</p>
      <input type="text"  placeholder='Enter Title' ref={titleInput}/>
      <input type="text"  placeholder='Enter image Tag' ref={imageInput}/>
      <input type="datetime-local" placeholder='Enter Date and time' ref={dateInput} />
    <textarea name="" id="" rows={5} cols={8} placeholder='Enter meeting Description' ref={descInput}></textarea>
      <button className="btn"onClick={addmeetingHandler}>Create Meeting <span className={submitStatus? "loader" : "d-none"} ></span></button>

      <p className="small">By creating new meeting here you agree to terms and conditons of J&J</p>
    </div>
  )
}

export default AddMeetings
