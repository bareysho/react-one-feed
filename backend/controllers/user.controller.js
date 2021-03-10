const express = require('express');

const router = express.Router();

const userService = require('services/user.service');

const { authenticateJWT } = require('middlewares/authorize');

const getById = (req, res) => {
  const { params } = req;

  return () => {
    return userService.getUserById(params.id)
      .then(user =>{ res.json(user) })
      .catch(error => {
        res.sendStatus(404).json({ message: error });
      });
  }
}

router.get('/:id', authenticateJWT(getById));

module.exports = router;
