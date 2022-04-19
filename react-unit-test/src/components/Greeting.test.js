import Greeting from './Greeting';
import { render, screen } from '@testing-library/react';

test('renders Greeting as a text', () => {
  // Arrange
  render(<Greeting />);

  // Act
  // Assert - screen을 통해 가상 스크린에 렌더, getByText로 특정 문자열 확인
  const greetingElement = screen.getByText('Greeting!');
  // 요소가 HTMLDocument에 존재하는지 확인하기
  expect(greetingElement).toBeInTheDocument();
});