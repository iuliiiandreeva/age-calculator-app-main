import './App.css';
import {useState} from 'react';

function App() {
  const [days, setDays] = useState('');
  const [months, setMonths] = useState('');
  const [years, setYears] = useState('');

  const [fillDays, setFillDays] = useState(false);
  const [fillMonths, setFillMonths] = useState(false);
  const [fillYears, setFillYears] = useState(false);

  const [invalidDays, setInvalidDays] = useState(false);
  const [invalidMonths, setInvalidMonths] = useState(false);
  const [invalidYears, setInvalidYears] = useState(false);


  const onConfirm = (event) => {
    event.preventDefault();

    const bday = event.target.day.value;
    const bmonth = event.target.month.value;
    const byear = event.target.year.value;

    const currentDate = new Date();

    /* Check empty fields */

    if (bday === "") {
      setFillDays(true);
    }
    if (bmonth === "") {
      setFillMonths(true);
    }
    if (byear === "") {
      setFillYears(true);
    }
    
    if (bday === "" || bmonth === "" || byear === "") {
      return;
    }

    /* Check invalid input fields */
    if (byear > currentDate.getFullYear() || byear < 1910) {
      setInvalidMonths(true);
      setInvalidYears(true);
      setInvalidDays(true);
    }
    if (bmonth < 1 || (byear == currentDate.getFullYear() && bmonth > currentDate.getMonth()) || bmonth > 12) {
      setInvalidMonths(true);
      setInvalidYears(true);
      setInvalidDays(true);
      return;
    }

    const nextMonth = new Date(byear, bmonth, 1);
    nextMonth.setDate(nextMonth.getDate() - 1);
    if (bday < 1 || bday > 31 || bday > nextMonth.getDate()) {
      setInvalidMonths(true);
      setInvalidYears(true);
      setInvalidDays(true);
      return;
    }
    

    /* Main body of program */
    let years = currentDate.getFullYear() - byear;

    let months = currentDate.getMonth() - bmonth;

    if (currentDate.getDate() < bday) {
      months--;
    }

    let days = currentDate.getDate() - bday;

    if (months < 0) {
      months += 12;
      years--;
    }
    if (days < 0) {
      const lastMonthDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      );
      days += lastMonthDate.getDate();
      months--;
    }
    event.target.day.value = "";
    event.target.month.value = "";
    event.target.year.value = "";
    setFillDays(false);
    setFillMonths(false);
    setFillYears(false);
    setInvalidDays(false);
    setInvalidMonths(false);
    setInvalidYears(false);
    setDays(days);
    setMonths(++months);
    setYears(years);
  };
  
  return (
    <div className="App">
      <div className="appForm">
      <form onSubmit={onConfirm}>
        <p>
          <label for="day_field" className={`${(fillDays || invalidDays)? "error" : ""}`}>Day</label>
          <input type="text" name="day" className={`formDay ${(fillDays || invalidDays) ? "error" : ""}`} placeholder="DD" id="day_field" size="4"/>
          <p className={`${(invalidDays || invalidMonths || invalidYears) ? "error" : "none"}`}>Must be a valid day</p>
          <p className={`${fillDays? "error" : "none"}`}>This field is required</p>
          
        </p>
        <p>
          <label for="month_field"  className={`${(fillMonths || invalidMonths) ? "error" : ""}`}>Month</label>
          <input type="text" name="month" className={`formMonth ${(fillMonths || invalidMonths) ? "error" : ""}`} placeholder="MM" id="month_field" size="4"/>
          <p className={`${(invalidDays || invalidMonths || invalidYears) ? "error" : "none"}`}>Must be a valid month</p>
          <p className={`${fillMonths ? "error" : "none"}`}>This field is required</p>
        </p>
        <p>
          <label for="year_field"  className={`${(fillYears || invalidYears) ? "error" : ""}`}>Year</label>
          <input type="text" name="year" className={`formYear ${(fillYears || invalidYears) ? "error" : ""}`} placeholder="YYYY" id="year_field" size="4"/>
          <p className={`${(invalidDays || invalidMonths || invalidYears)? "error" : "none"}`}>Must be a valid year</p>
          <p className={`${fillYears ? "error" : "none"}`}>This field is required</p>
        </p>
        <button type="submit" className="butn"></button>
      </form>
      </div>

      <div className="daysResults">
        <div className="result years"><span className="violet">{!years ? ("--") : (`${years}  `)}</span>Years</div>
        </div>
      <div className="monthsResults">
        <div className="result months"><span className="violet">{!months ? ("--") : (`${months}  `)}</span>Months</div>
        </div>
      <div className="yearsResults">
        <div className="result days"><span className="violet">{!days ? ("--") : (`${days}  `)}</span>Days</div>
        </div>
    </div>
  );
}

export default App;
