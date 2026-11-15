import { Composition } from "remotion";
import { Main, TOTAL } from "./video";
export const Root = () => (
  <Composition id="Main" component={Main} durationInFrames={Math.ceil(TOTAL * 30)} fps={30} width={1080} height={1920} />
);
