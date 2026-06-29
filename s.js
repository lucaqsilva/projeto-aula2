const express = require("express");
const cors = require("cors");
 

const app = express();
app.use(cors());
app.use(express.json());
 

let contacts = [
    {
        id:1,
        name: "Allan",
        email: "allan@gmail.com",
        phone: "13213546"
},
    {
        id:2,
        name: "Joao",
        email: "joao@gmail.com",
        phone: "13213546"
}
];
let nextId = 3;
 

app.get("/",(req, res) => {res.json({
    message: "API Minha Agenda"
})});//callback functions e arrow functions
 

//localhost:3000/
 

app.get("/contatos",(req, res) => {
    res.json(contacts);
});
 

app.get("/contato/:id",(req, res) => {
    const id = Number(req.params.id);
 

    const contact = contacts.find(contact => contact.id === id);
   
    //tratamento de erro: caso Id nao encontrado
    if (!contact) {
        return res.status(400).json({
            message: "contato nao encontrado"
        });
    };
 

    res.json(contact);
});
 

app.post("/contatos",(req, res) => {
    const { name, email, phone } = req.body || {};
   
    const NewContact = {
        id: nextId,
        name,
        email,
        phone
    }
    contacts.push(NewContact);
    nextId++
 

    res.status(201).json(NewContact);
});
 

app.put("/contato/:id",(req, res) => {
    const id = Number(req.params.id);
 

    const { name, email, phone } = req.body || {};
 

    const contact = contacts.find(contact => contact.id === id)
 

    //tratamento de erro: se nao houver o contato
    if (!contact) {
        return res.status(404).json(
            {
                message: "contato nao encontrado"
            });
    };
   
    if (name !== undefined) {
        contact.name = name;
    };
   
    if (email !== undefined) {
        contact.email = email;
    };
   
    if (phone !== undefined) {
        contact.phone = phone;
    };
 

    res.json(contact);
});



app.delete("/contato/:id",(req, res) => {
    const id = Number(req.params.id);
 

    contactExists = contacts.some(contact => contact.id === id );
 

    // tratamento de erro: Se o contato nao existir
    if (!contactExists) {
        return res.status(404).json({
            message: "Contato inexistente"
        });
    };
 

    contacts = contacts.filter(contact => contact.id !== id);
 

    res.status(204).send();
});




app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})