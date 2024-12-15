import p5 from "p5";
// import LinearTween from "motion-and-tween";
import Tween, { TweenChangeProps } from "motion-and-tween/dist/tween/Tween.js";
// import {
//   EaseInCircularTween,
//   EaseInOutCircularTween,
//   EaseOutCircularTween,
// } from "./tween/circular";
// import {
//   EaseInCubicTween,
//   EaseInOutCubicTween,
//   EaseOutCubicTween,
// } from "./tween/cubic";
// import {
//   EaseInExponentialTween,
//   EaseInOutExponentialTween,
//   EaseOutExponentialTween,
// } from "./tween/exponential";
// import {
//   EaseInOutQuadraticTween,
//   EaseInQuadraticTween,
//   EaseOutQuadraticTween,
// } from "./tween/quadratic";
// import {
//   EaseInOutQuinticTween,
//   EaseInQuinticTween,
//   EaseOutQuinticTween,
// } from "./tween/quintic";
import {
  EaseInOutSinusoidalTween,
  EaseInSinusoidalTween,
  EaseOutSinusoidalTween,
} from "motion-and-tween";
// import { EaseInCircularTween } from "./tween/circular";

class Rectangle {
  public x: number = 10;
  public y: number = 10;
  public w: number = 50;
  public h: number = 50;
}
// console.log('width, height:')
// console.log(window.innerWidth);
// console.log(window.innerHeight);

const sketch = (s: p5) => {
  // Declare variables outside setup and draw
  // let x = 100;
  // let y = 100;

  // let linearTween: LinearTween;

  // let easeInCirc: EaseInCircularTween;
  // let easeOutCirc: EaseOutCircularTween;
  // let easeInOutCirc: EaseInOutCircularTween;

  // let easeInCubic: EaseInCubicTween;
  // let easeOutCubic: EaseOutCubicTween;
  // let easeInOutCubic: EaseInOutCubicTween;

  // let easeInExpo: EaseInExponentialTween;
  // let easeOutExpo: EaseOutExponentialTween;
  // let easeInOutExpo: EaseInOutExponentialTween;

  // let easeInQuadratic: EaseInQuadraticTween;
  // let easeOutQuadratic: EaseOutQuadraticTween
  // let easeInOutQuadratic: EaseInOutQuadraticTween;

  // let easeInQuintic: EaseInQuinticTween;
  // let easeOutQuintic: EaseOutQuinticTween
  // let easeInOutQuintic: EaseInOutQuinticTween;

  let easeInSinusoidalTween: EaseInSinusoidalTween;
  let easeOutSinusoidalTween: EaseOutSinusoidalTween;
  let easeInOutSinusoidalTween: EaseInOutSinusoidalTween;

  let tp1: TweenChangeProps;
  let tp2: TweenChangeProps;
  let tp3: TweenChangeProps;

  let r1 = new Rectangle();
  let r2 = new Rectangle();
  let r3 = new Rectangle();
  r2.y = 80;
  r3.y = 150;

  s.setup = () => {
    s.createCanvas(window.innerWidth, window.innerHeight);

    tp1 = {
      obj: r1,
      propertyToChange: "x",
      beginValue: 100,
      valueChange: 500,
      actionDuration: 120,
    };
    tp2 = {
      obj: r2,
      propertyToChange: "x",
      beginValue: 100,
      valueChange: 500,
      actionDuration: 120,
    };
    tp3 = {
      obj: r3,
      propertyToChange: "x",
      beginValue: 100,
      valueChange: 500,
      actionDuration: 120,
    };
    // easeInCubic = new EaseInCubicTween(tp1);
    // easeOutCubic = new EaseOutCubicTween(tp2);
    // easeInOutCubic = new EaseInOutCubicTween(tp3);

    // easeInCirc = new EaseInCircularTween(tp1);
    // easeOutCirc = new EaseOutCircularTween(tp2);
    // easeInOutCirc = new EaseInOutCircularTween(tp3);

    // easeInExpo = new EaseInExponentialTween(tp1);
    // easeOutExpo = new EaseOutExponentialTween(tp2);
    // easeInOutExpo = new EaseInOutExponentialTween(tp3);
    // easeInQuadratic = new EaseInQuadraticTween(tp1);
    // easeOutQuadratic = new EaseOutQuadraticTween(tp2)
    // easeInOutQuadratic = new EaseInOutQuadraticTween(tp3);

    // easeInQuintic = new EaseInQuinticTween(tp1);
    // easeOutQuintic = new EaseOutQuinticTween(tp2);
    // easeInOutQuintic = new EaseInOutQuinticTween(tp3);

    easeInSinusoidalTween = new EaseInSinusoidalTween(tp1);
    easeOutSinusoidalTween = new EaseOutSinusoidalTween(tp2);
    easeInOutSinusoidalTween = new EaseInOutSinusoidalTween(tp3);
  };

  s.draw = () => {
    s.background(0);
    s.fill(255);
    // const r = linearTween.update() as Rectangle;
    r1 = easeInSinusoidalTween.update() as Rectangle;
    r2 = easeOutSinusoidalTween.update() as Rectangle;
    r3 = easeInOutSinusoidalTween.update() as Rectangle;
    // s.rect(r.x, r.y, r.w, r.h)
    // console.log(r2)
    s.rect(r1.x, r1.y, r1.w, r1.h);
    s.rect(r2.x, r2.y, r2.w, r2.h);
    s.rect(r3.x, r3.y, r3.w, r3.h);
  };
};

// Attach the sketch to a new p5 instance
new p5(sketch);
