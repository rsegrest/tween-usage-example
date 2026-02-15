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

let allGroups = [
  linearTweenLeftColumn,
  linearTweenRightColumn,
  circularTweenGroup,
  cubicTweenGroup,
  exponentialTweenGroup,
  quadraticTweenGroup,
  quinticTweenGroup,
  sinusoidalTweenGroup,
]

let leftColumnAlignment: number;
let centerAlignment: number;
let rightColumnAlignment: number;

let row0: number;
let row1: number;
let row2: number;
let row3: number;
let row4: number;
let row5: number;
let row6: number;

let labelRowY0: number;
let labelRowY1: number;
let labelRowY2: number;
let labelRowY3: number;
let labelRowY4: number;
let labelRowY5: number;
let labelRowY6: number;

let boxWidth: number;
let longBoxWidth: number;
let boxHeight: number;
const fontSize: number = 16;
const boxStrokeWeight: number = 1;
const boxStrokeColor: number = 128;
let boxFillColor:any;
let backgroundColor: any;
let labelTextColor = 0;

let objectYOffset: number;
let tweenValueChange:number;

const HORIZONTAL_LAYOUT = "HORIZONTAL_LAYOUT";
const VERTICAL_LAYOUT = "VERTICAL_LAYOUT";

let layout = HORIZONTAL_LAYOUT;

const sketch = (s: p5) => {

  const createTweenProps = (x: number, y: number): TweenChangeProps => {
    let size = s.height * 0.025;
    if (layout === VERTICAL_LAYOUT) {
      size = s.height * 0.0125;
    }
    let o = new Rectangle(x, y, size, size);
    return {
      obj: o,
      propertyToChange: "x",
      beginValue: x,
      valueChange: tweenValueChange,
      actionDuration: 120,
    }
  }
  
  const drawLinearTweenBox = (x: number, y:number) => {
    s.textSize(fontSize);
    s.stroke(boxStrokeColor);
    s.strokeWeight(boxStrokeWeight);
    s.fill(boxFillColor);
    let width = longBoxWidth;
    if (layout === VERTICAL_LAYOUT) {
      width = boxWidth;
    }
    s.rect(x, y, width, boxHeight/2, 0, 10, 10, 10);
    s.fill(labelTextColor);
    s.noStroke();
    s.text("Linear", x + s.width * 0.005, y + s.height * 0.02);
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
  
  const drawContainer = (x: number, y: number, label: string) => {
    s.textSize(fontSize);
    s.stroke(boxStrokeColor);
    s.strokeWeight(boxStrokeWeight);
    s.fill(boxFillColor);
    s.rect(x, y, boxWidth, boxHeight, 0, 10, 10, 10);
    s.fill(labelTextColor);
    s.noStroke();
    s.text(label, x + s.width * 0.005, y + s.height * 0.02);
  }

  const drawAllLabels = () => {
    let alignment = leftColumnAlignment;
    if (layout === VERTICAL_LAYOUT) {
      alignment = centerAlignment;
    }
    let linearBoxY = labelRowY0;
    if (layout === VERTICAL_LAYOUT) {
      linearBoxY = labelRowY0 + s.height * 0.01;
    }
    drawLinearTweenBox(alignment, linearBoxY);
    let rows = [labelRowY1, labelRowY2, labelRowY3, labelRowY4, labelRowY5, labelRowY6];
    if (layout === VERTICAL_LAYOUT) {
      rows = [labelRowY1 + s.height * 0.015, labelRowY2 + s.height * 0.015, labelRowY3 + s.height * 0.015, labelRowY4 + s.height * 0.015, labelRowY5 + s.height * 0.015, labelRowY6 + s.height * 0.015];
    }
    const _ = ["Circular", "Exponential", "Sinusoidal"]
    let secondaryLabelRowsY = [s.height * 0.07, s.height * 0.12, s.height * 0.17];
    if (layout === VERTICAL_LAYOUT) {
      secondaryLabelRowsY = [s.height * 0.025, s.height * 0.05, s.height * 0.075];
    }
    _.forEach((label, index) => {
      drawContainer(alignment, rows[index], label);
      s.textSize(9);
      s.text("Ease In", alignment + s.width * 0.005, rows[index] + secondaryLabelRowsY[0]);
      s.text("Ease Out", alignment + s.width * 0.005, rows[index] + secondaryLabelRowsY[1]);
      s.text("Ease In Out", alignment + s.width * 0.005, rows[index] + secondaryLabelRowsY[2]);
    })
    const _2 = ["Cubic", "Quadratic", "Quintic"]
    .forEach((label, index) => {
      let offset = 0;
      let alignment = rightColumnAlignment;
      let rowIndex = index;
      if (layout === VERTICAL_LAYOUT) {
        rowIndex = index + 3;
        alignment = centerAlignment;
      }
      drawContainer(alignment, rows[rowIndex] + offset, label);
      s.textSize(9);
      s.text("Ease In", alignment + s.width * 0.005, rows[rowIndex] + secondaryLabelRowsY[index]);
      s.text("Ease Out", alignment + s.width * 0.005, rows[rowIndex] + secondaryLabelRowsY[index]);
      s.text("Ease In Out", alignment + s.width * 0.005, rows[rowIndex] + secondaryLabelRowsY[index]);
    })
  }

  s.setup = () => {
    if (window.innerWidth < window.innerHeight) {
      layout = VERTICAL_LAYOUT;
    }
    backgroundColor = s.color(128,64,64,64);
    boxFillColor = s.color(100,100,100,128);
    s.createCanvas(window.innerWidth, window.innerHeight);
    s.frameRate(60);
    s.background(backgroundColor);
    
    leftColumnAlignment = s.width * 0.09;
    centerAlignment = s.width * 0.05;
    rightColumnAlignment = s.width * 0.49;
    let startY = s.height * 0.185;
    let zeroToOneOffset = 0.115;
    let rowOffset = 0.2;
    if (layout === VERTICAL_LAYOUT) {
      console.log("VERTICAL.    LAYOUT !")
      startY = s.height * 0.05;
      rowOffset = 0.1;
      zeroToOneOffset = 0.05;
    }
    row0 = startY;
    row1 = row0 + (zeroToOneOffset * s.height);
    row2 = row1 + (rowOffset * s.height);
    row3 = row2 + (rowOffset * s.height);
    row4 = row3 + (rowOffset * s.height);
    row5 = row4 + (rowOffset * s.height);
    row6 = row5 + (rowOffset * s.height);

    labelRowY0 = row0 - s.height * 0.05;
    labelRowY1 = row1 - s.height * 0.05;
    labelRowY2 = row2 - s.height * 0.05;
    labelRowY3 = row3 - s.height * 0.05;
    labelRowY4 = row4 - s.height * 0.05;
    labelRowY5 = row5 - s.height * 0.05;
    labelRowY6 = row6 - s.height * 0.05;

    boxWidth = s.width * 0.39;
    longBoxWidth = s.width * 0.79;
    boxHeight = s.height * 0.18;
    if (layout === VERTICAL_LAYOUT) {
      boxWidth = s.width * 0.89;
      longBoxWidth = s.width * 0.79;
      boxHeight = s.height * 0.09;
    }

    objectYOffset = s.height * 0.045;
    tweenValueChange = s.width * 0.36;
    if (layout === VERTICAL_LAYOUT) {
      objectYOffset = s.height * 0.0225;
      tweenValueChange = s.width * 0.85;
    }
    
    drawAllLabels();

    let alignment = leftColumnAlignment;
    if (layout === VERTICAL_LAYOUT) {
      alignment = centerAlignment;
    }
    let linearY = row0;
    if (layout === VERTICAL_LAYOUT) {
      linearY = row0 - s.height * 0.01;
    }
    const linearTweenLeftColumnProps: TweenChangeProps = createTweenProps(alignment + s.width * 0.01, linearY);
    const linearTweenRightColumnProps: TweenChangeProps = createTweenProps(alignment + s.width * 0.01, linearY);
    linearTweenLeftColumn = new LinearTween(linearTweenLeftColumnProps);
    linearTweenRightColumn = new LinearTween(linearTweenRightColumnProps);
    circularTweenGroup = createTweenGroup((alignment + s.width * 0.01), row1, {
      EaseIn: CircularTween.EaseIn,
      EaseOut: CircularTween.EaseOut,
      EaseInOut: CircularTween.EaseInOut,
    }); 
  
    exponentialTweenGroup = createTweenGroup((alignment + s.width * 0.01), row2, {
      EaseIn: CubicTween.EaseIn,
      EaseOut: CubicTween.EaseOut,
      EaseInOut: CubicTween.EaseInOut,
    });
    
    sinusoidalTweenGroup = createTweenGroup((alignment + s.width * 0.01), row3, {
      EaseIn: QuadraticTween.EaseIn,
      EaseOut: QuadraticTween.EaseOut,
      EaseInOut: QuadraticTween.EaseInOut,
    });
    
    let rows = [row1, row2, row3];
    if (layout === HORIZONTAL_LAYOUT) {
      alignment = rightColumnAlignment;
    } else {
      rows = [row4, row5, row6];
    }
    cubicTweenGroup = createTweenGroup((alignment + s.width * 0.01), rows[0], {
      EaseIn: QuinticTween.EaseIn,
      EaseOut: QuinticTween.EaseOut,
      EaseInOut: QuinticTween.EaseInOut,
    });

    quadraticTweenGroup = createTweenGroup((alignment + s.width * 0.01), rows[1], {
      EaseIn: ExponentialTween.EaseIn,
      EaseOut: ExponentialTween.EaseOut,
      EaseInOut: ExponentialTween.EaseInOut,
    });

    quinticTweenGroup = createTweenGroup((alignment + s.width * 0.01), rows[2], {
      EaseIn: SinusoidalTween.EaseIn,
      EaseOut: SinusoidalTween.EaseOut,
      EaseInOut: SinusoidalTween.EaseInOut,
    });
  };

  s.draw = () => {
    // s.fill(0, 0, 0, 256/4);
    s.fill(backgroundColor);
    s.rect(0, 0, s.width, s.height);
    s.fill(255);
    drawAllLabels();
    s.fill(0);
    s.noStroke();
    const ltl = linearTweenLeftColumn.update();
    s.circle(ltl.x, ltl.y, ltl.w);
    if (layout !== VERTICAL_LAYOUT) {
      const ltr = linearTweenRightColumn.update();
      s.circle(ltr.x, ltr.y, ltr.w);
    }
    Object.values(circularTweenGroup).forEach((tween) => {
      s.fill(255, 0, 0);
      s.noStroke();
      const r = tween.update() as Rectangle;
      s.circle(r.x, r.y, r.w);
    }) 
    Object.values(cubicTweenGroup).forEach((tween) => {
      s.fill(0, 255, 0);
      s.noStroke();
      const r = tween.update() as Rectangle;
      s.circle(r.x, r.y, r.w);
    })
    Object.values(quadraticTweenGroup).forEach((tween) => {
      s.fill(0, 0, 255);
      s.noStroke();
      const r = tween.update() as Rectangle;
      s.circle(r.x, r.y, r.w);
    })
    Object.values(quinticTweenGroup).forEach((tween) => {
      s.fill(255, 255, 0);
      s.noStroke();
      const r = tween.update() as Rectangle;
      s.circle(r.x, r.y, r.w);
    })
    Object.values(sinusoidalTweenGroup).forEach((tween) => {
      s.fill(255, 0, 255);
      s.noStroke();
      const r = tween.update() as Rectangle;
      s.circle(r.x, r.y, r.w);
    })
    Object.values(exponentialTweenGroup).forEach((tween) => {
      s.fill(0, 255, 255);
      s.noStroke();
      const r = tween.update() as Rectangle;
      s.circle(r.x, r.y, r.w);
    })
  };
};

// Attach the sketch to a new p5 instance
new p5(sketch);
