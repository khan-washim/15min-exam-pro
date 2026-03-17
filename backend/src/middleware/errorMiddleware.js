const errorHandler = (err, req, res, next) => {
  // যদি স্ট্যাটাস কোড ২০০ থাকে (যেটা ডিফল্ট), তবে সেটাকে ৫০০ (সার্ভার এরর) এ সেট করবে
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    message: err.message,
    // প্রোডাকশন মোডে থাকলে সিকিউরিটির জন্য স্ট্যাক ট্রেস (Error Stack) হাইড করে রাখবে
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorHandler;