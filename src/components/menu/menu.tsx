import React from 'react';
import { NavLink } from 'react-router-dom'; 
import './menuStyle.css';
import { Button } from '@chakra-ui/react';

const MenuBar: React.FC = () => { 
    return (
        <div className="menu">
            <nav className="menu-bar">
                <ul className="menu-list">
                    <li> 
                        <Button className='button-menu'>
                        <NavLink
                            to="/cadastrar-sugestao" 
                            className='link-ativo'
                        >
                            Cadastrar Sugestão
                        </NavLink>
                        </Button>
                    </li>
                    <li>
                        <Button className='button-menu'>
                        <NavLink
                            to="/sugestao"
                            className='link-ativo'
                        >
                            Consultar Sugestões
                        </NavLink>
                        </Button>
                    </li>
                    <li>
                        <Button className='button-menu'>
                        <NavLink
                            to="/avaliacao"
                            className='link-ativo'
                        >
                            Consultar Avaliações
                        </NavLink>
                        </Button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default MenuBar; 