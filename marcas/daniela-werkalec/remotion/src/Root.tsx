import { Composition } from "remotion";
import { Main, CTA_SECONDS } from "./video";
import { Cover } from "./Cover";
import { DURATION } from "./words";

export const FPS = 30;

export const Root = () => (
  <>
    <Composition
      id="Main"
      component={Main}
      durationInFrames={Math.ceil((DURATION + CTA_SECONDS) * FPS)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition id="Cover" component={Cover} durationInFrames={30} fps={FPS} width={1080} height={1920} />
  </>
);
