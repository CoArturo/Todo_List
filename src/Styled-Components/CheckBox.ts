import styled from "styled-components";

// Pruebas
export const Checkbox2 = styled.input`
    border-radius: 50%;
    background-color: red;
    cursor: pointer;
    display: none;
    border: none;


    &:checked + Label::before{
        background-color: red;
    }    
`

export const Label2 = styled.label`

    
    &::before{
        content: "";
        border: none;
        border-radius: 50%;
        width: 15px;
        height: 15px;
        float: left;
        margin: 0.3em 0.5em 0 0;
        background: #fff;
    }
`

export const Li = styled.li`
    list-style: none;
    height: 50px;
    display: flex;
    justify-content: left;
    align-items: center;
`