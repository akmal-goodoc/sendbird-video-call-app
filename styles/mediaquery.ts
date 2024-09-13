interface DeviceSizeProps {
    [key: string]: number;
  }
  
  const DEVICE_SIZE: DeviceSizeProps = {
    desktop: 1440,
    tablet: 1024,
    mobile: 600
  };
  
  const mq = {
    desktop: `@media (min-width: ${DEVICE_SIZE.desktop}px)`,
    laptop: `@media (min-width: ${DEVICE_SIZE.tablet}px) and (max-width: ${
      DEVICE_SIZE.desktop - 1
    }px)`,
    tablet: `@media (min-width: ${DEVICE_SIZE.mobile}px) and (max-width: ${
      DEVICE_SIZE.tablet - 1
    }px)`,
    mobile: ` @media (max-width: ${DEVICE_SIZE.mobile - 1}px)`
  };
  
  export { mq };
  