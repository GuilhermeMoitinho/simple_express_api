const { createContainer, asClass } = require('awilix');

class BookService {
    getAllBooks(books)
    {
        return books;
    }

    getBookById(books, id)
    {
        return books.find(book => book.id === id);;
    }

    updateBook(books, id, newBook)
    {

    }
    
}

const container = createContainer();
container.register({
    bookService: asClass(BookService),
});

module.exports = container;
