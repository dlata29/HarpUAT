import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "../CSS/BlogSection.module.css";

const BlogSection = () => {
  const { t } = useTranslation();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const WORDPRESS_URL = "https://blog.harpandcode.io";

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
              <a key={post.id} href={post.link} target="_blank" rel="noopener noreferrer" className={styles.blogCard}>
                <div className={styles.blogCardImageWrapper}>
                  <img src={imageUrl} alt={post.title.rendered} className={styles.blogCardImage} />
                </div>
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
                  <div className={styles.ctaRow}>
                    <span className={styles.ctaPrimary}>
                      {/* Use translation key for the "Read more" link */}
                      {t("blog.read_more")}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
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
