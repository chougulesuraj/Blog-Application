import { getPost, updatePost } from "../services/api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditPost() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({
        title: "",
        content: "",
        author: ""
    });

    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const loadPost = async () => {

            try {

                setLoading(true);

                const res = await getPost(id);

                setPost(res.data);

            } catch (error) {

                console.log("API ERROR:", error);
                setError("Failed to load post");

            } finally {

                setLoading(false);

            }
        };

        loadPost();

    }, [id]);


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

            await updatePost(id, post);

            navigate("/");

        } catch (error) {

            console.log("API ERROR:", error);
            setError("Failed to update post");

        } finally {

            setSubmitting(false);

        }
    };


    if (loading) {
        return (
            <div className="text-center py-5">

                <div
                    className="spinner-border text-primary"
                    role="status"
                ></div>

                <p className="mt-3 text-muted">
                    Loading post...
                </p>

            </div>
        );
    }


    return (

        <div className="container py-5">

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
                                    Edit Post
                                </h1>

                                <p className="text-muted">
                                    Update your blog post
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
                                        value={post.title}
                                        placeholder="Enter post title"
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
                                        value={post.content}
                                        placeholder="Write your post here..."
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
                                        value={post.author}
                                        placeholder="Enter author name"
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

                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-check-lg me-2"></i>

                                                Update Post
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
    );
}

export default EditPost;