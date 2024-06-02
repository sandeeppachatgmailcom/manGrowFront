import {useState } from 'react';
import Calendar from 'react-calendar';
import { useSelector } from 'react-redux';
import './black-theme-calendar.css'

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function MyCalender() {
  const theme = useSelector((state:any) => state.theme);
  const [value, onChange] = useState<Value>(new Date());
  const calendarClassName = theme.themeDark === true ? 'react-calendar black-theme' : 'react-calendar';

  return (
    <div className='flex h-[100%] w-[100%]'>
      <Calendar
        onChange={onChange}
        value={value}
        selectRange={true}
        defaultView='month'
        className={calendarClassName +' rounded-xl border-opacity-0'}
      />
    </div>
  );
}

export default MyCalender;
