import { RealWorldTimer } from "motion-and-tween/timing";

describe("Timer", () => {
    it("should test the timer", () => {
        const timer = new RealWorldTimer();
        expect(timer).toBeInstanceOf(RealWorldTimer);
        // jest.advanceTimersByTime(1000);
        // expect(ActionScriptTimer.getElapsedTime()).toBe(1000);
    });
});
