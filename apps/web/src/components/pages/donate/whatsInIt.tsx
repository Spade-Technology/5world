import HowItWorks from '~/components/misc/howItWorks'

export const WhatsInIt = () => {
  return (
    <HowItWorks
      contents={[
        {
          heading: 'What’s in it for me?',
          content:
            'There is no minimum donation amount. All donors get to rest in the knowledge that they are contributing to ecosystem regeneration.',
        },
        {
          heading: 'Badges',
          content:
            'For those who want a little more, we offer the following ‘Proof of Virtue’ badges. A must have item for all discerning donors who want to signal publicly that they are supporting efforts to regenerate the plant’s ecosystems. Each badge also contains 100voting credits, enabling holders to vote in quadratic funding rounds and have some say over where their donations are being spent.',
        },
      ]}
    />
  )
}

export default WhatsInIt
