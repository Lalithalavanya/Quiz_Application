//this file will conatin all the API routes of this project
import { Router } from "express";
import * as controller from "../controllers/controller.js"

const router=Router();

/***Questions Routes API */
// router.get('/questions',controller.getQuestions) //a route handler for handling HTTP GET requests to the path /questions
// router.post('/questions',controller.insertQuestions) //a route handler for handling HTTP POST requests to the path /questions

//instead of above if as the /questions is same in both requests we can do the chaining
router.route('/questions')
          .get(controller.getQuestions) 
          .post(controller.insertQuestions)
          .delete(controller.dropQuestions)

router.route('/result')     //using this '/result' endpoint we will store all the user data in a mongoDB database
          .get(controller.getResult)
          .post(controller.storeResult)
          .delete(controller.dropResult)


export default router;