import React, { useContext } from "react";
import classNames from "classnames";
import { UserContext } from "../../shared/api/contexts";
import styles from "./home.module.scss";

const Home = (props) => {
  const { user = {} } = useContext(UserContext);
  const cardClass = classNames("card", styles.homeCard);
  const likeClass = classNames("material-icons", styles.likeClass);
  const { allPosts, likePost, unlikePost } = props;

  const getCard = ({ title, body, photo, likes = [], _id }) => {
    return (
      <div className={cardClass} key={title}>
        <h5 className={styles.headerTitle}>{title}</h5>
        <div className="card-image">
          <img alt="Broken" className={styles.imageClass} src={photo} />
          <div className="card-content">
            <i className={likeClass}>favorite</i>
            {likes.includes(user._id) ? (
              <i
                className="material-icons"
                onClick={unlikePost.bind(this, _id)}
              >
                thumb_down
              </i>
            ) : (
              <i className="material-icons" onClick={likePost.bind(this, _id)}>
                thumb_up
              </i>
            )}
            <h6>{likes.length} likes</h6>
            <h6>{title}</h6>
            <p>{body}</p>
            <input type="text" placeholder="add comment" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.homeWrapper}>
      {allPosts.map((post) => getCard(post))}
    </div>
  );
};

export default Home;
