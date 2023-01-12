import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date()
        }
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange(date) {
        this.setState({
            selectedDate: date
        });
    }

    render() {
        return (
            <DatePicker 
                selected={this.state.selectedDate}
                onChange={this.handleDateChange}
                dateFormat="dd MMM yyyy"
            />
        );
    }
}

export default Calendar;