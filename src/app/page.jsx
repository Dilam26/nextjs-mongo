import { connectDB } from "@/utils/mongoose"
import Task from "@/models/Task"
import TaskCard from "@/components/TaskCard";

async function loadTasks(){
  connectDB();
  const tasks = await Task.find();
  return tasks;
}

async function Home() {
  const tasks = await loadTasks();
  return (
    <div className="grid grid-cols-3 gap-2 md:grid-cols-2 lg:grid-cols-3">
    {
      tasks.map((task, index) =>(
      <TaskCard key={task._id} task={task}/>
    ))
    }</div>
  )
}

export default Home