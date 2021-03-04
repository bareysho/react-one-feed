const express = require('express');

const router = express.Router();

const userService = require('services/user.service');

const { authenticateJWT } = require('middlewares/authorize');

const { ADMIN_ROLE } = require('constants/role');

const getAll = (req, res, next) => {
  return () => {
    return userService.getAll()
    .then(users => res.json(users))
    .catch(next);
  }
}


const getById = (req, res, next) => {
  return () => {
    return userService.getById(req.params.id)
      .then(user => user ? res.json(user) : res.sendStatus(404))
      .catch(next);
  }
}

router.get('/', authenticateJWT(getAll, ADMIN_ROLE));
router.get('/:id', authenticateJWT(getById));

module.exports = router;
