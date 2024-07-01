import { create, themes } from '@storybook/theming';

export default create({
  base: themes.dark,

  colorPrimary: '#ffffff',
  colorSecondary: 'rgb(239, 71, 35)',

  brandTitle: 'MB-Challenger - Design System',
  brandUrl: 'https://www.mercadobitcoin.com.br/',
  brandImage: 'https://static.mercadobitcoin.com.br/web/img/logos/mb/logo-icon-color.svg',
});
