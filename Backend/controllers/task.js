import Task from "../models/Task.js";
import { Success, Problem } from "../constant/Message.js";

/**
 * @route {POST} /api/task/add
 * @description Add a new task for user.
 * @access public
 */
export const AddTask = async (request, response, next) => {
    try {
      const data = {...request.body, deadline: new Date(request.body.deadline)}
      const task =  new Task({
        ...data
      });
      
      await task.save();
      const successResponse = new Success(
        200,
        "Task Addded Successfully"
      );
      response.status(successResponse.status).json(successResponse.message);
    } catch (error) {
      console.error(error);
      return next(Problem(500, "Internal Server Error!"));
    }
  };

/**
 * @route {POST} /api/task/update
 * @description Update an existing task of a user.
 * @access public
 */
  export const UpdateTask = async (request, response, next) => {
    try {
        if(request.body.deadline) request.body.deadline = new Date(request.body.deadline);
        const data = {
          title: request.body.title,
          description: request.body.description,
          deadline: request.body.deadline,
          status: request.body.status,
        }
        console.log(data)
      const updated = await Task.findByIdAndUpdate(request.body.taskId, {$set: {...data}});   
      if(updated){
        const successResponse = new Success(
          200,
          "Task Updated Successfully"
        );
        response.status(successResponse.status).json(successResponse.message);
      }else{
        return next(Problem(500, "Task not Updated. Please Try later!"));
      }
     
    } catch (error) {
      console.error(error);
      return next(Problem(500, "Internal Server Error!"));
    }
  };

  /**
 * @route {POST} /api/task/gettasks
 * @description Get all existing task of a user.
 * @access public
 */
  export const GetAllTask = async (request, response, next) => {
    try {
      
      const allTask = await Task.find({employeeId: request.body.employeeId});   
      
      const successResponse = new Success(
        200,
        allTask
      );
      response.status(successResponse.status).json(successResponse.message);
    } catch (error) {
      console.error(error);
      return next(Problem(500, "Internal Server Error!"));
    }
  };

  /**
 * @route {POST} /api/task/delete
 * @description Delete an existing task of a user.
 * @access public
 */
  export const DeleteTask = async (request, response, next) => {
    try {
      
      await Task.findOneAndDelete({employeeId: request.body.employeeId, _id: request.body.taskId});   
      
      const successResponse = new Success(
        200,
        "Task deleted Successfully"
      );
      response.status(successResponse.status).json(successResponse.message);
    } catch (error) {
      console.error(error);
      return next(Problem(500, "Internal Server Error!"));
    }
  };
