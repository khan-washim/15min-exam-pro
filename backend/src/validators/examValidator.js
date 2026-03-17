import Joi from 'joi'; // Corrected from 'jsonwebtoken'

/**
 * Schema for Starting an Exam
 * Validates the subject, specific set, and time constraints.
 */
export const examStartSchema = Joi.object({
  subjectId: Joi.string()
    .required()
    .messages({ 'any.required': 'Subject ID is required to start an exam' }),
    
  setId: Joi.number()
    .integer()
    .required()
    .messages({ 'number.base': 'Set ID must be a valid number' }),
    
  duration: Joi.number()
    .integer()
    .min(10)
    .max(180)
    .required()
    .messages({
      'number.min': 'Exam duration must be at least 10 minutes',
      'number.max': 'Exam duration cannot exceed 180 minutes (3 hours)'
    })
});