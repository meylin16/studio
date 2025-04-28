
import * as React from "react";
import { cn } from "@/lib/utils"; // Import cn for conditional classes

interface HangmanDrawingProps {
  numberOfGuesses: number;
}

// Constants for drawing proportions relative to a base size (e.g., 100)
// This makes scaling easier if needed later.
const BASE_SCALE = 100;
const BASE_WIDTH_REL = 1;
const BASE_HEIGHT_REL = 0.1;
const POST_V_HEIGHT_REL = 1.25;
const POST_V_WIDTH_REL = 0.075;
const POST_H_WIDTH_REL = 0.6;
const POST_H_HEIGHT_REL = 0.075;
const ROPE_LENGTH_REL = 0.2;
const HEAD_RADIUS_REL = 0.15;
const BODY_LENGTH_REL = 0.4;
const ARM_LENGTH_REL = 0.2;
const LEG_LENGTH_REL = 0.25;
const STROKE_WIDTH_REL = 0.02;

const STROKE_COLOR = "hsl(var(--foreground))"; // Use theme foreground color

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
  // Define the viewBox based on relative proportions for inherent scaling
  // Add padding around the drawing elements
  const padding = BASE_SCALE * 0.1;
  const drawingWidth = BASE_SCALE * BASE_WIDTH_REL + POST_V_WIDTH_REL * BASE_SCALE + padding * 2;
  const drawingHeight = (
      BASE_HEIGHT_REL +
      POST_V_HEIGHT_REL +
      ROPE_LENGTH_REL +
      HEAD_RADIUS_REL * 2 +
      LEG_LENGTH_REL
  ) * BASE_SCALE + padding * 2;

  const viewBox = `0 0 ${drawingWidth} ${drawingHeight}`;

  // Calculate points based on relative units and drawing dimensions
  const baseX = padding;
  const baseY = drawingHeight - (BASE_HEIGHT_REL * BASE_SCALE) - padding;
  const postVX = baseX + (BASE_WIDTH_REL * BASE_SCALE) / 2 - (POST_V_WIDTH_REL * BASE_SCALE) / 2;
  const postVY = baseY - (POST_V_HEIGHT_REL * BASE_SCALE);
  const postHX = postVX + (POST_V_WIDTH_REL * BASE_SCALE);
  const postHY = postVY;
  const ropeX = postHX + (POST_H_WIDTH_REL * BASE_SCALE) - (POST_V_WIDTH_REL * BASE_SCALE) / 2;
  const ropeY = postHY + (POST_H_HEIGHT_REL * BASE_SCALE);
  const headX = ropeX;
  const headY = ropeY + (ROPE_LENGTH_REL * BASE_SCALE) + (HEAD_RADIUS_REL * BASE_SCALE);
  const bodyYStart = headY + (HEAD_RADIUS_REL * BASE_SCALE);
  const bodyYEnd = bodyYStart + (BODY_LENGTH_REL * BASE_SCALE);
  const armY = bodyYStart + (BODY_LENGTH_REL * BASE_SCALE) * 0.25;
  const legY = bodyYEnd;

  // Scale stroke width
  const strokeWidth = STROKE_WIDTH_REL * BASE_SCALE;

  // Hangman parts
  const parts = [
    // 1. Base
    <rect key="base" x={baseX} y={baseY} width={BASE_WIDTH_REL * BASE_SCALE} height={BASE_HEIGHT_REL * BASE_SCALE} fill={STROKE_COLOR} />,
    // 2. Vertical Post
    <rect key="postV" x={postVX} y={postVY} width={POST_V_WIDTH_REL * BASE_SCALE} height={POST_V_HEIGHT_REL * BASE_SCALE} fill={STROKE_COLOR} />,
    // 3. Horizontal Post
    <rect key="postH" x={postHX} y={postHY} width={POST_H_WIDTH_REL * BASE_SCALE} height={POST_H_HEIGHT_REL * BASE_SCALE} fill={STROKE_COLOR} />,
    // 4. Rope
    <line key="rope" x1={ropeX} y1={ropeY} x2={ropeX} y2={ropeY + ROPE_LENGTH_REL * BASE_SCALE} stroke={STROKE_COLOR} strokeWidth={strokeWidth} />,
    // 5. Head
    <circle key="head" cx={headX} cy={headY} r={HEAD_RADIUS_REL * BASE_SCALE} stroke={STROKE_COLOR} strokeWidth={strokeWidth} fill="none" />,
    // 6. Body/Torso
    <line key="body" x1={headX} y1={bodyYStart} x2={headX} y2={bodyYEnd} stroke={STROKE_COLOR} strokeWidth={strokeWidth} />,
    // 7. Left Arm
    <line key="armL" x1={headX} y1={armY} x2={headX - ARM_LENGTH_REL * BASE_SCALE} y2={armY + (ARM_LENGTH_REL * BASE_SCALE) * 0.5} stroke={STROKE_COLOR} strokeWidth={strokeWidth} />,
    // 8. Right Arm
    <line key="armR" x1={headX} y1={armY} x2={headX + ARM_LENGTH_REL * BASE_SCALE} y2={armY + (ARM_LENGTH_REL * BASE_SCALE) * 0.5} stroke={STROKE_COLOR} strokeWidth={strokeWidth} />,
    // 9. Left Leg
    <line key="legL" x1={headX} y1={legY} x2={headX - LEG_LENGTH_REL * BASE_SCALE} y2={legY + LEG_LENGTH_REL * BASE_SCALE} stroke={STROKE_COLOR} strokeWidth={strokeWidth} />,
    // 10. Right Leg
    <line key="legR" x1={headX} y1={legY} x2={headX + LEG_LENGTH_REL * BASE_SCALE} y2={legY + LEG_LENGTH_REL * BASE_SCALE} stroke={STROKE_COLOR} strokeWidth={strokeWidth} />,
  ];

  return (
    // Use Tailwind for responsive sizing and centering
    <div className="w-full max-w-[150px] sm:max-w-[180px] md:max-w-[200px] mx-auto aspect-[2/3]">
      <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet" className="w-full h-full">
        {/* Render parts up to the current number of incorrect guesses */}
        {parts.slice(0, numberOfGuesses)}
      </svg>
    </div>
  );
}
