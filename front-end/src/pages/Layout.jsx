import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav>
                <ul id="navBar">
                    <li key="home-link" className="link">
                        <Link to="/">Home</Link>
                    </li>
                    <li key="about-link" className="link">
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout