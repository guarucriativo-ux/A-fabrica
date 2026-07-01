import { Composition, registerRoot } from 'remotion'
import { P1FraseImpacto, p1Config } from './templates/P1-FraseImpacto'
import { Demo, demoConfig } from './demo/Demo'

export const RemotionRoot = () => {
  return (
    <>
      <Composition id={p1Config.id} component={p1Config.component} durationInFrames={p1Config.durationInFrames} fps={p1Config.fps} width={p1Config.width} height={p1Config.height} />
      <Composition id={demoConfig.id} component={demoConfig.component} durationInFrames={demoConfig.durationInFrames} fps={demoConfig.fps} width={demoConfig.width} height={demoConfig.height} />
    </>
  )
}

registerRoot(RemotionRoot)
