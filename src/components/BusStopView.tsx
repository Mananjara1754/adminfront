import React from 'react';
import { useEffect, useState } from 'react';
import { Courses } from '../dto/Courses';

interface BusStopDTO {
  stops1: Courses[];
  stops2: Courses[];
  destName1: string;
  destName2: string;
}

const BusStopView: React.FC<BusStopDTO> = (props) => {
  const [svgHeight, setSvgHeight] = useState(300);

  const width = 500;
  const height = window.innerHeight;
  const mWidth = width / 2;
  const mHeight = height / 2;

  const baseColor = '#ffffff';
  const stopStrokeWidth = 5;
  const stopColor1 = "#9FC800";
  const stopColor2 = "rgb(35, 166, 207)"; // change it according to your theme

  const rectPadding = 50;
  const stopGap = 40;
  const extremityStopGap = 25;

  const destPointRadius = 17.592;
  const destTextColor = "#939AB2";
  const destStrokeWidth = 2;
  const destTextWeight = 700;
  const destTextSize = 14;

  const extremityStopMargin = rectPadding + destPointRadius + extremityStopGap;

  const stops1Len = props.stops1.length;
  const stops2Len = props.stops2.length;

  let stopGap1 = stopGap;
  let stopGap2 = stopGap;

  useEffect(() => {
    if (stops1Len > stops2Len) {
      setSvgHeight(extremityStopMargin * 2 + (stops1Len - 1) * stopGap);
      if (stops2Len - 1 > 0) stopGap2 = (svgHeight - extremityStopMargin * 2) / (stops2Len - 1);
      else stopGap2 = (svgHeight - extremityStopMargin * 2) / 2;
    } else {
      setSvgHeight(extremityStopMargin * 2 + (stops2Len - 1) * stopGap);
      if (stops1Len - 1 > 0) stopGap1 = (svgHeight - extremityStopMargin * 2) / (stops1Len - 1);
      else stopGap1 = (svgHeight - extremityStopMargin * 2) / 2;
    }
  }, [stops1Len, stops2Len, svgHeight]);

  const dest1MarginTop = 20;
  const dest2MarginTop = svgHeight - 10;

  const rectHeight = svgHeight - rectPadding * 2;
  const rectWidth = 90;
  const rectRadius = 17.592;
  const rectStrokeWidth = 4;
  const rectStrokeColor = "#3E4252";
  const rectFillColor = "none";

  const stopX1 = (width - rectWidth) / 2;
  const stopX2 = ((width - rectWidth) / 2) + rectWidth;

  const textFontSize = 10;
  const textFontWeight = 500;
  const textX1 = ((width - rectWidth) / 2) - 15;
  const textX2 = ((width - rectWidth) / 2) + 105;
  const textColor = "#939AB2";

  const stopCircles1 = props.stops1.map((stop, i) => {
    const circleMarginTop = i * stopGap1 + extremityStopMargin;
    const texts = stop.place_name.split("\n");

    return (
      <g key={`stop1-${i}`}>
        <circle cx={stopX1} cy={circleMarginTop} r={4} fill={stopColor1} stroke={stopColor1} strokeWidth={stopStrokeWidth} />
        <polygon points={`${stopX1 - 0.5},${circleMarginTop - 4} ${stopX1 - 4},${circleMarginTop + 2} ${stopX1 + 3},${circleMarginTop + 2}`} fill="white" />
        {texts.map((text, index) => (
          <text key={`legend1-${i}-${index}`} x={textX1} y={circleMarginTop + 2 + index * 15} fontSize={textFontSize} fontWeight={textFontWeight} fill={textColor} textAnchor="end">
            {text}
          </text>
        ))}
      </g>
    );
  });

  const stopCircles2 = props.stops2.map((stop, i) => {
    const circleMarginTop = i * stopGap2 + extremityStopMargin;
    const texts = stop.place_name.split("\n");

    return (
      <g key={`stop2-${i}`}>
        <circle cx={stopX2} cy={circleMarginTop} r={4} fill={stopColor2} stroke={stopColor2} strokeWidth={stopStrokeWidth} />
        <polygon points={`${stopX2 - 0.5},${circleMarginTop + 4} ${stopX2 - 4},${circleMarginTop - 2} ${stopX2 + 3},${circleMarginTop - 2}`} fill="white" />
        {texts.map((text, index) => (
          <text key={`legend2-${i}-${index}`} x={textX2} y={circleMarginTop + 2 + index * 15} fontSize={textFontSize} fontWeight={textFontWeight} fill={textColor}>
            {text}
          </text>
        ))}
      </g>
    );
  });

  return (

    <svg height={svgHeight} width='500' style={{ backgroundColor: baseColor,borderRadius:50}}>
      <rect x={stopX1} y={rectPadding} width={rectWidth} height={rectHeight} rx={rectRadius} ry={rectRadius} fill={rectFillColor} stroke={rectStrokeColor} strokeWidth={rectStrokeWidth} />
      {stopCircles1}
      {stopCircles2}
      <circle cx={mWidth} cy={rectPadding} r={destPointRadius} fill={stopColor2} stroke={baseColor} strokeWidth={destStrokeWidth} />
      <text x={mWidth} y={dest1MarginTop} fontSize={destTextSize} fontWeight={destTextWeight} fill={destTextColor} textAnchor="middle">{props.destName1}</text>
      <circle cx={mWidth} cy={rectHeight + rectPadding} r={destPointRadius} fill={stopColor1} stroke={baseColor} strokeWidth={destStrokeWidth} />
      <text x={mWidth} y={dest2MarginTop} fontSize={destTextSize} fontWeight={destTextWeight} fill={destTextColor} textAnchor="middle">{props.destName2}</text>
    </svg>
  );
};

export default BusStopView;
