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
                  main:{
                    openData: 'Dados Abertos',
                    explodeData:'Explore dados',
                    messageSearch:`
                    Sentimos muito pois não encontrou o que procurava, você pode usar o nosso formulário de contato na seção de ajuda ou enviar uma mensagem em<b>
                    <a href="mailto:solicita.dados@citinova.fortaleza.ce.gov.br">solicita.dados@citinova.fortaleza.ce.gov.br</a></b>
                    `,
                    shareLink: 'Compartilhe',
                    name:'Nome',
                    email:'Email',
                    subject:'Assunto',
                    message:'Mensagem',
                    sendMessage:'Enviar Mensagem',
                    seeAll: 'Veja todos',
                    all: 'Todos',
                    readMore:'Saiba mais',
                    data:'Dados',
                    findData:'resultados encontrados',
                    errorSearch:'Por favor tentar outra pesquisa',
                    infoGov:`
                    Acesse o 
                    <a href="https://acessoainformacao.fortaleza.ce.gov.br/sistema/site/index.html?ReturnUrl=%2fsistema%2f" 
                    target="_blank">portal do e-SIC
                   </a> 
                    para solictar alguma informação.
                    `,
                    searchError:`
                    <strong>Ocorreu um erro ao realizar a pesquisa.</strong> por favor tente novamente.
                    `
                  }, 
                  group:{
                    culture: 'Cultura',
                    demography: 'Demografia',
                    economy: 'Economia',
                    education: 'Educação',
                    sports: 'Esportes', 
                    publicAdministration: 'Gestão Pública',
                    habitation: 'Habitação',
                    enviroment: 'Meio ambiente e Urbanismo',
                    health:'Saúde',
                    security:'Segurança',
                    transportation: 'Transporte',
                    tourism: 'Turismo'
                  }, 
                  organization:{
                    description:`
                    Você pode usar Grupos do CKAN para criar e
                    gerenciar coleções de conjuntos de dados.
                   Isso pode ser feito para catalogar conjuntos de dados de um projeto ou tempo particular, ou em um tema particular,
                   ou como uma forma simples de ajudar as pessoas a encontrar e buscar seus próprios conjuntos de dados.
                    `
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
                  },
                  content:{
                    banner: `
                    O portal
                    <b class="font-weight-bold text-orange">
                    Dados abertos Fortaleza</b> disponibiliza
                    informações sobre as mais diversas áreas da cidade, em formatos abertos, para estimular a inovação,
                    o empreendedorismo e a geração de negócios em Fortaleza.
                    `,
                    search:"Pesquisar",
                    load: "Carregando...",
                    smallMessage:
                    `
                    O total de conjunto de dados pode não se igualar à soma dos totais de 
                    conjuntos de dados por grupo pois um conjunto de dados pode estar em mais de um grupo.
                    `,
                    tableTitle:'Últimas atualizações',
                    thTitle:'Título',
                    thDateModification:'Data da modificação',
                    thDateOrganization:'Organização',
                    thDataFormat:'Formato do dados',
                    btnAllDatasets:'consultar todos',
                    portalTitle:'Outros portais de dados',
                    portalDigital:'Portal de serviços digitais da Prefeitura de Fortaleza.',
                    portalTransparencia:'Acessos os dados orçamentos entre outros da prefeitura.',
                    portalFortalMapas:'Acessos os mapas outros dados da prefeitura ',
                    portalMappGeo:`
                    Ações de Governo Georreferenciadas.
                    <span class="invisible">Fortaleza</span>
                    `,
                  },
                  about:{
                    mainTitle:'Sobre o Programa de Dados Abertos Governamentais de Fortaleza',
                    subTitle:'A abertura de dados pela administração pública é um direito do cidadão e um dever da gestão pública, como determina a Lei de Acesso à Informação – LAI (Lei 12.527/2011). No que diz respeito a conceitos de dados abertos, a LAI apresenta em seu art. 8º:',
                    blockQuote:`“Art. 8º É dever dos órgãos e entidades públicas promover, independentemente de requerimentos, 
                    a divulgação em local de fácil acesso, no âmbito de suas competências, de informações de interesse 
                    coletivo ou geral por eles produzidas ou custodiadas.” LEI Nº 12.527, de 18 de novembro de 2011.`,
                    subDescription:`Essa lei constitui um marco para a democratização da informação pública, e preconiza, dentre outros requisitos técnicos, que a informação solicitada pelo cidadão deve seguir critérios tecnológicos 
                    alinhados com as três leis de dados abertos apoiadas pelos princípios dos dados abertos governamentais.`,
                    finalDescription:`
                    Em observância a legislação e de modo a promover o empreendedorismo, a inovação, a pesquisa e
                    bem como fortalecer a premissa da transparência, em 23 de dezembro de 2014 foi publicado o
                    Decreto municipal que Instituiu a Infraestrutura Municipal de Dados Abertos de Fortaleza de Fortaleza -
                    IMDAFor  e em 08 de julho de 2022 foi publicado o
                    <a href="https://diariooficial.fortaleza.ce.gov.br/download-diario?objectId=workspace://SpacesStore/d9eb3ca1-1755-444c-88b2-e38f3f393ad0;1.0&numero=17366">decreto 15.358</a>
                    que institui a Comissão Municipal de Dados
                    Abertos com o fim de modernizar e criar novas ferramentas de acompanhamento e execução desses objetivos.
                    Atualmente o Programa de Dados Abertos Governamentais de Fortaleza é executado pela CITINOVA em
                    parceria com a Controladoria Geral do Município - CGM.                    
                    `,
                    aboutTitleSection:`
                    Sobre a Plataforma de Dados Abertos de Fortaleza
                    `,
                    aboutSectionFirst:`
                    Para a plena operacionalização do programa de dados abertos em Fortaleza, buscou-se dentre outras ferramentas,
                    o desenvolvimento de um canal digital que permitisse o acesso aos 
                    dados através da web, sendo desenvolvido o portal de dados abertos de Fortaleza.
                    `,
                    aboutSectionSecond:`
                    Para a plena operacionalização do programa de dados abertos em Fortaleza, buscou-se dentre outras ferramentas,
                    o desenvolvimento de um canal digital que permitisse o acesso aos 
                    dados através da web, sendo desenvolvido o portal de dados abertos de Fortaleza.
                    `,
                    aboutSectionThird:`
                    A Plataforma de Dados Abertos de Fortaleza, está em sua segunda versão, com atualizações 
                    da ferramenta CKAN e melhorias de usabilidade.
                    `,
                    videoTitle:`
                    Por que Dados abertos?
                    `,
                    lawDate:`
                    Em 18 de novembro de 2011 foi sancionada a 
                    <a style="color: #0091EA !important;" 
                    href="http://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm">
                    Lei de Acesso à Informação Pública (Lei 12.527/2011)</a> 
                    (Lei 12.527/2011) que regula o acesso a dados e informações detidas pelo governo. 
                    Essa lei constitui um marco para a democratização da informação pública, 
                     preconiza, dentre outros requisitos técnicos, que a informação solicitada 
                     pelo cidadão deve seguir critérios tecnológicos alinhados com as 
                     <a style="color: #0091EA !important;" 
                     href="https://www.w3c.br/divulgacao/pdf/dados-abertos-governamentais.pdf">
                     três leis de dados abertos</a> apoiadas pelos oito princípios dos 
                     dados abertos governamentais. Em 23 de dezembro de 2014 foi publicado o 
                     decreto que dispõe sobre regras específicas para o Município de Fortaleza, 
                     visando o acesso a informações e em consonância com a lei supracitada.
                    `,
                    fiveStaTitler:`
                    As cincos estrelas dos dados abertos
                    `,
                    openLicence:'Licença aberta',
                    openLicenceFirst:'Licença aberta, formato estruturado',
                    openLicenceSecond:'Licença aberta, formato estruturado, Formato não proprietário',
                    openLicenceThird:'Licença aberta, formato estruturado, Formato não proprietário, URI',
                    openLicenceFourth:'Licença aberta, formato estruturado, Formato não proprietário, URI e dados linkados',
                    htmlText:`O pioneiro da Web Tim-Berners Lee, um dos primeiros, quiçá o primeiro a pensar dados ligados
                    definiu um modelo prático e didático para a definição do nível de maturidade de iniciativas de abertura de dados.
                    Cada uma das cinco estrelas representa aumento na facilidade ao acesso e consumo dos dados na plataforma.  <br> <br>
                    O programa Dados Abertos de Fortaleza preconiza a disponibilização de dados em nível 3 pelas secretarias,
                    posto que automaticamente estes recebem uma URI para referência durante o procedimento de publicação e são
                    automaticamente incrementados para o nível 4. Nesse momento de desenvolvimento da rede e da cultura de dados abertos
                    na gestão municipal ainda estamos recebendo alguns conjuntos de dados que seriam classificados com uma ou duas estrelas,
                    mas nosso objetivo é estruturar todos os dados da nossa plataforma em nível 4 ou 5 conforme os conceitos são sedimentados
                    por toda a rede que compõe a Infraestrutura Municipal de Dados Abertos.
                    <br> <br>`,
                    topicOne:'1. Monitore',
                    topicTwo:'2. Analise',
                    topicThree:'3. Compartilhe',
                    topicFour:'4. Desenvolva',
                    topicOneDesc:'Permite ao cidadão monitorar ações do governo promovendo transparência.',
                    topicTwoDesc:'Permite ao cidadão analisar informações governamentais, possibilitando estudos e pesquisas.',
                    topicThreeDesc:`
                    Os dados são disponibilizados 
                    a partir de termos de utilização que permitem o reuso e a redistribuição, 
                    inclusive a mistura desses dados com outras bases.`,
                    topicFourDesc:`
                    Permite à comunidade de desenvolvedores de soluções o insumo 
                    para aplicações que precisam de informações que são originadas e gerenciadas pelo governo. 
                    `,
                    listaTitleOne:'Analise a cidade',
                    listaTitleTwo:'Documentos e informações importantes sobre o Programa e do Portal ',
                    listaDescription:`
                    Todos os dados catalogados neste portal estão em formatos de especificação aberta, não proprietário, e estruturado, 
                    ou seja, que possibilitam seu uso irrestrito e automatizado através da Web. A seguir uma lista dos principais formatos utilizados:
                    `
                  },
                  contact:{
                    description: `
                    Nossa página de contato responde às dúvidas mais frequentes, 
                      mas se você não conseguir achar o que busca saiba que oferecemos um 
                      canal de comunicação para o envio de dúvidas, sugestões, reclamações e elogios..
                    
                    `
                  },
                  talkWithUs:{
                    description:`
                    Aqui você encontra perguntas que podem ocorrer frequentemente sobre dados abertos
                    ou sobre este portal.
                    `,
                  }
                }
              },
              en: {
                translation: {
                  head: {
                    title: 'Open Data Fortaleza',
                    description: 'Open data for all'
                  },
                  main:{
                    openData: 'Open Data',
                    explodeData:'Explore data',
                    messageSearch:`
                    We're sorry you didn't find what you were looking for, you can use our contact form in the help section or send us a message at<b>
                    <a href="mailto:solicita.dados@citinova.fortaleza.ce.gov.br">solicita.dados@citinova.fortaleza.ce.gov.br</a></b>
                    `,
                    shareLInk: 'Share',
                    name:'Name',
                    email:'Email',
                    subject:'Subject',
                    message:'Message',
                    sendMessage:'Send message',
                    seeAll: 'See All',
                    all: 'All',
                    readMore:' Read More',
                    data:'Data',
                    findData:'results found',
                    errorSearch:'Please try another search.',
                    infoGov:`
                    access 
                    <a href="https://acessoainformacao.fortaleza.ce.gov.br/sistema/site/index.html?ReturnUrl=%2fsistema%2f" 
                    target="_blank">portal do e-SIC
                   </a> 
                    to request some information..
                    `,
                    searchError:`
                    <strong>There was an error while searching.</strong> Please try again.
                    `
                  }, 
                  group:{
                    culture: 'Culture',
                    demography: 'Demography',
                    economy: 'Economy',
                    education: 'Education',
                    sports: 'Sports', 
                    publicAdministration: 'Public Administration',
                    habitation: 'Habitation',
                    enviroment: 'Environment and Urbanism',
                    health:'Health',
                    security:'Security',
                    transportation: 'Transporte',
                    tourism: 'Tourism'
                  },
                  organization:{
                    description:`
                    You can use CKAN Groups to create and
                         manage collections of datasets.
                        This can be done to catalog datasets for a particular project or time, or on a particular theme,
                        or as a simple way to help people find and search their own datasets.
                    
                    `
                  } ,
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
                  },
                  content:{
                    banner: `
                    Fortaleza’s <b class="font-weight-bold text-orange">Open Data portal</b> provides raw data about diverse areas of the city. 
                    The objectives are to stimulate the generation of innovation, 
                    entrepreneurship and business in the city of Fortaleza..
                    `,
                    search:"Search",
                    load:"Loading...",
                    smallMessage:`
                    The dataset per group counter may not match the total number of datasets since they can belong to more than one group.
                    `,
                    tableTitle:"Last update",
                    thTitle:'Title',
                    thDateModification:'Modification date',
                    thDateOrganization:'Organization',
                    thDataFormat:'Data extension',
                    btnAllDatasets:'List all',
                    portalTitle:'Other Data Portals from Fortaleza',
                    portalDigital:'Portal of digital services of the City Hall of Fortaleza.',
                    portalTransparencia:'Access to budget data among others from the prefecture',
                    portalFortalMapas:'Access to maps other data from the prefecture',
                    portalMappGeo:`
                    Georeferenced Government Actions.
                    `
                  },
                  about:{
                    mainTitle:'About the Governmental Open Data Program of Fortaleza. ',
                    subTitle:
                    `Open data constitute rights of citizens.  According to the Information Access Act (Law 12527/2011), 
                    the public administration is required to release them. Concerning the open data concepts, the aforementioned law presents on its 8th article:`
                    ,
                    blockQuote:`Art. 8th It is the duty of public bodies and entities to promote, regardless of requirements and within the scope of their competences, the disclosure of information that 
                    is of collective or general interest produced or custodied by them in a place of easy access.” Law No. 12527 of November 18th, 2011.`,
                    subDescription:`This law represents a milestone for the democratization of public information and advocates, among other technical requirements, that the information requested by citizens must follow 
                    technological criteria aligned with the three open data laws supported by the principles of governmental open data.`,
                    finalDescription:`
                    In compliance with the legislation and in order to promote entrepreneurship. Innovation, research and as well as strengthen the premise of transparency, 
                    the Municipal Decree that Instituted the Municipal Open Data Infrastructure of the city of Fortaleza was published on December 23rd, 
                    2014 This proposition and actions were organized at the time by the Foundation of Science, Technology and Innovation – Citinova of the City of Fortaleza, Currently the Governmental Open 
                    Data Program of city of Fortaleza is operationalized by Citinova in partnership with the city’s General Controller.                    
                    `,
                    aboutTitleSection:`
                    About Fortaleza’s Open Data Platform
                    `,
                    aboutSectionFirst:`
                    To achieve the full operationalization of the open data program in Fortaleza, we sought, among other tools, the development of a digital channel that would allow 
                    access to data through the web, which led to the development of this open data portal.
                    `,
                    aboutSectionSecond:`
                    Targeting the best practices and technologies, Citinova’s team has adopted the CKAN (The Comprehensive Kerbal Archive Network) 
                    tool as the technological basis of Fortaleza’s open data portal. A tool adopted internationally 
                    for structuring portals that enable the execution of open data policies, 
                    systematizing and standardizing the way of input, presentation and access to deposited data.
                    `,
                    aboutSectionThird:`
                    The Fortaleza’s Open Data Platform is in its second version, with CKAN updates and usability improvements.
                    `,
                    videoTitle:`
                    Why Open Data?
                    `,
                    lawDate:`
                    On November 18, 2011, the Law on Access to Public Information (Law 12,527/2011) (Law 12,527/2011) was passed, 
                    which regulates access to data and information held by the government. This law constitutes a milestone 
                    for the democratization of public information, and advocates, among other technical requirements, 
                    that the information requested by the citizen must follow technological criteria in line with the three open data laws 
                    supported by the eight principles of government open data. On December 23, 2014, the decree that provides for specific rules 
                    for the Municipality of Fortaleza was published, aiming at access to information and in line with the aforementioned law.
                    `,
                    fiveStaTitler:`
                    The five stars of open data
                    `,
                    openLicence:'Open Licence',
                    openLicenceFirst:'Open License, Structured Format',
                    openLicenceSecond:'Open License, Structured Format, Non-Proprietary Format',
                    openLicenceThird:'Open License, Structured Format, Non-Proprietary Format, URI',
                    openLicenceFourth:'Open License, Structured Format, Non-Proprietary Format, URI and Linked Data',
                    htmlText:`Web pioneer Tim-Berners Lee, one of the first, perhaps the first to think about connected data, defined a practical and didactic model for defining 
                    the maturity level of data openness initiatives. Each of the five stars represents 
                    an increase in the ease of accessing and consuming data on the platform. <br> <br>
                    The program Dados Abertos de Fortaleza recommends the availability of data at level 3 by the secretariats, since they automatically 
                    receive a URI for reference during the publication procedure and are automatically increased to level 4. At this moment of development of the 
                    network and the culture of open data in municipal management we are still receiving some datasets that would be classified with one or two stars, 
                    but our goal is to structure all the data on our platform at level 
                    4 or 5 as the concepts are sedimented throughout the network that makes up the Infrastructure Open Data Municipality.
                    <br> <br>`,
                    topicOne:'1. Scout',
                    topicTwo:'2. Analyse',
                    topicThree:'3. Share',
                    topicFour:'4. Develop',
                    topicOneDesc:'Allows citizens to monitor government actions promoting transparency.',
                    topicTwoDesc:'It allows citizens to analyze government information, enabling studies and research.',
                    topicThreeDesc:`
                    The data is made available
                    from terms of use that allow reuse and redistribution,
                    including mixing these data with other databases.
                    `,
                    topicFourDesc:`
                    Allows the solution developer community to input
                    for applications that need information that is sourced and managed by the government.
                    `,
                    listaTitleOne:'Analyze the city',
                    listaTitleTwo:'Important documents and information about the Program and the Portal',
                    listaDescription:`
                    listDescription:
                    All data cataloged on this portal is in open specification, non-proprietary, and structured formats,
                    that is, that allow their unrestricted and automated use through the Web. The following is a list of the main formats used:
                    `,
                  },
                  contact:{
                    description: `
                    Our contact page answers the most frequently asked questions,
                    but if you can't find what you're looking for, know that we offer a
                    communication channel for sending doubts, suggestions, complaints and compliments.
                    `
                  },
                  talkWithUs:{
                    description:`
                    Here you find frequently asked questions about open data
                    or about this portal.
                    `,
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