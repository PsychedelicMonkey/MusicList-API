import passport from 'passport';
import passportJwt from 'passport-jwt';
import User from '../models/User';
import { JWT_SECRET } from '../utils/secrets';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

const initializePassport = () => {
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        const user = await User.findById(payload.id).select([
          'followers',
          'following',
        ]);

        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};

export const auth = passport.authenticate('jwt', { session: false });

export default initializePassport;
