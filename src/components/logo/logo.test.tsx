import { render, screen} from '@testing-library/react';
import Logo from "./logo";
import {configureMockStore} from "@jedmao/redux-mock-store";
import {makeFakeStore} from "../../utils/mocks";
import {createMemoryHistory} from "history";
import {AppRoute} from "../../const";
import HistoryRouter from "../history-router/history-router";

const mockStore = configureMockStore();

const history = createMemoryHistory();

const fakeApp = (
  <HistoryRouter history={history}>
    <Logo />
  </HistoryRouter>);

describe('Component: Logo', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Main);
    render(fakeApp);
    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });
});
