const express = require('express')

let books = []

const app = express();

app.use(express.json());

app.post('/books', async (req, res) => 
{
    const {id, title, author, publishedAt} = req.body

    const book = {id, title, author, publishedAt}

    await books.push(book);

    return res.status(201).json(book);

})

app.get('/books', async (req, res) => 
{
    const allBooks = books;
    return res.status(200).json(allBooks);
})

app.get('/books/:book_id', async (req, res) => {
    const { book_id } = req.params;
    const bookEspecifico = await books.find(book => book.id === book_id);

    if(!bookEspecifico) return res.status(404).json('Não foi encontrado')

    return res.status(200).json(bookEspecifico);
});

app.delete('/books/:book_id', async (req, res) => 
{
    const { book_id } = req.params;
    const indexToRemove = await books.findIndex(book => book.id === book_id);

if (indexToRemove !== -1) {
    books.splice(indexToRemove, 1);
}
    return res.status(204).json('deletado')
})

app.put('/books/:book_id', async (req, res) => 
{
    const { book_id } = req.params;
    const bookEspecifico = await books.find(book => book.id === book_id);
    const {id, title, author, publishedAt} = req.body

    bookEspecifico.id = id;
    bookEspecifico.title = title
    bookEspecifico.author = author
    bookEspecifico.publishedAt = publishedAt
    

    return res.status(204).json("Book editado")
})

app.listen(3333, () => console.log('server'))