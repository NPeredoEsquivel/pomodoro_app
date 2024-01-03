import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  render,
  fireEvent,
  cleanup,
  screen,
  act,
} from "@testing-library/react";
import Main from "./Main";
import { Provider } from "react-redux";
import store from "../../../store/store";


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
    expect(screen.getByRole("button", { name: POMODORO })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: SHORT_BREAK })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: LONG_BREAK })
    ).toBeInTheDocument();
  });
});

describe("Triggering different button events", () => {
  beforeEach(() => {
    jest.useFakeTimers(); // set up fake timers
    jest.spyOn(global, "setInterval");
  });

  afterEach(() => {
    jest.useRealTimers(); // restore real timers
    cleanup(); // clean up any mounted components
  });
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
    fireEvent.click(pomodoroButton);
    const startButton = screen.getByRole("button", {
      name: "START",
    });

    //Moking the play button as this is not implemented in testing environments
    HTMLMediaElement.prototype.play = jest.fn();
    fireEvent.click(startButton);
    //Check if the sound reproduces.
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
    expect(setInterval).toHaveBeenCalledTimes(1);

    //Fastforward in time to check the timer after 1 minute .
    act(() => {
      jest.advanceTimersByTime(1 * 60 * 1000);
    });
    expect(screen.getByText("44:00")).toBeInTheDocument();
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

    const startButton = screen.getByRole("button", {
      name: "START",
    });

    //Moking the play button as this is not implemented in testing environments
    HTMLMediaElement.prototype.play = jest.fn();
    fireEvent.click(startButton);
    //Check if the sound reproduces.
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
    expect(setInterval).toHaveBeenCalledTimes(1);

    //Fastforward in time to check the timer after 1 minute .
    act(() => {
      jest.advanceTimersByTime(1 * 60 * 1000);
    });
    expect(screen.getByText("4:00")).toBeInTheDocument();

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
    const startButton = screen.getByRole("button", {
      name: "START",
    });

    //Moking the play button as this is not implemented in testing environments
    HTMLMediaElement.prototype.play = jest.fn();
    fireEvent.click(startButton);
    //Check if the sound reproduces.
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
    expect(setInterval).toHaveBeenCalledTimes(1);

    //Fastforward in time to check the timer after 1 minute .
    act(() => {
      jest.advanceTimersByTime(1 * 60 * 1000);
    });
    expect(screen.getByText("14:00")).toBeInTheDocument();

    //expect(longBreakButton).toHaveClass(`btn--active`);
  });
});
