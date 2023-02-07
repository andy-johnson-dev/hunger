// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

const lake = {
  dark: false,
  colors: {
    // background: '#707E84',
    // surface: '#4F6D7A',
    // primary: '#D48A6D',
    // 'primary-darken-1': '#935E49',
    // secondary: '#E8DAB2',
    // 'secondary-darken-1': '#A3997D',
    // error: '#FA7676',
    // info: '#76FADD',
    // success: '#77E58D',
    // warning: '#FFE072',
    primary: '#607d8b',
    secondary: '#009688',
    accent: '#00bcd4',
    error: '#f44336',
    warning: '#ffc107',
    info: '#03a9f4',
    success: '#8bc34a'


  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'lake',
    themes: {
      lake
    }
  },
}
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
)
