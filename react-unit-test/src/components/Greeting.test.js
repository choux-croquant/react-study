import Greeting from './Greeting';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Greeting component', () => {
  test('renders Greeting as a text', () => {
    // Arrange
    render(<Greeting />);

    // Act
    // Assert - screen을 통해 가상 스크린에 렌더, getByText로 특정 문자열 확인
    const greetingElement = screen.getByText('Greeting!');
    // 요소가 HTMLDocument에 존재하는지 확인하기
    expect(greetingElement).toBeInTheDocument();
  });

  test('renders "1" you if the button was NOT clicked', () => {
    render(<Greeting />);

    const outputElement = screen.getByText('1', {exact: false});
    expect(outputElement).toBeInTheDocument();
  });

  test('renders "2" if the button was clicked', () => {
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    // Assert
    const outputElement = screen.getByText('2', {exact: false});
    expect(outputElement).toBeInTheDocument();
  });

  test('does not render "1" if the button was clicked', () => {
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    // Assert
    const outputElement = screen.queryByText('1', {exact: false});
    expect(outputElement).toBeNull();
  });
})
