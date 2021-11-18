import React, { useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";

const Profile: React.FC<any> = (props) => {
  const [userInfo, setUserInfo] = useState(props.todos);

  // Use swr provider as a context
  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/todos",
    axios
  );

  if (error) {
    return <p>We have error!</p>;
  }

  // if (!data) {
  //   return <p>No data, yet!</p>;
  // }

  useEffect(() => {
    if (data) {
      setUserInfo(data.data);
    }
  }, [data]);

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <p className="mb-2">Hello world from Profile</p>
      <Link
        href={{
          pathname: "profile/[userid]",
          query: { userid: "23123123userid" },
        }}
      >
        User id
      </Link>
      {userInfo.map((todo) => {
        if (todo.id < 5)
          return (
            <div key={todo.id} className="mt-2 border-2">
              <p>{todo.title}</p>
              <p>{todo.userId}</p>
            </div>
          );
      })}
    </div>
  );
};

export const getStaticProps = async () => {
  const data = axios.get("https://jsonplaceholder.typicode.com/todos");
  const response = await data;

  return {
    props: {
      todos: response.data,
    },
    revalidate: 10,
  };
};

export default Profile;
