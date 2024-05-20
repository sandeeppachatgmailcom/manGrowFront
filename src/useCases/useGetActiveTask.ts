import { useEffect, useState } from "react";
import axiosApi from "../framework/api/axios";
import { utilityApis } from "../entity/constants/api";

const useGetActiveTask = () => {
  const [task, setTask] = useState();

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    const tasklist = await axiosApi.get(utilityApis.listAllTasks);
    setTask(tasklist.data);
  };

  return task;
};

export default useGetActiveTask