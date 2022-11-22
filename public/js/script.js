n = new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();

var addressOther = document.querySelectorAll('input[name="ADM_ACTION"]');
console.log(addressField);
var addressField = document.getElementById("otherField");
var tempAddress = "";

for (var i = 0; i < addressOther.length; i++) {
  addressOther[i].addEventListener("change", addressHandler);
}
function addressHandler() {
  if (this.id === "other") {
    addressField.disabled = false;
    addressField.required = true;
    addressField.value = tempAddress;
  } else {
    tempAddress = addressField.value;
    addressField.value = "";
    addressField.disabled = true;
    addressField.required = false;
  }
}

var punishDate = document.getElementById("datepicker");
console.log(punishDate);

for (var i = 0; i < addressOther.length; i++) {
  addressOther[i].addEventListener("change", punishDateHandler);
}
function punishDateHandler() {
  if (this.id === "punish") {
    punishDate.disabled = false;
    punishDate.required = true;
  } else {
    punishDate.disabled = true;
    punishDate.required = false;
    punishDate.value = "";
  }
}

var punishDate2 = document.getElementById("datepicker3");
console.log(punishDate2);

for (var i = 0; i < addressOther.length; i++) {
  addressOther[i].addEventListener("change", punishDate2Handler);
}
function punishDate2Handler() {
  if (this.id === "punish") {
    punishDate2.disabled = false;
    punishDate2.required = true;
  } else {
    punishDate2.disabled = true;
    punishDate2.required = false;
    punishDate2.value = "";
  }
}

var addressOther = document.querySelectorAll('input[name="thePenalty"]');
var days = document.getElementById("days");
console.log(days);

for (var i = 0; i < addressOther.length; i++) {
  addressOther[i].addEventListener("change", daysHandler);
}
function daysHandler() {
  if (this.id === "DEDUCTION") {
    days.disabled = false;
    days.required = true;
  } else {
    days.disabled = true;
    days.required = false;
    days.value = "";
  }
}

var stopping = document.getElementById("stoppingDays");
console.log(stopping);

for (var i = 0; i < addressOther.length; i++) {
  addressOther[i].addEventListener("change", stoppingHandler);
}
function stoppingHandler() {
  if (this.id === "stopping") {
    stopping.disabled = false;
    stopping.required = true;
  } else {
    stopping.disabled = true;
    stopping.required = false;
    stopping.value = "";
  }
}

function myFunction1() {
  // Get the checkbox
  var checkBox = document.getElementById("expenseAmountBox");
  // Get the output text
  var amountInput = document.getElementById("expenseAmount");
  console.log(amountInput);

  if (checkBox.checked == true) {
    amountInput.disabled = false;
    amountInput.required = true;
  } else {
    amountInput.disabled = true;
    amountInput.required = false;
    amountInput.value = "";
  }
}

function myFunction2() {
  // Get the checkbox
  var checkBox = document.getElementById("travelingTicketBox");
  // Get the output text
  var amountInput = document.getElementById("travelingTicket");
  console.log(amountInput);

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true) {
    amountInput.disabled = false;
    amountInput.required = true;
  } else {
    amountInput.disabled = true;
    amountInput.required = false;
    amountInput.value = "";
  }
}

function myFunction3() {
  // Get the checkbox
  var checkBox = document.getElementById("visasBox");
  // Get the output text
  var amountInput = document.getElementById("visas");
  console.log(" slf " + amountInput);

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true) {
    amountInput.disabled = false;
    amountInput.required = true;
  } else {
    amountInput.disabled = true;
    amountInput.required = false;
    amountInput.value = "";
  }
}

function myFunction() {
  swal(
    "Success",
    'You clicked the <b style="color:green;">Success</b> button!',
    "success"
  );
}

function showAlert() {
  alert("hello world");
}

var div = document.getElementById("loadingButton");
var div2 = document.getElementById("submitButton");
console.log(div);
function showloadingButton() {
  if (div.style.display == "none") {
    div.style.display = "block";
    div2.style.display = "none";
  } else {
    div.style.display = "none";
    div2.style.display = "block";
  }
}
