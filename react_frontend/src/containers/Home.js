import React, { useEffect, useState } from "react";
import get from "lodash/get";
import { toast } from "react-toastify";
import Home from "../components/Home/Home";
import { getAllPosts, like, unlike } from "../shared/api/api";

const HomeContainer = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    setLoading(true);

    // api call for loading data
    const loadData = async () => {
      await getAllPosts()
        .then((data) => {
          const error = get(data, "data.error");
          if (error) {
            return toast.error(error);
          }
          const posts = get(data, "data.posts", []);
          setAllPosts(posts);
        })
        .catch((err) => {
          toast.error("Error while fetching posts");
        });
      setLoading(false);
    };

    // load data call
    loadData();
  }, []);

  const likePost = (postId) => {
    like(postId)
      .then((data) => {
        const error = get(data, "data.error");
        if (error) {
          return toast.error(error);
        }
        const post = get(data, "data");
        const updatedPosts = allPosts.map((item) => {
          if (item._id === postId) {
            return post;
          }
          return item;
        });
        setAllPosts(updatedPosts);
      })
      .catch((err) => {
        toast.error("Error while liking post");
      });
  };

  const unlikePost = (postId) => {
    unlike(postId)
      .then((data) => {
        const error = get(data, "data.error");
        if (error) {
          return toast.error(error);
        }
        const post = get(data, "data");
        const updatedPosts = allPosts.map((item) => {
          if (item._id === postId) {
            return post;
          }
          return item;
        });
        setAllPosts(updatedPosts);
      })
      .catch((err) => {
        toast.error("Error while liking post");
      });
  };

  return (
    <Home
      allPosts={allPosts}
      loading={loading}
      likePost={likePost}
      unlikePost={unlikePost}
    />
  );
};

export default HomeContainer;
