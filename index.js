const express = require('express');
const cors = require('cors');

let books = [];

const app = express();

app.use(cors());
app.use(express.json());

app.post('/books', async (req, res) => 
{
    const {id, title, author, publishedAt} = req.body

    const book = {id, title, author, publishedAt}

    if(!book) return res.status(400).json('informe os valores pedidos');

    await books.push(book);

    return res.status(201).json(book);

})

app.get('/books', async (req, res) => 
{
    let allBooks = books
    return res.status(200).json(allBooks);
})

app.get('/books/:book_id', async (req, res) => {
    const { book_id } = req.params;

    if(!book_id) return res.status(400).json('Informe um identificador');

    const bookEspecifico = await books.find(book => book.id === book_id);

    if(!bookEspecifico) return res.status(404).json('Não foi encontrado')

    return res.status(200).json(bookEspecifico);
});

app.delete('/books/:book_id', async (req, res) => 
{
    const { book_id } = req.params;

    if(!book_id) return res.status(400).json('Informe um identificador');

    const bookEspecifico = await books.find(book => book.id === book_id);

    if(!bookEspecifico) return res.status(404).json('Não foi encontrado')

    const indexToRemove = await books.findIndex(book => book.id === book_id);

if (indexToRemove !== -1) {
    books.splice(indexToRemove, 1);
}
    return res.status(204).json('deletado')
})

app.put('/books/:book_id', async (req, res) => 
{
    const { book_id } = req.params;

    if(!book_id) return res.status(400).json('Informe um identificador');

    const bookEspecifico = await books.find(book => book.id === book_id);

    if(!bookEspecifico) return res.status(404).json('Não foi encontrado')

    const {id, title, author, publishedAt} = req.body

    bookEspecifico.id = id;
    bookEspecifico.title = title
    bookEspecifico.author = author
    bookEspecifico.publishedAt = publishedAt
    

    return res.status(204).json("Book editado")
})

app.listen(3333, () => console.log('server'))