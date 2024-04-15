import { useEffect, useState } from "react";

const useComments = () => {
  const [comments, setComments] = useState([]);
  const [reloadToggle, setReloadToggle] = useState(false);
  const refetch = () => {
    setReloadToggle(!reloadToggle);
  };

  useEffect(() => {
    fetch("http://localhost:5000/comments")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setComments(data);
      });
  }, [reloadToggle]);

  return { comments, refetch };
};

export default useComments;
