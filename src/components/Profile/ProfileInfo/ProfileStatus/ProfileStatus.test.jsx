import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  test("Status from props should by in the state", () => {
    const component = create(<ProfileStatus status="Hello" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("Hello");
  });
  test("After creation <span> displayed", () => {
    const component = create(<ProfileStatus status="Hello" />);
    const root = component.root;
    const span = root.findByType("span");
    expect(span).not.toBeNull();
  });
  test("After creation <span> shuld contains correct status", () => {
    const component = create(<ProfileStatus status="Hello" />);
    const root = component.root;
    const span = root.findByType("span");
    expect(span.children[0]).toBe("Hello");
  });
  test("After creation <input> shuldn't be displayed", () => {
    const component = create(<ProfileStatus status="Hello" />);
    const root = component.root;
    expect(() => {
      const input = root.findByType("input");
    }).toThrow();
  });
  test("Input shulde be displayed in editMode", () => {
    const component = create(<ProfileStatus status="Hello" />);
    const root = component.root;
    const span = root.findByType("span");
    span.props.onClick();
    const input = root.findByType("input");
    expect(input.props.value).toBe("Hello");
  });
  test("callback should be colled", () => {
    const mokCallBack = jest.fn();
    const component = create(
      <ProfileStatus status="Hello" updateStatus={mokCallBack} />
    );
    const instance = component.getInstance();
    instance.deactivateedit();

    expect(mokCallBack.mock.calls.length).toBe(1);
  });
});
