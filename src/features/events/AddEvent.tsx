/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { DateTimePicker } from '@mui/x-date-pickers';
// import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { selectError } from './selectors';
import { addEvent } from './eventsSlice';
import { useAppDispatch } from '../../store';

export default function Events(): JSX.Element {
    const error = useSelector(selectError);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [startAt, setStart] = useState<string>('26.06.2023 11:00');
    const [finishAt, setFinish] = useState<string>('26.06.2023 12:00');
    const [place, setPlace] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleSubmit = React.useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const dispatchResult = await dispatch(addEvent({
                title, startAt, finishAt, category, place, description
            }));
            if (addEvent.fulfilled.match(dispatchResult)) {
                setTitle('');
                // setStart(new Date(Date.now()).toDateString());
                // setFinish(new Date(Date.now()).toDateString());
                setCategory('Спорт');
                setPlace('');
                setDescription('');
                navigate('/events');
            }
        },
        [dispatch, title, description, startAt, finishAt, place, category, navigate]
    );

    return (

        <form className="mb-3" onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                  required
                  type="text"
                  className={`form-control ${error ? 'is-invalid' : ''}`}
                  placeholder="Название..."
                  aria-label="Название..."
                  name="eventTitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <DateTimePicker
                  // defaultValue={dayjs('2022-04-17T15:30')}
                  value={startAt}
                  ampm={false}
                  disablePast
                  onChange={(newValue) => setStart(newValue || '26.06.2023 11:00')}
                />
                <DateTimePicker
                  // defaultValue={dayjs('2022-04-17T15:30')}
                  value={finishAt}
                  ampm={false}
                  disablePast
                  onChange={(newValue) => setFinish(newValue || '26.06.2023 12:00')}
                />
                <select
                  required
                  className={`form-control ${error ? 'is-invalid' : ''}`}
                  placeholder="Категория..."
                  aria-label="Категория..."
                  name="eventCategory"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="Дети">Дети</option>
                    <option value="Домашние животные">Домашние животные</option>
                    <option value="Покупки">Кино</option>
                    <option value="Настольные игры">Настольные игры</option>
                    <option value="Покупки">Покупки</option>
                    <option value="Покупки">Ремонт</option>
                    <option value="Покупки">Рыбалка</option>
                    <option value="Спорт">Спорт</option>
                    <option value="Покупки">Театр</option>
                </select>
                <input
                  required
                  type="text"
                  className={`form-control ${error ? 'is-invalid' : ''}`}
                  placeholder="Место..."
                  aria-label="Место..."
                  name="eventPlace"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                />
                <input
                  required
                  type="text"
                  className={`form-control ${error ? 'is-invalid' : ''}`}
                  placeholder="Описание..."
                  aria-label="Описание..."
                  name="eventDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                    добавить
                </button>
            </div>
            {error && (
                <div className="invalid-feedback text-end" style={{ display: 'block' }}>
                    {error}
                </div>
            )}
        </form>

    );
}
