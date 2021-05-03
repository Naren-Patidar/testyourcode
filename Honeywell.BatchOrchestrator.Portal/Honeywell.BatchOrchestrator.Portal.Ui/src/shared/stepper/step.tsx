/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@scuf/common';
import './stepper.scss';

const Step = (props) => {
  // constructor() {
  //   super();
  //   this.getStyles = this.getStyles.bind(this);
  // }

  const getStyles = () => {
    const {
      activeColor,
      completeColor,
      defaultColor,
      circleFontColor,
      activeTitleColor,
      completeTitleColor,
      defaultTitleColor,
      size,
      circleFontSize,
      titleFontSize,
      circleTop,
      titleTop,
      width,
      completeOpacity,
      activeOpacity,
      defaultOpacity,
      completeTitleOpacity,
      activeTitleOpacity,
      defaultTitleOpacity,
      barStyle,
      defaultBarColor,
      completeBarColor,
      defaultBorderColor,
      completeBorderColor,
      activeBorderColor,
      defaultBorderStyle,
      completeBorderStyle,
      activeBorderStyle,
      lineMarginOffset,
      defaultBorderWidth,
    } = props;
    const position = 'relative';
    return {
      step: {
        width: `${width}%`,
        display: 'table-cell',
        position: `${position}`,
        paddingTop: circleTop,
      } as React.CSSProperties,
      circle: {
        width: size,
        height: size,
        margin: '0 auto -0.25rem',
        backgroundColor: defaultColor,
        borderRadius: '50%',
        textAlign: 'center',
        padding: 1,
        fontSize: circleFontSize,
        color: circleFontColor,
        display: 'block',
        opacity: defaultOpacity,
        borderWidth: defaultBorderColor ? defaultBorderWidth : 0,
        borderColor: defaultBorderColor,
        borderStyle: defaultBorderStyle,
      },
      activeCircle: {
        backgroundColor: activeColor,
        opacity: activeOpacity,
        borderWidth: activeBorderColor ? defaultBorderWidth : 0,
        borderColor: activeBorderColor,
        borderStyle: activeBorderStyle,
      },
      completedCircle: {
        backgroundColor: completeColor,
        opacity: completeOpacity,
        borderWidth: completeBorderColor ? defaultBorderWidth : 0,
        borderColor: completeBorderColor,
        borderStyle: completeBorderStyle,
      },
      circleDisable: {
        width: '12px', // size,
        height: '12px', // size,
        margin: '0 auto',
        backgroundColor: defaultColor,
        borderRadius: '50%',
        textAlign: 'center',
        padding: 1,
        fontSize: circleFontSize,
        color: circleFontColor,
        display: 'block',
        opacity: defaultOpacity,
        borderWidth: defaultBorderColor ? defaultBorderWidth : 0,
        borderColor: defaultBorderColor,
        borderStyle: defaultBorderStyle,
      },
      index: {
        lineHeight: `${size + circleFontSize / 30}px`,
        color: circleFontColor,
      },
      title: {
        marginTop: '0.75rem', // titleTop,
        fontSize: titleFontSize,
        fontWeight: 600,
        textAlign: 'center',
        display: 'block',
        color: defaultTitleColor,
        opacity: defaultTitleOpacity,
      },
      activeTitle: {
        color: activeTitleColor,
        opacity: activeTitleOpacity,
      },
      completedTitle: {
        color: completeTitleColor,
        opacity: completeTitleOpacity,
      },
      leftBar: {
        position: 'absolute',
        top: circleTop + size / 2,
        height: 1,
        borderTopStyle: barStyle,
        borderTopWidth: 2,
        borderTopColor: defaultBarColor,
        left: 0,
        right: '50%',
        marginRight: size / 2 + lineMarginOffset,
        opacity: defaultOpacity,
      },
      rightBar: {
        position: 'absolute',
        top: circleTop + size / 2,
        height: 1,
        borderTopStyle: barStyle,
        borderTopWidth: 2,
        borderTopColor: defaultBarColor,
        right: 0,
        left: '50%',
        marginLeft: size / 2 + lineMarginOffset,
        opacity: defaultOpacity,
      },
      completedBar: {
        borderTopStyle: barStyle,
        borderTopWidth: 2,
        borderTopColor: completeBarColor,
        opacity: completeOpacity,
      },
      imgStyle: {
        verticalAlign: 'top',
        marginTop: '0.15rem',
      },
    };
  };

  const {
    title,
    icon,
    index,
    active,
    completed,
    first,
    isLast,
    href,
    onClick,
  } = props;

  const styles = getStyles();
  const circleStyle = Object.assign(
    completed || active ? styles.circle : {},
    !completed && !active ? styles.circleDisable : {},
    completed ? styles.completedCircle : {},
    active ? styles.activeCircle : {}
  ) as React.CSSProperties;
  const titleStyle = Object.assign(
    styles.title,
    completed ? styles.completedTitle : {},
    active ? styles.activeTitle : {}
  ) as React.CSSProperties;
  const leftStyle = Object.assign(
    styles.leftBar,
    active || completed ? styles.completedBar : {}
  ) as React.CSSProperties;
  const rightStyle = Object.assign(
    styles.rightBar,
    completed ? styles.completedBar : {}
  ) as React.CSSProperties;

  const stepContent = icon ? (
    <img src={icon} alt={index + 1} />
  ) : (
    <Icon root="common" name="check" size="small" />
  );
  const stepContentActive = icon ? (
    <img style={styles.imgStyle} src={icon} alt={index + 1} />
  ) : (
    // <img style={styles.imgStyle} src="icons/User_White.svg" alt={index + 1} />
    // <Icon root="common" name="check" size="small" color="white" />
    <div className="step-active">
      <div className="step-indicator" />
    </div>
  );
  const stepContentCompleted = icon ? (
    <img style={styles.imgStyle} src={icon} alt={index + 1} />
  ) : (
    // <img style={styles.imgStyle} src="icons/Home_White.svg" alt={index + 1} />
    // <Icon root="common" name="check" size="small" color="white" />
    // <div className="step-completed">
    //   <div className="step-indicator" />
    // </div>
    <div className="step-completed-indicator" />
  );

  return (
    <div className="step" style={styles.step}>
      <div className="circle" style={circleStyle}>
        {!active && !completed && (
          <span className="position-absolute" style={styles.index}>
            {stepContent}
          </span>
        )}
        {active && (
          <a href={href} onClick={onClick} style={styles.index}>
            {stepContentActive}
          </a>
        )}
        {completed && (
          <a href={href} onClick={onClick} style={styles.index}>
            {stepContentCompleted}
          </a>
        )}

        {/* {active || completed ? (
           <a href={href} onClick={onClick} style={ styles.index }>{ stepContent }</a>                
        ) : (
          <span style={ styles.index }>{ stepContent }</span>
        )} */}
      </div>
      {active || completed ? (
        <a href={href} onClick={onClick} style={titleStyle}>
          {title}
        </a>
      ) : (
        <div style={titleStyle}>{title}</div>
      )}
      {!first && (
        <div
          className={active || completed ? '' : 'connector-left'}
          style={leftStyle}
        />
      )}
      {!isLast && (
        <div
          className={active || completed ? '' : 'connector-right'}
          style={rightStyle}
        />
      )}
    </div>
  );
};

Step.defaultProps = {
  activeColor: '#4E9C3E',
  completeColor: '#4E9C3E',
  completeBarColor: '#4E9C3E',
  defaultColor: '#404040',
  activeTitleColor: '#C0C0C0',
  completeTitleColor: '#C0C0C0',
  defaultTitleColor: '#5A5A5A',
  circleFontColor: '#404040',
  size: 20,
  circleFontSize: 12,
  titleFontSize: 12,
  circleTop: 14,
  titleTop: 4,
  defaultBarColor: '#404040',
  barStyle: 'solid',
  borderStyle: 'solid',
  lineMarginOffset: 0,
  defaultBorderWidth: 3,
};

Step.propTypes = {
  width: PropTypes.number.isRequired,
  activeColor: PropTypes.string,
  completeColor: PropTypes.string,
  defaultColor: PropTypes.string,
  activeTitleColor: PropTypes.string,
  completeTitleColor: PropTypes.string,
  defaultTitleColor: PropTypes.string,
  circleFontColor: PropTypes.string,
  size: PropTypes.number,
  circleFontSize: PropTypes.number,
  titleFontSize: PropTypes.number,
  circleTop: PropTypes.number,
  titleTop: PropTypes.number,
  title: PropTypes.string,
  index: PropTypes.number,
  active: PropTypes.bool,
  completed: PropTypes.bool,
  first: PropTypes.bool,
  isLast: PropTypes.bool,
  completeOpacity: PropTypes.string,
  activeOpacity: PropTypes.string,
  defaultOpacity: PropTypes.string,
  completeTitleOpacity: PropTypes.string,
  activeTitleOpacity: PropTypes.string,
  defaultTitleOpacity: PropTypes.string,
  barStyle: PropTypes.string,
  defaultBarColor: PropTypes.string,
  completeBarColor: PropTypes.string,
  defaultBorderColor: PropTypes.string,
  completeBorderColor: PropTypes.string,
  activeBorderColor: PropTypes.string,
  defaultBorderStyle: PropTypes.string,
  completeBorderStyle: PropTypes.string,
  activeBorderStyle: PropTypes.string,
  lineMarginOffset: PropTypes.number,
  defaultBorderWidth: PropTypes.number,
  icon: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

export default Step;
