import * as React from 'react';

import Typography from '@mui/material/Typography';
import HeadTitle from "../components/HeadTitle";
import Button from "../components/CustomButtonComponent";
import Menu from "../components/Menu";
import styled from 'styled-components';
import Paper from '@mui/material/Paper';

export const Container = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  margin: 50px;
  border: .5px solid black;
  background-color: #D3D3D3;
`;

export const Item = styled(Paper)(() => ({
  padding: 1,
  textAlign: 'center',
}));

export default function Reservations() {
  return (
    <>
      <HeadTitle/>
      <Container>
        <Typography variant="h6" component="div">
          Selecione sua sala
        </Typography>
        <Menu/>
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
