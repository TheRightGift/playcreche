import * as React from 'react';
import ReactDOM from 'react-dom';
import { Outlet, Link, NavLink,  useLocation } from 'react-router-dom';
const AuthContext = React.createContext(null);


export default function App(props) {
    const [type, setType] = React.useState(null);
    const [user, setUser] = React.useState(null);
    React.useEffect(() => {
        // Anything in here is fired on component mount.
        let type = localStorage.getItem('type');
        let user = localStorage.getItem('user');
        setType(type)
        setUser(JSON.parse(user))
        document.getElementsByTagName('body')[0].setAttribute('id', type);
    }, []);
    const {state} = useLocation();
    console.log(type, location);

    const active = ({ isActive }) => "nav-link py-2 align-middle px-0  " + (isActive ? "active" : "text-inactive");
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className={`col-auto col-md-3 col-xl-2 px-sm-2 px-0 d-flex sidebar ${type == 'staff' ? ' bg-blue' : ' bg-pink'}`}>
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <a href="/" className="d-flex align-items-center pb-3 py-4 mb-md-0 mx-md-auto  text-white text-decoration-none">
                            <span className="fs-5 d-none d-sm-inline">Logo</span>
                        </a>
                        <div className="pb-4 mx-auto">
                            <NavLink to="#!" className="d-flex align-items-center text-white text-decoration-none" id="dropdownUser1" aria-expanded="false">
                                <div className="profilePicName">
                                    <img src={`/assets/${type == "staff" ? "passport.png" : "profile2.png"}`} alt="hugenerd" className="rounded-circle profilePic img-fluid" width="100" height="100" />
                                    <h6 className="fs-5 mt-1 fw-bolder d-none d-md-block d-lg-block">{type == "staff" ? "Akerele B." : "Mrs Lara B."}</h6>
                                    <p className="opacity-75 d-none d-md-block d-lg-block">{type == "staff" ? "Grade 1" : "Mother"}</p>
                                </div>
                            </NavLink>
                        </div>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start align-self-center" id="menu">
                            <li className="nav-item">
                                <NavLink className={active} end to="/dashboard" state={location.state}>
                                    <i className="fa fa-tachometer" aria-hidden="true"></i>
                                    <span className="ms-1 d-none d-sm-inline">My Dashboard</span>
                                </NavLink>
                            </li>
                            {type == "staff" ?
                                <>
                                    <li>
                                        <NavLink to="/no-of-pupils" state={location.state} className={active} end>
                                            <i className="fa fa-users" aria-hidden="true"></i>
                                            <span className="ms-1 d-none d-sm-inline">no. of pupils</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/schedule" className={active} end state={location.state}>
                                            <i className="fa fa-calendar" aria-hidden="true"></i>
                                            <span className="ms-1 d-none d-sm-inline">Schedule</span>
                                        </NavLink>
                                    </li>
                                </>
                                : null
                            }
                            <li>
                                <NavLink to="/reports" className={active} end state={location.state}>
                                    <i className="fa fa-bar-chart" aria-hidden="true"></i>
                                    <span className="ms-1 d-none d-sm-inline">Reports</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/chats" className={active} end state={location.state}>
                                    <i className="fa fa-comments-o" aria-hidden="true"></i>
                                    <span className="ms-1 d-none d-sm-inline">Chats</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/gallery" className={active} end state={location.state}>
                                    <i className="fa fa-cloud-upload" aria-hidden="true"></i>
                                    <span className="ms-1 d-none d-sm-inline">Media</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/Login" className={active} end state={location.state}>
                                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                                    <span className="ms-1 d-none d-sm-inline">Logout</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/" className={active} end state={location.state}>
                                    <i className="fa fa-globe" aria-hidden="true"></i>
                                    <span className="ms-1 d-none d-sm-inline">Website</span>
                                </NavLink>
                            </li>
                        </ul>
                        <div className="align-self-center d-none d-md-block">
                            <p className="text-center text-inactive">
                                <span className="fw-bolder">PLAYCRECHE &trade;</span>, <span className="opacity-75">All rights reserved, {new Date().getFullYear()}.</span>
                            </p>
                        </div>

                    </div>
                </div>
                <div className="col">
                    <Outlet />
                    <Link className='chatBtnOpenerFixed parentChatOpener shadow-md d-flex justify-content-center align-items-center text-decoration-none' to="/chats">
                        <i className="fa-regular fa-comment-dots text-white"></i>
                    </Link>
                    <footer style={{ backgroundColor: type == "staff" ? '#1364DC' : '#FF70A6' }} className="dashFooter">
                        <div className="align-self-center d-sm-block d-md-none">
                            <p className="text-center text-inactive m-0">
                                <span className="fw-bolder">PLAYCRECHE &trade;</span>, <span className="opacity-75">All rights reserved, {new Date().getFullYear()}.</span>
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
