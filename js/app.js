const loadPhones =async(searchText, datalimit) =>{
   const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
   const res= await fetch(url);
   const data = await res.json();
   displayPhones(data.data, datalimit);
}

const displayPhones = (phones, datalimit) => {
    const phonesContainer = document.getElementById('phone-container')
    phonesContainer.innerText= '';
    // display 10 phones only
    
    const showAll = document.getElementById('show-all');
  if(datalimit && phones.length > 10){
    phones=phones.slice(0, 10);
    showAll.classList.remove('d-none');
    
  }
  else{
    showAll.classList.add('d-none');
  }

    // display No Phone Found
    const noPhone = document.getElementById('no-phone-message');
    if(phones.length==0){
      noPhone.classList.remove('d-none');
    }

    else{
      noPhone.classList.add('d-none');
    }
    phones.forEach(phone => {
        const phoneDiv=document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML=`
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick="loadPhoneDetailse('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
          
        </div>
      </div>
      `
      phonesContainer.appendChild(phoneDiv);

      // stop spinner
      


    } )
    toogleSpinner(false);
}

document.getElementById('btn-search').addEventListener('click', function(){
  // start Loader
  processSearch(10);
});

const processSearch = (datalimit)=> {
  toogleSpinner(true);
  const searchField=document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhones(searchText, datalimit);
}

const toogleSpinner= isLoading => {
  const loadersection = document.getElementById('loader');
  if( isLoading ){
    loadersection.classList.remove('d-none');
  }
  else{
    loadersection.classList.add('d-none');
  }
}

document.getElementById('btn-show-all').addEventListener('click', function(){
  processSearch();
})


const loadPhoneDetailse = async id =>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  const res =await fetch(url);
  const data =await res.json();
  displayPhonesDetails(data.data);
  console.log(data);
}
// loadPhones();

const displayPhonesDetails = phone =>{
  const ModalTitle= document.getElementById('exampleModalLabel');
  ModalTitle.innerText=phone.name;
  const phoneDetails = document.getElementById('phone-details');
  phoneDetails.innerHTML= `
  <p> Release Date: ${phone.releaseDate}  </p>`

}