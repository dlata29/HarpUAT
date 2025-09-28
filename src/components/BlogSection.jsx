import React, { useState, useEffect } from "react";
import "../CSS/BlogSection.css";

const BlogSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // IMPORTANT: Replace this with your WordPress site URL
  const WORDPRESS_URL = "https://harpandcode.io/";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch the 4 most recent posts and embed related data like author and featured image
        const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/posts?_embed&per_page=4`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError("Failed to fetch posts. Make sure your WordPress URL is correct and the REST API is accessible.");
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Helper to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <section className="blog-section">
        <p>Loading posts...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="blog-section">
        <p style={{ color: "red" }}>{error}</p>
      </section>
    );
  }

  return (
    <section className="blog-section">
      <div className="blog-container">
        <div className="blog-header">
          <p className="blog-subtitle">Blogs</p>
          <h2 className="blog-title">Scented stories for every mood</h2>
        </div>

        <div className="blog-grid">
          {posts.map((post, index) => {
            // Safely get the featured image URL from the embedded data
            const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://placehold.co/600x400/a3b18a/ffffff?text=Blog+Post";
            // Get author name
            const authorName = post._embedded?.author?.[0]?.name || "Anonymous";

            return (
              <div key={post.id} className={`blog-card ${index === 3 ? "highlighted" : ""}`}>
                <img src={imageUrl} alt={post.title.rendered} className="blog-card-image" />
                <div className="blog-card-content">
                  <p className="blog-card-meta">
                    {formatDate(post.date)} • {authorName}
                  </p>
                  <h3 className="blog-card-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  <div
                    className="blog-card-excerpt"
                    // Note: Using dangerouslySetInnerHTML is safe here because the content
                    // is coming from your own trusted WordPress CMS.
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <a href={post.link} target="_blank" rel="noopener noreferrer" className="blog-card-readmore">
                    Read more &rarr;
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="blog-footer">
          <button className="view-more-button">View more articles &rarr;</button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
