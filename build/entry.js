import React from 'react';
import ReactDOM from 'react-dom';
import QSlider from '../src/index';

ReactDOM.render(
    <QSlider
        slidesToShow={3}
        slidesToScroll={1}
        rewindOnEnd={true}
        onSlideClick={(event, index) => console.log(event)}
    >
        <img src="https://picsum.photos/900/600/?image=174" />
        <img src="https://picsum.photos/900/600/?image=542" />
        <img src="https://picsum.photos/900/600/?image=347" />
        <img src="https://picsum.photos/900/600/?image=75" />
        <img src="https://picsum.photos/900/600/?image=541" />
        <img src="https://picsum.photos/900/600/?image=174" />
        <img src="https://picsum.photos/900/600/?image=542" />
        <img src="https://picsum.photos/900/600/?image=347" />
    </QSlider>
, document.querySelector('.imageslider'));

ReactDOM.render(
    <QSlider
        slidesToShow={1}
        slidesToScroll={1}
        rewindOnEnd={true}
        fade={true}
        fadeDuration={1000}
        slidesHTML={`<img src="https://picsum.photos/900/600/?image=174" /><img src="https://picsum.photos/900/600/?image=542" /><img src="https://picsum.photos/900/600/?image=347" /><img src="https://picsum.photos/900/600/?image=75" />`}
    >
    </QSlider>
, document.querySelector('.imageslider2'));