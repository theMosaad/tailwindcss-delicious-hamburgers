const plugin = require(`tailwindcss/plugin`)

const rmPX = (value) => (value.endsWith(`px`) ? value.replace(`px`, ``) : ``)
const rmS = (value) => (value.endsWith(`s`) ? value.replace(`s`, ``) : ``)

module.exports = plugin.withOptions((options = {}) => {
  return ({ theme, e, addComponents }) => {
    const componentPrefix = options.componentPrefix ?? `c-`
    const className = options.className ?? `hamburger`
    const activeClassName = options.activeClassName ?? `active`

    const hamburger = theme(`deliciousHamburgers`, {})
    const size = hamburger.size ? rmPX(hamburger.size) : `50`
    const width = hamburger.width ? rmPX(hamburger.width) : size
    const thickness = hamburger.thickness ? rmPX(hamburger.thickness) : `2`
    const color = hamburger.color ?? `#000`
    const colorHover = hamburger.colorHover ?? hamburger.color
    const colorActive = hamburger.colorActive ?? hamburger.color
    const background = hamburger.background ?? `transparent`
    const backgroundHover = hamburger.backgroundHover ?? hamburger.background
    const backgroundActive = hamburger.backgroundActive ?? hamburger.background
    const colorLight = hamburger.colorLight ?? `#fff`
    const colorHoverLight = hamburger.colorHoverLight ?? hamburger.colorLight
    const colorActiveLight = hamburger.colorActiveLight ?? hamburger.colorLight
    const backgroundLight = hamburger.backgroundLight ?? `transparent`
    const backgroundHoverLight = hamburger.backgroundHoverLight ?? hamburger.backgroundLight
    const backgroundActiveLight = hamburger.backgroundActiveLight ?? hamburger.backgroundLight
    const backgroundTransitionSpeed = hamburger.backgroundTransitionSpeed
      ? rmS(hamburger.backgroundTransitionSpeed)
      : `0.2`
    const borderColor = hamburger.borderColor ?? `transparent`
    const borderColorLight = hamburger.borderColorLight ?? `transparent`
    const borderWidth = hamburger.borderWidth ? rmPX(hamburger.borderWidth) : `0`
    const opacity = hamburger.opacity ?? 1
    const opacityHover = hamburger.opacityHover ?? 1
    const opacityTransitionSpeed = hamburger.opacityTransitionSpeed ? rmS(hamburger.opacityTransitionSpeed) : `0.2`
    const padding = hamburger.padding ? rmPX(hamburger.padding) : Math.round(size / 10)
    const borderRadius = hamburger.borderRadius ? rmPX(hamburger.borderRadius) : `0`
    const barBorderRadius = hamburger.barBorderRadius ? rmPX(hamburger.barBorderRadius) : `0`
    const barSpacing = hamburger.barSpacing ? rmPX(hamburger.barSpacing) : Math.round(size / 5)
    const animationSpeed = hamburger.animationSpeed ?? 2
    const easing = hamburger.easing ?? `cubic-bezier(0.645, 0.045, 0.355, 1)`
    const easingOut = hamburger.easingOut ?? `cubic-bezier(0.215, 0.61, 0.355, 1)`
    // const easingIn = hamburger.easingIn ?? `cubic-bezier(0.55, 0.055, 0.675, 0.19)`
    const barSize = hamburger.barSize ? rmPX(hamburger.barSize) : size - padding * 2 - borderWidth * 2

    const rootTwo = Math.sqrt(2)
    const arrowScale = 0.4
    const arrowOffset = barSpacing / rootTwo + thickness / 2 / rootTwo
    const crissCrossOffsetY = barSize / 2 / rootTwo
    const crissCrossOffsetX = barSize / 2 - crissCrossOffsetY
    const shelfOffsetY = barSize / 2 / rootTwo
    const shelfOffsetX = barSize / 2 - shelfOffsetY
    const spinOriginOffset = 0.4
    const spinOffsetFactor = 1 - 2 * spinOriginOffset
    const spinOffsetY = (barSize / 2 / rootTwo) * spinOffsetFactor
    const spinOffsetXA = (barSize / 2) * spinOffsetFactor + spinOffsetY
    const spinOffsetXB = (barSize / 2) * spinOffsetFactor - spinOffsetY
    const twistOriginOffset = 0.4
    const twistOffsetFactor = 1 - 2 * twistOriginOffset
    const twistOffsetY = (barSize / 2 / rootTwo) * twistOffsetFactor
    const twistOffsetX = (barSize / 2) * twistOffsetFactor + twistOffsetY
    const verticalOriginOffset = -1.25
    const verticalOffsetFactor = 1 - 2 * verticalOriginOffset
    const verticalOffsetY = (barSize / 2 / rootTwo) * verticalOffsetFactor
    const verticalOffsetX = (barSize / 2) * verticalOffsetFactor - verticalOffsetY

    const bar = {
      backgroundColor: `var(--hamburger-color)`,
      borderRadius: `${barBorderRadius}px`,
      content: `''`,
      display: `block`,
      height: `${thickness}px`,
      position: `absolute`,
      width: `100%`,
    }

    const hamburgerComponent = {
      [`button.${e(`${componentPrefix}${className}`)}`]: {
        height: `${size}px`,
        width: `${width}px`,
      },

      [`div.${e(`${componentPrefix}${className}`)}`]: {
        height: `${size - borderWidth * 2}px`,
        width: `${width - borderWidth * 2}px`,

        [`> .${e(`${componentPrefix}${className}`)}-inner`]: {
          top: `50%`,
        },
      },

      [`.${e(`${componentPrefix}${className}`)}`]: {
        '--hamburger-color': color,
        '--hamburger-color-hover': colorHover,
        '--hamburger-color-active': colorActive,
        '--hamburger-background': background,
        '--hamburger-background-hover': backgroundHover,
        '--hamburger-background-active': backgroundActive,
        '--hamburger-border-color': borderColor,
        backgroundColor: `var(--hamburger-background)`,
        border: `${borderWidth}px var(--hamburger-border-color) solid`,
        borderRadius: `${borderRadius}px`,
        color: `inherit`,
        cursor: `pointer`,
        display: `inline-block`,
        font: `inherit`,
        opacity: opacity,
        overflow: `visible`,
        padding: `${padding}px`,
        textTransform: `none`,
        transition: `opacity ${opacityTransitionSpeed}s ${easing}, background ${backgroundTransitionSpeed}s ${easing}`,

        '&:hover': {
          backgroundColor: `var(--hamburger-background-hover)`,
          opacity: opacityHover,

          [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
            backgroundColor: `var(--hamburger-color-hover)`,
          },

          [`> .${e(`${componentPrefix}${className}`)}-inner, span.${e(`${componentPrefix}${className}`)}-bar`]: {
            '&:nth-child(1), &:nth-child(2), &:nth-child(3)': {
              '&::before, &::after': {
                backgroundColor: `var(--hamburger-color-hover)`,
              },
            },
          },
        },

        [`&.${e(`${activeClassName}`)}`]: {
          backgroundColor: `var(--hamburger-background-active)`,

          [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
            backgroundColor: `var(--hamburger-color-active)`,
          },

          [`> .${e(`${componentPrefix}${className}`)}-inner, span.${e(`${componentPrefix}${className}`)}-bar`]: {
            '&:nth-child(1), &:nth-child(2), &:nth-child(3)': {
              '&::before, &::after': {
                backgroundColor: `var(--hamburger-color-active)`,
              },
            },
          },
        },

        [`> .${e(`${componentPrefix}${className}`)}-inner`]: {
          margin: 0,
          marginTop: `${(-1 * thickness) / 2}px`,
          position: `relative`,
          width: `100%`,
        },

        [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
          ...bar,

          '&:nth-child(1)': {
            top: `${-1 * barSpacing}px`,
          },

          '&:nth-child(3)': {
            top: `${barSpacing}px`,
          },
        },

        '&:focus': {
          outline: 0,
        },

        [`&.${e(`${componentPrefix}${className}`)}--light`]: {
          '--hamburger-color': colorLight,
          '--hamburger-color-hover': colorHoverLight,
          '--hamburger-color-active': colorActiveLight,
          '--hamburger-background': backgroundLight,
          '--hamburger-background-hover': backgroundHoverLight,
          '--hamburger-background-active': backgroundActiveLight,
          '--hamburger-border-color': borderColorLight,
        },
      },

      [`.${e(`${componentPrefix}${className}`)}--apple`]: {
        [`> .${e(`${componentPrefix}${className}`)}-inner`]: {
          transition: `transform ${0.5 / animationSpeed}s ${easing}`,
        },

        [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
          transition: `transform ${0.35 / animationSpeed}s ${easing}`,

          '&:nth-child(1)': {
            top: 0,
            transform: `translate3d(0, ${Math.round(-1 * barSpacing * 0.8)}px, 0)`,
          },

          '&:nth-child(2)': {
            top: 0,
            transform: `translate3d(0, ${Math.round(barSpacing * 0.8)}px, 0)`,
          },

          '&:nth-child(3)': {
            display: `none`,
          },
        },

        [`&.${e(`${activeClassName}`)}`]: {
          [`> .${e(`${componentPrefix}${className}`)}-inner`]: {
            transform: `rotate(90deg) translate3d(${thickness / 2}px, ${(-1 * thickness) / 2}px, 0)`,
            transition: `transform ${0.35 / animationSpeed}s ${easing}`,
          },

          [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
            transition: `transform ${0.35 / animationSpeed}s ${easing} ${0.15 / animationSpeed}s`,

            '&:nth-child(1)': {
              transform: `rotate(45deg) translate3d(0, 0, 0)`,
            },

            '&:nth-child(2)': {
              transform: `rotate(-45deg) translate3d(0, 0, 0)`,
            },
          },
        },
      },

      [`.${e(`${componentPrefix}${className}`)}--arrow, .${e(`${componentPrefix}${className}`)}--arrow-right`]: {
        [`> .${e(`${componentPrefix}${className}`)}-inner`]: {
          transition: `transform ${0.5 / animationSpeed}s ${easing}`,
        },

        [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
          transition: `transform ${0.3 / animationSpeed}s ${easing}`,
          transitionDelay: `${0.1 / animationSpeed}s`,

          '&:nth-child(1)': {
            transformOrigin: `100% 0`,
          },

          '&:nth-child(2)': {
            transformOrigin: `0 0`,
          },

          '&:nth-child(3)': {
            transformOrigin: `100% 100%`,
          },
        },

        [`&.${e(`${activeClassName}`)}`]: {
          [`> .${e(`${componentPrefix}${className}`)}-inner`]: {
            transform: `rotate(180deg) translate3d(0, ${-1 * thickness}px, 0)`,
          },

          [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
            transitionDelay: `0s`,

            '&:nth-child(1)': {
              transform: `rotate(45deg) scaleX(${arrowScale}) translate3d(${
                arrowOffset / arrowScale
              }px, ${arrowOffset}px, 0)`,
            },

            '&:nth-child(2)': {
              transform: `scaleX(${1 - thickness / barSize})`,
            },

            '&:nth-child(3)': {
              transform: `rotate(-45deg) scaleX(${arrowScale}) translate3d(${arrowOffset / arrowScale}px, ${
                -1 * arrowOffset
              }px, 0)`,
            },
          },
        },
      },

      [`.${e(`${componentPrefix}${className}`)}--arrow-right`]: {
        [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
          '&:nth-child(1)': {
            transformOrigin: `0 0`,
          },

          '&:nth-child(2)': {
            transformOrigin: `100% 0`,
          },

          '&:nth-child(3)': {
            left: `0`,
            transformOrigin: `0 100%`,
          },
        },

        [`&.${e(`${activeClassName}`)}`]: {
          [`> .${e(`${componentPrefix}${className}`)}-inner`]: {
            transform: `rotate(-180deg) translate3d(0, ${-1 * thickness}, 0)`,
          },

          [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
            '&:nth-child(1)': {
              transform: `rotate(-45deg) scaleX(${arrowScale}) translate3d(${
                (-1 * arrowOffset) / arrowScale
              }px, ${arrowOffset}px, 0)`,
            },

            '&:nth-child(2)': {
              transform: `scaleX(${1 - thickness / barSize})`,
            },

            '&:nth-child(3)': {
              transform: `rotate(45deg) scaleX(${arrowScale}) translate3d(${(-1 * arrowOffset) / arrowScale}px, ${
                -1 * arrowOffset
              }px, 0)`,
            },
          },
        },
      },

      [`.${e(`${componentPrefix}${className}`)}--chop`]: {
        [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
          transition: `transform ${0.3 / animationSpeed}s ${easing},
                opacity ${0.3 / animationSpeed}s ${easing}`,

          '&:nth-child(1)': {
            top: 0,
            transform: `translate3d(0, ${-1 * barSpacing}px, 0)`,
          },

          '&:nth-child(2)': {
            opacity: `1`,
            transformOrigin: `15% 50%`,
          },

          '&:nth-child(3)': {
            top: `0`,
            transform: `translate3d(0, ${barSpacing}px, 0)`,
          },
        },

        [`&.${e(`${activeClassName}`)}`]: {
          [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
            top: 0,

            '&:nth-child(1)': {
              transform: `rotate(45deg)`,
            },

            '&:nth-child(2)': {
              opacity: `0`,
              transform: `scale(0)`,
            },

            '&:nth-child(3)': {
              transform: `rotate(-45deg)`,
            },
          },
        },
      },

      [`.${e(`${componentPrefix}${className}`)}--collapse`]: {
        [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
          transition: `transform ${0.3 / animationSpeed}s ${easing} ${0.2 / animationSpeed}s,
                opacity ${0.25 / animationSpeed}s ${easing} ${0.25 / animationSpeed}s`,

          '&::before': {
            ...bar,
            transition: `transform ${0.35 / animationSpeed}s ${easing}, background ${0.35 / animationSpeed}s ${easing}`,
          },

          '&:nth-child(1), &:nth-child(3)': {
            background: `none`,
            top: `0`,
          },

          '&:nth-child(1)': {
            transform: `translate3d(0, ${-1 * barSpacing}px, 0)`,
          },

          '&:nth-child(3)': {
            transform: `translate3d(0, ${barSpacing}px, 0)`,
          },
        },

        [`&.${e(`${activeClassName}`)}`]: {
          [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
            transition: `transform ${0.25 / animationSpeed}s ${easing},
            opacity ${0.25 / animationSpeed}s ${easing}`,

            '&:nth-child(1), &:nth-child(3)': {
              transform: `translate3d(0, 0, 0)`,

              '&::before': {
                transition: `transform ${0.35 / animationSpeed}s ${easing} ${0.15 / animationSpeed}s,
                  background ${0.35 / animationSpeed}s ${easing} ${0.15 / animationSpeed}s`,
              },
            },

            '&:nth-child(1)': {
              '&::before': {
                transform: `rotate(135deg)`,
              },
            },

            '&:nth-child(2)': {
              opacity: `0`,
            },

            '&:nth-child(3)': {
              '&::before': {
                transform: `rotate(45deg)`,
              },
            },
          },
        },
      },

      [`.${e(`${componentPrefix}${className}`)}--converge`]: {
        [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
          transition: `transform ${0.3 / animationSpeed}s ${easing},
            opacity ${0.3 / animationSpeed}s ${easing}`,

          '&:nth-child(1)': {
            top: 0,
            transform: `translate3d(0, ${-1 * barSpacing}px, 0)`,
          },

          '&:nth-child(2)': {
            opacity: 1,
            transformOrigin: `20% 50%`,
          },

          '&:nth-child(3)': {
            top: 0,
            transform: `translate3d(0, ${barSpacing}px, 0)`,
          },
        },

        [`&.${e(`${activeClassName}`)}`]: {
          [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
            top: `0`,

            '&:nth-child(1)': {
              transform: `rotate(135deg)`,
            },

            '&:nth-child(2)': {
              opacity: `0`,
              transform: `scale(0)`,
            },

            '&:nth-child(3)': {
              transform: `rotate(-135deg)`,
            },
          },
        },
      },

      [`.${e(`${componentPrefix}${className}`)}--criss-cross`]: {
        [`> .${e(`${componentPrefix}${className}`)}-inner`]: {
          '&::before, &::after': {
            ...bar,
            opacity: `0`,
            transformOrigin: `0 50%`,
            transition: `transform ${0.4 / animationSpeed}s ${easing},
                  opacity ${0.4 / animationSpeed}s ${easing},
                  background ${0.4 / animationSpeed}s ${easing}`,
          },

          '&::before': {
            transform: `rotate(45deg) translate3d(${-1 * crissCrossOffsetX}px, ${
              -1 * crissCrossOffsetY
            }px, 0) scaleX(0)`,
          },

          '&::after': {
            transform: `rotate(-45deg) translate3d(${-1 * crissCrossOffsetX}px, ${crissCrossOffsetY}px, 0) scaleX(0)`,
            transitionDelay: `${0.1 / animationSpeed}s`,
          },
        },

        [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
          transition: `transform ${0.4 / animationSpeed}s ${easing},
                opacity ${0.4 / animationSpeed}s ${easing},
                width ${0.4 / animationSpeed}s ${easing}`,

          '&:nth-child(1)': {
            transitionDelay: `${(0.3 + 1 * 0.03) / animationSpeed}s`,
          },

          '&:nth-child(2)': {
            transitionDelay: `${(0.3 + 2 * 0.03) / animationSpeed}s`,
          },

          '&:nth-child(3)': {
            transitionDelay: `${(0.3 + 3 * 0.03) / animationSpeed}s`,
          },
        },

        [`&.${e(`${activeClassName}`)}`]: {
          [`> .${e(`${componentPrefix}${className}`)}-inner`]: {
            '&::before, &::after': {
              opacity: `1`,
            },

            '&::before': {
              transform: `rotate(45deg) translate3d(${-1 * crissCrossOffsetX}px, ${-1 * crissCrossOffsetY}px, 0)`,
              transitionDelay: `${0.4 / animationSpeed}s`,
            },

            '&::after': {
              transform: `rotate(-45deg) translate3d(${-1 * crissCrossOffsetX}px, ${crissCrossOffsetY}px, 0)`,
              transitionDelay: `${0.5 / animationSpeed}s`,
            },
          },

          [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
            opacity: `0`,
            transform: `translate3d(-10px, 0, 0)`,
            width: `50%`,

            '&:nth-child(1)': {
              transitionDelay: `${0 / animationSpeed}s`,
            },

            '&:nth-child(2)': {
              transitionDelay: `${0.2 / animationSpeed}s`,
            },

            '&:nth-child(3)': {
              transitionDelay: `${0.1 / animationSpeed}s`,
            },
          },
        },
      },

      [`.${e(`${componentPrefix}${className}`)}--default`]: {
        [`&.${e(`${activeClassName}`)}`]: {
          [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
            top: `0`,

            '&:nth-child(1)': {
              transform: `rotate(45deg)`,
            },

            '&:nth-child(2)': {
              display: `none`,
            },

            '&:nth-child(3)': {
              transform: `rotate(-45deg)`,
            },
          },
        },
      },

      [`.${e(`${componentPrefix}${className}`)}--dive`]: {
        [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
          transition: `transform ${0.4 / animationSpeed}s ${easing}`,

          '&:nth-child(1)': {
            top: `0`,
            transform: `translate3d(0, ${Math.round(-1 * barSpacing * 0.8)}px, 0)`,
          },

          '&:nth-child(2)': {
            top: `0`,
            transform: `translate3d(0, ${Math.round(barSpacing * 0.8)}px, 0)`,
          },

          '&:nth-child(3)': {
            display: `none`,
          },
        },

        [`&.${e(`${activeClassName}`)}`]: {
          [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
            '&:nth-child(1)': {
              transform: `rotate(135deg)`,
            },

            '&:nth-child(2)': {
              transform: `rotate(45deg)`,
            },
          },
        },
      },

      [`.${e(`${componentPrefix}${className}`)}--flatten`]: {
        [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
          transition: `transform ${0.3 / animationSpeed}s ${easing}`,
        },

        [`&.${e(`${activeClassName}`)}`]: {
          [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
            '&:nth-child(1)': {
              transform: `translate3d(0, ${barSpacing}px, 0)`,
            },

            '&:nth-child(3)': {
              transform: `translate3d(0, ${-1 * barSpacing}px, 0)`,
            },
          },
        },
      },

      [`.${e(`${componentPrefix}${className}`)}--magnetic`]: {
        [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
          transition: `transform ${0.2 / animationSpeed}s ${easing} ${0.2 / animationSpeed}s`,

          '&:nth-child(1),  &:nth-child(2)': {
            background: `none`,
            top: 0,

            '&::before': {
              ...bar,
              transition: `transform ${0.4 / animationSpeed}s ${easing}, background ${0.4 / animationSpeed}s ${easing}`,
            },
          },

          '&:nth-child(1)': {
            transform: `translate3d(0, ${Math.round(-1 * barSpacing * 0.8)}px, 0)`,
          },

          '&:nth-child(2)': {
            transform: `translate3d(0, ${Math.round(barSpacing * 0.8)}px, 0)`,
          },

          '&:nth-child(3)': {
            display: `none`,
          },
        },

        [`&.${e(`${activeClassName}`)}`]: {
          [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
            transition: `transform ${0.2 / animationSpeed}s ${easing}`,

            '&:nth-child(1), &:nth-child(2)': {
              transform: `translate3d(0, 0, 0)`,

              '&::before': {
                transition: `transform ${0.4 / animationSpeed}s ${easing}, background ${
                  0.4 / animationSpeed
                }s ${easing}`,
              },
            },

            '&:nth-child(1)': {
              '&::before': {
                transform: `rotate(45deg)`,
              },
            },

            '&:nth-child(2)': {
              '&::before': {
                transform: `rotate(-45deg)`,
              },
            },
          },
        },
      },

      [`.${e(`${componentPrefix}${className}`)}--minimal`]: {
        [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
          transition: `transform ${0.4 / animationSpeed}s ${easing},
                opacity ${0.3 / animationSpeed}s ${easing} ${0.1 / animationSpeed}s`,

          '&:nth-child(1)': {
            top: `${Math.round(-1 * barSpacing * 0.8)}px`,
          },

          '&:nth-child(2)': {
            top: `${Math.round(barSpacing * 0.8)}px`,
          },

          '&:nth-child(3)': {
            display: `none`,
          },
        },

        [`&.${e(`${activeClassName}`)}`]: {
          [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
            transition: `transform ${0.4 / animationSpeed}s ${easing},
            opacity ${0.3 / animationSpeed}s ${easing}`,

            '&:nth-child(1)': {
              transform: `translate3d(0, ${Math.round(barSpacing * 0.8)}px, 0)`,
            },

            '&:nth-child(2)': {
              opacity: 0,
              transform: `translate3d(0, ${Math.round(-1 * barSpacing * 0.8)}px, 0)`,
            },
          },
        },
      },

      [`.${e(`${componentPrefix}${className}`)}--parallel`]: {
        [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
          transform: `scaleX(1) translate3d(0, 0, 0)`,
          transition: `transform ${0.2 / animationSpeed}s ${easing},
                top ${0.2 / animationSpeed}s ${easing}`,

          '&:nth-child(1)': {
            top: `${Math.round(-1 * barSpacing * 0.8)}px`,
          },

          '&:nth-child(2)': {
            top: `${Math.round(barSpacing * 0.8)}px`,
          },

          '&:nth-child(3)': {
            display: `none`,
          },
        },

        '&:hover': {
          [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
            '&:nth-child(1)': {
              transform: `scaleX(0.85) translate3d(15%, 0, 0)`,
            },

            '&:nth-child(2)': {
              transform: `scaleX(0.85) translate3d(-15%, 0, 0)`,
            },
          },
        },

        [`&.${e(`${activeClassName}`)}`]: {
          [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
            top: `0`,
            transition: `transform ${0.3 / animationSpeed}s ${easing},
            top ${0.2 / animationSpeed}s ${easing}`,

            '&:nth-child(1)': {
              transform: `rotate(-45deg)`,
            },

            '&:nth-child(2)': {
              transform: `rotate(45deg)`,
            },
          },
        },
      },

      [`.${e(`${componentPrefix}${className}`)}--push`]: {
        overflow: `hidden`,

        [`> .${e(`${componentPrefix}${className}`)}-inner`]: {
          transition: `transform ${0.4 / animationSpeed}s ${easing}`,

          '&::before, &::after': {
            ...bar,
            top: `${-1 * size * 1.1}px`,
          },

          '&::before': {
            transform: `rotate(45deg)`,
          },

          '&::after': {
            transform: `rotate(-45deg)`,
          },
        },

        [`&.${e(`${activeClassName}`)}`]: {
          [`> .${e(`${componentPrefix}${className}`)}-inner`]: {
            transform: `translate3d(0, ${size * 1.1}px, 0)`,
          },
        },
      },

      [`.${e(`${componentPrefix}${className}`)}--shelf`]: {
        [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
          transition: `transform ${0.3 / animationSpeed}s ${easingOut},
                opacity ${0.2 / animationSpeed}s ${easing} ${0.1 / animationSpeed}s`,

          '&:nth-child(1)': {
            top: `0`,
            transform: `translate3d(0, ${-1 * barSpacing}px, 0)`,
          },

          '&:nth-child(2)': {
            transform: `scaleX(0.5)`,
            transformOrigin: `0 50%`,
          },

          '&:nth-child(3)': {
            top: `0`,
            transform: `scaleX(0.75) translate3d(0, ${barSpacing}px, 0)`,
            transformOrigin: `0 50%`,
          },
        },

        '&:hover': {
          [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
            '&:nth-child(2)': {
              transform: `scaleX(1)`,
            },

            '&:nth-child(3)': {
              transform: `scaleX(1) translate3d(0, ${barSpacing}px, 0)`,
            },
          },
        },

        [`&.${e(`${activeClassName}`)}`]: {
          [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
            transition: `transform ${0.3 / animationSpeed}s ${easing},
                    opacity ${0.2 / animationSpeed} ${easing}`,

            '&:nth-child(1)': {
              transform: `rotate(45deg) translate3d(0, 0, 0)`,
            },

            '&:nth-child(2)': {
              opacity: `0`,
              transform: `scaleX(0)`,
            },

            '&:nth-child(3)': {
              transform: `rotate(-45deg) translate3d(${-1 * shelfOffsetX}px, ${shelfOffsetY}px, 0)`,
            },
          },
        },
      },

      [`.${e(`${componentPrefix}${className}`)}--simple`]: {
        [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
          transition: `transform ${0.3 / animationSpeed}s ${easing}`,

          '&:nth-child(1)': {
            top: `0`,
            transform: `translate3d(0, ${Math.round(-1 * barSpacing * 0.8)}px, 0)`,
          },

          '&:nth-child(2)': {
            top: `0`,
            transform: `translate3d(0, ${Math.round(barSpacing * 0.8)}px, 0)`,
          },

          '&:nth-child(3)': {
            display: `none`,
          },
        },

        [`&.${e(`${activeClassName}`)}`]: {
          [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
            '&:nth-child(1)': {
              transform: `rotate(-45deg) translate3d(0, 0, 0)`,
            },

            '&:nth-child(2)': {
              transform: `rotate(45deg) translate3d(0, 0, 0)`,
            },
          },
        },
      },

      [`.${e(`${componentPrefix}${className}`)}--spin`]: {
        [`> .${e(`${componentPrefix}${className}`)}-inner`]: {
          transition: `transform ${0.5 / animationSpeed}s ${easing}`,
        },

        [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
          transition: `transform ${0.4 / animationSpeed}s ${easing},
                opacity ${0.2 / animationSpeed}s ${easing} ${0.2 / animationSpeed}s`,

          '&:nth-child(1)': {
            top: `0`,
            transform: `rotate(0deg) translate3d(0, ${-1 * barSpacing}px, 0)`,
            transformOrigin: `${100 * spinOriginOffset}% 50%`,
          },

          '&:nth-child(3)': {
            top: `0`,
            transform: `rotate(0deg) translate3d(0, ${barSpacing}px, 0)`,
            transformOrigin: `${100 * spinOriginOffset}% 50%`,
          },
        },

        [`&.${e(`${activeClassName}`)}`]: {
          [`> .${e(`${componentPrefix}${className}`)}-inner`]: {
            transform: `rotate(180deg) translate3d(0, ${-1 * thickness}px, 0)`,
          },

          [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
            transition: `transform ${0.3 / animationSpeed}s ${easing} 0.1s,
                    opacity ${0.2 / animationSpeed}s ${easing}`,

            '&:nth-child(1)': {
              transform: `rotate(135deg) translate3d(${-1 * spinOffsetXA}px, ${-1 * spinOffsetY}px, 0)`,
            },

            '&:nth-child(2)': {
              opacity: `0`,
              transform: `rotate(45deg)`,
            },

            '&:nth-child(3)': {
              transform: `rotate(45deg) translate3d(${-1 * spinOffsetXB}px, ${-1 * spinOffsetY}px, 0)`,
            },
          },
        },
      },

      [`.${e(`${componentPrefix}${className}`)}--stack`]: {
        [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
          transition: `transform ${0.3 / animationSpeed}s ${easing} ${0.2 / animationSpeed}s,
                opacity ${0.25 / animationSpeed}s ${easing} ${0.25 / animationSpeed}s`,

          '&:nth-child(1), &:nth-child(3)': {
            background: `none`,
            top: `0`,

            '&::before': {
              ...bar,
              transition: `transform ${0.35 / animationSpeed}s ${easing}, background ${
                0.35 / animationSpeed
              }s ${easing}`,
            },
          },

          '&:nth-child(1)': {
            transform: `translate3d(0, ${-1 * barSpacing}px, 0)`,
          },

          '&:nth-child(3)': {
            transform: `translate3d(0, ${barSpacing}px, 0)`,
          },
        },

        [`&.${e(`${activeClassName}`)}`]: {
          [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
            transition: `transform ${0.25 / animationSpeed}s ${easing},
                    opacity ${0.25 / animationSpeed}s ${easing}`,

            '&:nth-child(1), &:nth-child(3)': {
              transform: `translate3d(0, 0, 0)`,

              '&::before': {
                transition: `transform ${0.35 / animationSpeed}s ${easing} ${0.15 / animationSpeed}s`,
              },
            },

            '&:nth-child(1)': {
              '&::before': {
                transform: `rotate(45deg)`,
              },
            },

            '&:nth-child(2)': {
              opacity: `0`,
            },

            '&:nth-child(3)': {
              '&::before': {
                transform: `rotate(-45deg)`,
              },
            },
          },
        },
      },

      [`.${e(`${componentPrefix}${className}`)}--twist`]: {
        [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
          transition: `transform ${0.6 / animationSpeed}s ${easing}`,

          '&:nth-child(1)': {
            top: `0`,
            transform: `rotate(0deg) translate3d(0, ${-1 * barSpacing}px, 0)`,
          },

          '&:nth-child(2)': {
            opacity: `1`,
            transition: `opacity ${0.2 / animationSpeed}s ${easing} ${0.4 / animationSpeed}s`,
          },

          '&:nth-child(3)': {
            top: `0`,
            transform: `rotate(0deg) translate3d(0, ${barSpacing}px, 0)`,
            transformOrigin: `${100 * twistOriginOffset}% 50%`,
          },
        },

        [`&.${e(`${activeClassName}`)}`]: {
          [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
            '&:nth-child(1)': {
              transform: `rotate(45deg)`,
            },

            '&:nth-child(2)': {
              opacity: `0`,
              transition: `opacity 0.3s ${easing}`,
            },

            '&:nth-child(3)': {
              transform: `rotate(-225deg) translate3d(${-1 * twistOffsetX}px, ${-1 * twistOffsetY}px, 0)`,
            },
          },
        },
      },

      [`.${e(`${componentPrefix}${className}`)}--vertical`]: {
        [`> .${e(`${componentPrefix}${className}`)}-inner`]: {
          transition: `transform ${0.3 / animationSpeed}s ${easing}`,
        },

        [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
          transition: `transform ${0.3 / animationSpeed}s ${easing} ${0.15 / animationSpeed}s`,

          '&:nth-child(1)': {
            top: `0`,
            transform: `translate3d(0, ${Math.round(-1 * barSpacing * 0.8)}px, 0)`,
            transformOrigin: `${100 * verticalOriginOffset}% 50%`,
          },

          '&:nth-child(2)': {
            top: `0`,
            transform: `translate3d(0, ${Math.round(barSpacing * 0.8)}px, 0)`,
            transformOrigin: `${100 * verticalOriginOffset}% 50%`,
          },

          '&:nth-child(3)': {
            display: `none`,
          },
        },

        [`&.${e(`${activeClassName}`)}`]: {
          [`> .${e(`${componentPrefix}${className}`)}-inner`]: {
            transform: `rotate(90deg) translate3d(${thickness / 2}px, ${(-1 * thickness) / 2}px, 0)`,
            transition: `transform ${0.4 / animationSpeed}s ${easingOut}`,
          },

          [`span.${e(`${componentPrefix}${className}`)}-bar`]: {
            transition: `transform ${0.3 / animationSpeed}s ${easing} ${0.2 / animationSpeed}s`,

            '&:nth-child(1)': {
              transform: `rotate(-45deg) translate3d(${-1 * verticalOffsetX}px, ${verticalOffsetY}px, 0)`,
            },

            '&:nth-child(2)': {
              transform: `rotate(45deg) translate3d(${-1 * verticalOffsetX}px, ${-1 * verticalOffsetY}px, 0)`,
            },
          },
        },
      },
    }
    addComponents(hamburgerComponent)
  }
})
