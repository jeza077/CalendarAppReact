import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'; //Bigcalendar usa moment
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { NavBar } from '../ui/NavBar';
import { messages } from '../../helper/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import { uiOpenModal } from '../../actions/ui';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es'; //Importar idioma español de moment
import { eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';

moment.locale('es'); //Idioma a español de los dias y meses en calendario por moment

const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const { events } = useSelector( state => state.calendar ); //Mostrar eventos en calendario

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

    const onDoubleClick = (e) => {
        dispatch( uiOpenModal() );
    }

    const onSelectEvent = (e) => {
        dispatch( eventSetActive(e) );
        dispatch( uiOpenModal() );
    }
    
    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }
    
    const eventStyleGetter = ( event, start, end, isSelected ) => {
        
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }

    };

    return (
        <div className="calendar-screen">
            <NavBar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab />

            <CalendarModal />
        </div>
    )
}
