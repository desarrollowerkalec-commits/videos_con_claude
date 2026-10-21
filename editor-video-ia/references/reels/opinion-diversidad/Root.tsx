import { Composition } from "remotion";
import { Main, FPS, TOTAL } from "./video";
import { Cover } from "./Cover";

export const Root = () => (
  <>
    <Composition id="Main" component={Main} durationInFrames={Math.round(TOTAL * FPS)} fps={FPS} width={1080} height={1920} />
    <Composition id="Cover" component={Cover} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  </>
);
