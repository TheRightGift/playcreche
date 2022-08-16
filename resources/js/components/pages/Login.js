import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { Link } from "react-router-dom";
// import ReactDOM from 'react-dom';

function Login() {
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPass, setLoginPass] = useState('');
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [userType, setUserType] = useState("");

    const [authenticated, setauthenticated] = useState(
        localStorage.getItem(localStorage.getItem("authenticated") || false)
    );
    const users = [
        {
            firstname: 'Chigozie',
            lastname: 'Chukwu',
            phone: '08138184403',
            userType: 'Super Admin',
            email: "superadmin@crecheapp.ng",
            password: "pass",
        },
        {
            firstname: 'Obinna',
            lastname: 'Obi',
            phone: '08112345678',
            userType: 'staff',
            email: "staff@crecheapp.ng",
            password: "pass",
        },
        {
            "id": 6,
            "firstname": "Damara",
            "lastname": "Band",
            email: "parent@crecheapp.ng",
            "gender": "Female",
            "ip_address": "202.204.198.54",
            "address": "4447 Rusk Plaza",
            "phone": "08012345678",
            "job_title": "Budget/Accounting Analyst IV",
            "photo": "/assets/user.jpg",
            deleted_at: null,
            userType: 'parent',
            password: 'pass',
            "created_at": "4/2/2022",
        }
    ];


    const handleSubmit = (e) => {
        e.preventDefault();
        const account = users.find((user) => user.email === email);
        if (account && account.password === password) {
            setauthenticated(true);
            localStorage.setItem("authenticated", true);

            if (userType === "staff") {

                console.log("Staff");
                navigate("/dashboard");

            } else if (userType === "superadmin") {

                console.log("superadmin");
                navigate("/superadmin");

            } else if (userType == "parent") {

                console.log("Parent");
                navigate("/parent");
            }
        }
    };

    let loginUser = (e) => {

        e.preventDefault();
        const account = users.find((user) => user.email === loginEmail);

        if (account == undefined) {
            alert('Invalid Credentials')
        } else {

            if (account && account.password === loginPass) {
                setauthenticated(true);
                localStorage.setItem("authenticated", true);
                localStorage.setItem('type', account.userType)
                localStorage.setItem('user', JSON.stringify(account));
                document.getElementsByTagName('body')[0].setAttribute('id', account.userType);
                if (account.userType == "staff") {
                    console.log("Staff");
                    navigate("/dashboard", { state:  account});
                } else if (account.userType == "Super Admin") {
                    console.log("superadmin");
                    navigate("/admin", { state:  account});
                } else if (account.userType == "parent") {
                    console.log("Parent");
                    navigate("/dashboard", { state:  account});
                }
            }
        }
    }

    const firstnameInput = {
        marginBottom: "1vh",
        border: "none",
        borderRadius: "0",
        backgroundColor: "rgba(217, 217, 217, 0.6)",
        height: "7.5vh",
    };
    const lastnameInput = {
        marginBottom: "1vh",
        border: "none",
        borderRadius: "0",
        backgroundColor: "rgba(217, 217, 217, 0.6)",
        height: "7.5vh",
    };
    const emailInput = {
        marginBottom: "1vh",
        border: "none",
        borderRadius: "0",
        backgroundColor: "rgba(217, 217, 217, 0.6)",
        height: "7.5vh",
    };
    const phoneInput = {
        marginBottom: "1vh",
        border: "none",
        borderRadius: "0",
        backgroundColor: "rgba(217, 217, 217, 0.6)",
        height: "7.5vh",
    };
    const userTypeInput = {
        marginBottom: "1vh",
        border: "none",
        borderRadius: "0",
        backgroundColor: "rgba(217, 217, 217, 0.6)",
        height: "7.5vh",
        color: "#76777d",
    };
    const formInput = {
        height: "40vh",
        overflow: "hidden",
        overflowY: "scroll",
    }

    return (
        <div>
            <div className="row" id="loginGeneralDiv">
                <div className="col-9 bg-white rmPaddingRight">
                    <div className="row" id="loginContainerDiv">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-7">
                            <div>
                                <Link to="/" id="loginBackArrowLink" className="d-none d-md-block">
                                    &#8592;
                                </Link>
                                <p className="whiteText">PLAYCRECHE</p>
                            </div>
                            <h2 className="text-primary" id="welcomeHeaderTxt">
                                Welcome!
                            </h2>
                            <div>
                                <p id="welcomeTxt">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et
                                </p>
                            </div>

                            <form onSubmit={loginUser}>
                                <div>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Email"
                                        value={loginEmail}
                                        style={firstnameInput}
                                        onChange={(e) =>
                                            setLoginEmail(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        className="form-control"
                                        type="password"
                                        placeholder="Password"
                                        value={loginPass}
                                        style={firstnameInput}
                                        onChange={(e) =>
                                            setLoginPass(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    Login
                                </button>
                            </form>

                            {/* <form
                                className="form"
                                onSubmit={handleSubmit}
                                style={formInput}
                            >
                                <div>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Firstname"
                                        aria-label="Firstname"
                                        value={firstname}
                                        name="firstname"
                                        id="firstnameInput"
                                        style={firstnameInput}
                                        onChange={(e) =>
                                            setFirstname(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Lastname"
                                        aria-label="Lastname"
                                        value={lastname}
                                        name="lastname"
                                        id="lastnameInput"
                                        style={lastnameInput}
                                        onChange={(e) =>
                                            setLastname(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div>
                                    <input
                                        className="form-control"
                                        type="number"
                                        placeholder="Phone Number"
                                        aria-label="phone"
                                        value={phone}
                                        name="phone"
                                        id="phoneInput"
                                        style={phoneInput}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div>
                                    <input
                                        className="form-control"
                                        type="email"
                                        placeholder="Email"
                                        aria-label="Email"
                                        value={email}
                                        name="email"
                                        id="emailInput"
                                        style={emailInput}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    style={userTypeInput}
                                    onChange={(e) => {
                                        const test = e.target.value;
                                        setUserType(test);
                                    }}
                                >
                                    <option>User Type</option>
                                    <option value="superadmin">
                                        Super Admin
                                    </option>
                                    <option value="staff">Staff</option>
                                    <option value="parent">Parent</option>
                                </select>

                                <div>
                                    <input
                                        className="form-control"
                                        type="password"
                                        placeholder="Password"
                                        aria-label="Password"
                                        name="Password"
                                        id="passwordInput"
                                        onChange={(e) =>
                                            setpassword(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    id="loginBtn"
                                >
                                    Register
                                </button> 
                            </form>*/}
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5">
                            <div id="childBgImgDiv"></div>
                        </div>
                    </div>

                    {/* Footer Small Device */}
                    <footer
                        className="d-xl-none d-lg-none"
                        id="loginFooterSmall"
                    >
                        <div className="row" id="loginFooterRowDiv">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
                                <p id="loginFooterPolicyTxt">
                                    Privacy & Policy sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                </p>
                            </div>

                            <div
                                className="col-xs-12 col-sm-12 col-md-12 col-lg-4 rmPaddingRight"
                                id="loginRightReservedDiv"
                            >
                                <p className="loginRightReservedP">PlayCreche</p>
                                <p className="loginRightReservedP">
                                    All rights reserved (c) 2022
                                </p>
                            </div>
                        </div>
                    </footer>

                    {/* Footer Large Device */}
                    <footer
                        className="d-none d-lg-block .d-xl-block"
                        id="loginFooter"
                    >
                        <div className="row" id="loginFooterRowDiv">
                            <div className="col-8">
                                <p id="loginFooterPolicyTxt">
                                    Privacy & Policy sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                </p>
                            </div>

                            <div
                                className="col-4 rmPaddingRight"
                                id="loginRightReservedDiv"
                            >
                                <p className="loginRightReservedP">PlayCreche</p>
                                <p className="loginRightReservedP">
                                    All rights reserved (c) 2022
                                </p>
                            </div>
                        </div>
                    </footer>
                </div>
                <div className="col-3 bg-primary" id="loginBlueRightDiv">
                    <div className="row">
                        <div className="col-12" id="loginBlueDivTxt">
                            Join us to be part of an unforgatable experience
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
