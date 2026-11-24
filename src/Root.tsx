import {Composition} from 'remotion';
import {Walkthrough, totalFrames} from './Walkthrough';

export const Root = () => (
  <Composition id="Walkthrough" component={Walkthrough} durationInFrames={totalFrames} fps={30} width={1920} height={1080} />
);
