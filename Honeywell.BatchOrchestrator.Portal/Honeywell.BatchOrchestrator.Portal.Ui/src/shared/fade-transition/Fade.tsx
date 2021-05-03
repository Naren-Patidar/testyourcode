import { Transition } from 'react-transition-group';

const duration = 250;

const defaultInStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionInStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export const FadeIn: React.FC<{ show: boolean }> = ({ show, children }) => (
  <Transition in={show} timeout={duration}>
    {(state) => (
      <div
        style={{
          ...defaultInStyle,
          ...transitionInStyles[state],
        }}
      >
        {children}
      </div>
    )}
  </Transition>
);

const defaultOutStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 1,
};

const transitionOutStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};
export const FadeOut: React.FC<{ show: boolean }> = ({ show, children }) => (
  <Transition in={show} timeout={duration}>
    {(state) => (
      <div
        style={{
          ...defaultOutStyle,
          ...transitionOutStyles[state],
        }}
      >
        {children}
      </div>
    )}
  </Transition>
);
