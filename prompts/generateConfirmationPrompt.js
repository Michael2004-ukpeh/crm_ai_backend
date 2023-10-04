const generateConfirmationPrompt = (event) => {
  let prompt = ` Create a custom email body to act as a confirmation that someone registered for an event.
     Here is the title of the event: \n
     ${event.name}, \n
    \n
     description of the event: \n
     ${event.about},
     \n
     recepient's name: ${event.attendee},\n
     event date:${event.date} ,\n
     event location: ${event.location} \n
     Please don't include the subject and use the following organizer's details provided\n
     Event Organizer:${event.organizer}\n
     Event organizer's email: ${event.organizerEmail}
     `;

  return prompt;
};
module.exports = generateConfirmationPrompt;
