import csv from 'csv-parser';
import fs from 'fs';

/**
 * Parse a CSV file into Question objects
 * Expected CSV headers: subject, question, opt1, opt2, opt3, opt4, correct, explanation, difficulty
 */
export const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        try {
          // Map CSV row to Question schema format
          const question = {
            subject: data.subject ? data.subject.toLowerCase() : 'general',
            questionText: data.question || data.questionText || '',
            options: [data.opt1, data.opt2, data.opt3, data.opt4].filter(Boolean),
            correctAnswer: String(data.correct || data.ans || ''),
            explanation: data.explanation || '',
            difficulty: data.difficulty || 'Medium'
          };

          // Only push valid questions
          if (question.questionText && question.options.length === 4 && question.correctAnswer) {
            results.push(question);
          }
        } catch (err) {
          console.error("CSV Row Parse Error:", err);
        }
      })
      .on('end', () => {
        try {
          fs.unlinkSync(filePath); // Cleanup uploaded file
        } catch (cleanupErr) {
          console.warn("File cleanup failed:", cleanupErr.message);
        }
        resolve(results);
      })
      .on('error', (err) => {
        reject(new Error(`CSV parsing failed: ${err.message}`));
      });
  });
};
