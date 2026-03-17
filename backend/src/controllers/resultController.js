import Result from '../models/Result.js';

/**
 * ১. Submit Exam Results
 * POST /api/results
 */
export const submitResult = async (req, res) => {
  try {
    const { 
      subject, 
      setNumber, 
      totalQuestions, 
      correctAnswers, // ফ্রন্টএন্ড থেকে আসছে
      wrongAnswers, 
      score, 
      answers,
      timeTaken 
    } = req.body;

    const userId = req.user._id;

    /**
     * আপনার Result.js মডেলে ফিল্ডের নাম 'correct' এবং 'wrong'। 
     * তাই ডাটা সেভ করার সময় আমরা সঠিক ম্যাপ করছি।
     */
    const result = await Result.create({
      user: userId,
      subject,
      setNumber,
      score,
      correct: correctAnswers, // মডেলের 'correct' ফিল্ডে সেভ হচ্ছে
      wrong: wrongAnswers || (totalQuestions - correctAnswers), // মডেলের 'wrong' ফিল্ডে সেভ হচ্ছে
      skipped: 0, // আপাতত ডিফল্ট ০, চাইলে ফ্রন্টএন্ড থেকে পাঠাতে পারেন
      answers,
      timeTaken: timeTaken || 0
    });

    res.status(201).json({
      success: true,
      message: 'Result submitted successfully',
      data: result
    });
  } catch (error) {
    console.error('❌ Submission Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit result', 
      error: error.message 
    });
  }
};

/**
 * ২. Get User Results (History)
 * GET /api/results/my-results
 */
export const getMyResults = async (req, res) => {
  try {
    // ইউজারের আইডি দিয়ে সব রেজাল্ট খুঁজে বের করা এবং লেটেস্ট রেজাল্ট আগে দেখানো
    const results = await Result.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('❌ Get History Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'ইতিহাস লোড করতে সমস্যা হয়েছে।', 
      error: error.message 
    });
  }
};

/**
 * ৩. Get Single Result Detail
 * GET /api/results/:id
 */
export const getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        message: 'দুঃখিত, রেজাল্টটি পাওয়া যায়নি।' 
      });
    }

    // নিরাপত্তা চেক: ইউজার নিজের রেজাল্ট ছাড়া অন্যেরটা দেখতে পারবে না
    if (result.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'আপনার এই রেজাল্ট দেখার অনুমতি নেই।' 
      });
    }

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('❌ Get Detail Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'রেজাল্ট বিস্তারিত লোড করতে সমস্যা হয়েছে।', 
      error: error.message 
    });
  }
};