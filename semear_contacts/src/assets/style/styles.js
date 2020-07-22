import styled from 'styled-components';
import { Link }  from 'react-router-dom'

const Container = styled.div
`
  position: fixed;
  @media (max-width: 600px){
    position: absolute;
    bottom: 0;      
  }
`

const Nav = styled.div
`
  background: #303030;
  height: 100vh;
  @media(max-width: 600px){
    width: 100vw;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`

const NavLink = styled(Link)
`
  font-size: 2rem;
  display: flex;
  padding: 1rem;
  height: 5rem;
  width: 100%;
  filter: invert(50%);
  &:focus, &:visited, &:link, &:active{
    text-decoration: none;
  }
  &:hover{
    filter: grayscale(30%) opacity(1);
    background: #151515;
  }
  @media (max-width: 600px){
    justify-content: center;
  }
`

const CustomLogo = styled.div
` 
  font-size: 2rem;
  padding: 1rem;
  font-weight: bold;
  letter-spacing: 0.3ch;
  color: white;
  display: flex;
  width: 100%;
  @media(max-width: 600px){
    display: none
  }
`

const LogoText = styled.a
`
  display: inline;
  filter: grayscale(100%) opacity(0.7);
`

const LinkText = styled.div
`
  margin-left: 1rem;
  display: none;
  @media (min-width: 600px) {
    ${Container}:hover & {
      display: block;
      filter: grayscale(0%) opacity(1);
    }
  }
`

export {
  Container,
  Nav,
  NavLink,
  CustomLogo,
  LogoText,
  LinkText
}