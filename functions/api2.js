import express, { Router } from "express";
import serverless from "serverless-http";
import Joi from "joi";

const api = express();
api.use(express.json());
const router = Router();
const customers = [
    {title: 'George', id: 1},
    {title: 'Josh', id: 2},
    {title: 'Tyler', id: 3},
    {title: 'Alice', id: 4},
    {title: 'Candice', id: 5}
]

router.get("/customers", (req, res) => res.send(customers));

router.get('/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
//If there is no valid customer ID, then display an error with the following message
    if (!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
    res.send(customer);
});

router.post('/customers', (req, res)=> {
     const { error } = validateCustomer(req.body);
    if (error){
        res.status(400).send(error.details[0].message)
        return;
    }
    const cst = {
        id: customers.length + 1,
        title: req.body.title
    };
    customers.push(cst);
    res.send(cst);
});

router.put('/customers/:id', (req, res) => {
    const cst = customers.find(c=> c.id === parseInt(req.params.id));
    if (!cst) res.status(404)
        .send('<h2 style="font-family: Malgun Gothic; color: darkred;">User id not Found!! </h2>');
    
     const { error } = validateCustomer(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }   
    cst.title = req.body.title;
    res.send(cst);
});

router.delete('/customers/:id', (req, res) => {
 
    const cst = customers.find( c=> c.id === parseInt(req.params.id));
    if(!cst) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Customer id not Found!!</h2>')
    
    const index = customers.indexOf(cst);
    customers.splice(index,1);
    
    res.send(cst);
});

function validateCustomer(customer) {
    const schema = Joi.object({
        title: Joi.string().min(3).required()
    })
    /* {
        title: Joi.string().min(3).required()
    }; */
    return schema.validate(customer);
 
}

api.use("/.netlify/functions/api2/", router);

export const handler = serverless(api);