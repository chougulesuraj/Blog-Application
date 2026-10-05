import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar shadow-sm">
    <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
            <i className="bi bi-journal-richtext me-2"></i>
            MyBlog
        </Link>

        <div className="ms-auto d-flex gap-2">

            <Link className="nav-link text-white" to="/">
                Home
            </Link>

            <Link
                className="btn btn-light create-nav-btn"
                to="/create"
            >
                <i className="bi bi-plus-lg me-1"></i>
                Create Post
            </Link>

        </div>

    </div>
</nav>
            );
}

export default Navbar;