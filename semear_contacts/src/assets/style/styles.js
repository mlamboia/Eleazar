import styled from 'styled-components';
import { NavLink }  from 'react-router-dom'

const Container = styled.div
`
  display: flex;
  margin-left: 10vw;
  justify-content: center
`

const Nav = styled.div
`
  position: fixed;
  @media only screen and (max-width: 567px){
    position: absolute;
    bottom: 0;      
  }
  background: #303030;
  height: 100vh;
  @media only screen and (max-width: 567px){
    width: 100vw;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`

const CustomNavLink = styled(NavLink)
`
  display: flex;
  padding: 1rem;
  font-size: 3.5rem;
  filter: invert(50%);
  &:visited, &:link{
    text-decoration: none;
  }
  &:hover, &.active{
    filter: grayscale(30%);
    background: #151515;
    filter: invert(0%);
  }
  @media only screen and (max-width: 567px){
    justify-content: center;
    font-size: 35px;
  }
  @media only screen and (max-height: 567px){
    font-size: 25px
  }
`

const CustomLogo = styled.div
` 
  padding: 1rem;
  font-size: 4rem;
  display: flex;
  width: 100%;
  @media(max-width: 567px){
    display: none
  }
  @media only screen and (max-height: 567px){
    font-size: 25px
  }
`

const LogoText = styled.div
`
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 0.3ch;
  color: white;
  display: inline;
  filter: grayscale(100%);
`

const LinkText = styled.div
`
  margin-left: 1rem;
  font-size: 30px;
  display: none;
  @media only screen and (min-width: 567px) {
    ${Container}:hover & {
      display: block;
      filter: invert(0%);
      justify-content: flex-end;
    }
  }
`

const ReactTableStyle = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

export {
  Container,
  Nav,
  CustomNavLink,
  CustomLogo,
  LogoText,
  LinkText,
  ReactTableStyle
}