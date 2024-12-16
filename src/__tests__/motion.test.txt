import { Motion, MotionProps } from "motion-and-tween/motion";

describe("Motion", () => {
    it("should do some motion", () => {
        const props: MotionProps = {
            obj: {},
            propertyToChange: "blah",
            beginValue: 0,
            actionDuration: 1,
        };
        const motion = new Motion(props);
        expect(motion).toBeInstanceOf(Motion);
        expect(motion.toString()).toBe(
            'Motion[obj={}, prop="blah", _beginValue=0, _duration=1]',
        );
    });
});
