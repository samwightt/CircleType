import styled from 'styled-components';

export interface CircleProps {
  size: number
}

const Circle = styled.div`
  background-color: red;
  border-radius: 100%;
  height: ${(props: CircleProps) => props.size}px;
  width: ${(props: CircleProps) => props.size}px;
  transition: 0.4s;
`

export { Circle }