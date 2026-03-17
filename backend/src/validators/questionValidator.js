import Joi from 'joi';

/**
 * Single Question Validation Schema
 */
export const questionSchema = Joi.object({
  // subject সাধারণত ObjectId হয়, তাই hex string চেক করা ভালো
  subject: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({ 
      'any.required': 'Subject is required',
      'string.pattern.base': 'Invalid Subject ID format'
    }),
    
  setNumber: Joi.number()
    .integer()
    .min(1)
    .required(),
    
  text: Joi.string()
    .required()
    .messages({ 'any.required': 'Question text cannot be empty' }),
    
  options: Joi.array()
    .items(Joi.string().required())
    .length(4)
    .required()
    .messages({ 
      'array.length': 'You must provide exactly 4 options',
      'any.required': 'Options are required' 
    }),
    
  correctIndex: Joi.number()
    .integer()
    .min(0)
    .max(3)
    .required()
    .messages({ 
      'number.max': 'Correct index must be between 0 and 3 (Option 1 to 4)' 
    }),

  explanation: Joi.string().allow('', null), // explanation ঐচ্ছিক হতে পারে
  
  createdBy: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional() // এটি অনেক সময় রিকোয়েস্ট ইউজার থেকে আসে
});

/**
 * Bulk Questions Validation (অ্যারে চেক করার জন্য)
 */
export const bulkQuestionSchema = Joi.array().items(questionSchema).min(1);