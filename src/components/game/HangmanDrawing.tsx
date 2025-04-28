
import * as React from "react";

interface HangmanDrawingProps {
  numberOfGuesses: number;
}

const BASE_WIDTH = 200;
const BASE_HEIGHT = 20;
const POST_V_HEIGHT = 250;
const POST_V_WIDTH = 15;
const POST_H_WIDTH = 120;
const POST_H_HEIGHT = 15;
const ROPE_LENGTH = 40;
const HEAD_RADIUS = 30;
const BODY_LENGTH = 80;
const ARM_LENGTH = 40;
const LEG_LENGTH = 50;

const STROKE_WIDTH = 4;
const STROKE_COLOR = "hsl(var(--foreground))"; // Use theme foreground color

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
  const viewBoxWidth = BASE_WIDTH + POST_V_WIDTH + 20; // Add some padding
  const viewBoxHeight = BASE_HEIGHT + POST_V_HEIGHT + ROPE_LENGTH + HEAD_RADIUS * 2 + 20; // Add some padding

  // Calculate starting points dynamically based on viewBox dimensions
  const baseX = 10;
  const baseY = viewBoxHeight - BASE_HEIGHT - 10;
  const postVX = baseX + BASE_WIDTH / 2 - POST_V_WIDTH / 2;
  const postVY = baseY - POST_V_HEIGHT;
  const postHX = postVX + POST_V_WIDTH;
  const postHY = postVY;
  const ropeX = postHX + POST_H_WIDTH - POST_V_WIDTH / 2; // Center rope on horizontal post end
  const ropeY = postHY + POST_H_HEIGHT;
  const headX = ropeX;
  const headY = ropeY + ROPE_LENGTH + HEAD_RADIUS;
  const bodyYStart = headY + HEAD_RADIUS;
  const bodyYEnd = bodyYStart + BODY_LENGTH;
  const armY = bodyYStart + BODY_LENGTH * 0.25;
  const legY = bodyYEnd;

  // Hangman parts based on the number of incorrect guesses
  const parts = [
    // 1. Base
    <rect key="base" x={baseX} y={baseY} width={BASE_WIDTH} height={BASE_HEIGHT} fill={STROKE_COLOR} />,
    // 2. Vertical Post
    <rect key="postV" x={postVX} y={postVY} width={POST_V_WIDTH} height={POST_V_HEIGHT} fill={STROKE_COLOR} />,
    // 3. Horizontal Post
    <rect key="postH" x={postHX} y={postHY} width={POST_H_WIDTH} height={POST_H_HEIGHT} fill={STROKE_COLOR} />,
    // 4. Rope
    <line key="rope" x1={ropeX} y1={ropeY} x2={ropeX} y2={ropeY + ROPE_LENGTH} stroke={STROKE_COLOR} strokeWidth={STROKE_WIDTH} />,
    // 5. Head
    <circle key="head" cx={headX} cy={headY} r={HEAD_RADIUS} stroke={STROKE_COLOR} strokeWidth={STROKE_WIDTH} fill="none" />,
    // 6. Body/Torso
    <line key="body" x1={headX} y1={bodyYStart} x2={headX} y2={bodyYEnd} stroke={STROKE_COLOR} strokeWidth={STROKE_WIDTH} />,
    // 7. Left Arm
    <line key="armL" x1={headX} y1={armY} x2={headX - ARM_LENGTH} y2={armY + ARM_LENGTH * 0.5} stroke={STROKE_COLOR} strokeWidth={STROKE_WIDTH} />,
    // 8. Right Arm
    <line key="armR" x1={headX} y1={armY} x2={headX + ARM_LENGTH} y2={armY + ARM_LENGTH * 0.5} stroke={STROKE_COLOR} strokeWidth={STROKE_WIDTH} />,
    // 9. Left Leg
    <line key="legL" x1={headX} y1={legY} x2={headX - LEG_LENGTH} y2={legY + LEG_LENGTH} stroke={STROKE_COLOR} strokeWidth={STROKE_WIDTH} />,
    // 10. Right Leg
    <line key="legR" x1={headX} y1={legY} x2={headX + LEG_LENGTH} y2={legY + LEG_LENGTH} stroke={STROKE_COLOR} strokeWidth={STROKE_WIDTH} />,
  ];

  return (
    <div style={{ width: '200px', height: '300px', margin: 'auto' }}>
      <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} preserveAspectRatio="xMidYMid meet">
        {/* Render parts up to the current number of incorrect guesses */}
        {parts.slice(0, numberOfGuesses)}
      </svg>
    </div>
  );
}
