const express = require('express');
const router = new express.Router();

const bookController = require('../controller/book.controller');


/**
 * Add book
 */
router.post('/books', bookController.add);


/**
 * Read book by id
 */
router.get('/books/:id', bookController.readById);


/**
 * Read books
 */
router.get('/books', bookController.read);


/**
 * Update book
 */
router.patch('/books/:id', bookController.update);


/**
 * Delete book
 */
router.delete('/books/:id', bookController.delete);

module.exports = router;
