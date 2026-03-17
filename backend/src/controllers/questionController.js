import Question from '../models/Question.js';
import Subject from '../models/Subject.js';
import fs from 'fs';
import mongoose from 'mongoose';

/**
 * ১. ডায়নামিক প্র্যাকটিস সেট তৈরি (Random 20 Questions)
 * স্টুডেন্ট যখন প্র্যাকটিসে ক্লিক করবে, এই ফাংশন ২০টি র‍্যান্ডম প্রশ্ন দিবে।
 */
export const getQuestionsBySubjectName = async (req, res) => {
  try {
    const { subjectName } = req.params;

    // ১. প্রথমে সাবজেক্ট আইডি খুঁজে বের করা
    const subject = await Subject.findOne({ 
      nameEn: { $regex: new RegExp(`^${subjectName}$`, 'i') } 
    });

    if (!subject) {
      return res.status(404).json({ 
        success: false, 
        message: `Subject '${subjectName}' not found.` 
      });
    }

    // ২. ঐ সাবজেক্টের সকল প্রশ্ন থেকে র‍্যান্ডম ২০টি প্রশ্ন বের করা (MongoDB Aggregation)
    const questions = await Question.aggregate([
      { $match: { subject: subject._id } }, // শুধুমাত্র নির্দিষ্ট সাবজেক্টের প্রশ্ন
      { $sample: { size: 20 } }             // র‍্যান্ডম ২০টি প্রশ্ন সিলেক্ট করা
    ]);
    
    // ফ্রন্টএন্ড সরাসরি অ্যারে আশা করছে
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * ২. ম্যানুয়াল প্রশ্ন তৈরি (Admin UI থেকে)
 */
export const createQuestion = async (req, res) => {
  try {
    const { questionText, options, correctAnswer, subject, explanation, setNumber } = req.body;
    const correctIndex = options.indexOf(correctAnswer);

    const question = await Question.create({
      text: questionText,
      options: options,
      correctIndex: correctIndex !== -1 ? correctIndex : 0,
      subject: subject,
      explanation: explanation,
      setNumber: Number(setNumber) || 1,
      createdBy: req.user._id
    });

    res.status(201).json({ success: true, data: question });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * ৩. বাল্ক আপলোড (JSON ফাইল থেকে)
 */
export const bulkUploadQuestions = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "ফাইল পাওয়া যায়নি!" });
    }

    const rawData = fs.readFileSync(req.file.path, 'utf8');
    const questions = JSON.parse(rawData);

    if (!Array.isArray(questions) || questions.length === 0) {
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, message: "JSON ফাইলটি সঠিক নয়!" });
    }

    const subjectRef = questions[0].subject;
    const foundSubject = await Subject.findOne({ 
      $or: [
        { _id: mongoose.isValidObjectId(subjectRef) ? subjectRef : null },
        { nameEn: new RegExp(`^${subjectRef}$`, 'i') },
        { nameBn: subjectRef }
      ] 
    });

    if (!foundSubject) {
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(404).json({ success: false, message: "সাবজেক্ট খুঁজে পাওয়া যায়নি!" });
    }

    const formattedQuestions = questions.map(q => ({
      text: q.questionText || q.text,
      options: q.options,
      correctIndex: q.options.indexOf(q.correctAnswer) !== -1 
                    ? q.options.indexOf(q.correctAnswer) 
                    : (q.correctIndex || 0),
      subject: foundSubject._id,
      setNumber: Number(q.setNumber) || 1,
      explanation: q.explanation || "",
      createdBy: req.user ? req.user._id : null
    }));

    await Question.insertMany(formattedQuestions);
    if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);

    res.status(201).json({ success: true, message: "আপলোড সফল হয়েছে!" });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * ৪. সকল প্রশ্ন দেখা (Admin)
 */
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate('subject', 'nameEn nameBn')
      .sort('-createdAt');
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * ৫. প্রশ্ন ডিলিট করা
 */
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error" });
  }
};