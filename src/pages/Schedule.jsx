import React, { useMemo, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Card, Typography, Checkbox, Divider, Space, Button, Row, Col, Tabs } from 'antd'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import './schedule.css'

dayjs.extend(isoWeek)

/* ---- helpers ---- */
const dt = (isoDow, hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return dayjs().isoWeekday(isoDow).hour(h).minute(m).second(0).millisecond(0).toISOString()
}

/* ---- more-contrast palette (per style) ---- */
const PALETTE = {
  Waacking:   '#0E7C86',  // teal
  'Hip Hop':  '#D13B3B',  // crimson
  'High Heels':'#8C3BD1', // violet
  Choreo:     '#12733D',  // green
  Kids:       '#0B5ED7',  // blue
}

/* ---- demo template: добавили поле hall: 'hall1' | 'hall2' ---- */
const TEMPLATE_EVENTS = [
  { id:'1', hall:'hall1', title:'Waacking — Beginners', dow:1, startT:'13:00', endT:'14:00', teacher:'Doma',  style:'Waacking',   level:'Beginners' },
  { id:'2', hall:'hall1', title:'Hip Hop — Pro',        dow:1, startT:'14:30', endT:'15:30', teacher:'Ivan',  style:'Hip Hop',    level:'Pro' },
  { id:'3', hall:'hall2', title:'High Heels — Open',    dow:3, startT:'20:00', endT:'21:00', teacher:'Yulia', style:'High Heels', level:'Open' },
  { id:'4', hall:'hall2', title:'Waacking — Middle',    dow:3, startT:'21:00', endT:'22:00', teacher:'Inara', style:'Waacking',   level:'Middle' },
  { id:'5', hall:'hall1', title:'Kids — Choreo',        dow:6, startT:'12:00', endT:'13:00', teacher:'Kris',  style:'Kids',       level:'Kids' },
]

const buildWeekEvents = () =>
  TEMPLATE_EVENTS.map(e => ({
    ...e,
    start: dt(e.dow, e.startT),
    end:   dt(e.dow, e.endT),
    backgroundColor: PALETTE[e.style] || '#0E7C86',
    extendedProps: { teacher: e.teacher, style: e.style, level: e.level },
  }))

export default function ScheduleCalendar() {
  const allEvents = useMemo(buildWeekEvents, [])

  const TEACHERS = useMemo(() => [...new Set(allEvents.map(e => e.teacher))].map(v => ({ label: v, value: v })), [allEvents])
  const STYLES   = useMemo(() => [...new Set(allEvents.map(e => e.style))]  .map(v => ({ label: v, value: v })), [allEvents])
  const LEVELS   = useMemo(() => [...new Set(allEvents.map(e => e.level))]  .map(v => ({ label: v, value: v })), [allEvents])

  // by default all selected
  const [teacher, setTeacher] = useState(TEACHERS.map(o => o.value))
  const [style, setStyle]     = useState(STYLES.map(o => o.value))
  const [level, setLevel]     = useState(LEVELS.map(o => o.value))
  // внутри компонента ScheduleCalendar()
const [hall, setHall] = useState('hall1') // активная вкладка

// ... остальное без изменений ...

const events = useMemo(() => {
  return allEvents
    .filter(e => e.hall === hall)                // <-- фильтр по залу
    .filter(e => teacher.includes(e.teacher))
    .filter(e => style.includes(e.style))
    .filter(e => level.includes(e.level))
}, [allEvents, hall, teacher, style, level])

  // helpers: select/clear all
  const selectAll = (type) => {
    if (type === 'teacher') setTeacher(TEACHERS.map(o => o.value))
    if (type === 'style')   setStyle(STYLES.map(o => o.value))
    if (type === 'level')   setLevel(LEVELS.map(o => o.value))
  }
  const clearAll = (type) => {
    if (type === 'teacher') setTeacher([])
    if (type === 'style')   setStyle([])
    if (type === 'level')   setLevel([])
  }
  const selectAllGlobal = () => { selectAll('teacher'); selectAll('style'); selectAll('level') }
  const clearAllGlobal  = () => { clearAll('teacher');  clearAll('style');  clearAll('level') }

  return (
    <div className="schedule-wrap">
      <div className="container">
        <Typography.Title level={2} className="page-title">Schedule</Typography.Title>

        {/* GRID: sidebar + calendar share the same tall height */}
        <div className="schedule-grid huge">
          {/* Sidebar */}
          <aside className="sidebar card">
            <div className="sidebar-head">
              <Typography.Title level={5} style={{ margin: 0 }}>Filter</Typography.Title>
              <Space>
                <Button size="small" onClick={selectAllGlobal}>Select all</Button>
                <Button size="small" onClick={clearAllGlobal} danger>Clear all</Button>
              </Space>
            </div>

            <Divider className="filter-divider" />

            <div className="filter-block">
              <div className="filter-title-row">
                <div className="filter-title">Teacher</div>
                <Space size={6}>
                  <Button size="small" type="text" onClick={() => selectAll('teacher')}>all</Button>
                  <Button size="small" type="text" onClick={() => clearAll('teacher')}>clear</Button>
                </Space>
              </div>
              <Checkbox.Group
                options={TEACHERS}
                value={teacher}
                onChange={setTeacher}
              />
            </div>

            <Divider className="filter-divider" />

            <div className="filter-block">
              <div className="filter-title-row">
                <div className="filter-title">Style</div>
                <Space size={6}>
                  <Button size="small" type="text" onClick={() => selectAll('style')}>all</Button>
                  <Button size="small" type="text" onClick={() => clearAll('style')}>clear</Button>
                </Space>
              </div>
              <Checkbox.Group
                options={STYLES.map(o => ({
                  label: <span className="style-chip" style={{'--chip': PALETTE[o.value] || '#999'}}>{o.label}</span>,
                  value: o.value,
                }))}
                value={style}
                onChange={setStyle}
              />
            </div>

            <Divider className="filter-divider" />

            <div className="filter-block">
              <div className="filter-title-row">
                <div className="filter-title">Level</div>
                <Space size={6}>
                  <Button size="small" type="text" onClick={() => selectAll('level')}>all</Button>
                  <Button size="small" type="text" onClick={() => clearAll('level')}>clear</Button>
                </Space>
              </div>
              <Checkbox.Group
                options={LEVELS}
                value={level}
                onChange={setLevel}
              />
            </div>
          </aside>

          {/* Calendar */}
          <main className="calendar-viewport card">
            <div className="calendar-tabs">
    <Tabs
      activeKey={hall}
      onChange={setHall}
              type="card"

      items={[
        { key: 'hall1', label: 'Hall 1' },
        { key: 'hall2', label: 'Hall 2' },
      ]}
    />
  </div>
    <div className="calendar-body">
            <FullCalendar
              plugins={[timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              headerToolbar={false}
              firstDay={1}
              //timeZone="Europe/Warsaw"
              dayHeaderFormat={{ weekday: 'short' }}
              height="100%"              // fill grid height
              expandRows
              allDaySlot={false}
              slotMinTime="10:00:00"
              slotMaxTime="22:00:00"
              slotDuration="01:00:00"
              nowIndicator
              stickyHeaderDates
              events={events}
              selectable={false}
              editable={false}
              eventOverlap
              displayEventEnd
              eventDidMount={(info) => {
                const c = info.event.backgroundColor || info.event.extendedProps?.color
                if (c) info.el.style.setProperty('--eventColor', c)
              }}
              eventClassNames="dp-event vivid"
              eventContent={(arg) => {
                const { teacher, style, level } = arg.event.extendedProps
                return (
                  <div className="event-content">
                    <div className="event-title">
                      {`${style}\n
                      ${teacher}\n
                      ${level}`}
                    </div>
                  </div>
                )
              }}
            />
            </div>
          </main>
          
        </div>
      </div>
    </div>
  )
}
