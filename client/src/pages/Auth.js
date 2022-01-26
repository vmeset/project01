import React, { useContext, useState } from 'react';
import {useNavigate, NavLink} from 'react-router-dom'
import { Card, Container, Form, Button, Row } from 'react-bootstrap';
import { login } from '../http/userAPI';
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from '../utils/consts'
import {observer} from "mobx-react-lite";
import { Context } from '..';
import { useLocation } from 'react-router-dom';


const Auth = observer( () => {

    const [username, setUsername] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate()
    const location = useLocation()

    const isLogin = location.pathname === LOGIN_ROUTE

    const {user} = useContext(Context)
    

    const click = async () => {
        try {
            let data
            data = await login(username, password)
            user.setUser(data)
            user.setIsAuth(true)
            navigate(MAIN_ROUTE)
        } catch (e) {
            alert(e.response.data)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}}>
                <h2 className="m-auto">
                    {isLogin ? "Авторизация" : "Регистрация"}
                </h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-2"
                        placeholder="Введите логин"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <Form.Control
                        placeholder="Введите пароль"
                        type="password"
                        value={password}
                        onChange={e => {setpassword(e.target.value)}}
                    />
                    <Row className="d-flex justify-content-between">
                            { isLogin 
                            ? <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>
                                    Зарегистрируйся!
                                </NavLink>
                            </div>
                            : <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>
                                    Авторизируйся!
                                </NavLink>
                            </div>
                            }
                        <div>
                            <Button
                                variant={"outline-success"}
                                onClick={click}
                            >
                                {isLogin ? "Войти" : "Регистрация"}
                            </Button>
                        </div>
                    </Row>
                </Form>    
            </Card>
        </Container> 
    );
});

export default Auth;