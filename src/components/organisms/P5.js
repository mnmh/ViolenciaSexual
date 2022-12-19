import React from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import colombian_map from './img/colombian_map.png';
import mountains from './img/mountains-02.png';
import ilustracion from './img/ilustracion.png';

/*
Componente para usar scripts de P5.js en React
https://github.com/P5-wrapper/react
*/

function sketch(p5) {
  let data = [
    4941, 4739, 2303, 2064, 1638, 1493, 1290, 1136, 973, 805, 791, 670, 454,
    377, 303, 275, 273, 249, 235, 234, 186, 143, 128, 105, 94, 79, 41, 38, 23,
    21, 2,
  ];

  let MARGIN = 10;
  let FIRST_SECTION_HEIGHT = 900;
  let CIRCLE_RADIUS_FACTOR = 80;
  let CIRCLE_SPACE = 5;
  let BACKGROUND_IMAGE_HEIGHT = 0.4;
  let img_background_map = p5.loadImage(colombian_map);
  let img_background_mountains = p5.loadImage(mountains);
  let img_background_ilustracion = p5.loadImage(ilustracion);
  /*
  p5.preload = () => {
    img_background_map = p5.loadImage(colombian_map);
    img_background_mountains = p5.loadImage(mountains);
    img_background_ilustracion = p5.loadImage(ilustracion);
  };*/

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - MARGIN, 2000);
    p5.textFont('Fauna One');
  };

  p5.circleBar = (x_bar, y_bar, height, space, circle_radius) => {
    for (let y = 0; y <= height / (space + circle_radius); y = y + 1) {
      p5.fill(6, 48, 61);
      p5.noStroke();
      p5.ellipse(
        x_bar,
        y_bar - y * (circle_radius + space),
        circle_radius,
        circle_radius
      );
    }
  };

  p5.draw = () => {
    p5.fill(66, 87, 109);
    p5.rect(0, 0, p5.width - 10, FIRST_SECTION_HEIGHT);

    p5.image(
      img_background_ilustracion,
      p5.width / 8,
      FIRST_SECTION_HEIGHT / 6
    );
    p5.image(img_background_map, p5.width / 3, FIRST_SECTION_HEIGHT / 15);
    p5.image(
      img_background_mountains,
      0,
      FIRST_SECTION_HEIGHT * (1 - BACKGROUND_IMAGE_HEIGHT),
      p5.width - MARGIN,
      FIRST_SECTION_HEIGHT * BACKGROUND_IMAGE_HEIGHT
    );

    let bar_number = 30;
    for (let bar = 0; bar <= bar_number; bar = bar + 1) {
      let bar_height = p5.map(
        data[bar],
        0,
        p5.max(data),
        0,
        FIRST_SECTION_HEIGHT - 50
      );
      let circle_radius = p5.width / CIRCLE_RADIUS_FACTOR;
      p5.fill(86, 125, 157);
      p5.rect(
        30 + (bar * (p5.width - 70)) / bar_number - circle_radius * 0.6,
        FIRST_SECTION_HEIGHT - bar_height - 25,
        circle_radius * 1.2,
        bar_height + 25
      );
      p5.circleBar(
        30 + (bar * (p5.width - 70)) / bar_number,
        FIRST_SECTION_HEIGHT - 20,
        bar_height,
        CIRCLE_SPACE,
        circle_radius
      );

      p5.push();
      p5.fill(0);
      p5.textSize(20);
      p5.translate(1510, 460);
      p5.rotate(p5.HALF_PI);
      p5.text(
        'a',
        FIRST_SECTION_HEIGHT / 2,
        30 + (bar * (p5.width - 70)) / bar_number
      );
      p5.pop();
    }

    //Titulo//
    p5.fill(255);
    p5.textSize(20);
    p5.text(
      'Desaparición Forzada',
      p5.width / (p5.width / 100),
      FIRST_SECTION_HEIGHT - 850
    );

    p5.fill(255);
    p5.textSize(40);
    p5.text(
      'por Ocupación',
      p5.width / (p5.width / 100),
      FIRST_SECTION_HEIGHT - 800
    );

    //Texto víctimas totales//
    p5.fill(255);
    p5.textSize(25);
    p5.text('Victimas Totales', p5.width / 3, FIRST_SECTION_HEIGHT - 370);

    p5.fill(255);
    p5.textSize(70);
    p5.text('80.674', p5.width / 3, FIRST_SECTION_HEIGHT - 300);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
}

export function App() {
  return <ReactP5Wrapper sketch={sketch} />;
}
export default App;
