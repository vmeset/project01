import React, { useContext } from 'react';
import {Navbar, Container, Button, Nav} from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, TO_DO_ROUTE, TO_BUY_ROUTE, DONE_ROUTE } from '../utils/consts';
import {observer} from 'mobx-react-lite'

const NavBar = observer ( () => {

    const {user} = useContext(Context)
    const navigate = useNavigate()

    return (
        // <Navbar bg="dark" variant="dark">
        //     <Container>
        //         <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        //         <Nav className="me-auto">
        //             <Nav.Link href="#home">Home</Nav.Link>
        //             <Nav.Link href="#features">Features</Nav.Link>
        //             <Nav.Link href="#pricing">Pricing</Nav.Link>
        //         </Nav>
        //     </Container>
        // </Navbar>
        <Navbar bg="dark" variant="dark" className='mb-2'>
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
                <Button variant={'outline-light'}
                    onClick={() => console.log(user.isAuth)}
                >
                    auth
                </Button>
                <Button variant={'outline-light'}
                    onClick={() => console.log(localStorage)}
                >
                    localstorage
                </Button>
                {user.isAuth ?
                    <Nav>
                        <Button variant={'outline-light'}
                            onClick={() => navigate(TO_DO_ROUTE)}
                        >
                            toDo
                        </Button>
                        <Button variant={'outline-light'}
                            onClick={() => navigate(TO_BUY_ROUTE)}
                            className="mx-2"
                        >
                            toBuy
                        </Button>
                        <Button variant={'outline-light'}
                            onClick={() => navigate(DONE_ROUTE)}
                        >
                            done
                        </Button>
                    </Nav>
                    : <Nav></Nav>
                }
                
                {user.isAuth ?
                    <Nav>
                        {
                            user.user.role === "ADMIN" ? 
                            <Button variant={'outline-light'}
                            >
                                <NavLink 
                                    to={ADMIN_ROUTE}
                                    style={{color: 'white'}}
                                >
                                    Админка
                                </NavLink>
                            </Button>
                            : <Nav></Nav>
                        }
                        <Button variant={'outline-light'}
                            className='ms-2'
                            onClick={() => {
                                user.setIsAuth(false)
                                navigate(LOGIN_ROUTE)
                                localStorage.removeItem('token')
                            }}
                        >
                            Выйти
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