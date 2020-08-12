import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Container = styled.div`
  display: block;
  max-width: 100%;
  @media only screen and (min-width: 567px) {
    margin-left: 10%;
    padding: 1rem;
  }
  @media only screen and (min-width: 1400px) {
    margin-left: 5%;
  }
`;

const Nav = styled.div`
  position: fixed;
  z-index: 1;
  width: minmax(auto, 5%);
  background: #303030;
  height: 100vh;
  @media only screen and (max-width: 567px) {
    position: absolute;
    bottom: 0;
  }
  @media only screen and (max-width: 567px) {
    width: 100vw;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const CustomNavLink = styled(NavLink)`
  display: flex;
  padding: 1rem;
  font-size: 3.5rem;
  filter: invert(50%);
  &:visited,
  &:link {
    text-decoration: none;
  }
  &:hover,
  &.active {
    filter: grayscale(30%);
    background: #151515;
    filter: invert(0%);
  }
  @media only screen and (max-width: 567px) {
    justify-content: center;
    font-size: 35px;
  }
  @media only screen and (max-height: 567px) {
    font-size: 25px;
  }
`;

const CustomLogo = styled.div`
  padding: 1rem;
  font-size: 4rem;
  display: flex;
  width: 100%;
  @media (max-width: 567px) {
    display: none;
  }
  @media only screen and (max-height: 567px) {
    font-size: 25px;
  }
`;

const LogoText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 0.3ch;
  color: white;
  display: inline;
  filter: grayscale(100%);
`;

const LinkText = styled.div`
  margin-left: 1rem;
  font-size: 30px;
  display: none;
  @media only screen and (min-width: 567px) {
    ${Nav}:hover & {
      display: block;
      filter: invert(0%);
      justify-content: flex-end;
    }
  }
`;
const TableWrap = styled.div`
  display: block;
  max-width: 100%;
  overflow: auto;
  scrollbar-width: thin;
  border-bottom: 1px solid black;
  &::-webkit-scrollbar {
    height: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background: grey;
  }

  &::-webkit-scrollbar-thumb {
    background: black;
  }
`;

const TableStyle = styled.div`
  table {
    font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    border-spacing: 0;

    :last-child td {
      border-bottom: 0;
    }

    th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: center;
      font-size: 20px;
      background-color: #303030;
      color: white;
    }

    td {
      margin: 0;
      padding: 0.5rem;
      border: 1px solid #ddd;
      width: 1%;
      &.collapse {
        width: 0.0000000001%;
      }
      :last-child {
        border-right: 0;
      }
      :hover {
        background-color: #e8e8e8;
      }
    }
    tr:nth-child(even) {
      background-color: #f0f0f0;
    }
    tr:hover {
      background-color: #f8f8f8;
    }
  }
`;

export {
  Container,
  Nav,
  CustomNavLink,
  CustomLogo,
  LogoText,
  LinkText,
  TableWrap,
  TableStyle,
};
