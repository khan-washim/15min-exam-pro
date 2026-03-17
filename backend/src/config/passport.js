import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

/**
 * @desc    Passport JWT Strategy কনফিগারেশন
 * @param   {Object} passport - Passport ইন্সট্যান্স
 */
const passportConfig = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        // টোকেনের পে-লোড থেকে ইউজার আইডি দিয়ে ডাটাবেসে ইউজার খোঁজা
        const user = await User.findById(jwt_payload.id).select('-password');
        
        if (user) {
          return done(null, user);
        }
        
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};

export default passportConfig;