import { getPagination } from '../utils/pagination.js';
import Question from '../models/Question.js';

export const getAllQuestions = async (req, res) => {
  const { skip, limit } = getPagination(req.query.page, req.query.limit);
  
  const questions = await Question.find().skip(skip).limit(limit);
  res.json(questions);
};