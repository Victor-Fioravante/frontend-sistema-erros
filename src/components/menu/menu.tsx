import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; 
import './menuStyle.css';
import { Button } from '@chakra-ui/react';



const MenuBar: React.FC = () => { 
    return (
        <div className="menu">
            <nav className="menu-bar">
                <ul className="menu-list">
                    <li className='list'> 
                        <NavLink
                            to="/cadastrar-sugestao" 
                            className='link-ativo'
                        >
                            <Button className='button-menu'>Cadastrar Sugestão</Button>
                        </NavLink>
                    </li>
                    <li className='list'>
                        
                        <NavLink
                            to="/sugestao"
                            className='link-ativo'
                        >
                            <Button className='button-menu'>Consultar Sugestões</Button>
                        </NavLink>
                        
                    </li>
                    <li>
                        
                        <NavLink
                            to="/avaliacao"
                            className='link-ativo'
                        >
                        <Button className='button-menu'>Consultar Avaliações</Button>    
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
        
        
    );
}

export default MenuBar; 