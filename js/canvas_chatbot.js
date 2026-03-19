// chat header start
const para = document.createElement("div");
para.className = "chat-screen";
$("body").append(para);
let phone = "";
let custName = "";
let lastName = "";

let sessionId;
let randomSessionId = "SessionId" + Math.random().toString(36).slice(2);
sessionId = sessionStorage.getItem("SessionId");
if (!sessionId) {
  sessionStorage.setItem("SessionId", randomSessionId);
}

// const phoneNumberDiv = "91 63664 48599";

const phoneNumberDiv = `<a href="tel:+918929849314">91 89298 49314</a>`;

const projectLogo = "";

const startingDiv =
  '<div class="chat-bubble you">Hello, Welcome to MANTRA PROPERTIES.</div>';

// const locationDiv =
//   '<div class="chat-bubble you">Project Location - Life Republic Township, Pimpri-Chinchwad, Pune, Maharashtra 410506. Maps Link - <a href=https://maps.app.goo.gl/nSMYFpu9euY3Rnqw8 target=_blank>https://maps.app.goo.gl/ nSMYFpu9euY3Rnqw8</a></div><div class="chat-bubble you"><b>Pune International Airport is about 25 Km from the area via Hinjewadi-Aundh road</div><div class="chat-bubble you"><b>Host to luxury hotel chains such as Vivanta, Holiday INN, Hyatt and Lemon Tree</div><div class="chat-bubble you"><b>Life Tree, Sanjeevani Multispeciality and Surya Mother & Child Care hospitals ensure good medical infrastructure</div><div class="chat-bubble you"><b>Blue Ridge Public, The Good Samaritan, Rahul International, VIBGYOR High & Mount Litera schools are present in Hinjewadi</div><div class="chat-bubble you"><b>About 9 km from Chinchwad Railway Station, while Pune Junction Railway Station is 19 km away only</div><div class="chat-bubble you"><b>The International Institute of Information Technology and Symbiosis Institute of International Business are in proximity</div><div class="chat-bubble you"><b>Marunji Road, Hinjewadi-Aundh Road, Maan Road and Dange Chowk Road are key roads in Hinjewadi</div><div class="chat-bubble you"><b>Enjoys smooth inter and intracity connectivity via Mumbai-Pune Expressway, also known as NH-48</div><div class="chat-bubble you"><b>The locale is home to Rajiv Gandhi IT Park, Embassy Techzone, Quadron Business Park and Qubix SEZ Blueridge</div><div class="chat-bubble you">Would you like to know more about the Project?</div><div class="chat-bubble you"><button class="brochure-btn btn btn-default contact-sales"><div id=slide></div><a href=#>YES</a></button> <button class="brochure-btn btn btn-default not-interested"><div id=slide></div><a href=#>NO</a></button></div>';

// const locatedDiv =
//   'Project Location - Life Republic Township, Pimpri-Chinchwad, Pune, Maharashtra 410506. Maps Link - <a href=https://maps.app.goo.gl/nSMYFpu9euY3Rnqw8 target=_blank>https://maps.app.goo.gl/ nSMYFpu9euY3Rnqw8</a>';

const configDiv =
  '';

const amenitiesDiv =
  '<div class="chat-bubble you">Nurture your hobbies with Hi Life Amenities<br></div><div class="chat-bubble you"><b>Children\'s Play Area | Clubhouse | Gymnasium | Indoor Games & Many More</b><br></div><div class="chat-bubble you">Would you like to know more about the amenities?</div><div class="chat-bubble you"><button class="brochure-btn btn btn-default contact-sales"><div id=slide></div><a href=#>YES</a></button> <button class="brochure-btn btn btn-default not-interested"><div id=slide></div><a href=#>NO</a></button></div>';

const highlightDiv =
  '<div class="chat-bubble you">5 Star Hospitality Services</div><div class="chat-bubble you">70% Open Spaces</div><div class="chat-bubble you">Resort Like Amenities</div><div class="chat-bubble you">40,000 Sq. Ft. Of Themed Landscapes With Lush Greenery</div><div class="chat-bubble you">Would you like to know more about the project?</div><div class="chat-bubble you"><button class="brochure-btn btn btn-default contact-sales"><div id=slide></div><a href=#>YES</a></button> <button class="brochure-btn btn btn-default not-interested"><div id=slide></div><a href=#>NO</a></button></div>';

  // const para = document.createElement("div");
// para.className = "chat-screen"
// $("body").append(para)

$(".chat-screen").append(
  `<div class="chat-header"><div class="chat-header-title">${projectLogo}<span style="padding-left: 10px; padding-top: 8px;">Lets Talk?</span></div></div>`
);
// chat header end

// chat form start
$(".chat-screen").append(
  '<div class="chat-mail hide"><div class="row enq_form"><div class="col-md-12 mb-2 text-center form-heading"><p style=font-size:14px>Hi! Please fill out the form below to know more about the project!</div><div class="col-md-12 mb-2 text-center error-phone"><p style=font-size:14px>Please! Enter your phone number</div><div class="col-md-12 mb-2 text-center error-email"><p style=font-size:14px>Please! Enter your email address</div><div class="col-md-12 mb-2 text-center error-name"><p style=font-size:14px>Please! Enter your name</div></div><div class="row form-div"><div class="col-md-12 mb-2 text-center beforeFormSubmission"style=display:none></div><div class="col-md-12 successMsg"style=display:none;font-size:14px></div><div class="col-md-12 form-fields"><div class=form-group><input class="form-control chatbot-first-name"placeholder="First Name"></div></div><div class="col-md-12 form-fields"><div class=form-group><input class="form-control chatbot-last-name"placeholder="Last Name"></div></div><div class="col-md-12 form-fields"><div class=form-group><input class="form-control chatbot-email"placeholder=Email></div></div><div class="col-md-12 form-fields"><div class="form-group phone-open-div"><input class="form-control chatbot-phone"placeholder=Phone*></div></div><div class=col-md-12 style=margin-left:10px><p class=text-dark>Property :<div class=row><div class=col-lg-5><input class=Mantra Mayfair Residences id=t1 name=radio-group1 type=radio value="Mantra Mayfair Residences"checked><label for=t1 style=font-size:13px>Mantra Mayfair Residences</label></div><div class=col-lg-5><input class=Mantra Burgundy One Residences id=t3 name=radio-group1 type=radio value="Mantra Burgundy One Residences"><label for=t3 style=font-size:13px>Mantra Burgundy One Residences</label></div><div class=col-lg-5><input class=Mantra Magnus id=t1 name=radio-group1 type=radio value="Mantra Magnus"><label for=t1 style=font-size:13px>Mantra Magnus</label></div><div class=col-lg-5><input class=Mantra Melange – Kharadi Riverside id=t1 name=radio-group1 type=radio value="Mantra Melange – Kharadi Riverside"><label for=t1 style=font-size:13px>Mantra Melange – Kharadi Riverside</label></div></div></div><div class="col-md-12 form-fields"><button class="btn btn-block btn-primary btn-rounded enquire-form"style=margin-left:20px>Submit</button></div><div class=col-md-12><div class="powered-by go-back">Go back to Main Menu</div></div><div class=col-md-12></div></div></div>');
// chat form end

// chatbot content start
$(".chat-screen").append(
  `<div class="chat-body"> <div class="chat-start"></div> ${startingDiv} <div class="chat-bubble you">Please select one of the options to know more, or ask your own question. </div><div class="chat-bubble you"><button class="btn btn-default main-menu-btn Highlights"><div id="slide"></div><a href="#">Highlights</a></button><button class="btn btn-default main-menu-btn Amenities"><div id="slide"></div><a href="#">Amenities</a></button><button class="btn btn-default main-menu-btn Visit"><div id="slide"></div><a href="#">Site Visit</a></button><button class="btn btn-default main-menu-btn Pricing"><div id="slide"></div><a href="#">Pricing</a></button><button class="btn btn-default main-menu-btn Brochure"><div id="slide"></div><a href="#">Brochure</a></button><button class="btn btn-default main-menu-btn contact-sales"><div id="slide"></div><a href="#">Contact Sales</a></button><button class="btn btn-default main-menu-btn contact-sales"><div id="slide"></div><a href="#">Offers</a></button></div></div>`
);
// chatbot content end

// chatbot input box start
$(".chat-screen").append(
  '<div class="chat-input"> <input type="text" placeholder="Type a message..." class="user-input"> <div class="input-action-icon"> <a class="user-input-submit-button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></a> </div></div>'
);
// chatbot input box end

// chatbot ending start
$(".chat-screen").append(
  '<div class="chat-session-end hide"> <h5>This chat session has ended</h5> <p>Thank you for chatting with us, If you can take a minute and rate this chat:</p><div class="rate-me"> <div class="rate-bubble great"> <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg></span> Great </div><div class="rate-bubble bad"> <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-down"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg></span> Bad </div></div><div class="powered-by"></div></div>'
);
// chatbot ending end

$(".chat-bot-icon").append(
  '<div class="shk"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square animate"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x "><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>'
);

// $(".chat-bot-icon").append('<div class="link"><span class="addText">We are heppy to help </span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square animate"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x "><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>')

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const d = new Date();
let day = days[d.getDay()];

var timeToShow =
  day + ", " + new Date().getHours() + ":" + new Date().getMinutes().toString().padStart(2, '0');
$(".chat-start").text(timeToShow);

const utterances = [
  ["how are you", "how is life", "how are things"], //0
  ["hi", "hey", "hello", "good morning", "good afternoon"], //1
  ["what are you doing", "what is going on", "what is up", "what's up"],
  ["who are you", "are you human", "are you bot", "are you human or bot"],
  ["garden", "swim", "jog", "hall", "gym", "vasthu", "vaast", "basket"],
];
const answers = [
  [
    "Fine... how are you?",
    "Pretty well, how are you?",
    "Fantastic, how are you?",
  ],
  ["Hello!", "Hi!", "Hey!", "Hi there!", "Howdy"],
  [
    "Nothing much",
    "About to go to sleep",
    "Can you guess?",
    "I don't know actually",
  ],
  ["I am just a bot", "I am a bot. What about you?"],
  [
    'Yes, Do you want to know more about the Amenites? <button class="btn btn-default brochure-btn contact-sales"><div id="slide"></div><a href="#">YES</a></button><button class="btn btn-default brochure-btn not-interested"><div id="slide"></div><a href="#">NO</a></button>',
  ],
];

const alternatives = [
  `<div class="chat-bubble you brochure-download-btn">Sorry! We did not understand. Please write to us if you have any questions or need any help. You can call us on ${phoneNumberDiv}.</div><div class="chat-bubble you"> <button class="btn btn-default brochure-btn contact-sales"><div id="slide"></div><a href="#">YES</a></button><button class="btn btn-default brochure-btn not-interested"><div id="slide"></div><a href="#">NO</a></button></div>`,
];

function compare(utterancesArray, answersArray, string) {
  let item;
  for (let x = 0; x < utterancesArray.length; x++) {
    for (let y = 0; y < utterancesArray[x].length; y++) {
      if (utterancesArray[x][y] === string) {
        items = answersArray[x];
        item = items[Math.floor(Math.random() * items.length)];
      }
    }
  }
  return item;
}

function output(input) {
  let product;
  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
  text = text
    .replace(/ a /g, " ")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "");

  let textIncludesLocation =
    text.includes("hospital") ||
    text.includes("school") ||
    text.includes("entert") ||
    text.includes("location") ||
    text.includes("near") ||
    text.includes("landmark") ||
    text.includes("mall") ||
    text.includes("park");
  if (textIncludesLocation) {
    // $(".Brochure-response-from-input").show()
    let inputDiv = `<div class="Location-response"> ${locationDiv} </div>`;
    $(".chat-body").append(inputDiv);
    $(".chat-body").animate({ scrollTop: "+=250px" }, 500);
    return false;
  }

  let textIncludesConfiguration =
    text.includes("config") ||
    text.includes("status") ||
    text.includes("ready") ||
    text.includes("Custom") ||
    text.includes("view") ||
    text.includes("sqft") ||
    text.includes("square") ||
    text.includes("sq");
  if (textIncludesConfiguration) {
    // $(".Brochure-response-from-input").show()
    let inputDiv = configDiv;
    $(".chat-body").append(inputDiv);
    $(".chat-body").animate({ scrollTop: "+=250px" }, 500);
    return false;
  }

  let textIncludesPrice =
    text.includes("price") ||
    text.includes("plan") ||
    text.includes("cost") ||
    text.includes("info") ||
    text.includes("rate") ||
    text.includes("booking");
  if (textIncludesPrice) {
    // $(".Price-response-from-input").show()
    let inputDiv =
      '<div class="chat-bubble you pricing-btn"> Do You Want to know the price?</div><div class="chat-bubble you"> <button class="btn btn-default brochure-btn contact-sales"> <div id="slide"></div><a href="#">YES</a> </button> <button class="btn btn-default brochure-btn not-interested"> <div id="slide"></div><a href="#">NO</a> </button> </div>';
    $(".chat-body").append(inputDiv);
    $(".chat-body").animate({ scrollTop: "+=250px" }, 500);
    return false;
  }

  let textIncludesEMI =
    text.includes("emi") ||
    text.includes("install") ||
    text.includes("loan") ||
    text.includes("bank");
  if (textIncludesEMI) {
    // $(".Price-response-from-input").show()
    let inputDiv =
      '<div class="chat-bubble you pricing-btn"> Do You Want to know more about the EMI, Loan procedure or Pricing Plan?</div><div class="chat-bubble you"> <button class="btn btn-default brochure-btn contact-sales"> <div id="slide"></div><a href="#">YES</a> </button> <button class="btn btn-default brochure-btn not-interested"> <div id="slide"></div><a href="#">NO</a> </button> </div>';
    $(".chat-body").append(inputDiv);
    $(".chat-body").animate({ scrollTop: "+=250px" }, 500);
    return false;
  }

  let textIncludesBrochure =
    text.includes("floor") ||
    text.includes("configuration") ||
    text.includes("broch") ||
    text.includes("unit") ||
    text.includes("poss") ||
    text.includes("const") ||
    text.includes("rate") ||
    text.includes("date") ||
    text.includes("bhk") ||
    text.includes("apartment") ||
    text.includes("flat") ||
    text.includes("house") ||
    text.includes("home") ||
    text.includes("brochure") ||
    text.includes("apartment") ||
    text.includes("apartment") ||
    text.includes("handover");
  // || text.includes("floor") || text.includes("unit")
  if (textIncludesBrochure) {
    // $(".Brochure-response-from-input").show()
    let inputDiv =
      '<div class="chat-bubble you brochure-download-btn">Do You Want to download the Brochure?</div><div class="chat-bubble you"> <button class="btn btn-default brochure-btn contact-sales"> <div id="slide"></div><a href="#">YES</a> </button> <button class="btn btn-default brochure-btn not-interested"> <div id="slide"></div><a href="#">NO</a> </button> </div>';
    $(".chat-body").append(inputDiv);
    $(".chat-body").animate({ scrollTop: "+=250px" }, 500);
    return false;
  }

  let textIncludesComplaint =
    text.includes("bad") ||
    text.includes("complain") ||
    text.includes("dirty") ||
    text.includes("help") ||
    text.includes("wrong") ||
    text.includes("problem") ||
    text.includes("issue") ||
    text.includes("poor") ||
    text.includes("delay") ||
    text.includes("late") ||
    text.includes("refund") ||
    text.includes("slow") ||
    text.includes("late") ||
    text.includes("angry") ||
    text.includes("furious") ||
    text.includes("exit");
  // || text.includes("floor") || text.includes("unit")
  if (textIncludesComplaint) {
    // $(".Brochure-response-from-input").show()
    let inputDiv = `<div class="chat-bubble you brochure-download-btn">Sorry! Do you want to Write a Queries or You can call us on ${phoneNumberDiv}?</div><div class="chat-bubble you"> <button class="btn btn-default brochure-btn contact-sales"> <div id="slide"></div><a href="#">YES</a> </button> <button class="btn btn-default brochure-btn not-interested"> <div id="slide"></div><a href="#">NO</a> </button> </div>`;
    $(".chat-body").append(inputDiv);
    $(".chat-body").animate({ scrollTop: "+=250px" }, 500);
    return false;
  }

  let textIncludesAmenities =
    text.includes("amenit") ||
    text.includes("facility") ||
    text.includes("feature") ||
    text.includes("good") ||
    text.includes("club") ||
    text.includes("activ");
  // || text.includes("floor") || text.includes("unit")
  if (textIncludesAmenities) {
    // $(".Brochure-response-from-input").show()
    let inputDiv = `<div class="Location-response"> ${amenitiesDiv} </div>`;
    $(".chat-body").append(inputDiv);
    $(".chat-body").animate({ scrollTop: "+=250px" }, 500);
    return false;
  }

  let textIncludesAddress =
    text.includes("located") ||
    text.includes("address") ||
    text.includes("where") ||
    text.includes("pallavaram") ||
    text.includes("chennai");
  // || text.includes("floor") || text.includes("unit")
  if (textIncludesAddress) {
    // $(".Brochure-response-from-input").show()
    let inputDiv = `<div class="chat-bubble you"> ${locatedDiv} </div><div class="chat-bubble you"> <button class="btn btn-default brochure-btn contact-sales"><div id="slide"></div><a href="#">YES</a></button><button class="btn btn-default brochure-btn not-interested"><div id="slide"></div><a href="#">NO</a></button></div>`;
    $(".chat-body").append(inputDiv);
    $(".chat-body").animate({ scrollTop: "+=250px" }, 500);
    return false;
  }

  if (compare(utterances, answers, text)) {
    product = compare(utterances, answers, text);
  } else {
    product = alternatives[Math.floor(Math.random() * alternatives.length)];
  }
  addingAnsToChat(product);
  // }
  // addChatEntry (product);
}

function validateName(name) {
  // var re = /^[a-zA-Z ]*$/;

  // var re = /^[a-zA-Z ]{2,30}$/;
  var re = /^[a-zA-Z\- ]{2,30}$/;
  if(re.test(name))
  {
      return true;
  }
  else {
      // alert("Please enter a valid name.");
      return false;
  }
}

function validateEmail(email) {
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return re.test(email);

  if (re.test(email)) {
    return true;
  } else {
    // alert("Please enter a valid email address.");
    return false;
  }

}

function validatePhone(phone) {
  // var re = /^[\+]?[0-9]{3}?[-\s\.]?[6-9]{2}?[0-9]{8,12}$/;
  var re = /^[\+]?[0-9]{8,14}$/;
  // return re.test(phone);
  if (re.test(phone)) {
    return true;
  } else {
    // alert("Please enter a valid phone number.");
    return false;
  }
}

//Toggle fullscreen
$(".chat-bot-icon").click(function (e) {
  $(this).find("svg").toggleClass("animate");
  $(".chat-screen").toggleClass("show-chat");
});

$(".end-chat").click(function () {
  $(".chat-body").addClass("hide");
  $(".chat-input").addClass("hide");
  $(".chat-session-end").removeClass("hide");
  $(".chat-header-option").addClass("hide");
});

// $(document).on('click', '.question', function(){
//     let section = $(this).text()
//     var sectiontoShow = section + "-response"
//     $(".response").hide()
//     // $(".About-response").hide()
//     // $(".Pricing-response").hide()
//     // $(".Highlights-response").hide()
//     // $(".user-intraction").hide()
//     // $(".special-question-response").hide()
//     $("."+sectiontoShow).show()
// })

{
  /* <div id="slide"></div><a href="#">Let's Go!</a> */
}

function appendMainMenu() {
  let inputDiv =
    '<div class="Main-menu"><div class="chat-bubble me">No</div><div class="chat-bubble you">Please select one of the options to know more, or ask your own question. </div><div class="chat-bubble you"><button class="btn btn-default main-menu-btn Highlights"><div id="slide"></div><a href="#">Highlights</a></button><button class="btn btn-default main-menu-btn Location"><div id="slide"></div><a href="#">Location</a></button><button class="btn btn-default main-menu-btn Amenities"><div id="slide"></div><a href="#">Amenities</a></button><button class="btn btn-default main-menu-btn Visit"><div id="slide"></div><a href="#">Site Visit</a></button><button class="btn btn-default main-menu-btn Pricing"><div id="slide"></div><a href="#">Pricing</a></button><button class="btn btn-default main-menu-btn Brochure"><div id="slide"></div><a href="#">Brochure</a></button><button class="btn btn-default main-menu-btn contact-sales"><div id="slide"></div><a href="#">Contact Sales</a></button><button class="btn btn-default main-menu-btn contact-sales"><div id="slide"></div><a href="#">Offers</a></button></div></div>';
  setTimeout(() => {
    $(".chat-body").append(inputDiv);
    $(".chat-body").animate({ scrollTop: "+=250px" }, 500);
  }, 1000);
}

$(document).on("click", ".not-interested", function () {
  appendMainMenu();
});

$(document).on("click", ".Brochure", function () {
  let inputDiv =
    '<div class="chat-bubble you">Would you like us to email you the project brochure and price details?</div><div class="chat-bubble you"> <button class="btn btn-default brochure-btn contact-sales"><div id="slide"></div><a href="#">YES</a></button><button class="btn btn-default brochure-btn not-interested"><div id="slide"></div><a href="#">NO</a></button></div>';
  setTimeout(() => {
    $(".chat-body").append(inputDiv);
    $(".chat-body").animate({ scrollTop: "+=250px" }, 500);
  }, 1000);
});

$(document).on("click", ".Pricing", function () {
  let inputDiv =
    '<div class="chat-bubble you">Would you like us to email you the project brochure and price details?</div><div class="chat-bubble you"> <button class="btn btn-default brochure-btn contact-sales"><div id="slide"></div><a href="#">YES</a></button><button class="btn btn-default brochure-btn not-interested"><div id="slide"></div><a href="#">NO</a></button></div>';
  setTimeout(() => {
    $(".chat-body").append(inputDiv);
    $(".chat-body").animate({ scrollTop: "+=250px" }, 500);
  }, 1000);
});

$(document).on("click", ".Visit", function () {
  let inputDiv =
    '<div class="chat-bubble you">Would you like us to book a Site visit for you?</div><div class="chat-bubble you"> <button class="btn btn-default brochure-btn contact-sales"><div id="slide"></div><a href="#">YES</a></button><button class="btn btn-default brochure-btn not-interested"><div id="slide"></div><a href="#">NO</a></button></div>';
  setTimeout(() => {
    $(".chat-body").append(inputDiv);
    $(".chat-body").animate({ scrollTop: "+=250px" }, 500);
  }, 1000);
});

$(document).on("click", ".Location", function () {
  let inputDiv = `<div class="Location-response"><div class="chat-bubble me">Location</div> ${locationDiv} </div>`;
  setTimeout(() => {
    $(".chat-body").append(inputDiv);
    $(".chat-body").animate({ scrollTop: "+=250px" }, 500);
  }, 500);
});

$(document).on("click", ".Amenities", function () {
  let inputDiv = `<div class="Location-response"><div class="chat-bubble me">Amenities</div> ${amenitiesDiv}</div>`;
  setTimeout(() => {
    $(".chat-body").append(inputDiv);
    $(".chat-body").animate({ scrollTop: "+=250px" }, 500);
  }, 1000);
});

$(document).on("click", ".Highlights", function () {
  let inputDiv = `<div class="Location-response"> <div class="chat-bubble me">Highlights</div> ${highlightDiv}</div>`;
  setTimeout(() => {
    $(".chat-body").append(inputDiv);
    $(".chat-body").animate({ scrollTop: "+=250px" }, 500);
  }, 1000);
});

// $(document).on('click', '.CustomerSpeaks', function(){
//     let inputDiv = '<div class="chat-bubble you"><iframe width="100%" height="315" src="https://www.youtube.com/embed/-9L3n0jWd0A"></iframe></div> <div class="chat-bubble you"><iframe width="100%" height="315" src="https://www.youtube.com/embed/E8JnD1nMADw"></iframe></div><div class="chat-bubble you">Would you like us to book a Site visit for you?</div><div class="chat-bubble you"> <div class="chat-bubble you"> <button class="btn btn-default brochure-btn contact-sales"><div id="slide"></div><a href="#">YES</a></button><button class="btn btn-default brochure-btn not-interested"><div id="slide"></div><a href="#">NO</a></button></div>'
//     setTimeout(() => {
//         $('.chat-body').append(inputDiv)
//         $('.chat-body').animate({scrollTop: '+=250px'}, 500);
//     }, 1000);
// })

function addingAnsToChat(ans) {
  // let userInput = $('.user-input').val()
  if (ans) {
    let inputDiv =
      "<div class='chat-bubble you user-intraction'>" + ans + "</div>";
    // $('.chat-body').append(inputDiv)
    setTimeout(() => {
      $(".chat-body").append(inputDiv);
      $(".chat-body").animate({ scrollTop: "+=250px" }, 1000);
    }, 1000);
  }
}

// $(document).on('click', '.kmp', function(){
//     $(".kmp-response").show()
// })

// $(document).on('click', '.Main-menu', function(){
//     $(".kmp-response").hide()
// })

// $(document).on('click', '.rate-bubble', function(){
//     //take email and feedback, send both to google sheet
// })

$(document).on("click", ".contact-sales", function () {
  //take email and feedback, send both to google sheet
  // $(".error-phone").hide()
  // $('.chat-mail').removeClass('hide');
  // $('.chat-body').addClass('hide');
  // $('.chat-input').addClass('hide');
  // $('.chat-header-option').addClass('hide');
  showForm();
});

$(document).on("click", ".go-back", function () {
  //take email and feedback, send both to google sheet
  // $(".error-phone").hide()
  // $('.chat-mail').addClass('hide');
  // $('.chat-body').removeClass('hide');
  // $('.chat-input').removeClass('hide');
  // $('.chat-header-option').removeClass('hide');
  hideForm();
});

function addingValueToChat(userInput) {
  // let userInput = $('.user-input').val()
  if (userInput) {
    let inputDiv =
      "<div class='chat-bubble me user-intraction'>" + userInput + "</div>";
    $(".chat-body").append(inputDiv);
    $(".chat-body").animate({ scrollTop: "+=250px" }, 1000);
    $(".user-input").val("");
  }
}

function addingAnsToChat(ans) {
  // let userInput = $('.user-input').val()
  if (ans) {
    let inputDiv =
      "<div class='chat-bubble you user-intraction'>" + ans + "</div>";
    // $('.chat-body').append(inputDiv)
    setTimeout(() => {
      $(".chat-body").append(inputDiv);
      $(".chat-body").animate({ scrollTop: "+=250px" }, 1000);
    }, 1000);
  }
}

function showForm() {
  $(".error-phone, .error-email, .error-name").hide();
  $(".chat-mail").removeClass("hide");
  $(".chat-body").addClass("hide");
  $(".chat-input").addClass("hide");
  $(".chat-header-option").addClass("hide");
}

function hideForm() {
  $(".error-phone, .error-email, .error-name").hide();
  $(".chat-mail").addClass("hide");
  $(".chat-body").removeClass("hide");
  $(".chat-input").removeClass("hide");
  $(".chat-header-option").removeClass("hide");
}

function beforeSendFormSubmission() {
  $(".error-phone, .error-email, .error-name").hide();
  $(".form-heading").hide();
  let beforeSendMsg =
    '<div class="mb-2" style="font-size: 15px;"><p>Please Wait!</p></div>';
  let beforeSendDiv = '<div class="chatbot-beforsend"></div>';
  $(".beforeFormSubmission").append(beforeSendMsg);
  $(".beforeFormSubmission").append(beforeSendDiv);
  $(".beforeFormSubmission").show();
}

function successfullFormSubmission() {
  $(".waiting").hide();
  $(".form-heading").hide();
  $(".error-phone, .error-email, .error-name").hide();
  $(".beforeFormSubmission").hide();
  let inputDiv =
    '<div class="col-md-12 text-center mb-2"><p>Thanks! For your enquiry we will contact you soon!</p></div>';
  let successDiv =
    '<div class="chatbot-wrapper"><svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg></div>';

  // let takeBackDiv = '<div class="col-md-12"><div class="powered-by go-back">Go back to Main Menu</div></div>'
  $(".successMsg").append(inputDiv);
  $(".successMsg").append(successDiv);
  $(".successMsg").show();
  // $('.form-div').append(takeBackDiv)
}

function errorFormSubmission() {
  $(".form-fields").show();
  $(".form-heading").show();
  $(".beforeFormSubmission").hide();
  let inputDiv =
    '<div class="col-md-12 text-center mb-2" style="color: red">Sorry! Something went wrong please try again.</div>';
  $(".successMsg").append(inputDiv);
  $(".successMsg").show();
}

//sending data to zapier webhook
function send_data_crm(form_data, webhook_url) {
  $.ajax({
    url: webhook_url,
    type: "POST",
    data: form_data,
    dataType: "text",
    beforeSend: function () {
      beforeSendFormSubmission();
    },
    success: function (result) {
      setTimeout(() => {
        successfullFormSubmission();
        return false;
      }, 1000);

      setTimeout(() => {
        hideForm();
        let inputDiv =
          '<div class="chat-bubble you"><b>Thanks for Enquiring ' +
          custName + lastName +
          "! We will contact you shortly</b></div>";
        $(".chat-body").append(inputDiv);
        $(".chat-body").animate({ scrollTop: "+=250px" }, 500);
      }, 3000);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      errorFormSubmission();
    },
    complete: function () {},
  });
}

$(document).on("click", ".user-input-submit-button", function () {
  let userInput = $(".user-input").val();
  addingValueToChat(userInput);
  output(userInput);
});

$(document).on("keypress", ".user-input", function (e) {
  let userInput = $(".user-input").val();
  if (e.keyCode == 13) {
    addingValueToChat(userInput);
    output(userInput);
    return false;
  }
});

// #TODO check the length of me class then show the form after every 10/20 sec
setTimeout(() => {
  if (!$(".chat-screen").hasClass("show-chat")) {
    $(".chat-bot-icon").find("svg").toggleClass("animate");
    $(".chat-screen").addClass("show-chat");
    // showForm()
  }
}, 5000);

// setInterval(() => {
setTimeout(() => {
  let conversationStart = $(".chat-body .user-intraction").text();
  if (conversationStart) {
    showForm();
  }
}, 20000);

// setInterval(showForm, 20000);

function sendDataCRM(form_data) {
    $.ajax({
        url: 'mail.php',   
        type: "POST",
        data: form_data,
        success: function (response) {
            console.log("Mail sent:", response);
        },
        error: function (xhr, status, error) {
            console.error("Mail error:", error);
        }
    });
}

$(document).on("click", ".enquire-form", function () {
  var urlparams = new URL(document.location).searchParams;

  var utm_source = "";
  var utm_campaign = "";
  var utm_term = "";
  var utm_content = "";

  if (urlparams.get("utm_source")) {
    utm_source = urlparams.get("utm_source");
  }
  if (urlparams.get("utm_campaign")) {
    utm_campaign = urlparams.get("utm_campaign");
  }
  if (urlparams.get("utm_term")) {
    utm_term = urlparams.get("utm_term");
  }
  if (urlparams.get("utm_content")) {
    utm_content = urlparams.get("utm_content");
  }



  let url = window.location.href;
  let referrer_url = document.referrer;
  let form_data = {};

  custName = $(".chatbot-first-name").val();
  lastName = $(".chatbot-last-name").val();
  let email = $(".chatbot-email").val();
  phone = $(".chatbot-phone").val();
  let bhk = $("input[type='radio'][name='radio-group1']:checked").val();
  console.log("chat bhk", bhk);

  form_data["name"] = custName;
  form_data["lastName"] = lastName;
  form_data["email"] = email;
  form_data["phone"] = phone;
  form_data["bhk"] = bhk;

  form_data["source"] = utm_source;
  form_data["campaign"] = utm_campaign;
  form_data["term"] = utm_term;
  form_data["content"] = utm_content;
  form_data["url"] = url;
  form_data["referrer_url"] = referrer_url;

  sessionId = sessionStorage.getItem("SessionId");

  form_data["sessionId"] = sessionId;
  let chatbotConversation = $(".chat-body").html();
  form_data["conversation"] = chatbotConversation
    ? encodeURIComponent(chatbotConversation)
    : "Only Post Fields";
  form_data["bot"] = "6769650c064bec636885a5e5";
  form_data["updated_time"] = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

    var webhook_url_optima = "";
    sendDataCRM(form_data, webhook_url_optima);

  if ((phone.length !== 0 && validatePhone(phone)) && (email.length !== 0 && validateEmail(email)) && (custName.length !== 0 && validateName(custName))) {
    this.disabled = true;

    $(".form-fields").hide();

    let webhook_url =
      "https://hook.eu1.make.com/3pxnev4c80fxkao2igc1gfq7cnmnkfov";

    function gtag_report_conversion(url) {
      var callback = function () {
        if (typeof url != "undefined") {
          window.location = url;
        }
      };
      gtag("event", "conversion", {
        send_to: google_conversion_pixel,
        event_callback: callback,
      });
      return false;
    }
    // gtag_report_conversion();

    if (google_conversion_pixel) {
      gtag_report_conversion();
    }

    send_data_crm(form_data, webhook_url);

    let chatbotConversationURL =
    "";

    sendDataCRM(chatbotConversationURL, form_data);
  } 
  // else {
  //   $(".error-phone").show();
  // }

  else {
    if (!validatePhone(phone)) {
        $(".error-phone").show();
        $(".error-email, .error-name").hide();
    }
    if (!validateEmail(email)) {
        $(".error-email").css("color", "red").show();
        $(".error-phone, .error-name").hide();
    }
    if (!validateName(custName)) {
        $(".error-name").css("color", "red").show();
        $(".error-phone, .error-email").hide();
    }
}
});

// function sendConversationDatatoCRM() {
//   //#TODO check if any changes in the chatbot body
//   let conversationStart = $(".chat-body .user-intraction").text();
//   if (conversationStart) {
//     let randomSessionId = "SessionId" + Math.random().toString(36).slice(2);
//     let sessionId = sessionStorage.getItem("SessionId");
//     if (!sessionId) {
//       sessionStorage.setItem("SessionId", randomSessionId);
//     }

//     sessionId = sessionStorage.getItem("SessionId");

//     let chatbotConversation = $(".chat-body").html();
//     let chatbotData = {};

//     if (phone) chatbotData["phone"] = phone;
//     chatbotData["sessionId"] = sessionId;
//     chatbotData["project"] =
//       "Kolte-Patil Developers Ltd. Official Landing Page";
//     chatbotData["updated_time"] = new Date()
//       .toISOString()
//       .slice(0, 19)
//       .replace("T", " ");
//     chatbotData["conversation"] = encodeURIComponent(chatbotConversation);

//     // let chatbotConversationURL = "http://localhost:3031/api/v1/conversation/add"
//     let chatbotConversationURL =
//       "";

//     sendDataCRM(chatbotConversationURL, chatbotData);
//   }
// }

// setInterval(sendConversationDatatoCRM, 10000);



// if(phone)

// send following things to db- sessionId, chatbotConversation, email, created time, updated time

function sendConversationDatatoCRM() {
  //#TODO check if any changes in the chatbot body
  let conversationStart = $(".chat-body .me").text();
  if (conversationStart) {
    // let randomSessionId = 'SessionId' + Math.random().toString(36).slice(2)
    // let sessionId = sessionStorage.getItem("SessionId");
    // if(!sessionId) {
    //     sessionStorage.setItem("SessionId", randomSessionId);
    // }

    // sessionId = sessionStorage.getItem("SessionId");

    sessionId = sessionStorage.getItem("SessionId");
  

    let chatbotConversation = $(".chat-body").html();
    let chatbotData = {};

    if (phone) chatbotData["phone"] = phone;
    chatbotData["sessionId"] = sessionId;
    chatbotData["bot"] = "6769650c064bec636885a5e5";
    chatbotData["project"] = "Canvas";
    chatbotData["updated_time"] = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    chatbotData["conversation"] = encodeURIComponent(chatbotConversation);

    // let chatbotConversationURL = "http://localhost:3031/api/v1/conversation/add"
    let chatbotConversationURL =
      "";

    sendDataCRM(chatbotConversationURL, chatbotData);
  }
}

setInterval(sendConversationDatatoCRM, 10000);


// if(phone)

// send following things to db- sessionId, chatbotConversation, email, created time, updated time
