/**
 * @jest-environment jsdom
 */

import PracticeJestTest from "./practiceJest";


describe("Home", () => {
  it("renders a heading", async () => {
    const data = await PracticeJestTest();
    expect(data.name).not.toBeNull();
  });
});
