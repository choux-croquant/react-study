import { render, screen } from '@testing-library/react';
import Async from './Async';

// 비동기 작업 테스팅
describe('Async component', () => {
  test('renders posts if request succeeds', async () => {
    // mock더미 함수를 활용하여 서버와의 테스트 의존성 줄이기
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{id: 'p1', title: 'First post'}]
    });

    render(<Async />)

    // getAllByRole -> useState를 선언할 때 정의한 빈 배열 상태에서 테스팅을 시작하므로 테스트가 실패한다.
    // const listItemElementsGet = screen.getAllByRole('listitem');
    // findAllByRole -> Promise를 반환하기 때문에 비동기 작업 시 평가가 완료될 때까지 컴포넌트를 재평가한다.
    const listItemElementsFind = await screen.findAllByRole('listitem');

    expect(listItemElementsFind).not.toHaveLength(0);
  })
})