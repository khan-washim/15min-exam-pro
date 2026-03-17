import mongoose from 'mongoose';
import fs from 'fs';
import 'dotenv/config';

// সরাসরি মডেল স্কিমা ডিফাইন করা হচ্ছে যাতে কোনো পাথ এরর না আসে
const questionSchema = new mongoose.Schema({
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'subject', required: true },
  setNumber: { type: Number, default: 1 },
  text: { type: String, required: true },
  options: { type: [String], required: true },
  correctIndex: { type: Number, required: true },
  explanation: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const subjectSchema = new mongoose.Schema({
  nameEn: { type: String, required: true },
  nameBn: { type: String }
});

const Question = mongoose.models.question || mongoose.model('question', questionSchema);
const Subject = mongoose.models.subject || mongoose.model('subject', subjectSchema);

const seedQuestions = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) throw new Error("MONGO_URI is missing in .env");

    console.log("📡 Connecting to MongoDB...");
    await mongoose.connect(mongoURI);

    // ১. questions.json ফাইল থেকে ডাটা পড়া
    const rawData = fs.readFileSync('./questions.json', 'utf-8');
    const questionsArray = JSON.parse(rawData);

    console.log(`📄 Found ${questionsArray.length} questions in JSON. Processing...`);

    const finalQuestions = [];

    for (const q of questionsArray) {
      // ২. সাবজেক্টের নাম (nameEn) দিয়ে ডাটাবেস থেকে সঠিক ID খুঁজে বের করা
      const foundSubject = await Subject.findOne({ 
        nameEn: { $regex: new RegExp(`^${q.subject}$`, 'i') } 
      });

      if (foundSubject) {
        // ৩. টেক্সট আনসারকে ইনডেক্সে (0,1,2,3) রূপান্তর করা
        const cIndex = q.options.indexOf(q.correctAnswer);

        if (cIndex === -1) {
          console.warn(`⚠️ Warning: Correct answer not found in options for: "${q.text.substring(0, 30)}..."`);
          continue;
        }

        finalQuestions.push({
          text: q.text,
          options: q.options,
          correctIndex: cIndex,
          subject: foundSubject._id, // সাবজেক্টের ObjectId ম্যাপ করা হলো
          setNumber: q.setNumber || 1,
          explanation: q.explanation || ""
        });
      } else {
        console.warn(`❌ Subject Not Found: "${q.subject}". Please run seedSubjects.js first.`);
      }
    }

    // ৪. ডাটাবেসে ইনসার্ট করা
    if (finalQuestions.length > 0) {
      // আপনি চাইলে আগের সব প্রশ্ন মুছে ফেলতে পারেন: await Question.deleteMany({});
      await Question.insertMany(finalQuestions);
      console.log(`------------------------------------------`);
      console.log(`✅ SUCCESS: ${finalQuestions.length} questions seeded subject-wise!`);
      console.log(`------------------------------------------`);
    } else {
      console.log("No valid questions found to seed.");
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding Error:", err.message);
    process.exit(1);
  }
};

seedQuestions();