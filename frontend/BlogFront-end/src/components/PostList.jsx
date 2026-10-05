import { getPosts, deletePost } from "../services/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function PostList() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadPosts = async () => {
        try {
            setLoading(true);

            const res = await getPosts();

            setPosts(res.data);

        } catch (error) {
            console.log("API ERROR:", error);
            setError("Failed to load posts.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Are you sure you want to delete this post?")) {
            return;
        }

        try {

            await deletePost(id);

            setPosts((prev) =>
                prev.filter((post) => post.id !== id)
            );

        } catch (error) {

            console.log("API ERROR:", error);
            setError("Failed to delete post.");

        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    // Loading
    if (loading) {
        return (
            <div className="text-center py-5">

                <div
                    className="spinner-border text-primary"
                    role="status"
                ></div>

                <p className="mt-3 text-muted">
                    Loading posts...
                </p>

            </div>
        );
    }

    // Error
    if (error) {
        return (
            <div className="alert alert-danger">
                {error}
            </div>
        );
    }

    // No posts
    if (posts.length === 0) {
        return (
            <div className="text-center py-5">

                <i className="bi bi-journal-x empty-icon"></i>

                <h4 className="mt-3">
                    No posts found
                </h4>

                <p className="text-muted">
                    Create your first blog post.
                </p>

                <Link
                    to="/create"
                    className="btn btn-primary"
                >
                    <i className="bi bi-plus-lg me-2"></i>
                    Create Post
                </Link>

            </div>
        );
    }

    return (
        <div className="row g-4">

            {posts.map((post) => (

                <div
                    className="col-md-6 col-lg-4"
                    key={post.id}
                >

                    <div className="card post-card h-100 border-0 shadow-sm">

                        <div className="card-body d-flex flex-column">

                            {/* Title */}
                            <h4 className="card-title fw-bold">
                                {post.title}
                            </h4>

                            {/* Author */}
                            <p className="text-muted small">

                                <i className="bi bi-person-circle me-1"></i>

                                By {post.author}

                            </p>

                            <hr />

                            {/* Content */}
                            <p className="card-text text-secondary flex-grow-1">
                                {post.content}
                            </p>

                            {/* Buttons */}
                            <div className="d-flex gap-2 mt-3">

                                <Link
                                    to={`/edit/${post.id}`}
                                    className="btn btn-outline-primary btn-sm"
                                >
                                    <i className="bi bi-pencil me-1"></i>
                                    Edit
                                </Link>

                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="btn btn-outline-danger btn-sm"
                                >
                                    <i className="bi bi-trash me-1"></i>
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            ))}

        </div>
    );
}

export default PostList;