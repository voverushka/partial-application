import styled from "styled-components";

const SimpleButton = styled.button`
    padding: 10px;
    background: white;
    margin-right: 10px;
    border-radius: 5px;
    font-size: 16px;
    color: inherit;
    &:hover {
        cursor: pointer;
        outline: black;
    }
    border: 1px solid lightgray;
    &:disabled {
        background: lightgray;
        cursor: not-allowed;
        color: black;
        outline: black;
    }
`;

const SimpleInput = styled.input`
    padding: 7px;
    margin-bottom: 10px;
    borderRadius: 5px;
    border: 1px solid lightgray;
`;

const SimpleSelect = styled.select`
    padding: 7px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid lightgray;
`;

const FormContent = styled.div`
    display: flex;
    flex-direction: column;
`;

const AddTaskSection = styled.div`
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
        flex: 0.9;
        margin-bottom: 0;
    }
`;

const DetailsSection = styled.details`
    margin-top: 20px;
    font-size: 16px;
`;

// Form
const Header = styled.header`
    h3, h5 {
        margin: 5px;
    }
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid lightgray;
`;

const Footer = styled.footer`
    padding: 15px;
    display: flex;
    justify-content: end;
    align-items: center;
    border-top: 1px solid lightgray;
`;


const Content = styled.div`
    flex: 1;
    background: white;
    padding: 15px;
`;

const Card = styled.div`
    position: relative;
    margin: 0 20px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    width: 30vw;
    min-width: 300px;
    height: 100%;
    background: white;
    border: 1px solid lightgray;
`;

const Container = styled.div`
    display: flex;
    flow-direction: row;
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
    li {
        padding: 5px;
    }
`;

export default {
    SimpleButton,
    SimpleInput,
    SimpleSelect,
    DetailsSection,
    AddTaskSection,
    FormContent,
    Card,
    Content,
    Footer,
    Header,
    Container,
    List
}
