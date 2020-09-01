import './Loading.css';
import styled from "styled-components";
import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingPage = styled.div`
  width: 100vw;
  height: 100vh;
  font-size: 5rem;
  text-align: center;
  color: royalblue;
  display: flex;
  align-items: center;
  justify-items: center;
`


const Loading = props => {
    return (
      <LoadingPage>
        <div className='m-auto'>
          <CircularProgress />
        </div>
      </LoadingPage>
    )
}
export default Loading;
