import Task from "../models/Task";

/**
 * @route {POST} /api/tasks/add
 * @description Add a new task for user.
 * @access public
 */
export const AddTask = async (request, response, next) => {
    try {
      const task =  new Task({
        ...request.body
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
 * @route {POST} /api/tasks/update
 * @description Update an existing task of a user.
 * @access public
 */
  export const UpdateTask = async (request, response, next) => {
    try {
      
      await Task.findByIdAndUpdate(request.body.taskID, {$set: {...request.body}});   
      
      const successResponse = new Success(
        200,
        "Task Updated Successfully"
      );
      response.status(successResponse.status).json(successResponse.message);
    } catch (error) {
      console.error(error);
      return next(Problem(500, "Internal Server Error!"));
    }
  };

  /**
 * @route {POST} /api/tasks/getTask
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
 * @route {POST} /api/tasks/delete
 * @description Delete an existing task of a user.
 * @access public
 */
  export const deleteTask = async (request, response, next) => {
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
