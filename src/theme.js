// src/theme.js
export const themeTokens = {
  token: {
    colorPrimary: '#964B4B',
    colorInfo: '#2D5A5A',
    colorSuccess: '#748C46',

    colorTextBase: '#333333',
    colorText: '#686868',
    colorTextSecondary: '#8A8A8A',

    colorBgBase: '#F3F3F3',
    colorBgContainer: '#FFFFFF',
    colorSplit: '#E6E6E6',      // разделители
    colorBorder: '#D7D7D7',
    colorBorderSecondary: '#C5C5C5',

    borderRadius: 10,
    fontSize: 16,
    wireframe: false,
  },
  components: {
    Button: {
      controlHeight: 44,
      paddingInline: 16,
      primaryColor: '#fff',
      defaultBg: '#E6E6E6',
      defaultColor: '#2D5A5A',
      defaultHoverBg: '#EBEBEB',
      defaultActiveBg: '#D7D7D7',
      borderRadius: 999, // пилюля для CTA
    },
    Card: {
      padding: 20,
      colorBorderSecondary: '#E6E6E6',
      boxShadowTertiary:
        '0 6px 20px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)',
    },
    Menu: {
      itemSelectedColor: '#964B4B',
      itemSelectedBg: '#F3F3F3',
      itemHoverColor: '#2D5A5A',
      
      itemPaddingInline: 12, // было 16 — уменьшили «плечи»
      horizontalItemBorderRadius: 8,
    },
    Tag: {
      colorBorder: '#E6E6E6',
      defaultBg: '#F3F3F3',
    },
    Input: {
      colorBgContainer: '#FFFFFF',
      activeShadow: '0 0 0 3px rgba(150,75,75,0.15)',
    },
    Switch: {
        innerMinMargin: '12px'
    }
  },
}
