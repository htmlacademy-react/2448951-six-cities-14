import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../utils/mock-component';
import {makeFakeStore, makeFakeOfferId, makeFakeReview} from '../../utils/mocks';
import ReviewsForm from './reviews-form';
import ReviewsItem from "./reviews-item";

describe('Component: ReviewsItem', () => {
  it('should render correctly', () => {
    const fakeStore = makeFakeStore({});
    const testId = 'reviews-item';
    const fakeReview = makeFakeReview();
    const { withStoreComponent } = withStore(withHistory(<ReviewsItem reviewData={fakeReview} />), fakeStore);

    render(withStoreComponent);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
