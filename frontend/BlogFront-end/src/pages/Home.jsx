import React from "react";
import PostList from "../components/PostList";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-page">

            {/* Hero Section */}
            <section className="hero-section">
                <div className="container text-center">

                    <h1 className="display-4 fw-bold">
                        Welcome to Blog App
                    </h1>

                    <p className="lead text-muted mt-3">
                        Share your thoughts, ideas and stories with the world.
                    </p>

                    <Link
                        to="/create"
                        className="btn btn-primary btn-lg mt-3"
                    >
                        <i className="bi bi-plus-lg me-2"></i>
                        Create Post
                    </Link>

                </div>
            </section>


            {/* Posts Section */}
            <section className="container py-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2 className="fw-bold mb-0">
                        Latest Posts
                    </h2>

                    <span className="text-muted">
                        Explore our latest articles
                    </span>

                </div>

                <PostList />

            </section>

        </div>
    );
}

export default Home;