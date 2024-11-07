/* Per il nostro blog, concentriamoci sul creare una rotta:
la rotta dovrá rispondere al verbo POST e delegare un metodo store del controller dei posts per effettuare le operazioni di creazione della risorsa.
Questa dovrà riceve i dati in formato json e dovrà restituire l'elenco dei posts in formato json incluso il nuovo elemento appena creato
Tutte le funzioni delle rotte dovranno essere scritte nel controller dedicato.
Testare le rotte tramite Postman. */

const express = require('express')
const app = express()
const port = 3000

const routers_posts = require("./routers/routers_posts.js") //routers
const not_found_middleware = require("./middlewares/not_found.js")
const logger_middleware = require("./middlewares/logger_middleware.js")

//per quando usiamo post (e non get) per leggere il formato json
app.use(express.json())

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

/* app.use('/posts', (req, res, next) => {
    throw new Error("You broke everything dude! 💥")
}) */

app.use('/posts', logger_middleware)

app.use('/posts', routers_posts)

app.use(not_found_middleware)

/* app.use((err, req, res, next) => {
    console.log("Error: ", err.message);
    console.error(err.stack);
    res.status(500).send({
      message: "Something went wrong",
      error: err.message
    })
}); */

