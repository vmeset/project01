import React, { useContext } from 'react';
import {Navbar, Container, Button, Nav} from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE } from '../utils/consts';
import {observer} from 'mobx-react-lite'

const NavBar = observer ( () => {

    const {user} = useContext(Context)
    const navigate = useNavigate()


    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink 
                    style={{color: 'white'}}
                    to={MAIN_ROUTE}
                >
                    {user.isAuth ? 
                        <span>{user.user.username}</span>
                        : 'MyNotes'
                    }
                </NavLink>
                
                {user.isAuth ?
                    <Nav className="ml-auto">
                        <Button variant={'outline-light'}
                            onClick={() => {
                                user.setIsAuth(false)
                                navigate(LOGIN_ROUTE)
                                localStorage.removeItem('token')
                            }}
                            className="mr-2"
                        >
                            Выйти
                        </Button>
                        <Button variant={'outline-light'}
                            // onClick={() => {}}
                        >
                            <NavLink 
                                to={ADMIN_ROUTE}
                                style={{color: 'white'}}
                            >
                                Админка
                            </NavLink>
                        </Button>
                    </Nav>
                    :
                    <Nav>
                        <Button variant={'outline-light'}
                            onClick={() => {
                                navigate(LOGIN_ROUTE)
                            }}
                        >
                            Войти
                        </Button>
                    </Nav>
                }

            </Container>
        </Navbar>
    );
});

export default NavBar;