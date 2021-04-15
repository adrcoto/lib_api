const Book = require('../model/book.model');
const {returnError, filterData, isValidOperation} = require('./server.controller');


/**
 * Add book
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.add = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();

        res.status(201).send(book);
    } catch (error) {
        returnError(res, 'validation-error', 400, error);
    }
};


/**
 * Read book by id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.readById = async (req, res) => {
    try {
        const book = await Book.findOne({_id: req.params.id});
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.send(book);
    } catch (error) {
        res.status(400).send();
    }
};


/**
 * Read Books
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.read = async (req, res) => {
    try {
        const filterObject = filterData(req.query, ['title', 'author', 'category']);
        const queries = filterObject.queries;
        const sort = filterObject.sort;
        //bonus -> pagination
        const limit = filterObject.limit;
        const skip = filterObject.skip;

        const books = await Book.find(queries).sort(sort).limit(limit).skip(skip);
        if (books.length === 0) {
            res.status(404).send('Ufff ... it\'s quiet here ...');
        } else {
            res.send(books);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};


/**
 * Update book
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.update = async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['title', 'author', 'description', 'category', 'stars', 'rate'];

        if (!isValidOperation(updates, allowedUpdates)) {
            return res.status(400).send('Invalid updates');
        }

        await Book.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {
            new: true,
            runValidators: true
        }, (error, book) => {
            if (error) {
                error.status = 400;
            } else if (!book) {
                return res.status(400).send({message: 'Cannot perform the operation'});
            } else
                res.send(book);
        });
    } catch (error) {
        res.status(500).send('Cannot perform the operation');
    }
};


/**
 * Delete book
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.delete = async (req, res) => {
    try {
        await Book.findByIdAndDelete({_id: req.params.id}, (err, book) => {
            if (book) {
                res.send('Book deleted');
            } else
                res.status(404).send('Book not found');
        });
    } catch (error) {
        res.status(500).send(error);
    }
}




