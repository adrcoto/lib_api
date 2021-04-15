const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Provide a book title'],
        trim: true,
    },
    author: {
        type: String,
        required: [true, 'Provide a book author'],
        trim: true,
    },
    description: {
        type: 'String',
        default: 'This book has no description',
        trim: true
    },
    category: {
        type: String,
        default: 'default',
        trim: true
    },
    rate: {
        type: String,
        enum: {
            values: ['like', 'dislike', 'neutral'],
            message: 'Not allowed'
        },

        default: 'neutral',
    },
    stars: {
        type: Number,
        min: [1, 'Not allowed'],
        max: 5,
        default: 1
    }
}, {
    timestamps: true,
});

// bookSchema.pre('findOneAndUpdate', function(next) {
//     this.options.runValidators = true;
//     next();
// });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;