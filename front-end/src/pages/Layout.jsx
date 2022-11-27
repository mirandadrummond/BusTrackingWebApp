import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav>
                <ul id="navBar">
                    <li class="link">
                        <Link to="/">Home</Link>
                    </li>
                    <li class="link">
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout