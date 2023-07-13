document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');

  // Send Mail
  document.querySelector('#compose-form').addEventListener('submit', send_email);

});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {

  // Get Emails
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
      // Print emails
      if(emails.length > 0) {
        // Create Email div
        emails.forEach(email => {
          let element = document.createElement('div');
          element.classList.add('row', 'my-2', 'border', 'border-dark');
          if (email.read == true) {
            element.style.backgroundColor = '#e5e5e5';
          }

          let internelement = document.createElement('div');
          internelement.classList.add('row', 'py-2')
          internelement.innerHTML = `
            <div class="col-md-3"><strong>${email.sender}</strong></div>
            <div class="col-md-6 d-flex justify-content-center">${email.subject}</div>
            <div class="col-md-3 text-secondary d-flex justify-content-end">${email.timestamp}</div>
          `;
          internelement.addEventListener('click', () => view_email(email.id));

          if (mailbox == 'sent') {
            internelement.classList.add('col-md-12');
            element.append(internelement);
          } else {
            internelement.classList.add('col-md-11');
            let archive = document.createElement('div');
            archive.classList.add('col-md-1', 'py-2', 'd-flex', 'justify-content-end');
            archive.innerHTML = `<button class="btn btn-sm btn-outline-primary" id="archive"><i class="fa-solid fa-boxes-packing"></i></button>`;
            archive.addEventListener('click', () => arquive(mailbox, email.id));
            element.append(internelement, archive);
          }

          document.querySelector('#emails-view').append(element);
        });
      } else {
        document.querySelector('#emails-view').append('No emails here :(');
      }})
    .catch(error => {
      console.log('Error:', error)
    });

  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#email-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}

function send_email(event) {

  // preventDefault Avoid the patter to submit action
  event.preventDefault();

   fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: document.querySelector('#compose-recipients').value,
        subject: document.querySelector('#compose-subject').value,
        body: document.querySelector('#compose-body').value
    })
  })
  .then(response => response.json())
  .then(result => {
    // Print result
    console.log(result);
    if (result.error){
      document.querySelector('#error-view').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>${result.error}</strong>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`;
    document.querySelector('#error-view').style.display = 'block';
    } else if (result.message) {
      document.querySelector('#error-view').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
      <strong>${result.message}</strong>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`;
    document.querySelector('#error-view').style.display = 'block';
    }
    document.querySelector('.close').addEventListener('click', () => {
      document.querySelector('#error-view').style.display = 'none';
    });

    load_mailbox('sent');
  })
  .catch((error) => {
    console.log('Error:', error)
  });
}

function view_email(email_id) {
  fetch(`/emails/${email_id}`)
  .then(response => response.json())
  .then(email => {
      let emailview = document.createElement('div');
      const elements = email.body.split(/\n+/).map(e => `<p>${e}</p>\n`).join("");
      document.querySelector('#email-view').innerHTML = `
        <h6><strong>From: </strong>${email.sender}</h6>
        <h6><strong>To: </strong>${email.recipients.join(", ")}</h6>
        <h6><strong>Subject: </strong>${email.subject}</h6>
        <h6><strong>Timestamp: </strong>${email.timestamp}</h6>
        <button class="btn btn-sm btn-outline-primary" id="reply">Reply</button>
        <hr>
        <div>${elements}</div>
      `;

    document.querySelector('#reply').addEventListener('click', () => {
      compose_email();

      document.querySelector('#compose-recipients').value = email.sender;
      document.querySelector('#compose-subject').value = email.subject.substring(0, 3) === "Re:" ? email.subject : "Re: " + email.subject;
      document.querySelector('#compose-body').value = `
──────────────────────────────────────────────────────────────────
On ${email.timestamp} ${email.sender} wrote:
${email.body}`;
    });

    mark_as_read(email.id);

  })
  .catch(error => {
    console.log('Error:', error.error)
  });

  // Show the email and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
}

function mark_as_read(email_id) {
  fetch(`/emails/${email_id}`, {
    method: 'PUT',
    body: JSON.stringify({
        read: true
    })
  })
}

function arquive(mailbox, email_id) {
  if (mailbox == 'inbox') {
    fetch(`/emails/${email_id}`, {
      method: 'PUT',
      body: JSON.stringify({
          archived: true
      })
    })
  } else if (mailbox == 'archive') {
    fetch(`/emails/${email_id}`, {
      method: 'PUT',
      body: JSON.stringify({
          archived: false
      })
    })
  }
  setTimeout(() => {  load_mailbox('inbox') }, 400);
}