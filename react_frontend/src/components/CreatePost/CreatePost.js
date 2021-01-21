import React, { useState } from "react";
import classNames from "classnames";
import get from "lodash/get";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Constants from "../../shared/js/constants";
import { uploadPostFile, createPost } from "../../shared/api/api";
import styles from "./createPost.module.scss";

const { CLOUD_NAME, CLOUD_UPLOAD_URL, CLOUD_PRESET } = Constants;

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const cardClass = classNames("card input-field", styles.cardStyle);

  const postDetails = () => {
    const data = { title, body, url };
    createPost(data)
      .then((data) => {
        const error = get(data, "data.error");
        if (error) {
          return toast.error(error);
        }
        const message = get(data, "data.message");
        toast.success(`${message}`);
        history.push("/home");
      })
      .catch((err) => {
        const error = get(err, "response.data.error", "Something went wrong");
        toast.error(error);
      });
  };

  const uploadImage = (image) => {
    const data = new FormData();

    data.append("file", image);
    data.append("upload_preset", CLOUD_PRESET);
    data.append("cloud_name", CLOUD_NAME);
    uploadPostFile(CLOUD_UPLOAD_URL, data)
      .then((data) => {
        const url = get(data, "data.secure_url");
        setUrl(url);
        setImage(image);
      })
      .catch((error) => toast.error("Could not upload image"));
  };

  const onChange = (callback, e) => {
    const value = get(e, "target.value");
    callback(value);
  };

  const onFileChange = (e) => {
    const file = get(e, "target.files[0]");
    file && uploadImage(file);
  };

  return (
    <div className={cardClass}>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={onChange.bind(this, setTitle)}
      />
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={onChange.bind(this, setBody)}
      />
      <div className="file-field input-field">
        <div className="btn">
          <span>File</span>
          <input type="file" onChange={onFileChange} />
        </div>
        <div className="file-path-wrapper">
          <input
            readOnly
            className="file-path validate"
            type="text"
            value={image ? image.name : ""}
          />
        </div>
      </div>
      <button className="btn waves-effect waves-light" onClick={postDetails}>
        Submit Post
      </button>
    </div>
  );
};

export default CreatePost;
