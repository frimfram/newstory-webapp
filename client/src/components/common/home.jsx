import React, { Component } from "react";
import { getStories } from "../../services/newsService";

const STORY_LIMIT = 8;

class Home extends Component {
  state = {
    stories: [],
    loading: true,
    error: null,
  };

  async componentDidMount() {
    try {
      const { data } = await getStories();
      const list = (data && data.data) || [];
      this.setState({
        stories: list.slice(0, STORY_LIMIT),
        loading: false,
        error: null,
      });
    } catch (ex) {
      this.setState({
        stories: [],
        loading: false,
        error: "We couldn’t load the news feed. Please try again later.",
      });
    }
  }

  formatDate(iso) {
    if (!iso) return "";
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "";
    }
  }

  render() {
    const { stories, loading, error } = this.state;

    return (
      <React.Fragment>
        <main role="main" className="container starter-template home-page">
          <section className="home-news text-left" aria-labelledby="home-news-heading">
            <div className="home-news__header">
              <h2 id="home-news-heading" className="home-news__title">
                News headlines for you
              </h2>
              <p className="home-news__subtitle">
                Curated stories from around the web, refreshed regularly.
              </p>
            </div>

            {loading && (
              <p className="home-news__status text-muted">Loading stories…</p>
            )}
            {error && !loading && (
              <p className="home-news__status text-danger" role="alert">
                {error}
              </p>
            )}

            {!loading && !error && stories.length === 0 && (
              <p className="home-news__status text-muted">No stories available right now.</p>
            )}

            {!loading && !error && stories.length > 0 && (
              <div className="row">
                {stories.map((story) => (
                  <div className="col-md-6 col-lg-4 mb-4" key={story.id}>
                    <article className="card home-news-card h-100 shadow-sm">
                      <div className="card-body d-flex flex-column">
                        {(story.feed && story.feed.displayTitle) || story.titleLabel ? (
                          <p className="home-news-card__meta text-muted small mb-2">
                            {story.feed && story.feed.displayTitle
                              ? story.feed.displayTitle
                              : story.titleLabel}
                          </p>
                        ) : null}
                        <h3 className="home-news-card__headline card-title h5">
                          <a
                            href={story.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="stretched-link text-dark"
                          >
                            {story.title}
                          </a>
                        </h3>
                        {story.summary && (
                          <p className="home-news-card__summary card-text small text-secondary flex-grow-1">
                            {story.summary}
                          </p>
                        )}
                        <p className="home-news-card__date small text-muted mb-0 mt-2">
                          {this.formatDate(story.datePublished)}
                        </p>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </React.Fragment>
    );
  }
}

export default Home;
