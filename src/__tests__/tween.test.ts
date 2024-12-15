import { MotionProps } from "../motion/Motion";
import { TweenChangeProps } from "../tween/Tween";
import LinearTween from "../tween/linear/LinearTween";
import {
    EaseInCircularTween,
    EaseOutCircularTween,
    EaseInOutCircularTween,
} from "../tween/circular/";
import {
    EaseInCubicTween,
    EaseOutCubicTween,
    EaseInOutCubicTween,
} from "../tween/cubic";
import {
    EaseInExponentialTween,
    EaseOutExponentialTween,
    EaseInOutExponentialTween,
} from "../tween/exponential";
import {
    EaseInQuadraticTween,
    EaseOutQuadraticTween,
    EaseInOutQuadraticTween,
} from "../tween/quadratic";
import {
    EaseInQuarticTween,
    EaseOutQuarticTween,
    EaseInOutQuarticTween,
} from "../tween/quartic";
import {
    EaseOutQuinticTween,
    EaseInQuinticTween,
    EaseInOutQuinticTween,
} from "../tween/quintic";
import {
    EaseInSinusoidalTween,
    EaseOutSinusoidalTween,
    EaseInOutSinusoidalTween,
} from "../tween/sinusoidal";

// Duration should be 1000 / frameRate
describe("Tween", () => {
    class Rectangle {
        public x: number = 5;
        public y: number = 10;
        public w: number = 50;
        public h: number = 50;
        public toString = () => {
            return `Rectangle[x=${this.x}, y=${this.y}, w=${this.w}, h=${this.h}]`;
        };
    }

    it("should setParams", () => {
        let rect: Rectangle = new Rectangle();
        let mp: MotionProps = {
            obj: rect,
            propertyToChange: "x",
            beginValue: 10,
            actionDuration: 1,
        };
        let tp: TweenChangeProps = {
            ...mp,
            valueChange: 12,
        };
        let linearTween: LinearTween = new LinearTween(tp);
        expect(linearTween.getTime()).toBe(0);
        const {
            lastT,
            nextT,
            actionDuration: duration,
            beginValue,
            valueChange,
        } = linearTween.expandParams({ t: 1 });
        expect(lastT).toBe(0);
        expect(nextT).toBe(1);
        expect(duration).toBe(1);
        expect(beginValue).toBe(10);
        expect(valueChange).toBe(12);
    });

    describe("Linear Tweening algorithm", () => {
        it("should tween linearly", () => {
            let rect: Rectangle = new Rectangle();
            let mp: MotionProps = {
                obj: rect,
                propertyToChange: "x",
                beginValue: 5,
                actionDuration: 10,
            };
            let tp: TweenChangeProps = {
                ...mp,
                valueChange: 10,
            };
            let linearTween: LinearTween = new LinearTween(tp);
            expect(linearTween).toBeDefined();
            expect(linearTween.toString()).toBe(
                'Tween[Motion[obj={"x":5,"y":10,"w":50,"h":50}, prop="x", _beginValue=5, _duration=10], funcName: LinearTween, _valueChange: 10, _finishValue: 15, isComplete: false]',
            );
            expect(rect.toString()).toBe("Rectangle[x=5, y=10, w=50, h=50]");
            let r;
            r = linearTween.update({ t: 1 });
            expect(r.x).toBe(6);
            r = linearTween.update({ t: 2 });
            expect(r.x).toBe(7);
            r = linearTween.update({ t: 5 });
            expect(r.x).toBe(10);
            r = linearTween.update({ t: 11 });
            expect(r.x).toBe(15);
        });
        it("should automatically update time, internally", () => {
            let rect: Rectangle = new Rectangle();
            let mp: MotionProps = {
                obj: rect,
                propertyToChange: "x",
                beginValue: 5,
                actionDuration: 10,
            };
            let tp: TweenChangeProps = {
                ...mp,
                valueChange: 10,
            };
            let linearTween: LinearTween = new LinearTween(tp);
            expect(linearTween).toBeDefined();
            expect(linearTween.toString()).toBe(
                'Tween[Motion[obj={"x":5,"y":10,"w":50,"h":50}, prop="x", _beginValue=5, _duration=10], funcName: LinearTween, _valueChange: 10, _finishValue: 15, isComplete: false]',
            );
            expect(rect.toString()).toBe("Rectangle[x=5, y=10, w=50, h=50]");
            let r;
            r = linearTween.update();
            // expect(r.x).toBe(6);
            r = linearTween.update();
            // expect(r.x).toBe(7);
            r = linearTween.update();
            expect(r.x).toBe(8);
            r = linearTween.update();
            expect(r.x).toBe(9);
        });
    });
    describe("Circular Tweening algorithms", () => {
        it("should do an ease-in circular tween", () => {
            let rect: Rectangle = new Rectangle();
            let mp: MotionProps = {
                obj: rect,
                propertyToChange: "x",
                beginValue: 5,
                actionDuration: 10,
            };
            let tp: TweenChangeProps = {
                ...mp,
                valueChange: 10,
            };
            let easeInCircularTween: EaseInCircularTween =
                new EaseInCircularTween(tp);
            expect(easeInCircularTween).toBeDefined();
            expect(easeInCircularTween.toString()).toBe(
                'Tween[Motion[obj={"x":5,"y":10,"w":50,"h":50}, prop="x", _beginValue=5, _duration=10], funcName: EaseInCircularTween, _valueChange: 10, _finishValue: 15, isComplete: false]',
            );
            expect(rect.toString()).toBe("Rectangle[x=5, y=10, w=50, h=50]");

            let r;
            r = easeInCircularTween.update({ t: 1 }) as Rectangle;
            expect(r.x).toBe(5.050125628933801);
            r = easeInCircularTween.update({ t: 2 }) as Rectangle; // , true) as Rectangle;
            expect(r.x).toBeCloseTo(5.2020410288672885);
            r = easeInCircularTween.update({ t: 5 }) as Rectangle;
            expect(r.x).toBe(6.3397459621556145);
            r = easeInCircularTween.update({ t: 9 }) as Rectangle;
            expect(r.x).toBe(10.641101056459327);
            r = easeInCircularTween.update({ t: 11 }) as Rectangle;
            expect(r.x).toBe(15);
        });
        it("should do an ease-out circular tween", () => {
            let rect: Rectangle = new Rectangle();
            let mp: MotionProps = {
                obj: rect,
                propertyToChange: "x",
                beginValue: 5,
                actionDuration: 10,
            };
            let tp: TweenChangeProps = {
                ...mp,
                valueChange: 10,
            };
            let easeOutCircularTween: EaseOutCircularTween =
                new EaseOutCircularTween(tp);
            expect(easeOutCircularTween).toBeDefined();
            expect(easeOutCircularTween.toString()).toBe(
                'Tween[Motion[obj={"x":5,"y":10,"w":50,"h":50}, prop="x", _beginValue=5, _duration=10], funcName: EaseOutCircularTween, _valueChange: 10, _finishValue: 15, isComplete: false]',
            );
            expect(rect.toString()).toBe("Rectangle[x=5, y=10, w=50, h=50]");

            let r;
            r = easeOutCircularTween.update({ t: 1 }) as Rectangle;
            expect(r.x).toBeCloseTo(5.01);
            r = easeOutCircularTween.update({ t: 2 }) as Rectangle; // , true) as Rectangle;
            expect(r.x).toBeCloseTo(5.08);
            r = easeOutCircularTween.update({ t: 5 }) as Rectangle;
            expect(r.x).toBeCloseTo(6.25);
            r = easeOutCircularTween.update({ t: 9 }) as Rectangle;
            expect(r.x).toBeCloseTo(12.29);
            r = easeOutCircularTween.update({ t: 11 }) as Rectangle;
            expect(r.x).toBe(15);
        });
        // TODO: Additional verification ?
        it("should do an ease-in-out circular tween", () => {
            let rect: Rectangle = new Rectangle();
            let mp: MotionProps = {
                obj: rect,
                propertyToChange: "x",
                beginValue: 5,
                actionDuration: 10,
            };
            let tp: TweenChangeProps = {
                ...mp,
                valueChange: 10,
            };
            let easeInOutCircularTween: EaseInOutCircularTween =
                new EaseInOutCircularTween(tp);
            expect(easeInOutCircularTween).toBeDefined();
            expect(easeInOutCircularTween.toString()).toBe(
                'Tween[Motion[obj={"x":5,"y":10,"w":50,"h":50}, prop="x", _beginValue=5, _duration=10], funcName: EaseInOutCircularTween, _valueChange: 10, _finishValue: 15, isComplete: false]',
            );
            expect(rect.toString()).toBe("Rectangle[x=5, y=10, w=50, h=50]");

            let r;
            r = easeInOutCircularTween.update({ t: 1 }) as Rectangle;
            expect(r.x).toBeCloseTo(5.101);
            r = easeInOutCircularTween.update({ t: 2 }) as Rectangle; // , true) as Rectangle;
            expect(r.x).toBeCloseTo(5.417);
            r = easeInOutCircularTween.update({ t: 5 }) as Rectangle;
            expect(r.x).toBeCloseTo(10);
            r = easeInOutCircularTween.update({ t: 9 }) as Rectangle;
            expect(r.x).toBeCloseTo(14.899);
            r = easeInOutCircularTween.update({ t: 11 }) as Rectangle;
            expect(r.x).toBe(15);
        });
    });
    describe("Cubic Tweening algorithms", () => {
        it("should do an ease-in cubic tween", () => {
            let rect: Rectangle = new Rectangle();
            let mp: MotionProps = {
                obj: rect,
                propertyToChange: "x",
                beginValue: 5,
                actionDuration: 10,
            };
            let tp: TweenChangeProps = {
                ...mp,
                valueChange: 10,
            };
            let easeInCubicTween: EaseInCubicTween = new EaseInCubicTween(tp);
            expect(easeInCubicTween).toBeDefined();
            expect(easeInCubicTween.toString()).toBe(
                'Tween[Motion[obj={"x":5,"y":10,"w":50,"h":50}, prop="x", _beginValue=5, _duration=10], funcName: EaseInCubicTween, _valueChange: 10, _finishValue: 15, isComplete: false]',
            );
            expect(rect.toString()).toBe("Rectangle[x=5, y=10, w=50, h=50]");

            let r;
            r = easeInCubicTween.update({ t: 1 }) as Rectangle;
            expect(r.x).toBeCloseTo(5.01);
            r = easeInCubicTween.update({ t: 2 }) as Rectangle; // , true) as Rectangle;
            expect(r.x).toBeCloseTo(5.08);
            r = easeInCubicTween.update({ t: 5 }) as Rectangle;
            expect(r.x).toBeCloseTo(6.25);
            r = easeInCubicTween.update({ t: 9 }) as Rectangle;
            expect(r.x).toBeCloseTo(12.29);
            r = easeInCubicTween.update({ t: 11 }) as Rectangle;
            expect(r.x).toBe(15);
        });
        it("should do an ease-out cubic tween", () => {
            let rect: Rectangle = new Rectangle();
            let mp: MotionProps = {
                obj: rect,
                propertyToChange: "x",
                beginValue: 5,
                actionDuration: 10,
            };
            let tp: TweenChangeProps = {
                ...mp,
                valueChange: 10,
            };
            let easeOutCubicTween: EaseOutCubicTween = new EaseOutCubicTween(
                tp,
            );
            expect(easeOutCubicTween).toBeDefined();
            expect(rect.toString()).toBe("Rectangle[x=5, y=10, w=50, h=50]");

            expect(easeOutCubicTween.toString()).toBe(
                'Tween[Motion[obj={"x":5,"y":10,"w":50,"h":50}, prop="x", _beginValue=5, _duration=10], funcName: EaseOutCubicTween, _valueChange: 10, _finishValue: 15, isComplete: false]',
            );
            let r;
            r = easeOutCubicTween.update({ t: 1 }) as Rectangle;
            expect(r.x).toBeCloseTo(7.71);
            r = easeOutCubicTween.update({ t: 2 }) as Rectangle; // , true) as Rectangle;
            expect(r.x).toBeCloseTo(9.88);
            r = easeOutCubicTween.update({ t: 5 }) as Rectangle;
            expect(r.x).toBeCloseTo(13.75);
            r = easeOutCubicTween.update({ t: 9 }) as Rectangle;
            expect(r.x).toBeCloseTo(14.99);
            r = easeOutCubicTween.update({ t: 11 }) as Rectangle;
            expect(r.x).toBe(15);
        });
        it("should do an ease-in-out cubic tween", () => {
            let rect: Rectangle = new Rectangle();
            let mp: MotionProps = {
                obj: rect,
                propertyToChange: "x",
                beginValue: 5,
                actionDuration: 10,
            };
            let tp: TweenChangeProps = {
                ...mp,
                valueChange: 10,
            };
            let easeInOutCubicTween: EaseInOutCubicTween =
                new EaseInOutCubicTween(tp);
            expect(easeInOutCubicTween).toBeDefined();
            expect(easeInOutCubicTween.toString()).toBe(
                'Tween[Motion[obj={"x":5,"y":10,"w":50,"h":50}, prop="x", _beginValue=5, _duration=10], funcName: EaseInOutCubicTween, _valueChange: 10, _finishValue: 15, isComplete: false]',
            );
            expect(rect.toString()).toBe("Rectangle[x=5, y=10, w=50, h=50]");

            let r;
            r = easeInOutCubicTween.update({ t: 1 }) as Rectangle;
            expect(r.x).toBeCloseTo(5.04);
            r = easeInOutCubicTween.update({ t: 2 }) as Rectangle; // , true) as Rectangle;
            expect(r.x).toBeCloseTo(5.32);
            r = easeInOutCubicTween.update({ t: 5 }) as Rectangle;
            expect(r.x).toBeCloseTo(10);
            r = easeInOutCubicTween.update({ t: 9 }) as Rectangle;
            expect(r.x).toBeCloseTo(14.96);
            r = easeInOutCubicTween.update({ t: 11 }) as Rectangle;
            expect(r.x).toBe(15);
        });
    });
    describe("Exponential Tweening algorithms", () => {
        it("should do an ease-in exponential tween", () => {
            let rect: Rectangle = new Rectangle();
            let mp: MotionProps = {
                obj: rect,
                propertyToChange: "x",
                beginValue: 5,
                actionDuration: 10,
            };
            let tp: TweenChangeProps = {
                ...mp,
                valueChange: 10,
            };
            let easeInExponentialTween: EaseInExponentialTween =
                new EaseInExponentialTween(tp);
            expect(easeInExponentialTween).toBeDefined();
            expect(easeInExponentialTween.toString()).toBe(
                'Tween[Motion[obj={"x":5,"y":10,"w":50,"h":50}, prop="x", _beginValue=5, _duration=10], funcName: EaseInExponentialTween, _valueChange: 10, _finishValue: 15, isComplete: false]',
            );
            expect(rect.toString()).toBe("Rectangle[x=5, y=10, w=50, h=50]");

            let r;
            r = easeInExponentialTween.update({ t: 1 }) as Rectangle;
            expect(r.x).toBeCloseTo(5.0195);
            r = easeInExponentialTween.update({ t: 2 }) as Rectangle; // , true) as Rectangle;
            expect(r.x).toBeCloseTo(5.04);
            r = easeInExponentialTween.update({ t: 5 }) as Rectangle;
            expect(r.x).toBeCloseTo(5.31);
            r = easeInExponentialTween.update({ t: 6 }) as Rectangle;
            expect(r.x).toBeCloseTo(5.625);
            r = easeInExponentialTween.update({ t: 7 }) as Rectangle;
            expect(r.x).toBeCloseTo(6.25);
            r = easeInExponentialTween.update({ t: 8 }) as Rectangle;
            expect(r.x).toBeCloseTo(7.5);
            r = easeInExponentialTween.update({ t: 9 }) as Rectangle;
            expect(r.x).toBeCloseTo(10);
            r = easeInExponentialTween.update({ t: 11 }) as Rectangle;
            expect(r.x).toBe(15);
        });

        it("should do an ease-out exponential tween", () => {
            let rect: Rectangle = new Rectangle();
            let mp: MotionProps = {
                obj: rect,
                propertyToChange: "x",
                beginValue: 5,
                actionDuration: 10,
            };
            let tp: TweenChangeProps = {
                ...mp,
                valueChange: 10,
            };
            let easeOutExponentialTween: EaseOutExponentialTween =
                new EaseOutExponentialTween(tp);
            expect(easeOutExponentialTween).toBeDefined();
            expect(easeOutExponentialTween.toString()).toBe(
                'Tween[Motion[obj={"x":5,"y":10,"w":50,"h":50}, prop="x", _beginValue=5, _duration=10], funcName: EaseOutExponentialTween, _valueChange: 10, _finishValue: 15, isComplete: false]',
            );
            expect(rect.toString()).toBe("Rectangle[x=5, y=10, w=50, h=50]");

            let r;
            r = easeOutExponentialTween.update({ t: 1 }) as Rectangle;
            expect(r.x).toBeCloseTo(10);
            r = easeOutExponentialTween.update({ t: 2 }) as Rectangle; // , true) as Rectangle;
            expect(r.x).toBeCloseTo(12.5);
            r = easeOutExponentialTween.update({ t: 5 }) as Rectangle;
            expect(r.x).toBeCloseTo(14.6875);
            r = easeOutExponentialTween.update({ t: 9 }) as Rectangle;
            expect(r.x).toBeCloseTo(14.98);
            r = easeOutExponentialTween.update({ t: 11 }) as Rectangle;
            expect(r.x).toBe(15);
        });

        it("should do an ease-in-out exponential tween", () => {
            let rect: Rectangle = new Rectangle();
            let mp: MotionProps = {
                obj: rect,
                propertyToChange: "x",
                beginValue: 5,
                actionDuration: 10,
            };
            let tp: TweenChangeProps = {
                ...mp,
                valueChange: 10,
            };
            let easeInOutExponentialTween: EaseInOutExponentialTween =
                new EaseInOutExponentialTween(tp);
            expect(easeInOutExponentialTween).toBeDefined();
            let returnedObj = easeInOutExponentialTween.getObj();
            expect(returnedObj).toBeDefined();
            expect(easeInOutExponentialTween.toString()).toBe(
                'Tween[Motion[obj={"x":5,"y":10,"w":50,"h":50}, prop="x", _beginValue=5, _duration=10], funcName: EaseInOutExponentialTween, _valueChange: 10, _finishValue: 15, isComplete: false]',
            );
            expect(rect.toString()).toBe("Rectangle[x=5, y=10, w=50, h=50]");

            let r;
            r = easeInOutExponentialTween.update({ t: 1 }) as Rectangle;
            expect(r.x).toBeCloseTo(5.0195);
            r = easeInOutExponentialTween.update({ t: 2 }) as Rectangle; // , true) as Rectangle;
            expect(r.x).toBeCloseTo(5.078);
            r = easeInOutExponentialTween.update({ t: 5 }) as Rectangle;
            expect(r.x).toBeCloseTo(10);
            r = easeInOutExponentialTween.update({ t: 6 }) as Rectangle;
            expect(r.x).toBeCloseTo(13.75);
            r = easeInOutExponentialTween.update({ t: 7 }) as Rectangle;
            expect(r.x).toBeCloseTo(14.6875);
            r = easeInOutExponentialTween.update({ t: 8 }) as Rectangle;
            expect(r.x).toBeCloseTo(14.921875);
            r = easeInOutExponentialTween.update({ t: 9 }) as Rectangle;
            expect(r.x).toBeCloseTo(14.98);
            r = easeInOutExponentialTween.update({ t: 10 }) as Rectangle;
            expect(r.x).toBeCloseTo(15);
            r = easeInOutExponentialTween.update({ t: 11 }) as Rectangle;
            expect(r.x).toBe(15);
        });
    });
    describe("Quadratic Tweening algorithms", () => {
        it("should do an ease-in quadratic tween", () => {
            let rect: Rectangle = new Rectangle();
            let mp: MotionProps = {
                obj: rect,
                propertyToChange: "x",
                beginValue: 5,
                actionDuration: 10,
            };
            let tp: TweenChangeProps = {
                ...mp,
                valueChange: 10,
            };
            let easeInQuadraticTween: EaseInQuadraticTween =
                new EaseInQuadraticTween(tp);
            expect(easeInQuadraticTween).toBeDefined();
            let returnedObj = easeInQuadraticTween.getObj();
            expect(returnedObj).toBeDefined();
            expect(easeInQuadraticTween.toString()).toBe(
                'Tween[Motion[obj={"x":5,"y":10,"w":50,"h":50}, prop="x", _beginValue=5, _duration=10], funcName: EaseInQuadraticTween, _valueChange: 10, _finishValue: 15, isComplete: false]',
            );
            expect(rect.toString()).toBe("Rectangle[x=5, y=10, w=50, h=50]");

            let r;
            r = easeInQuadraticTween.update({ t: 1 }) as Rectangle;
            expect(r.x).toBeCloseTo(5.1);
            r = easeInQuadraticTween.update({ t: 2 }) as Rectangle; // , true) as Rectangle;
            expect(r.x).toBeCloseTo(5.4);
            r = easeInQuadraticTween.update({ t: 5 }) as Rectangle;
            expect(r.x).toBeCloseTo(7.5);
            r = easeInQuadraticTween.update({ t: 9 }) as Rectangle;
            expect(r.x).toBeCloseTo(13.1);
            r = easeInQuadraticTween.update({ t: 11 }) as Rectangle;
            expect(r.x).toBe(15);
        });

        it("should do an ease-out quadratic tween", () => {
            let rect: Rectangle = new Rectangle();
            let mp: MotionProps = {
                obj: rect,
                propertyToChange: "x",
                beginValue: 5,
                actionDuration: 10,
            };
            let tp: TweenChangeProps = {
                ...mp,
                valueChange: 10,
            };
            let easeOutQuadraticTween: EaseOutQuadraticTween =
                new EaseOutQuadraticTween(tp);
            expect(easeOutQuadraticTween).toBeDefined();
            let returnedObj = easeOutQuadraticTween.getObj();
            expect(returnedObj).toBeDefined();
            expect(easeOutQuadraticTween.toString()).toBe(
                'Tween[Motion[obj={"x":5,"y":10,"w":50,"h":50}, prop="x", _beginValue=5, _duration=10], funcName: EaseOutQuadraticTween, _valueChange: 10, _finishValue: 15, isComplete: false]',
            );
            expect(rect.toString()).toBe("Rectangle[x=5, y=10, w=50, h=50]");

            let r;
            r = easeOutQuadraticTween.update({ t: 1 }) as Rectangle;
            expect(r.x).toBeCloseTo(6.9);
            r = easeOutQuadraticTween.update({ t: 2 }) as Rectangle; // , true) as Rectangle;
            expect(r.x).toBeCloseTo(8.6);
            r = easeOutQuadraticTween.update({ t: 5 }) as Rectangle;
            expect(r.x).toBeCloseTo(12.5);
            r = easeOutQuadraticTween.update({ t: 9 }) as Rectangle;
            expect(r.x).toBeCloseTo(14.9);
            r = easeOutQuadraticTween.update({ t: 11 }) as Rectangle;
            expect(r.x).toBe(15);
        });
        it("should do an ease-in-out quadratic tween", () => {
            let rect: Rectangle = new Rectangle();
            let mp: MotionProps = {
                obj: rect,
                propertyToChange: "x",
                beginValue: 5,
                actionDuration: 10,
            };
            let tp: TweenChangeProps = {
                ...mp,
                valueChange: 10,
            };
            let easeInOutQuadraticTween: EaseInOutQuadraticTween =
                new EaseInOutQuadraticTween(tp);
            expect(easeInOutQuadraticTween).toBeDefined();
            let returnedObj = easeInOutQuadraticTween.getObj();
            expect(returnedObj).toBeDefined();
            expect(easeInOutQuadraticTween.toString()).toBe(
                'Tween[Motion[obj={"x":5,"y":10,"w":50,"h":50}, prop="x", _beginValue=5, _duration=10], funcName: EaseInOutQuadraticTween, _valueChange: 10, _finishValue: 15, isComplete: false]',
            );
            expect(rect.toString()).toBe("Rectangle[x=5, y=10, w=50, h=50]");

            let r;
            r = easeInOutQuadraticTween.update({ t: 1 }) as Rectangle;
            expect(r.x).toBeCloseTo(5.2);
            r = easeInOutQuadraticTween.update({ t: 2 }) as Rectangle; // , true) as Rectangle;
            expect(r.x).toBeCloseTo(5.8);
            r = easeInOutQuadraticTween.update({ t: 5 }) as Rectangle;
            expect(r.x).toBeCloseTo(10);
            r = easeInOutQuadraticTween.update({ t: 9 }) as Rectangle;
            expect(r.x).toBeCloseTo(14.8);
            r = easeInOutQuadraticTween.update({ t: 11 }) as Rectangle;
            expect(r.x).toBe(15);
        });
    });
    describe("Quartic Tweening algorithms", () => {
        it("should do an ease-in quartic tween", () => {
            let rect: Rectangle = new Rectangle();
            let mp: MotionProps = {
                obj: rect,
                propertyToChange: "x",
                beginValue: 5,
                actionDuration: 10,
            };
            let tp: TweenChangeProps = {
                ...mp,
                valueChange: 10,
            };
            let easeInQuarticTween: EaseInQuarticTween = new EaseInQuarticTween(
                tp,
            );
            expect(easeInQuarticTween).toBeDefined();
            let returnedObj = easeInQuarticTween.getObj();
            expect(returnedObj).toBeDefined();
            expect(easeInQuarticTween.toString()).toBe(
                'Tween[Motion[obj={"x":5,"y":10,"w":50,"h":50}, prop="x", _beginValue=5, _duration=10], funcName: EaseInQuarticTween, _valueChange: 10, _finishValue: 15, isComplete: false]',
            );
            expect(rect.toString()).toBe("Rectangle[x=5, y=10, w=50, h=50]");

            let r;
            r = easeInQuarticTween.update({ t: 1 }) as Rectangle;
            expect(r.x).toBeCloseTo(5.001);
            r = easeInQuarticTween.update({ t: 2 }) as Rectangle; // , true) as Rectangle;
            expect(r.x).toBeCloseTo(5.016);
            r = easeInQuarticTween.update({ t: 5 }) as Rectangle;
            expect(r.x).toBeCloseTo(5.625);
            r = easeInQuarticTween.update({ t: 9 }) as Rectangle;
            expect(r.x).toBeCloseTo(11.561);
            r = easeInQuarticTween.update({ t: 11 }) as Rectangle;
            expect(r.x).toBe(15);
        });

        it("should do an ease-out quartic tween", () => {
            let rect: Rectangle = new Rectangle();
            let mp: MotionProps = {
                obj: rect,
                propertyToChange: "x",
                beginValue: 5,
                actionDuration: 10,
            };
            let tp: TweenChangeProps = {
                ...mp,
                valueChange: 10,
            };
            let easeOutQuarticTween: EaseOutQuarticTween =
                new EaseOutQuarticTween(tp);
            expect(easeOutQuarticTween).toBeDefined();
            let returnedObj = easeOutQuarticTween.getObj();
            expect(returnedObj).toBeDefined();
            expect(easeOutQuarticTween.toString()).toBe(
                'Tween[Motion[obj={"x":5,"y":10,"w":50,"h":50}, prop="x", _beginValue=5, _duration=10], funcName: EaseOutQuarticTween, _valueChange: 10, _finishValue: 15, isComplete: false]',
            );
            expect(rect.toString()).toBe("Rectangle[x=5, y=10, w=50, h=50]");

            let r;
            r = easeOutQuarticTween.update({ t: 1 }) as Rectangle;
            expect(r.x).toBeCloseTo(8.44);
            r = easeOutQuarticTween.update({ t: 2 }) as Rectangle; // , true) as Rectangle;
            expect(r.x).toBeCloseTo(10.904);
            r = easeOutQuarticTween.update({ t: 5 }) as Rectangle;
            expect(r.x).toBeCloseTo(14.375);
            r = easeOutQuarticTween.update({ t: 9 }) as Rectangle;
            expect(r.x).toBeCloseTo(14.999);
            r = easeOutQuarticTween.update({ t: 11 }) as Rectangle;
            expect(r.x).toBe(15);
        });

        it("should do an ease-in-out quartic tween", () => {
            let rect: Rectangle = new Rectangle();
            let mp: MotionProps = {
                obj: rect,
                propertyToChange: "x",
                beginValue: 5,
                actionDuration: 10,
            };
            let tp: TweenChangeProps = {
                ...mp,
                valueChange: 10,
            };
            let easeInOutQuarticTween: EaseInOutQuarticTween =
                new EaseInOutQuarticTween(tp);
            expect(easeInOutQuarticTween).toBeDefined();
            let returnedObj = easeInOutQuarticTween.getObj();
            expect(returnedObj).toBeDefined();
            expect(easeInOutQuarticTween.toString()).toBe(
                'Tween[Motion[obj={"x":5,"y":10,"w":50,"h":50}, prop="x", _beginValue=5, _duration=10], funcName: EaseInOutQuarticTween, _valueChange: 10, _finishValue: 15, isComplete: false]',
            );
            expect(rect.toString()).toBe("Rectangle[x=5, y=10, w=50, h=50]");

            let r;
            r = easeInOutQuarticTween.update({ t: 1 }) as Rectangle;
            expect(r.x).toBeCloseTo(5.008);
            r = easeInOutQuarticTween.update({ t: 2 }) as Rectangle; // , true) as Rectangle;
            expect(r.x).toBeCloseTo(5.128);
            r = easeInOutQuarticTween.update({ t: 5 }) as Rectangle;
            expect(r.x).toBeCloseTo(10);
            r = easeInOutQuarticTween.update({ t: 9 }) as Rectangle;
            expect(r.x).toBeCloseTo(14.992);
            r = easeInOutQuarticTween.update({ t: 11 }) as Rectangle;
            expect(r.x).toBe(15);
        });
    });
    describe("Quintic Tweening algorithms", () => {
        it("should do an ease-in quintic tween", () => {
            let rect: Rectangle = new Rectangle();
            let mp: MotionProps = {
                obj: rect,
                propertyToChange: "x",
                beginValue: 5,
                actionDuration: 10,
            };
            let tp: TweenChangeProps = {
                ...mp,
                valueChange: 10,
            };
            let easeInQuinticTween: EaseInQuinticTween = new EaseInQuinticTween(
                tp,
            );
            expect(easeInQuinticTween).toBeDefined();
            let returnedObj = easeInQuinticTween.getObj();
            expect(returnedObj).toBeDefined();
            expect(easeInQuinticTween.toString()).toBe(
                'Tween[Motion[obj={"x":5,"y":10,"w":50,"h":50}, prop="x", _beginValue=5, _duration=10], funcName: EaseInQuinticTween, _valueChange: 10, _finishValue: 15, isComplete: false]',
            );
            expect(rect.toString()).toBe("Rectangle[x=5, y=10, w=50, h=50]");

            let r;
            r = easeInQuinticTween.update({ t: 1 }) as Rectangle;
            expect(r.x).toBeCloseTo(5.0001);
            r = easeInQuinticTween.update({ t: 2 }) as Rectangle; // , true) as Rectangle;
            expect(r.x).toBeCloseTo(5.0032);
            r = easeInQuinticTween.update({ t: 5 }) as Rectangle;
            expect(r.x).toBeCloseTo(5.3125);
            r = easeInQuinticTween.update({ t: 9 }) as Rectangle;
            expect(r.x).toBeCloseTo(10.9095);
            r = easeInQuinticTween.update({ t: 11 }) as Rectangle;
            expect(r.x).toBe(15);
        });

        it("should do an ease-out quintic tween", () => {
            let rect: Rectangle = new Rectangle();
            let mp: MotionProps = {
                obj: rect,
                propertyToChange: "x",
                beginValue: 5,
                actionDuration: 10,
            };
            let tp: TweenChangeProps = {
                ...mp,
                valueChange: 10,
            };
            let easeOutQuinticTween: EaseOutQuinticTween =
                new EaseOutQuinticTween(tp);
            expect(easeOutQuinticTween).toBeDefined();
            let returnedObj = easeOutQuinticTween.getObj();
            expect(returnedObj).toBeDefined();
            expect(easeOutQuinticTween.toString()).toBe(
                'Tween[Motion[obj={"x":5,"y":10,"w":50,"h":50}, prop="x", _beginValue=5, _duration=10], funcName: EaseOutQuinticTween, _valueChange: 10, _finishValue: 15, isComplete: false]',
            );
            expect(rect.toString()).toBe("Rectangle[x=5, y=10, w=50, h=50]");

            let r;
            r = easeOutQuinticTween.update({ t: 1 }) as Rectangle;
            expect(r.x).toBeCloseTo(9.0951);
            r = easeOutQuinticTween.update({ t: 2 }) as Rectangle; // , true) as Rectangle;
            expect(r.x).toBeCloseTo(11.7232);
            r = easeOutQuinticTween.update({ t: 5 }) as Rectangle;
            expect(r.x).toBeCloseTo(14.6875);
            r = easeOutQuinticTween.update({ t: 9 }) as Rectangle;
            expect(r.x).toBeCloseTo(14.9999);
            r = easeOutQuinticTween.update({ t: 11 }) as Rectangle;
            expect(r.x).toBe(15);
        });

        it("should do an ease-in-out quintic tween", () => {
            let rect: Rectangle = new Rectangle();
            let mp: MotionProps = {
                obj: rect,
                propertyToChange: "x",
                beginValue: 5,
                actionDuration: 10,
            };
            let tp: TweenChangeProps = {
                ...mp,
                valueChange: 10,
            };
            let easeInOutQuinticTween: EaseInOutQuinticTween =
                new EaseInOutQuinticTween(tp);
            expect(easeInOutQuinticTween).toBeDefined();
            let returnedObj = easeInOutQuinticTween.getObj();
            expect(returnedObj).toBeDefined();
            expect(easeInOutQuinticTween.toString()).toBe(
                'Tween[Motion[obj={"x":5,"y":10,"w":50,"h":50}, prop="x", _beginValue=5, _duration=10], funcName: EaseInOutQuinticTween, _valueChange: 10, _finishValue: 15, isComplete: false]',
            );
            expect(rect.toString()).toBe("Rectangle[x=5, y=10, w=50, h=50]");

            let r;
            r = easeInOutQuinticTween.update({ t: 1 }) as Rectangle;
            expect(r.x).toBeCloseTo(5.0016);
            r = easeInOutQuinticTween.update({ t: 2 }) as Rectangle; // , true) as Rectangle;
            expect(r.x).toBeCloseTo(5.0512);
            r = easeInOutQuinticTween.update({ t: 5 }) as Rectangle;
            expect(r.x).toBeCloseTo(10);
            r = easeInOutQuinticTween.update({ t: 9 }) as Rectangle;
            expect(r.x).toBeCloseTo(14.9999);
            r = easeInOutQuinticTween.update({ t: 11 }) as Rectangle;
            expect(r.x).toBe(15);
        });
    });
    describe("Sinusoidal Tweening algorithms", () => {
        it("should do an ease-in sinusoidal tween", () => {
            let rect: Rectangle = new Rectangle();
            let mp: MotionProps = {
                obj: rect,
                propertyToChange: "x",
                beginValue: 5,
                actionDuration: 10,
            };
            let tp: TweenChangeProps = {
                ...mp,
                valueChange: 10,
            };
            let easeInSinusoidalTween: EaseInSinusoidalTween =
                new EaseInSinusoidalTween(tp);
            expect(easeInSinusoidalTween).toBeDefined();
            let returnedObj = easeInSinusoidalTween.getObj();
            expect(returnedObj).toBeDefined();
            expect(easeInSinusoidalTween.toString()).toBe(
                'Tween[Motion[obj={"x":5,"y":10,"w":50,"h":50}, prop="x", _beginValue=5, _duration=10], funcName: EaseInSinusoidalTween, _valueChange: 10, _finishValue: 15, isComplete: false]',
            );
            expect(rect.toString()).toBe("Rectangle[x=5, y=10, w=50, h=50]");

            let r;
            r = easeInSinusoidalTween.update({ t: 1 }) as Rectangle;
            expect(r.x).toBeCloseTo(5.12312);
            r = easeInSinusoidalTween.update({ t: 2 }) as Rectangle; // , true) as Rectangle;
            expect(r.x).toBeCloseTo(5.489435);
            r = easeInSinusoidalTween.update({ t: 5 }) as Rectangle;
            expect(r.x).toBeCloseTo(7.929);
            r = easeInSinusoidalTween.update({ t: 9 }) as Rectangle;
            expect(r.x).toBeCloseTo(13.43566);
            r = easeInSinusoidalTween.update({ t: 11 }) as Rectangle;
            expect(r.x).toBe(15);
        });

        it("should do an ease-out sinusoidal tween", () => {
            let rect: Rectangle = new Rectangle();
            let mp: MotionProps = {
                obj: rect,
                propertyToChange: "x",
                beginValue: 5,
                actionDuration: 10,
            };
            let tp: TweenChangeProps = {
                ...mp,
                valueChange: 10,
            };
            let easeOutSinusoidalTween: EaseOutSinusoidalTween =
                new EaseOutSinusoidalTween(tp);
            expect(easeOutSinusoidalTween).toBeDefined();
            let returnedObj = easeOutSinusoidalTween.getObj();
            expect(returnedObj).toBeDefined();
            expect(easeOutSinusoidalTween.toString()).toBe(
                'Tween[Motion[obj={"x":5,"y":10,"w":50,"h":50}, prop="x", _beginValue=5, _duration=10], funcName: EaseOutSinusoidalTween, _valueChange: 10, _finishValue: 15, isComplete: false]',
            );
            expect(rect.toString()).toBe("Rectangle[x=5, y=10, w=50, h=50]");

            let r;
            r = easeOutSinusoidalTween.update({ t: 1 }) as Rectangle;
            expect(r.x).toBeCloseTo(6.564345);
            r = easeOutSinusoidalTween.update({ t: 2 }) as Rectangle; // , true) as Rectangle;
            expect(r.x).toBeCloseTo(8.09);
            r = easeOutSinusoidalTween.update({ t: 5 }) as Rectangle;
            expect(r.x).toBeCloseTo(12.071);
            r = easeOutSinusoidalTween.update({ t: 9 }) as Rectangle;
            expect(r.x).toBeCloseTo(14.877);
            r = easeOutSinusoidalTween.update({ t: 11 }) as Rectangle;
            expect(r.x).toBe(15);
        });

        it("should do an ease-in-out sinusoidal tween", () => {
            let rect: Rectangle = new Rectangle();
            let mp: MotionProps = {
                obj: rect,
                propertyToChange: "x",
                beginValue: 5,
                actionDuration: 10,
            };
            let tp: TweenChangeProps = {
                ...mp,
                valueChange: 10,
            };
            let easeInOutSinusoidalTween: EaseInOutSinusoidalTween =
                new EaseInOutSinusoidalTween(tp);
            expect(easeInOutSinusoidalTween).toBeDefined();
            let returnedObj = easeInOutSinusoidalTween.getObj();
            expect(returnedObj).toBeDefined();
            expect(easeInOutSinusoidalTween.toString()).toBe(
                'Tween[Motion[obj={"x":5,"y":10,"w":50,"h":50}, prop="x", _beginValue=5, _duration=10], funcName: EaseInOutSinusoidalTween, _valueChange: 10, _finishValue: 15, isComplete: false]',
            );
            expect(rect.toString()).toBe("Rectangle[x=5, y=10, w=50, h=50]");

            let r;
            r = easeInOutSinusoidalTween.update({ t: 1 }) as Rectangle;
            expect(r.x).toBeCloseTo(5.245);
            r = easeInOutSinusoidalTween.update({ t: 2 }) as Rectangle; // , true) as Rectangle;
            expect(r.x).toBeCloseTo(5.955);
            r = easeInOutSinusoidalTween.update({ t: 5 }) as Rectangle;
            expect(r.x).toBeCloseTo(10);
            r = easeInOutSinusoidalTween.update({ t: 9 }) as Rectangle;
            expect(r.x).toBeCloseTo(14.7553);
            r = easeInOutSinusoidalTween.update({ t: 11 }) as Rectangle;
            expect(r.x).toBe(15);
        });
    });
});
