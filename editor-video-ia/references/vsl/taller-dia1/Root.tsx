import { Composition } from "remotion";
import { Main, FPS, TOTAL } from "./video";

export const Root = () => (
  <Composition id="Main" component={Main} durationInFrames={Math.round(TOTAL * FPS)} fps={FPS} width={1920} height={1080} />
);
