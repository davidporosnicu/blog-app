import React from 'react';
import { shallow } from 'enzyme';
import { AddCommentForm } from '../../components/AddCommentForm';
import toJSON from 'enzyme-to-json';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

let mockAddNewCommentfn;
let wrapper;

beforeEach(() => {
  mockAddNewCommentfn = jest.fn();
});

describe('AddComment component', () => {
  beforeEach(() => {
    wrapper = shallow(<AddCommentForm addNewComment={mockAddNewCommentfn} postUuid="123" />);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should render AddNewComment correctly', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  describe('when the form is submitted', () => {
    it('should call the mock addNewComment function', () => {
      const state = { author: 'foo', text: 'bar', commentDate: new Date() };
      wrapper.setState(state);
      const event = {
        preventDefault() {}
      };
      wrapper.find('#addNewCommentForm').simulate('submit', event);
      expect(mockAddNewCommentfn).toHaveBeenCalledWith(
        {
          author: 'Foo',
          commentDate: state.commentDate,
          text: 'Bar'
        },
        '123'
      );
    });
    it('should reset state to default values', () => {
      const state = { author: 'john', text: 'new comment', commentDate: new Date() };
      wrapper.setState(state);
      const event = {
        preventDefault() {}
      };
      wrapper.find('#addNewCommentForm').simulate('submit', event);

      expect(wrapper.state()).toEqual({
        author: '',
        commentDate: state.commentDate,
        text: '',
        emptyAuthorError: false,
        emptyTextError: false
      });
    });

    it('should not submit form if author is empty', () => {
      const state = {
        author: '',
        commentDate: new Date(),
        text: 'some text',
        emptyAuthorError: false,
        emptyTextError: false
      };
      wrapper.setState(state);
      const event = {
        preventDefault() {}
      };
      wrapper.find('#addNewCommentForm').simulate('submit', event);
      expect(mockAddNewCommentfn).not.toHaveBeenCalled();
    });
    it('should not submit form if text is empty', () => {
      const state = {
        author: 'author',
        commentDate: new Date(),
        text: '',
        emptyAuthorError: false,
        emptyTextError: false
      };
      wrapper.setState(state);
      const event = {
        preventDefault() {}
      };
      wrapper.find('#addNewCommentForm').simulate('submit', event);
      expect(mockAddNewCommentfn).not.toHaveBeenCalled();
    });

    it('should set emptyAuthorError to true if author is empty', () => {
      const state = {
        author: '',
        commentDate: new Date(),
        text: '',
        emptyAuthorError: false,
        emptyTextError: false
      };
      wrapper.setState(state);
      const event = {
        preventDefault() {}
      };
      wrapper.find('#addNewCommentForm').simulate('submit', event);
      expect(wrapper.state().emptyAuthorError).toBe(true);
    });
    it('should set emptyTextError to true if text is empty', () => {
      const state = {
        author: '',
        commentDate: new Date(),
        text: '',
        emptyAuthorError: false,
        emptyTextError: false
      };
      wrapper.setState(state);
      const event = {
        preventDefault() {}
      };
      wrapper.find('#addNewCommentForm').simulate('submit', event);

      expect(wrapper.state().emptyTextError).toBe(true);
    });
  });
  describe('when input is changed', () => {
    it('should update state.author when author input is changed', () => {
      const state = {
        author: '',
        commentDate: new Date(),
        text: '',
        emptyAuthorError: false,
        emptyTextError: false
      };
      wrapper.setState(state);
      const value = 'john';
      const name = 'author';

      wrapper
        .find('input')
        .at(0)
        .simulate('change', { target: { name, value } });

      expect(wrapper.state('author')).toBe('john');
    });
    it('should update state.text when text area is changed', () => {
      const state = {
        author: '',
        commentDate: new Date(),
        text: '',
        emptyAuthorError: false,
        emptyTextError: false
      };
      wrapper.setState(state);
      const value = 'new comment';
      const name = 'text';

      wrapper
        .find('textarea')
        .at(0)
        .simulate('change', { target: { name, value } });

      expect(wrapper.state('text')).toBe('new comment');
      const mockchangeErrorState = jest.fn();
    });
  });
  describe('when changeErrorState() is called', () => {
    it('should set emptyAuthorError to false if author is not empty', () => {
      const state = {
        author: 'john',
        commentDate: new Date(),
        text: '',
        emptyAuthorError: false,
        emptyTextError: false
      };
      wrapper.setState(state);
      wrapper.instance().changeErrorState();
      expect(wrapper.state('emptyAuthorError')).toBe(false);
    });
    it('should not set emptyAuthorError to false if author is empty', () => {
      const state = {
        author: '',
        commentDate: new Date(),
        text: '',
        emptyAuthorError: true,
        emptyTextError: false
      };
      wrapper.setState(state);
      wrapper.instance().changeErrorState();
      expect(wrapper.state('emptyAuthorError')).toBe(true);
    });
    it('should set emptyTextError to false if text is not empty', () => {
      const state = {
        author: '',
        commentDate: new Date(),
        text: 'new comment',
        emptyAuthorError: false,
        emptyTextError: true
      };
      wrapper.setState(state);
      wrapper.instance().changeErrorState();
      expect(wrapper.state('emptyTextError')).toBe(false);
    });
    it('should not set emptyTextError to false if text is empty', () => {
      const state = {
        author: '',
        commentDate: new Date(),
        text: '',
        emptyAuthorError: false,
        emptyTextError: true
      };
      wrapper.setState(state);
      wrapper.instance().changeErrorState();
      expect(wrapper.state('emptyTextError')).toBe(true);
    });
  });
});
