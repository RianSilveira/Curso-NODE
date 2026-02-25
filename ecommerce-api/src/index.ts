import express, { Request, Response, Application } from "express";


const app: Application = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// Middleware para permitir que o Express entenda JSON
app.use(express.json());

// Rota principal
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("teste123");
});

app.get("/products", async (req: Request, res: Response)=> 
{
    const Response = await fetch("https://dummyjson.com/products");

    if (!Response.ok){
        throw new Error("erro na requisiçao")
    }
    const data = await Response.json();
    

    res.json(data);
    
});
let id = 1;
let usuarios: {id: number, nome: string, email: string}[] = [];

app.post("/Users", (req: Request, res: Response)=> {
   
    let user = req.body;
    user.id = id ++;
    usuarios.push(user);
    res.send({
        message:"Usuario Criado com Sucesso"
    });
});

app.get("/Users/:id", (req: Request, res: Response)=> {
    
   let userId = Number(req.params.id)
   let user = usuarios.find(user => user?.id === userId)

   if (!user){
    return res.status(404).json(
        {
            message: "Usuário não encontrado"
        }
    );
   }

   return res.send({user})
});



app.get("/Users", (req: Request, res: Response)=> {
    
    res.send({
       usuarios
    });
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});