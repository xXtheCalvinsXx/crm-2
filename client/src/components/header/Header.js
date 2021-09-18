import React from 'react';
import { Link } from 'react-router-dom';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import styled from 'styled-components';
import { connect } from 'react-redux';

function Header({ currentUser }) {
  return (
    <Container>{currentUser ? <MoreHorizIcon></MoreHorizIcon> : ''}</Container>
  );
}

const mapStateToProps = (state) => ({ currentUser: state.user.currentUser });

export default connect(mapStateToProps)(Header);

export const Container = styled.div`
  float: right;
  margin: 10px 10px;
`;
