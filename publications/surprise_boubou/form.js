function onFormSubmit(){
    var submittedDate = localStorage.getItem('submitted-date');

    if(!submittedDate){
        // Submit your form here because this is the first time or there is nothing in localstorage
        submitForm();
    } else {
        if(Math.abs(submittedDate - get_date()) < 1){
            document.getElementById('answer').value = 'Une seule proposition par jour';

            return; // It's been less than a day
        } else {
            // It has been more than a day from last submission - Allow form submission
            submitForm();
        }
    }

    
}

const cyrb53 = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed,
      h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  };

function submitForm(){
    // Submit form
    // Save current timestamp to localstorage
    localStorage.setItem('submitted-date', get_date());
    console.log("submit form")
    var proposition = document.getElementById('answer').value.toLowerCase().replace(/\s/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    var is_correct = cyrb53(proposition) == '136850270732703' || cyrb53(proposition) == "8634982171252285"
    // document.getElementById('answer').value=cyrb53(proposition) ;

    if(Boolean(is_correct)){
       // submitForm();
       document.getElementById('answer').value="Bonne Réponse !!! Félicitation ! Papouilles !";
       document.getElementById('answer').style.borderColor='green';

    } else {
        document.getElementById('answer').value="Mauvaise Réponse ... On se revoit demain mon amour <3";
        document.getElementById('answer').style.borderColor='red';
    }

}

function get_date(){
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    return 100 * month + day;
}

function imageloaded(){
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;

    if (month == 1) {
        var n_pas = day 
    }
    else {
        var n_pas = 30 * (month - 2) + day
    }

    for (let pas = 0; pas < n_pas; pas++) {
        const img = document.createElement("img");
        img.style.border="thick solid #000";
        img.style.position="absolute";
        img.style.width="80%";
        img.style.height="auto";
        img.style.marginTop="5%";
        img.style.marginBottom="5%";
        img.src = "./surprise_boubou/noisy_images/".concat(pas.toString(), ".png");
        document.getElementById('maindiv').appendChild(img);
    }
}