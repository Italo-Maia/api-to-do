import { Request, Response } from 'express';
import { Todo } from '../models/Todo';

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const all = async (req: Request, res: Response) => {
    const list = await Todo.findAll();
    res.json({list});
}

export const add = async (req: Request, res: Response) => {
    if(req.body.title){

        let newtodo = await Todo.create({
            title: req.body.title,
            done: req.body.done ? true : false
        });

        res.status(201).json({ item: newtodo })
    }

    res.json({ error: "Dados nao enviados"})
}

export const uptade = async (req: Request, res: Response) => {
    let id: string = req.params.id;

    let todo = await Todo.findByPk(id);
    if(todo){

        if(req.body.title){
            todo.title = req.body.title
        }

        if(req.body.done){
            switch(req.body.done.toLowerCase()){
                case 'true':
                case '1':
                    todo.done = 'true';
                    break;
                case 'false':
                 case '0':
                    todo.done = 'false';
                    break;
            }
        }

        await todo.save()
        res.json({ item: todo})

    }else{
        res.json({ error: 'Item não encontrado' })
    }
}

export const remove = async (req: Request, res: Response) => {
    let id: string = req.params.id;
    let todo = await Todo.findByPk(id)

    if(todo) {
        await todo.destroy();
    }

    res.json({})
}

// export const register = async (req: Request, res: Response) => {
//     if(req.body.email && req.body.password) {
//         let { email, password } = req.body;

//         let hasUser = await User.findOne({where: { email }});
//         if(!hasUser) {
//             let newUser = await User.create({ email, password });

//             res.status(201);
//             res.json({ id: newUser.id });
//         } else {
//             res.json({ error: 'E-mail já existe.' });
//         }
//     }

//     res.json({ error: 'E-mail e/ou senha não enviados.' });
// }

// export const login = async (req: Request, res: Response) => {
//     if(req.body.email && req.body.password) {
//         let email: string = req.body.email;
//         let password: string = req.body.password;

//         let user = await User.findOne({ 
//             where: { email, password }
//         });

//         if(user) {
//             res.json({ status: true });
//             return;
//         }
//     }

//     res.json({ status: false });
// }

// export const list = async (req: Request, res: Response) => {
//     let users = await User.findAll();
//     let list: string[] = [];

//     for(let i in users) {
//         list.push( users[i].email );
//     }

//     res.json({ list });
// }