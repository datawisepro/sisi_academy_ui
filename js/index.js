
// Select inputs elements
const first_name_el = document.getElementById("first_name")
const last_name_el = document.getElementById("last_name")
const email_el = document.getElementById("email")
const phone_number_el = document.getElementById("phone_number")
const message_el = document.getElementById("message")

// select submit button
const send_msg_btn = document.getElementById("send_msg_btn")

send_msg_btn.addEventListener("click",sendMsgHandler)


async function sendMsgHandler(e){
    e.preventDefault()

    const first_name = first_name_el.value
    const last_name = last_name_el.value
    const email = email_el.value
    const phone_number = phone_number_el.value
    const message = message_el.value

    const payload = JSON.stringify({first_name,last_name,email,phone_number,message})

   try {
    const response = await fetch("https://api.sisiacademy.com/api/enquiries/",{method:"post",body:payload,headers:{
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "content-type",
        "Access-Control-Request-Method": "POST",
    }})

    
    
    if(response.ok){
        toastr.success("We have received your inquiry and our team will contact you as soon as possible through the email or phone number you provided,Thank you.")
        return
        
    }
    
    // if response is not ok ,we are expecting the response body to contain errors
    const responseErrors =await response.json()

    let msg = ''

    for(let resError in responseErrors){
        const errorMsg = responseErrors[resError]
        
        msg += `${errorMsg}\n`
    }


     toastr.error(msg)
    
   } catch (error) {
    console.log(error)
    toastr.error("An error occur when submitting your details, please try again later.")

   }

}

