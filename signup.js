// .set('username',NAME)
//     .set('email',EMAIL)
//     .set('password',PASSWORD)
//     .set('verify',EMAIL_OTP_CODE)
//     .set('invit',INVITE_CODE);
// https://spotplus.com/Api/Mobile/emailregister
//  https://spotplus.com/Api/Mobile/emailcode?email=test@gmail.com

let FORM_INPUT = {}


async function OnEmailVerify() {
	e.preventDefault();

	const form = document.forms[1];

	const emailOTP = form.email_codebox;

	if (emailOTP.length != 6 || Number(emailOTP) == NaN) {
		ShowErrorAlert("email verification code invalid");
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
			// console.log("QWERTYUIOPAS ============== QWERTYUIOPASDFGHJKL");
			ShowSuccessAlert("Account Created Successfully!");
		}

		else if (data.status === 0) {
			const errorMSG = data.error;

			// TODO: POP AN ALERT TO USER
			ShowErrorAlert(errorMSG);
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

	if (password !== confirm_password) {
		ShowErrorAlert("Password Mismatch");
		return;
	}
	if (t_and_c !== true) {
		ShowErrorAlert("please accept terms & conditions");
		return
	}

	FORM_INPUT = {
		username: username,
		email, email,
		password: password,
		invit: invite_code,
		"t&c": t_and_c
	};

	// console.log("FORM_INPUT: ", FORM_INPUT);

	const res = await fetch("https://spotplus.com/Api/Mobile/emailcode?email=" + email, {
		method: "POST",
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
			const errorMSG = data.data;

			// TODO: POP AN ALERT TO USER
			console.log("QWERTYUIOPAS ============== : ", errorMSG);
			ShowErrorAlert(errorMSG)
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


function ShowErrorAlert(message) {
	const alert = document.getElementById("alert-section");
	const alertContent = `
	<svg style="width: 24px; height: 24px" xmlns="http://www.w3.org/2000/svg" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
	<path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" /></svg><div id="alert-msg">
	${message}</div>
`
	const div = document.createElement('div');
	div.style.display = 'flex';
	div.id = Math.floor(Math.random() * 7);
	div.className = "alert alert-danger d-flex align-items-center hacky-alert";
	div.innerHTML = alertContent;

	alert.appendChild(div);
	alert.style.display = 'flex';

	setTimeout(() => {
		div.style.display = 'none';
		div.remove();
	}, 5000);
}


function ShowSuccessAlert(message) {
	const alert = document.getElementById("alert-section");
	const alertContent = `
	<svg style="width: 24px; height: 24px" xmlns="http://www.w3.org/2000/svg" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
	<path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
	</svg>
	<div id="success-alert-msg">
		${message}
	</div>
`
	const div = document.createElement('div');
	div.style.display = 'flex';
	div.id = Math.floor(Math.random() * 7);
	div.className = "success alert alert-success d-flex align-items-center hacky-alert";
	div.innerHTML = alertContent;

	alert.appendChild(div);
	alert.style.display = 'flex';

	setTimeout(() => {
		div.style.display = 'none';
		div.remove();
	}, 5000);
}