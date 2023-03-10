import React from 'react';
import { atcb_action } from 'add-to-calendar-button';

const AddToCalendar = ({bookings}) => {
  const [name, setName] = React.useState("Some event");
  const changeName = e => {
    setName(e.target.value);
  };
  return (
    <button onClick={e => {
      e.preventDefault();
      atcb_action({
        name: name,
        dates: [ bookings.map(booking => {
                return (
                {
                name: booking.name,
                description: booking.description,
                // might need to moment format from DD MMM YYYY to YYYY MM DD
                startDate: booking.bookedDate
                }  
                )
        })
        ],
        options: ['Apple', 'Google', 'iCal', 'Microsoft365', 'Outlook.com', 'Yahoo'],
        timeZone: "Australia/Sydney",
        iCalFileName: "Reminder-Event",
      });
    }}>
      <input value={name} onChange={changeName} />
      <span>Add to Calendar <i className="fa fa-check-circle"></i></span>
    </button>
  );
}

export default AddToCalendar;
    // <div class="atcb" style="display:none;">

    // </div>