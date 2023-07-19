// .set('username',NAME)
//     .set('email',EMAIL)
//     .set('password',PASSWORD)
//     .set('verify',EMAIL_OTP_CODE)
//     .set('invit',INVITE_CODE);
// https://spotplus.com/Api/Mobile/emailregister
//  https://spotplus.com/Api/Mobile/emailcode?email=test@gmail.com
// const alert = bootstrap.Alert.getOrCreateInstance('#notif-alert')
// alert.close()
console.log("QWERTYUIOP=================");


let FORM_INPUT = {}



async function OnEmailVerify() {
	e.preventDefault();

	const form = document.forms[1];


	const emailOTP = form.email_codebox;

	if (emailOTP.length != 6 || Number(emailOTP) == NaN) {
		ShowAlert("email verification code invalid");
		return;
	}

	const res = await fetch("https://spotplus.com/Api/Mobile/emailregister", {
		method: "GET",
		body: {
			...FORM_INPUT,
			verify: emailOTP
		}
	});

	// console.log("FINAL PAYLOAD RES: ", res);

	if (res.status === 200) {

		const data = await res.json();

		if (data.status === 1) {
			// TODO: POP AN ALERT TO USER
			console.log("QWERTYUIOPAS ============== QWERTYUIOPASDFGHJKL");
		}

		else if (data.status === 0) {
			const errorMSG = data.data;

			// TODO: POP AN ALERT TO USER
			ShowAlert(errorMSG);
		}

	}

}



async function OnRegister__ClickHandler(e, r) {
	e.preventDefault();

	const form = document.forms[0];
	const submitBTN = form.register;
	submitBTN.firstElementChild.style.display = 'none';	// Hide "Register"
	submitBTN.firstElementChild.nextElementSibling.style.display = 'inline'; // "Display loader"

	// console.log("======================");

	const username = form.lastname.value + "_" + form.firstname.value;
	const email = form.email.value;
	const password = form.password.value;
	const confirm_password = form.confirm_password.value;
	const invite_code = form.invite_code.value;
	const t_and_c = form.t_and_c.checked;



	FORM_INPUT = {
		username: username,
		email, email,
		password: password,
		invit: invite_code,
		"t&c": t_and_c
	};

	console.log("FORM_INPUT: ", FORM_INPUT);

	const res = await fetch("https://spotplus.com/Api/Mobile/emailcode?email=" + email, {
		method: "GET",
		mode: "cors"
	});

	if (res.status === 200) {

		const data = await res.json();

		if (data.status === 1) {

			submitBTN.firstElementChild.style.display = 'inline';	// Show "Register"
			submitBTN.firstElementChild.nextElementSibling.style.display = 'none'; // "Hide loader"

			updateFormPage(1);
		}

		else if (data.status === 0) {
			const errorMSG = data.error;

			// TODO: POP AN ALERT TO USER
			console.log("QWERTYUIOPAS ============== : ", errorMSG);
		}

	}


}


function updateFormPage(page) {
	const formOne = document.getElementById("form-page-1");
	const formTwo = document.getElementById("form-page-2");

	if (page === 1) {
		formOne.style.display = 'none';
		formTwo.style.display = 'flex';
	}

	else if (page === 2) {

		formOne.style.display = 'flex';
		formTwo.style.display = 'none';

	}

}



