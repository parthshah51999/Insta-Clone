import React, { useEffect, useState } from "react";
import get from "lodash/get";
import { toast } from "react-toastify";
import Profile from "../components/Profile/Profile";
import { getMyPosts } from "../shared/api/api";

const HomeContainer = () => {
  const [loading, setLoading] = useState(false);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    setLoading(true);

    // api call for loading data
    const loadData = async () => {
      await getMyPosts()
        .then((data) => {
          const error = get(data, "data.error");
          if (error) {
            return toast.error(error);
          }
          const posts = get(data, "data.posts", []);
          setMyPosts(posts);
        })
        .catch((err) => {
          toast.error("Error while fetching posts");
        });
      setLoading(false);
    };

    // load data call
    loadData();
  }, []);

  return <Profile myPosts={myPosts} loading={loading} />;
};

export default HomeContainer;
