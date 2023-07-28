import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import Main from "./Main";
import { Provider } from "react-redux";
import store from "../../store/store";
import { prettyDOM } from "@testing-library/dom";

afterEach(() => {
  cleanup();
});

const TIMER_CONFIG = {};

const POMODORO = "Pomodoro";
const SHORT_BREAK = "Short Break";
const LONG_BREAK = "Long Break";

TIMER_CONFIG[POMODORO] = "45:00";
TIMER_CONFIG[SHORT_BREAK] = "5:00";
TIMER_CONFIG[LONG_BREAK] = "15:00";

describe("Testing the functionality on Main", () => {
  test("Checking different types of buttons on top of timer", () => {
    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Pomodoro" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Short Break" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Long Break" })
    ).toBeInTheDocument();
  });
});
describe("Triggering different button events", () => {
  test("Pomodoro active button", () => {
    render(
      <Provider store={store}>
        <Main handleBackgroundColor={mockHandler} />
      </Provider>
    );
    const pomodoroButton = screen.getByRole("button", {
      name: POMODORO,
    });
    expect(pomodoroButton).toHaveClass(`btn--active`);
    expect(screen.getByText(TIMER_CONFIG[POMODORO])).toBeInTheDocument();
  });
  const mockHandler = jest.fn();
  test("Testing Short Break button", () => {
    render(
      <Provider store={store}>
        <Main handleBackgroundColor={mockHandler} />
      </Provider>
    );
    const shortBreakButton = screen.getByRole("button", {
      name: SHORT_BREAK,
    });
    fireEvent.click(shortBreakButton);

    expect(screen.getByText(TIMER_CONFIG[SHORT_BREAK])).toBeInTheDocument();
    //expect(shortBreakButton).toHaveClass(`btn--active`);
  });

  test("Testing Long Break button", () => {
    render(
      <Provider store={store}>
        <Main handleBackgroundColor={mockHandler} />
      </Provider>
    );
    const longBreakButton = screen.getByRole("button", {
      name: LONG_BREAK,
    });
    fireEvent.click(longBreakButton);

    expect(screen.getByText(TIMER_CONFIG[LONG_BREAK])).toBeInTheDocument();
    //expect(longBreakButton).toHaveClass(`btn--active`);
  });
});
/*   describe("Testing timer", () => {});
  describe("Testing task list", () => {}); */
