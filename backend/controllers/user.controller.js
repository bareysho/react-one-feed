const express = require('express');

const router = express.Router();

const authorize = require('middlewares/authorize')

const userService = require('services/user.service');

const { TOKEN_EXPIRED } = require('constants/message');
const { ADMIN_ROLE } = require('constants/role');

const getAll = (req, res, next) => {
  return userService.getAll()
    .then(users => res.json(users))
    .catch(next);
}

const getById = (req, res, next) => {
  // regular users can get their own record and admins can get any record
  if (req.params.id !== req.user.id && req.user.role !== ADMIN_ROLE) {
    return res.status(401).json({ message: TOKEN_EXPIRED });
  }

  return userService.getById(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(next);
}

router.get('/', authorize(ADMIN_ROLE), getAll);
router.get('/:id', authorize(), getById);

module.exports = router;
