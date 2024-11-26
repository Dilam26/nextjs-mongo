import { NextResponse } from "next/server";
import { connectDB } from "../../../../utils/mongoose";
import Task  from "../../../../models/Task";

export async function GET(request,  {params} ){
    try{
        connectDB();
        const { idTask } = await params; // Accediendo a 'id' desde params
        const task = await Task.findOne({
            _id: idTask
        })

        if(!task){
            return NextResponse.json({message: "Task not found"}, {status: 404});
        }
        
        return NextResponse.json(task);
    }catch(error){
        return NextResponse.json(error.message, {status: 400});
    }
}


export async function POST(request,  {params} ){
   try{
        connectDB()
        const data = await request.json();
        const { idTask } = await params; // Accediendo a 'id' desde params
        const taskUptated = await Task.findByIdAndUpdate(idTask,data, {new: true});
        
        return NextResponse.json(taskUptated);
   }catch(error){
       return NextResponse.json(error.message, {status: 400});
   }
}

export async function DELETE(request,  {params} ){
    try{
        connectDB();
        const { idTask } = await params; // Accediendo a 'id' desde params
        const taskDeleted = await Task.findByIdAndDelete(idTask);
        const tasks = await Task.find();

        if(!taskDeleted){
            return NextResponse.json({message: "Task not found"}, {status: 404});
        }
        
        return NextResponse.json(tasks)
    }catch(error){
        return NextResponse.json(error.message, {status: 400});
    }
}