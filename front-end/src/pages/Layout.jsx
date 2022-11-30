import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {

    return (
        <>
            <nav id="nav">
                <h1 id="navTitle">Bus Routing System</h1>
                <ul id="navBar">
                    <li key="home-link" >
                        <NavLink to="/" id="link" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Home</NavLink>
                    </li>
                    <li key="about-link">
                        <NavLink to="/about" id="link" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>About</NavLink>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout