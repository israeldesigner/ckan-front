    // images
import webpackLogo from '@/images/webpack-logo.svg'
    
const teste = () =>{
    
    // Appending to the DOM
    const logo = document.createElement('img')
    logo.src = webpackLogo

    // Test a background image url in CSS
    const imageBackground = document.createElement('div')
    imageBackground.classList.add('image')

    // Test a public folder asset
    const imagePublic = document.createElement('img')
    imagePublic.src = '/assets/example.png'

    const app = document.querySelector('#root')
    app.append(logo, imageBackground, imagePublic)
}

export {teste};

    