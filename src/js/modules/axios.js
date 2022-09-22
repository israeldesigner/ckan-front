import axios from '../../../node_modules/axios/dist/axios';


axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
delete axios.defaults.headers.common["X-Requested-With"];

var resultElement = document.getElementById('getResult1');

axios.interceptors.request.use(function(config) {
  return config;
}, function(error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function(response) {
  // Do something with response data
  let msgLoadGrupos = document.getElementById('msgShow');
  if(msgLoadGrupos){
    msgLoadGrupos.style.display = "none";
  }
  return response;
}, function(error) {

  return Promise.reject(error);
});


const locationStrong = location.href;
const baseUrl = `${locationStrong}/api/3/action/`;
const urlDataSet = `${locationStrong}/dataset/`;

const appendToDOM = (users) => {
  // const ul = document.querySelector('ul');
  let idDataTable = document.getElementById('dataBody');
  if(idDataTable){
    if(users.length > 0 ){
      var temp = '';
      users.forEach((itemData, i) => {
        var resourceFormats = itemData.resources;
        var tmpResource = '';
        for (let i = 0; i < resourceFormats.length; i++) {
          const element = resourceFormats[i];
          if(i < 1) tmpResource += `${element.format}`;
        }
        if(i < 5){
          var date = new Date(itemData.metadata_modified);
          var newDate =  date.toISOString().substring(0, 10);
          var newDateBr = date.toLocaleString();
          temp += `<td><a href="/dataset/${itemData.name}"><b>${itemData.title}</b></a></td>`;
          temp += "<td>" + newDateBr + "</td>";
          temp += "<td>" + itemData.organization.title + "</td>";
          temp += "<td>" + tmpResource + "</td></tr>";
        }
      });
      idDataTable.innerHTML = temp;
    }
  }
};

const appendIconDOM = (icons) => {
  // const ul = document.querySelector('ul');
  let iconDataList = document.getElementById('iconListas');
  if(iconDataList){
    if(icons.length > 0 ){
      var temp = '';
      icons.forEach((icon) => {
        temp += `
          <div class='col-lg-2 col-sm-6 col-6 text-center divGrupo-icon'>
            <a href="/dataset/?groups=${icon.name}">
              <!--<i class="demo-icon ${icon.name}icon-fol fa-3x icon-circle bg-yellow text-black mb-2 "></i>-->
              <img src="${icon.image_display_url}" alt="${icon.name}"  width="80" />
              <p>${icon.title}</p>
              <b>${icon.package_count}</b>
            </a>
          </div>
        `;
      });
      iconDataList.innerHTML = temp;
    }
  }
};


const modifiedMetada = () =>{
  axios.get(`${baseUrl}package_search?q=&sort=metadata_modified+desc`, {
    params: {
    },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
        "Content-Type": "application/json;charset=UTF-8"
    }
  })
  .then(function (response) {
    const resultData = response.data.result.results;
    appendToDOM(resultData);
  })
  .catch(function (error) {
    console.log(error);
  })
}

modifiedMetada()

async function fetchGroups() {

  try{

    const response = await axios.get(`${baseUrl}group_list`,{
      params: {
        all_fields: true
      },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
          "Content-Type": "application/json;charset=UTF-8"
      }
    })
    .then(response => {
        const data = response.data.result;
        appendIconDOM(data);
    })

  }catch{
    // console.error(error);
  }
};

fetchGroups();
