import React, { useContext } from "react";
import { UserContext } from "../../shared/api/contexts";
import styles from "./profile.module.scss";

const Profile = (props) => {
  const { user = {} } = useContext(UserContext);
  const { myPosts } = props;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileWrapper}>
        <img
          alt="Profile"
          className={styles.imageClass}
          src="https://images.unsplash.com/photo-1575994964795-862a6b7b32d7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NzV8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        />
        <div className={styles.profileDetailsWrapper}>
          <h4>{user.name || ""}</h4>
          <div
            className={styles.profileDetails}
            style={{ justifyContent: "space-between", borderBottom: "none" }}
          >
            <h6>40 posts</h6>
            <h6>40 followers</h6>
            <h6>40 following</h6>
          </div>
        </div>
      </div>
      <div className={styles.galleryWrapper}>
        {myPosts.map((post) => (
          <img
            key={post._id}
            className={styles.profilePost}
            alt={post.title}
            src={post.photo}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
