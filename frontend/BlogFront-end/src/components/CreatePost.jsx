import { createPost } from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {

    const navigate = useNavigate();

    const [post, setPost] = useState({
        title: "",
        content: "",
        author: ""
    });

    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !post.title.trim() ||
            !post.content.trim() ||
            !post.author.trim()
        ) {
            setError("All fields are required");
            return;
        }

        try {

            setSubmitting(true);
            setError(null);

            await createPost(post);

            navigate("/");

        } catch (error) {

            console.log("API ERROR:", error);
            setError("Failed to create post");

        } finally {

            setSubmitting(false);

        }
    };

    return (
        <div className="create-page">

        <div className="container py-4">

            <div className="row justify-content-center">

                <div className="col-md-8 col-lg-7">

                    <div className="card border-0 shadow-lg create-post-card">

                        <div className="card-body p-4 p-md-5">

                            {/* Heading */}

                            <div className="text-center mb-4">

                                <div className="create-icon">
                                    <i className="bi bi-pencil-square"></i>
                                </div>

                                <h1 className="fw-bold mt-3">
                                    Create New Post
                                </h1>

                                <p className="text-muted">
                                    Share your thoughts with the world
                                </p>

                            </div>


                            {/* Error */}

                            {error && (
                                <div className="alert alert-danger">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {error}
                                </div>
                            )}


                            {/* Form */}

                            <form onSubmit={handleSubmit}>

                                {/* Title */}

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Title
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control form-control-lg"
                                        placeholder="Enter post title"
                                        value={post.title}
                                        onChange={handleChange}
                                    />

                                </div>


                                {/* Content */}

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Content
                                    </label>

                                    <textarea
                                        name="content"
                                        className="form-control"
                                        rows="7"
                                        placeholder="Write your post here..."
                                        value={post.content}
                                        onChange={handleChange}
                                    ></textarea>

                                </div>


                                {/* Author */}

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Author
                                    </label>

                                    <input
                                        type="text"
                                        name="author"
                                        className="form-control form-control-lg"
                                        placeholder="Enter author name"
                                        value={post.author}
                                        onChange={handleChange}
                                    />

                                </div>


                                {/* Buttons */}

                                <div className="d-flex gap-2">

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg flex-grow-1"
                                        disabled={submitting}
                                    >

                                        {submitting ? (
                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                ></span>

                                                Publishing...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-send me-2"></i>
                                                Publish Post
                                            </>
                                        )}

                                    </button>


                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary btn-lg"
                                        onClick={() => navigate("/")}
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    </div>
    );
}

export default CreatePost;