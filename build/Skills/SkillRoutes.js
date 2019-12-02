const express = require('express');
const Passport = require('passport');
const SkillController = require('./SkillController');
const AuthMiddleware = require('../Middleware/Auth-Middleware');

const SkillRouter = express.Router();
// Methods from skill controller
const { getSkill, createSkill, updateSkill, deleteSkill, getSkillById } = SkillController;
// JWT strat for securing user work
const { jwtStrategy } = AuthMiddleware;

//passport global middleware
Passport.use(jwtStrategy);
//passport local middleware
const passportOptions = { session: false };
//require JWT strat for accessing work
const checkForToken = Passport.authenticate('jwt', passportOptions);

SkillRouter.get('/', checkForToken, getSkill);
SkillRouter.post('/', checkForToken, createSkill);
SkillRouter.put('/:id', updateSkill);
SkillRouter.delete('/:id', deleteSkill);
SkillRouter.get('/:id', getSkillById);

module.exports = SkillRouter;
//# sourceMappingURL=SkillRoutes.js.map