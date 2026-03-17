import mongoose from 'mongoose';
import 'dotenv/config';

/**
 * ১. সরাসরি সাবজেক্ট স্কিমা ডিফাইন করা হচ্ছে যাতে অন্য কোনো ফাইলের ওপর 
 * ডিপেন্ডেন্সি না থাকে। এটি ERR_MODULE_NOT_FOUND এরর সমাধান করবে।
 */
const subjectSchema = new mongoose.Schema({
  nameEn: { type: String, required: true },
  nameBn: { type: String },
  marks: { type: Number },
  icon: { type: String }
}, { timestamps: true });

// মডেল তৈরি (যদি অলরেডি থাকে তবে সেটি ব্যবহার করবে, নয়তো নতুন তৈরি করবে)
const Subject = mongoose.models.subject || mongoose.model('subject', subjectSchema);

/**
 * ২. বিসিএস-এর ১০টি সাবজেক্ট ডাটা
 */
const subjects = [
  { nameEn: 'Bangla', nameBn: 'বাংলা', marks: 35, icon: 'fa-language' },
  { nameEn: 'English', nameBn: 'ইংরেজি', marks: 35, icon: 'fa-font' },
  { nameEn: 'Bangladesh Affairs', nameBn: 'বাংলাদেশ বিষয়াবলী', marks: 30, icon: 'fa-map' },
  { nameEn: 'International Affairs', nameBn: 'আন্তর্জাতিক বিষয়াবলী', marks: 20, icon: 'fa-globe' },
  { nameEn: 'Math', nameBn: 'গাণিতিক যুক্তি', marks: 15, icon: 'fa-calculator' },
  { nameEn: 'Mental Ability', nameBn: 'মানসিক দক্ষতা', marks: 15, icon: 'fa-brain' },
  { nameEn: 'General Science', nameBn: 'সাধারণ বিজ্ঞান', marks: 15, icon: 'fa-flask' },
  { nameEn: 'Computer', nameBn: 'কম্পিউটার ও তথ্য প্রযুক্তি', marks: 15, icon: 'fa-laptop' },
  { nameEn: 'Geography', nameBn: 'ভূগোল ও পরিবেশ', marks: 10, icon: 'fa-tree' },
  { nameEn: 'Ethics', nameBn: 'নৈতিকতা ও সুশাসন', marks: 10, icon: 'fa-balance-scale' }
];

/**
 * ৩. মেইন সিড ফাংশন
 */
const seedDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      throw new Error("❌ MONGO_URI is not defined in your .env file!");
    }

    console.log("📡 Connecting to MongoDB...");
    await mongoose.connect(mongoURI);
    console.log("✅ Database Connected Successfully.");

    // আগের সাবজেক্টগুলো মুছে নতুন করে ইনসার্ট করা
    console.log("🧹 Cleaning old subjects...");
    await Subject.deleteMany({});

    console.log("🌱 Seeding subjects...");
    await Subject.insertMany(subjects);

    console.log("------------------------------------------");
    console.log("✅ SUCCESS: 10 BCS Subjects seeded successfully!");
    console.log("------------------------------------------");
    
    process.exit(0);
  } catch (err) {
    console.error("❌ ERROR DURING SEEDING:");
    console.error(err.message);
    process.exit(1);
  }
};

seedDB();