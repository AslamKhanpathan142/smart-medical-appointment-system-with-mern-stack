import React, { useState } from "react";
import styles from "./AvailableSlots.module.css";
import {
  FaCalendarAlt,
  FaClock,
  FaSave,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

const AvailableSlots = () => {
  const [days, setDays] = useState([
    {
      id: 1,
      name: "Monday",
      selected: false,
      startTime: "09:00",
      endTime: "17:00",
    },
    {
      id: 2,
      name: "Tuesday",
      selected: false,
      startTime: "09:00",
      endTime: "17:00",
    },
    {
      id: 3,
      name: "Wednesday",
      selected: false,
      startTime: "09:00",
      endTime: "17:00",
    },
    {
      id: 4,
      name: "Thursday",
      selected: false,
      startTime: "09:00",
      endTime: "17:00",
    },
    {
      id: 5,
      name: "Friday",
      selected: false,
      startTime: "09:00",
      endTime: "17:00",
    },
    {
      id: 6,
      name: "Saturday",
      selected: false,
      startTime: "10:00",
      endTime: "14:00",
    },
    { id: 7, name: "Sunday", selected: false, startTime: "", endTime: "" },
  ]);

  const [savedSlots, setSavedSlots] = useState([
    { id: 1, day: "Monday", start: "09:00", end: "12:00" },
    { id: 2, day: "Monday", start: "13:00", end: "17:00" },
    { id: 3, day: "Wednesday", start: "10:00", end: "16:00" },
    { id: 4, day: "Friday", start: "09:00", end: "15:00" },
  ]);

  const toggleDaySelection = (id) => {
    setDays(
      days.map((day) =>
        day.id === id ? { ...day, selected: !day.selected } : day
      )
    );
  };

  const updateDayTime = (id, field, value) => {
    setDays(
      days.map((day) => (day.id === id ? { ...day, [field]: value } : day))
    );
  };

  const saveAvailability = () => {
    const selectedDays = days.filter((day) => day.selected);
    const newSlots = selectedDays.map((day) => ({
      id: Date.now() + day.id,
      day: day.name,
      start: day.startTime,
      end: day.endTime,
    }));

    setSavedSlots([...savedSlots, ...newSlots]);
    setDays(days.map((day) => ({ ...day, selected: false })));
  };

  const deleteSlot = (id) => {
    setSavedSlots(savedSlots.filter((slot) => slot.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <FaCalendarAlt />
        </div>
        <div>
          <h1>Set Your Availability</h1>
          <p>Configure when patients can book appointments with you</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2>
            <FaCalendarAlt className={styles.icon} />
            Select Available Days
          </h2>

          <div className={styles.daysGrid}>
            {days.map((day) => (
              <div
                key={day.id}
                className={`${styles.dayCard} ${
                  day.selected ? styles.selected : ""
                }`}
                onClick={() => toggleDaySelection(day.id)}
              >
                <div className={styles.dayName}>{day.name.substring(0, 3)}</div>
                {day.selected && (
                  <div className={styles.timeInputs}>
                    <div className={styles.timeInputGroup}>
                      <label>Start</label>
                      <input
                        type="time"
                        value={day.startTime}
                        onChange={(e) =>
                          updateDayTime(day.id, "startTime", e.target.value)
                        }
                      />
                    </div>
                    <div className={styles.timeInputGroup}>
                      <label>End</label>
                      <input
                        type="time"
                        value={day.endTime}
                        onChange={(e) =>
                          updateDayTime(day.id, "endTime", e.target.value)
                        }
                        disabled={!day.startTime}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button className={styles.saveButton} onClick={saveAvailability}>
            <FaSave /> Save Selected Days
          </button>
        </div>

        <div className={styles.section}>
          <h2>
            <FaClock className={styles.icon} />
            Your Saved Availability
          </h2>

          {savedSlots.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No availability slots saved yet</p>
              <p>Select days or add custom slots to get started</p>
            </div>
          ) : (
            <div className={styles.slotsGrid}>
              {savedSlots.map((slot) => (
                <div key={slot.id} className={styles.slotCard}>
                  <div className={styles.slotDay}>{slot.day}</div>
                  <div className={styles.slotTime}>
                    {slot.start} - {slot.end}
                  </div>
                  <button
                    className={styles.deleteButton}
                    onClick={() => deleteSlot(slot.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailableSlots;
