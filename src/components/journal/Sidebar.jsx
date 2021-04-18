// import something from "something";

const Sidebar = () => {
  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">

        <h2 className="journal__sidebar-title">
          <i className="far fa-user mr-1"></i>
          <span>Daniel</span>
        </h2>

        <button className="btn btn-primary" href="#">Logout</button>

      </div>

      <div className="journal__sidebar-new-entry">
        <i className="far fa-calendar-plus fa-5x mb-2"></i>
        <p>New Entry</p>
      </div>
    </aside>
  );
}

export default Sidebar;