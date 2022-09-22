import $ from '../../../node_modules/jquery/dist/jquery';
import i18next from '@/js/vendors/i18next';
import i18nextBrowserLanguageDetector from '@/js/vendors/i18nextBrowserDetector';
import jqueryI18next from '@/js/vendors/jquery-i18next';

window.jQuery = $;
window.$ = $;
export const script = () => {
    (function($) {
        $('.fa-facebook').removeClass('bg-blue-darken');
        $('.fa-facebook').addClass('bg-facebook');
        $('.fa-facebook').addClass('text-white');
    
        //load
        $(window).on('load',function(){
            $('#loader-wrapper').fadeIn();
            $('#loader-wrapper').fadeOut();
        })

        let locationTotal = location.href;
        let urlExtense = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
        let base_url = window.location.origin;
        let host = window.location.host;
        let pathArray = window.location.pathname.split( '/' );
        let urlSpara = window.location.href.split('?')[0];
        
        console.log(pathArray[1]);
        const joinPath = (lang) => {
          if(pathArray[1] !== 'pt_BR' && pathArray[1] !== 'en' && pathArray[1] !== 'es'){  
            pathArray.splice(1, 0, lang )
            console.log(pathArray);
            // pathArray.shift() 
            // pathArray.splice(0, 0, base_url)  
            // console.log(pathArray);
            // console.log("estou neste if");
            // window.location.href=pathArray.join('/');
         }
          let index = pathArray.indexOf(pathArray[1]);
          if (pathArray[1] == 'pt_BR' || pathArray[1] == 'en' || pathArray[1] == 'es') {
            console.log("estou nesse if para outro");
            pathArray[index] = lang;
            pathArray.splice(0, 1, base_url);
            window.location.href=pathArray.join('/');      
          }
        
        }

        console.log(urlSpara + "url sepera");
        console.log(pathArray);
        console.log(base_url);
        console.log(urlExtense);
        console.log(locationTotal);
    
        //if pra verificar url pra mudar imagem header
        if(pathArray[1] == ''){
          $('.linkPmf-nav').show();
          $('.linkLogo-principal').hide();
        }else{
          $('.linkPmf-nav').hide();
          $('.linkLogo-principal').show();;
        }

        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
    
       let encodeHrf = encodeURIComponent(window.location.href);
       let encodeUri = encodeURIComponent(document.title);
       let urlTelegram =  `https://t.me/share/url?url='+${encodeHrf}+'&text='+${encodeUri}`
    
        let conteudo = encodeURIComponent(document.title + " " + window.location.href);
        $('#btnSocialwhatsapp').attr( 'href', "https://api.whatsapp.com/send?text=" + conteudo);
        $('#btnSocialTelegram').attr( 'href', urlTelegram);
    
        $('.colorContrast').click(function (event) {
          event.preventDefault();
          if($('body').hasClass('contrast')){
            $('.linkPmf-nav img').attr('src', '/base/assets/images/logo-branca.png');
          }else{
            $('.linkPmf-nav img').attr('src', '/base/assets/images/logo.png');
          }
        })
    
        const submitForm = () =>{
          $("form").on("submit", function(){
            $('#loader-wrapper').show();
          });
        }
        submitForm();
          // header menu
          $("ul li ul").parent("li").addClass("menu-item-has-children");
    
          // dropdown menu
          $('ul').parent().on('hover', function() {
              let menu = $(this).find("ul");
              let menupos = $(menu).offset();
              if (menupos.left + menu.width() > $(window).width()) {
                  let newpos = -$(menu).width();
                  menu.css({ left: newpos });
              }
          });
    
          // mobile menu responsive
          $(document).on('click','.header-bar',function(){
              $(".header-bar").toggleClass("close");
              $(".mobile-menu").toggleClass("open");
          });
    
          //mobile dropdown menu display
          $('.menu-item-has-children>a').on('click', function(e){
              event.preventDefault();
          });
          $('.mobile-menu-area ul li a, .shop-menu li a').on('click', function(e) {
              let element = $(this).parent('li');
              if (element.hasClass('open')) {
                  element.removeClass('open');
                  element.find('li').removeClass('open');
                  element.find('ul').slideUp(1000,"swing");
              }
              else {
                  element.addClass('open');
                  element.children('ul').slideDown(1000,"swing");
                  element.siblings('li').children('ul').slideUp(1000,"swing");
                  element.siblings('li').removeClass('open');
                  element.siblings('li').find('li').removeClass('open');
                  element.siblings('li').find('ul').slideUp(1000,"swing");
              }
          });
          $(".search i, .search-close").on("click", function(){
              $(".search-area").toggleClass("open");
          });
          $(".header-right .bar-area span").on("click", function(){
              $(".sidemenubar, .bar-area").toggleClass("open");
          });
          $(".sidemenubar").on("click", function(){
              $(".sidemenubar, .bar-area").toggleClass("open");
          });
    
          //menu fixo
          let fixedTop = $(".header-area");
          $(window).on('scroll', function(){
              if( $(this).scrollTop() > 100 ){
                  fixedTop.addClass("animated fadeInDown menu-fixed");
              }
              else{
                  fixedTop.removeClass("animated fadeInDown menu-fixed");
              }
          });
    
          // scroll seta rolagem
          $(function(){
              $(window).scroll(function(){
                  if ($(this).scrollTop() > 550) {
                      $('.scrollToTop').css({'bottom':'2%', 'opacity':'1','transition':'all .5s ease'});
                  } else {
                      $('.scrollToTop').css({'bottom':'-30%', 'opacity':'0','transition':'all .5s ease'})
                  }
              });
              //Click event to scroll to top
              $('.scrollToTop').on('click', function(){
                  $(this).css('cursor', 'pointer');
                  $('html, body').animate({scrollTop : 0},600);
                  return false;
              });
          });

          if ($(window).width() <= 991){
              $(".wow").removeClass("wow");
          }

          // const lngs = {
          //   pt: {
          //     nativeName: 'Portuguese'
          //   },
          //   en: {
          //     nativeName: 'English'
          //   },
          //   es: {
          //     nativeName: 'Spanish'
          //   }
          // };
        
          const rerender = () => {
            // start localizing, details:
            // https://github.com/i18next/jquery-i18next#usage-of-selector-function
            $('body').localize();
            // $('title').text($.t('head.title'))
            // $('meta[name=description]').attr('content', $.t('head.description'))
          }
        
          const inTranslate = "Em construção";

          i18next
          .use(i18nextBrowserLanguageDetector)
          .init({
            debug: true,
            fallbackLng: 'pt_BR',
            resources: {
              // eslint-disable-next-line camelcase
              pt_BR: {
                translation: {
                  head: {
                    title: 'Dados Abertos Fortaleza',
                    description: 'dados'
                  },
                  acess: {
                    central: "Conteúdo Central ",
                    centralAtalho: "alt + 1",
                    menuAtalho: "alt + 2",
                    rodapeAtalho: "alt + 3",
                    menu: "Menu ",
                    rodape: "Rodapé ",
                    search:"pesquisa",
                    contrast: "auto contraste",
                    deacFont: "Diminuir fonte",
                    fontDim: "A-",
                    incFont: "Aumentar fonte",
                    fontAum: "A+",
                    defFont: "Texto fonte Padrão",
                    fontDef: "A",
                    info: "Acesso a informação",
                    transp: "Transparência",
                    serv: "Serviços",
                    legislacao: "Legislação",
                  },
                  nav:{
                    home:'Início',
                    about:'Sobre',
                    help:'Ajuda',
                    talk: 'Fale conosco',
                    faq:'Dúvidas frequentes',
                  }
                }
              },
              en: {
                translation: {
                  head: {
                    title: 'Open Data Fortaleza',
                    description: 'Open data for all'
                  },
                  acess: {
                    central: "Main content ",
                    centralAtalho: "alt + 1",
                    menuAtalho: "alt + 2",
                    rodapeAtalho: "alt + 3",
                    menu: "Menu ",
                    rodape: "Footer ",
                    search:"search",
                    contrast: "Contrast scale",
                    deacFont: "Diminuir fonte",
                    fontDim: "A-",
                    incFont: "Aumentar fonte",
                    fontAum: "A+",
                    defFont: "Texto fonte Padrão",
                    fontDef: "A",
                    info: "Information page",
                    transp: "Clean services",
                    serv: "All services",
                    legislacao: "Legislation",
                  },
                  nav:{
                    home:'Home',
                    about:'About',
                    help:'Help',
                    talk: 'Talk with us',
                    faq:'Frequently questions',
                  }
                }
              },
              es: {
                translation: {
                  head: {
                    title: inTranslate,
                    description: inTranslate
                  },
                  acess: {
                    central: "Principal pantela",
                    centralAtalho: "alt + 1",
                    menuAtalho: "alt + 2",
                    rodapeAtalho: "alt + 3",
                    menu: "navegadores",
                    search:"Busca",
                    rodape: "Roda los pes",
                    contrast: "auto contraste",
                    deacFont: "Diminuir fonte",
                    fontDim: "A-",
                    incFont: "Aumentar fonte",
                    fontAum: "A+",
                    defFont: "Texto fonte Padrão",
                    fontDef: "A",
                    info: "Acesso a informação",
                    transp: "Transparência",
                    serv: "Serviços",
                    legislacao: "Legislação",
                  },
                  nav:{
                    home:'Início',
                    about:'A sobre',
                    help:'Ajuda te',
                    talk: 'Habla con us',
                    faq:'Duvidas pertinentes',
                  }
                }
              }
            }
          }, (err, t) => {
            if (err) return console.error(err);
            jqueryI18next.init(i18next, $, {
              useOptionsAttr: true
            });
    
            // fill language switcher
            $("#languageSwitcher").hide();
    
            $('.btnPor').on('click', function() {
                i18next.changeLanguage('pt_BR', () => {
                  rerender();
                  joinPath('pt_BR');
                });
            });
            $('.btnEng').on('click', function() {
                i18next.changeLanguage('en', () => {
                    joinPath('en');
                    rerender();
                });
            });
            $('.btnEsp').on('click', function() {
                i18next.changeLanguage('es', () => {
                    joinPath('es');
                    rerender();
                });
            });
            rerender();
        });          
                  
})($);
};