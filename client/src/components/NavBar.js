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
        <Navbar bg="dark" variant="dark" className='mb-2' expand="lg">
            <Container fluid>
                <Navbar.Brand>
                    {user.isAuth ? 
                        <span>{user.user.username}</span>
                        : 'MyNotes'
                    }
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                {/* <NavLink 
                    style={{color: 'white'}}
                    to={MAIN_ROUTE}
                >
                    {user.isAuth ? 
                        <span>{user.user.username}</span>
                        : 'MyNotes'
                    }
                </NavLink> */}
                {/* <Button variant={'outline-light'}
                    onClick={() => console.log(user.isAuth)}
                >
                    auth
                </Button>
                <Button variant={'outline-light'}
                    onClick={() => console.log(localStorage)}
                >
                    localstorage
                </Button> */}
                    {user.isAuth ?
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}
                        navbarScroll
                        >
                            <Nav.Link onClick={() => navigate(TO_DO_ROUTE)}>toDo</Nav.Link>
                            <Nav.Link onClick={() => navigate(TO_BUY_ROUTE)}>toBuy</Nav.Link>
                            <Nav.Link onClick={() => navigate(DONE_ROUTE)}>done</Nav.Link>
                        </Nav>
                        : <Nav></Nav>
                    }
                    {user.isAuth ?
                        <Nav>
                            <Nav.Link onClick={() => {
                                    user.setIsAuth(false)
                                    navigate(LOGIN_ROUTE)
                                    localStorage.removeItem('token')
                                }}
                            >
                                Выйти
                            </Nav.Link>
                                    {/* <Button variant={'outline-light'}
                                        className='ms-2'
                                        onClick={() => {
                                            user.setIsAuth(false)
                                            navigate(LOGIN_ROUTE)
                                            localStorage.removeItem('token')
                                        }}
                                    >
                                        Выйти
                                    </Button> */}
                        </Nav>
                        : <Nav>
                                    {/* <Button variant={'outline-light'}
                                        onClick={() => {
                                            navigate(LOGIN_ROUTE)
                                        }}
                                    >
                                        Войти
                                    </Button> */}
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;