import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "../CSS/BlogSection.module.css";

const BlogSection = () => {
  const { t } = useTranslation();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const WORDPRESS_URL = "https://blog.harpandcode.io/";

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
        // Use translation key for the error message
        setError(t("blog.error"));
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
      <section id="blog" className={styles.blogSection}>
        {/* Use translation key for loading */}
        <p>{t("blog.loading")}</p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className={styles.blogSection}>
        <p style={{ color: "red" }}>{error}</p>
      </section>
    );
  }

  return (
    <section id="blog" className={styles.blogSection}>
      <div className={styles.blogContainer}>
        <div className={styles.blogHeader}>
          <p className={styles.blogSubtitle}>{t("blog.subtitle")}</p>
          <h2 className={styles.blogTitle}>{t("blog.title")}</h2>
        </div>

        <div className={styles.blogGrid}>
          {posts.map((post, index) => {
            // Safely get the featured image URL from the embedded data
            const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://placehold.co/600x400/a3b18a/ffffff?text=Blog+Post";
            // Get author name
            const authorName = post._embedded?.author?.[0]?.name || "Anonymous";

            return (
              <div key={post.id} className={styles.blogCard}>
                <img src={imageUrl} alt={post.title.rendered} className={styles.blogCardImage} />
                <div className={styles.blogCardContent}>
                  <p className={styles.blogCardMeta}>
                    {formatDate(post.date)} • {authorName}
                  </p>
                  <h3 className={styles.blogCardTitle} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  <div
                    className={styles.blogCardExcerpt}
                    // Note: Using dangerouslySetInnerHTML is safe here because the content
                    // is coming from your own trusted WordPress CMS.
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <a href={post.link} target="_blank" rel="noopener noreferrer" className={styles.blogCardReadmore}>
                    {/* Use translation key for the "Read more" link */}
                    {t("blog.read_more")}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.blogFooter}>
          <button className={styles.viewMoreButton}>
            {/* Use translation key for the footer button */}
            {t("blog.view_more_articles")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
