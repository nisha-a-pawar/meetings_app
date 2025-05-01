import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-links">
        <Link to="/" className="logo">J&J Meetings</Link>
        <div className="nav-items">
          <Link to="/" className="link">All Meetings</Link>
          <Link to="/my-meetings" className="link">My Meetings</Link>
          <Link to="/add-meetings" className="link">Add Meetings</Link>
          {/* <Link to="/meetings" className="link">Important Meetings</Link> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
