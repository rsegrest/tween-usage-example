import p5 from "p5";
import { LinearTween } from "motion-and-tween/tween";
import { Tween } from "motion-and-tween/tween";
import { TweenChangeProps } from "motion-and-tween/tween";
import {
  CircularTween,
} from "motion-and-tween/tween";
import {
  CubicTween,
} from "motion-and-tween/tween";
import {
  ExponentialTween,
} from "motion-and-tween/tween";
import {
  QuadraticTween,
} from "motion-and-tween/tween";
import {
  QuinticTween,
} from "motion-and-tween/tween";
import { SinusoidalTween } from "motion-and-tween/tween";
// import { EaseInCircularTween } from "./tween/circular";

class Rectangle {
  public x: number;
  public y: number;
  public w: number;
  public h: number;

  constructor(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

let linearTweenLeftColumn: LinearTween;
let linearTweenRightColumn: LinearTween;

let circularTweenGroup: {
  easeIn: CircularTween.EaseIn;
  easeOut: CircularTween.EaseOut;
  easeInOut: CircularTween.EaseInOut;
}

let cubicTweenGroup: {
  easeIn: CubicTween.EaseIn;
  easeOut: CubicTween.EaseOut;
  easeInOut: CubicTween.EaseInOut;
} 

let exponentialTweenGroup: {
  easeIn: ExponentialTween.EaseIn;
  easeOut: ExponentialTween.EaseOut;
  easeInOut: ExponentialTween.EaseInOut;
}

let quadraticTweenGroup: {
  easeIn: QuadraticTween.EaseIn;
  easeOut: QuadraticTween.EaseOut;
  easeInOut: QuadraticTween.EaseInOut;
}

let quinticTweenGroup: {
  easeIn: QuinticTween.EaseIn;
  easeOut: QuinticTween.EaseOut;
  easeInOut: QuinticTween.EaseInOut;
}

let sinusoidalTweenGroup: {
  easeIn: SinusoidalTween.EaseIn;
  easeOut: SinusoidalTween.EaseOut;
  easeInOut: SinusoidalTween.EaseInOut;
}
let leftColumnAlignment: number;
let rightColumnAlignment: number;

let row0: number;
let row1: number;
let row2: number;
let row3: number;

let labelRowY0: number;
let labelRowY1: number;
let labelRowY2: number;
let labelRowY3: number;

let boxWidth: number;
let boxHeight: number;
const fontSize: number = 16;
const boxStrokeWeight: number = 1;
const boxStrokeColor: number = 128;

let objectYOffset: number;

let tweenValueChange:number;

const sketch = (s: p5) => {

  const createTweenProps = (x: number, y: number): TweenChangeProps => {
    let o = new Rectangle(x, y, s.height * 0.025, s.height * 0.025);
    return {
      obj: o,
      propertyToChange: "x",
      beginValue: x,
      valueChange: tweenValueChange,
      actionDuration: 120,
    }
  }
  
  const drawLinearTweenBox = (x: number, y:number) => {
    s.text("Linear", x + s.width * 0.005, y + s.height * 0.02);
    s.textSize(fontSize);
    s.noFill();
    s.stroke(boxStrokeColor);
    s.strokeWeight(boxStrokeWeight);
    s.rect(x, y, s.width * 0.75, boxHeight/2);
    s.fill(255);
  }
  const createTweenGroup = (
    x: number,
    y: number,
    tweenTypes: {
      EaseIn: new (p: TweenChangeProps) => Tween;
      EaseOut: new (p: TweenChangeProps) => Tween;
      EaseInOut: new (p: TweenChangeProps) => Tween;
    }
  ) => {
    const tp1:TweenChangeProps = createTweenProps(x, y);
    const tp2:TweenChangeProps = createTweenProps(x, y + objectYOffset);
    const tp3:TweenChangeProps = createTweenProps(x, y + objectYOffset * 2);
    
    const easeIn = new tweenTypes.EaseIn(tp1);
    const easeOut = new tweenTypes.EaseOut(tp2);
    const easeInOut = new tweenTypes.EaseInOut(tp3);

    return {
      easeIn,
      easeOut,
      easeInOut,
    }
  }
  
  const drawLabel = (x: number, y: number, label: string) => {
    s.text(label, x + s.width * 0.005, y + s.height * 0.02);
    s.textSize(fontSize);
    s.noFill();
    s.stroke(boxStrokeColor);
    s.strokeWeight(boxStrokeWeight);
    s.rect(x, y, boxWidth, boxHeight);
    s.fill(255);
  }

  const drawAllLabels = () => {
    drawLinearTweenBox(leftColumnAlignment, labelRowY0);
    drawLabel(leftColumnAlignment, labelRowY1, "Circular");
    drawLabel(leftColumnAlignment, labelRowY2, "Exponential");
    drawLabel(leftColumnAlignment, labelRowY3, "Sinusoidal");
    drawLabel(rightColumnAlignment, labelRowY1, "Cubic");
    drawLabel(rightColumnAlignment, labelRowY2, "Quadratic");
    drawLabel(rightColumnAlignment, labelRowY3, "Quintic");
  }

  s.setup = () => {
    s.createCanvas(window.innerWidth, window.innerHeight);
    s.frameRate(60);
    s.background(0);
    
    leftColumnAlignment = s.width * 0.1;
    rightColumnAlignment = s.width * 0.5;
    
    row0 = s.height * 0.185;
    row1 = s.height * 0.3;
    row2 = s.height * 0.5;
    row3 = s.height * 0.7;

    labelRowY0 = row0 - s.height * 0.05;
    labelRowY1 = row1 - s.height * 0.05;
    labelRowY2 = row2 - s.height * 0.05;
    labelRowY3 = row3 - s.height * 0.05;

    boxWidth = s.width * 0.35;
    boxHeight = s.height * 0.18;

    objectYOffset = s.height * 0.04;
    tweenValueChange = s.width * 0.32;
    
    drawAllLabels();

    const linearTweenLeftColumnProps: TweenChangeProps = createTweenProps(leftColumnAlignment + s.width * 0.01, row0);
    const linearTweenRightColumnProps: TweenChangeProps = createTweenProps(rightColumnAlignment + s.width * 0.01, row0);
    linearTweenLeftColumn = new LinearTween(linearTweenLeftColumnProps);
    linearTweenRightColumn = new LinearTween(linearTweenRightColumnProps);

    circularTweenGroup = createTweenGroup((leftColumnAlignment + s.width * 0.01), row1, {
      EaseIn: CircularTween.EaseIn,
      EaseOut: CircularTween.EaseOut,
      EaseInOut: CircularTween.EaseInOut,
    }); 
  
    exponentialTweenGroup = createTweenGroup((leftColumnAlignment + s.width * 0.01), row2, {
      EaseIn: CubicTween.EaseIn,
      EaseOut: CubicTween.EaseOut,
      EaseInOut: CubicTween.EaseInOut,
    });
    
    sinusoidalTweenGroup = createTweenGroup((leftColumnAlignment + s.width * 0.01), row3, {
      EaseIn: QuadraticTween.EaseIn,
      EaseOut: QuadraticTween.EaseOut,
      EaseInOut: QuadraticTween.EaseInOut,
    });

    cubicTweenGroup = createTweenGroup((rightColumnAlignment + s.width * 0.01), row1, {
      EaseIn: QuinticTween.EaseIn,
      EaseOut: QuinticTween.EaseOut,
      EaseInOut: QuinticTween.EaseInOut,
    });

    quadraticTweenGroup = createTweenGroup((rightColumnAlignment + s.width * 0.01), row2, {
      EaseIn: ExponentialTween.EaseIn,
      EaseOut: ExponentialTween.EaseOut,
      EaseInOut: ExponentialTween.EaseInOut,
    });

    quinticTweenGroup = createTweenGroup((rightColumnAlignment + s.width * 0.01), row3, {
      EaseIn: SinusoidalTween.EaseIn,
      EaseOut: SinusoidalTween.EaseOut,
      EaseInOut: SinusoidalTween.EaseInOut,
    });
  };

  s.draw = () => {
    s.fill(0, 0, 0, 256/4);
    s.rect(0, 0, s.width, s.height);
    s.fill(255);
    drawAllLabels();
    const ltl = linearTweenLeftColumn.update();
    const ltr = linearTweenRightColumn.update();
    s.rect(ltl.x, ltl.y, ltl.w, ltl.h);
    s.rect(ltr.x, ltr.y, ltr.w, ltr.h);
    Object.values(circularTweenGroup).forEach((tween) => {
      const r = tween.update() as Rectangle;
      s.rect(r.x, r.y, r.w, r.h);
    }) 
    Object.values(cubicTweenGroup).forEach((tween) => {
      const r = tween.update() as Rectangle;
      s.rect(r.x, r.y, r.w, r.h);
    })
    Object.values(quadraticTweenGroup).forEach((tween) => {
      const r = tween.update() as Rectangle;
      s.rect(r.x, r.y, r.w, r.h);
    })
    Object.values(quinticTweenGroup).forEach((tween) => {
      const r = tween.update() as Rectangle;
      s.rect(r.x, r.y, r.w, r.h);
    })
    Object.values(sinusoidalTweenGroup).forEach((tween) => {
      const r = tween.update() as Rectangle;
      s.rect(r.x, r.y, r.w, r.h);
    })
    Object.values(exponentialTweenGroup).forEach((tween) => {
      const r = tween.update() as Rectangle;
      s.rect(r.x, r.y, r.w, r.h);
    })
  };
};

// Attach the sketch to a new p5 instance
new p5(sketch);
