import {
    FieldOptions,
    handleRequest,
    validateSchema,
} from "@middlewares";
import { Request } from "@models";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { LoginSchema, RegisterUserSchema } from "@dtos";
import { userController } from "@controllers";
import { config } from "@config";

export function UserRouter() {
    const router = Router();

    router.post(
        "/register",
        validateSchema(RegisterUserSchema, [FieldOptions.body]),
        handleRequest(
            (req) => userController.register(req),
            StatusCodes.CREATED
        )
    );

    router.post(
        "/login",
        validateSchema(LoginSchema, [FieldOptions.body]),
        handleRequest(
            (req) => userController.login(req),
            StatusCodes.OK
        )
    );

    return router;
}

// const { Sequelize, Model, DataTypes } = require("sequelize");

// // si se ejecuta localmente con "npm start" se usa esta linea
// const sequelize = new Sequelize(config.dbUrl);

// // si se ejecuta con "docker-compose up" se usa esta linea
// const sequelize = new Sequelize(config.dbUrl);
// // const sequelize = new Sequelize(config.dbUrl);

// const User = sequelize.define('User', {
//     username: {
//         type: DataTypes.STRING,
//     },
//     displayname: {
//         type: DataTypes.STRING
//     },
//     email: {
//         type: DataTypes.STRING,
//         unique: true
//     },
//     password: {
//         type: DataTypes.STRING
//     }
// });

// const app = express()

// app.get('/users', async (req, res) => {
//     const users = await User.findAll();
//     res.send(users)
// })

// app.get('/create_user', async (req, res) => {
//     const _ = await User.create({
//         username: 'user1',
//         displayName: 'displayName1',
//         email: 'example@example.com',
//         password: 'password1'
//     });
//     res.send('user1 creado!')
// })
