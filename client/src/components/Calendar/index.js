import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            <button className="btn btn-success">
                Book
                <DatePicker 
                    selected={this.state.selectedDate}
                    onChange={this.handleDateChange}
                    dateFormat="dd MMM yyyy"
                    className="form-control"
                />
            </button>
        );
    }
}

export default Calendar;

