import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from "../components/CustomButtonComponent";
import styled from 'styled-components';
import CustomAppBar from '../components/CustomAppBar';

export const Container = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  margin: 50px;
  border: .5px solid black;
  background-color: #D3D3D3;
`;

export default function Reservations() {
  return (
    <>
      <CustomAppBar title="Construção de Software" />
      <Container>
        <Typography variant="h6" color="inherit" component="div">
          Selecione sua sala
        </Typography>
      </Container>
      <h1>Colorful Custom Button Components</h1>
      <Button
        border="none"
        color="pink"
        height="200px"
        onClick={() => alert("You clicked on the pink circle!")}
        radius="50%"
        width="200px"
        children="I'm a pink circle!"
      />
    </>
  );
}
